import { onMounted, onUnmounted, ref, watch } from 'vue'
import { UPDATE_TIME_INTERVAL } from '@/constants/config.ts'

export function useTime(offset: () => number) {
  const currentLocalTime = ref('')
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  const updateCurrentLocalTime = () => {
    const currentOffset = offset()
    if (currentOffset === undefined || isNaN(currentOffset)) return

    try {
      const now = new Date()
      const utc = now.getTime() + now.getTimezoneOffset() * 60000
      const targetTime = new Date(utc + 3600000 * currentOffset)

      currentLocalTime.value = targetTime.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })
      error.value = null
    } catch (err) {
      error.value = 'Ошибка таймера'
    } finally {
      isLoading.value = false
    }
  }

  watch(offset, () => {
    isLoading.value = true
    updateCurrentLocalTime()
  })

  let intervalId: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    updateCurrentLocalTime()
    intervalId = setInterval(updateCurrentLocalTime, UPDATE_TIME_INTERVAL)
  })

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return {
    currentLocalTime,
    isLoading,
    error
  }
}
