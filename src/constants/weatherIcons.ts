export const WEATHER_ICONS: Record<number, string> = {
  // Ясно и облачно
  0: 'wi:day-sunny', // Чистое небо
  1: 'wi:day-cloudy', // В основном ясно
  2: 'wi:day-cloudy-gusts', // Переменная облачность
  3: 'wi:cloudy', // Пасмурно

  // Туман
  45: 'wi:fog', // Туман
  48: 'wi:fog', // Осаждающий иней (туман с изморозью)

  // Морось (Drizzle)
  51: 'wi:day-sprinkle', // Легкая морось
  53: 'wi:day-showers', // Умеренная морось
  55: 'wi:day-rain-mix', // Плотная морось

  // Дождь
  61: 'wi:day-rain', // Небольшой дождь
  63: 'wi:rain', // Умеренный дождь
  65: 'wi:rain-wind', // Сильный дождь

  // Ледяной дождь
  66: 'wi:day-sleet', // Легкий ледяной дождь
  67: 'wi:sleet', // Сильный ледяной дождь

  // Снег
  71: 'wi:day-snow', // Небольшой снег
  73: 'wi:snow', // Умеренный снег
  75: 'wi:snow-wind', // Сильный снег
  77: 'wi:snowflake-cold', // Снежные зерна (крупа)

  // Ливневые дожди
  80: 'wi:day-showers', // Слабые ливневые дожди
  81: 'wi:showers', // Умеренные ливневые дожди
  82: 'wi:thunderstorm', // Сильные ливневые дожди

  // Ливневый снег
  85: 'wi:day-snow-thunderstorm', // Слабый ливневый снег
  86: 'wi:snow-thunderstorm', // Сильный ливневый снег

  // Гроза
  95: 'wi:day-lightning', // Гроза (слабая или умеренная)
  96: 'wi:day-thunderstorm', // Гроза с небольшим градом
  99: 'wi:thunderstorm', // Гроза с сильным градом
}
