# @slastenindev/vue-meteo-widget

Vue 3 weather widget component using [Open-Meteo API](https://open-meteo.com/).

## Features
- Current temperature display.
- Dynamic icons (day/night).
- Local time for coordinates.
- Data caching.
- TypeScript support.

## Installation

```sh
npm install @slastenindev/vue-meteo-widget
```

## Usage

### As a plugin (globally)

```ts
import { createApp } from 'vue'
import WeatherWidget from '@slastenindev/vue-meteo-widget'
import '@slastenindev/vue-meteo-widget/vue-meteo-widget.css'

const app = createApp(App)
app.use(WeatherWidget)
app.mount('#app')
```

### As a component (locally)

```vue
<script setup>
import { WeatherWidget } from '@slastenindev/vue-meteo-widget'
import '@slastenindev/vue-meteo-widget/vue-meteo-widget.css'
</script>

<template>
  <WeatherWidget 
    :lat="55.75" 
    :lon="37.61" 
    label="Moscow" 
    theme="dark" 
  />
</template>
```

### Composables

The library also exports logic:

```ts
import { useWeather, useTime } from '@slastenindev/vue-meteo-widget'
```

## Props

- `lat` (Number): Latitude.
- `lon` (Number): Longitude.
- `label` (String): Widget title (default: 'Weather').
- `theme` (String): Theme, 'dark' or 'light' (default: 'dark').

## License
MIT
