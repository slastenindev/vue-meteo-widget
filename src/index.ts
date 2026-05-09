import WeatherWidget from './components/WeatherWidget.vue'
import { useWeather } from './composables/useWeather'
import { useTime } from './composables/useTime'

export { WeatherWidget, useWeather, useTime }

export default {
  install: (app: any) => {
    app.component('WeatherWidget', WeatherWidget)
  },
}
