export interface WeatherData {
  coord: {
    lon: number
    lat: number
  }
  weather: WeatherCondition[]
  main: MainWeatherData
  visibility: number
  wind: WindData
  clouds: { all: number }
  dt: number
  sys: SystemData
  timezone: number
  id: number
  name: string
  cod: number
}

export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface MainWeatherData {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export interface WindData {
  speed: number
  deg: number
  gust?: number
}

export interface SystemData {
  type?: number
  id?: number
  country: string
  sunrise: number
  sunset: number
}

export interface ForecastData {
  cod: string
  message: number
  cnt: number
  list: ForecastItem[]
  city: CityData
}

export interface ForecastItem {
  dt: number
  main: MainWeatherData
  weather: WeatherCondition[]
  clouds: { all: number }
  wind: WindData
  visibility: number
  pop: number // probability of precipitation
  sys: { pod: string }
  rain?: { '3h': number }
  snow?: { '3h': number }
}

export interface CityData {
  id: number
  name: string
  coord: { lat: number; lon: number }
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export interface AlertData {
  id: string
  event: string
  start: number
  end: number
  description: string
}

export interface LocationCoord {
  latitude: number
  longitude: number
}

export interface GeoLocation {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export interface FavoriteLocation {
  id: string
  name: string
  lat: number
  lon: number
  country: string
  addedAt: number
}

export interface WeatherMetrics {
  uvIndex: number
  visibility: number
  windChill: number
  dewPoint: number
  humidity: number
}
