import axios from 'axios'
import type {
  WeatherData,
  ForecastData,
  GeoLocation,
  AlertData,
  LocationCoord,
} from '@/types'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
const WEATHER_API_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL
const GEO_API_URL = process.env.NEXT_PUBLIC_GEO_API_URL

if (!API_KEY) {
  console.warn('OpenWeatherMap API key not found. Using mock data.')
}

const axiosInstance = axios.create({
  baseURL: WEATHER_API_URL,
  timeout: 10000,
})

// Weather API Calls
export const weatherAPI = {
  // Get current weather by city name
  async getCurrentWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const response = await axiosInstance.get<WeatherData>('/weather', {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw error
    }
  },

  // Get current weather by coordinates
  async getCurrentWeatherByCoords(
    lat: number,
    lon: number
  ): Promise<WeatherData> {
    try {
      const response = await axiosInstance.get<WeatherData>('/weather', {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching weather by coords:', error)
      throw error
    }
  },

  // Get 5-day forecast
  async getForecast(lat: number, lon: number): Promise<ForecastData> {
    try {
      const response = await axiosInstance.get<ForecastData>('/forecast', {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching forecast:', error)
      throw error
    }
  },

  // Get hourly forecast (3-hour intervals)
  async getHourlyForecast(lat: number, lon: number): Promise<ForecastData> {
    try {
      const response = await axiosInstance.get<ForecastData>('/forecast', {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
          cnt: 8, // 24 hours (8 * 3-hour intervals)
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching hourly forecast:', error)
      throw error
    }
  },

  // Get weather for multiple locations
  async getMultipleLocationsWeather(cities: string[]): Promise<WeatherData[]> {
    try {
      const promises = cities.map((city) =>
        this.getCurrentWeatherByCity(city)
      )
      return await Promise.all(promises)
    } catch (error) {
      console.error('Error fetching multiple locations:', error)
      throw error
    }
  },
}

// Geocoding API Calls
export const geoAPI = {
  // Search locations by name
  async searchLocations(query: string, limit: number = 5): Promise<GeoLocation[]> {
    try {
      const response = await axios.get<GeoLocation[]>(
        `${GEO_API_URL}/direct`,
        {
          params: {
            q: query,
            limit,
            appid: API_KEY,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Error searching locations:', error)
      throw error
    }
  },

  // Reverse geocoding
  async reverseGeocode(lat: number, lon: number): Promise<GeoLocation[]> {
    try {
      const response = await axios.get<GeoLocation[]>(
        `${GEO_API_URL}/reverse`,
        {
          params: {
            lat,
            lon,
            limit: 1,
            appid: API_KEY,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Error reverse geocoding:', error)
      throw error
    }
  },
}

// Utility functions
export const weatherUtils = {
  // Convert wind direction to compass direction
  getWindDirection(degrees: number): string {
    const directions = [
      'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
    ]
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
  },

  // Calculate wind chill
  calculateWindChill(temp: number, windSpeed: number): number {
    if (temp > 10 || windSpeed < 3) return temp
    return (
      13.12 +
      0.6215 * temp -
      11.37 * Math.pow(windSpeed, 0.16) +
      0.3965 * temp * Math.pow(windSpeed, 0.16)
    )
  },

  // Calculate dew point
  calculateDewPoint(temp: number, humidity: number): number {
    const a = 17.27
    const b = 237.7
    const alpha =
      ((a * temp) / (b + temp)) + Math.log(humidity / 100)
    return (b * alpha) / (a - alpha)
  },

  // Calculate UV index approximation (simplified)
  calculateUVIndex(cloudCover: number, timeOfDay: number): number {
    const baseUV = Math.sin(timeOfDay) * 12
    const cloudFactor = 1 - (cloudCover / 100) * 0.75
    return Math.max(0, Math.round(baseUV * cloudFactor * 10) / 10)
  },

  // Get weather icon URL
  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`
  },

  // Format temperature
  formatTemp(temp: number, unit: 'C' | 'F' = 'C'): string {
    if (unit === 'F') {
      return `${Math.round((temp * 9) / 5 + 32)}°F`
    }
    return `${Math.round(temp)}°C`
  },

  // Get weather severity
  getWeatherSeverity(
    condition: string
  ): 'safe' | 'caution' | 'warning' | 'danger' {
    const conditionLower = condition.toLowerCase()
    if (
      conditionLower.includes('thunderstorm') ||
      conditionLower.includes('tornado')
    ) {
      return 'danger'
    }
    if (
      conditionLower.includes('rain') ||
      conditionLower.includes('snow') ||
      conditionLower.includes('sleet')
    ) {
      return 'warning'
    }
    if (
      conditionLower.includes('cloud') ||
      conditionLower.includes('fog') ||
      conditionLower.includes('mist')
    ) {
      return 'caution'
    }
    return 'safe'
  },
}
