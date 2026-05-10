<script setup lang="ts">
import { computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useWeather } from '@/composables/useWeather'
import { useTime } from '@/composables/useTime'
import { WEATHER_ICONS } from '@/constants/weatherIcons'

const props = defineProps({
  label: { type: String, default: 'Weather' },
  lat: { type: Number, default: 0 },
  lon: { type: Number, default: 0 },
  theme: { type: String, default: 'dark' },
})

const { weatherData } = useWeather(
  () => props.lat,
  () => props.lon,
)

const { currentLocalTime } = useTime(() => {
  return weatherData?.value?.utc_offset_seconds !== undefined
    ? weatherData.value.utc_offset_seconds / 3600
    : 0
})

const weatherIcon = computed(() => {
  const code = weatherData.value?.current_weather?.weathercode ?? 0
  const isDay = weatherData.value?.current_weather?.is_day === 1

  const iconName = WEATHER_ICONS[code] ?? 'wi:day-cloudy'

  if (!isDay) {
    if (code === 0) return 'wi:stars'
    return iconName.replace('wi:day-', 'wi:night-')
  }

  return iconName
})

watch(
  () => [props.lat, props.lon],
  () => {
    currentLocalTime.value = ''
  },
)
</script>

<template>
  <div class="weather-widget" :class="`__${theme}`">
    <div class="weather-widget__container" v-if="weatherData?.current_weather">
      <span v-if="currentLocalTime" class="weather-widget__time">{{ currentLocalTime }}</span>
      <span class="weather-widget__label" v-if="label">{{ label }}</span>
      <span class="weather-widget__temp">
        {{ Math.round(weatherData.current_weather.temperature) }}°C
      </span>
      <Icon class="weather-widget__icon" :icon="weatherIcon" />
    </div>
  </div>
</template>

<style scoped>
.weather-widget {
  --weather-widget__size: 1em;
  --dark: #333;
  --white: #fff;

  display: inline-block;
  transition: all 0.5s ease;
}

.weather-widget.__dark {
  color: var(--dark);
}
.weather-widget.__light {
  color: var(--white);
}

.weather-widget__container {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  font-family: inherit;
  font-size: var(--weather-widget__size);
  font-weight: normal;
  white-space: nowrap;
}

.weather-widget__icon {
  width: 1.5em;
  height: 1.5em;
  color: currentColor;
}
</style>
