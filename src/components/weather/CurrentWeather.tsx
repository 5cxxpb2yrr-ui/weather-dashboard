import React from 'react'
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react'
import { Card } from '@/components/ui'
import type { WeatherData, MainWeatherData } from '@/types'
import { weatherUtils } from '@/lib/api'

interface CurrentWeatherProps {
  weather: WeatherData
  unit: 'C' | 'F'
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, unit }) => {
  const { main, weather: conditions, wind, visibility, clouds, sys } = weather
  const condition = conditions[0]
  const temp = unit === 'F' ? (main.temp * 9) / 5 + 32 : main.temp
  const feelsLike = unit === 'F' ? (main.feels_like * 9) / 5 + 32 : main.feels_like

  const windChill = weatherUtils.calculateWindChill(
    unit === 'F' ? (main.temp * 9) / 5 + 32 : main.temp,
    wind.speed
  )
  const dewPoint = weatherUtils.calculateDewPoint(main.temp, main.humidity)
  const windDirection = weatherUtils.getWindDirection(wind.deg)

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase()
    if (desc.includes('clear') || desc.includes('sunny'))
      return <Sun className="w-16 h-16 text-yellow-400" />
    if (desc.includes('cloud')) return <Cloud className="w-16 h-16 text-gray-400" />
    if (desc.includes('rain')) return <CloudRain className="w-16 h-16 text-blue-400" />
    return <Cloud className="w-16 h-16 text-slate-400" />
  }

  return (
    <Card className="animate-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Weather Info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              {getWeatherIcon(condition.description)}
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">
                {Math.round(temp)}°{unit}
              </h2>
              <p className="text-slate-300 capitalize text-lg">
                {condition.description}
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            Feels like {Math.round(feelsLike)}°{unit}
          </p>
          <p className="text-slate-500 text-xs mt-2">
            {new Date(weather.dt * 1000).toLocaleString()}
          </p>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Humidity */}
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span className="text-slate-400 text-sm">Humidity</span>
            </div>
            <p className="text-2xl font-bold text-white">{main.humidity}%</p>
          </div>

          {/* Wind Speed */}
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-400 text-sm">Wind</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {Math.round(wind.speed)} m/s
            </p>
            <p className="text-xs text-slate-500 mt-1">{windDirection}</p>
          </div>

          {/* Pressure */}
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-5 h-5 text-purple-400" />
              <span className="text-slate-400 text-sm">Pressure</span>
            </div>
            <p className="text-2xl font-bold text-white">{main.pressure} hPa</p>
          </div>

          {/* Visibility */}
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-orange-400" />
              <span className="text-slate-400 text-sm">Visibility</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {(visibility / 1000).toFixed(1)} km
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-slate-600/50 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-slate-400 text-sm">Min Temp</p>
          <p className="text-lg font-semibold text-white">
            {Math.round(unit === 'F' ? (main.temp_min * 9) / 5 + 32 : main.temp_min)}°{unit}
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Max Temp</p>
          <p className="text-lg font-semibold text-white">
            {Math.round(unit === 'F' ? (main.temp_max * 9) / 5 + 32 : main.temp_max)}°{unit}
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Dew Point</p>
          <p className="text-lg font-semibold text-white">
            {Math.round(unit === 'F' ? (dewPoint * 9) / 5 + 32 : dewPoint)}°{unit}
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Cloud Cover</p>
          <p className="text-lg font-semibold text-white">{clouds.all}%</p>
        </div>
      </div>
    </Card>
  )
}

export default CurrentWeather
