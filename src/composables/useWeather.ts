import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { WeatherCache, WeatherApiResponse } from '@/types/weather.ts'
import { WEATHER_CHECK_INTERVAL, WEATHER_DATA_TTL } from '@/constants/config.ts'

export function useWeather(lat: () => number, lon: () => number) {
  const weatherData = ref<WeatherApiResponse | null>(null)
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  const CACHE_KEY = computed(() => `weather_${lat()}_${lon()}`)

  async function updateWeatherData() {
    const currentLat = lat()
    const currentLon = lon()

    if (currentLat === 0 && currentLon === 0) return

    const localData = localStorage.getItem(CACHE_KEY.value)
    if (localData) {
      try {
        const { value, expiry, cachedLat, cachedLon }: WeatherCache = JSON.parse(localData)
        if (Date.now() < expiry && cachedLat === currentLat && cachedLon === currentLon) {
          weatherData.value = value // Теперь типы совпадают
          isLoading.value = false
          error.value = null
          return
        }
      } catch (e) {
        localStorage.removeItem(CACHE_KEY.value)
      }
    }

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${currentLat}&longitude=${currentLon}&current_weather=true&timezone=auto`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Ошибка сети: ${res.status}`)

      const data: WeatherApiResponse = await res.json()

      localStorage.setItem(
        CACHE_KEY.value,
        JSON.stringify({
          value: data,
          expiry: Date.now() + WEATHER_DATA_TTL,
          cachedLat: currentLat,
          cachedLon: currentLon,
        }),
      )

      weatherData.value = data
      error.value = null
    } catch (err) {
      console.error(err)
      error.value = 'Ошибка загрузки'
    } finally {
      isLoading.value = false
    }
  }

  watch([lat, lon], () => {
    isLoading.value = true
    void updateWeatherData()
  })

  let intervalId: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    void updateWeatherData()
    intervalId = setInterval(() => void updateWeatherData(), WEATHER_CHECK_INTERVAL)
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return {
    weatherData,
    currentWeather: computed(() => weatherData.value?.current_weather),
    utcOffset: computed(() => weatherData.value?.utc_offset_seconds),
    isLoading,
    error,
  }
}
