import WeatherWidget from './components/WeatherWidget.vue'
import { useWeather } from './composables/useWeather'
import { useTime } from './composables/useTime'
import type { App, Plugin } from 'vue'

const plugin: Plugin = {
  install: (app: App) => {
    app.component('WeatherWidget', WeatherWidget)
  },
}

export { WeatherWidget, useWeather, useTime, plugin as default }
