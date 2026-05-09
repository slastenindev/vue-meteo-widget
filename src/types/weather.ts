export interface WeatherInfo {
  temperature: number
  weathercode: number
  is_day: number
}

export interface WeatherApiResponse {
  current_weather: WeatherInfo
  utc_offset_seconds: number
}

export interface WeatherCache {
  value: WeatherApiResponse
  expiry: number
  cachedLat: number
  cachedLon: number
}
