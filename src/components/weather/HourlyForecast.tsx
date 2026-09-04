import React from 'react'
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react'
import { Card } from '@/components/ui'
import type { ForecastItem } from '@/types'
import { format } from 'date-fns'

interface ForecastItemProps {
  item: ForecastItem
  unit: 'C' | 'F'
}

const ForecastItemComponent: React.FC<ForecastItemProps> = ({ item, unit }) => {
  const temp = unit === 'F' ? (item.main.temp * 9) / 5 + 32 : item.main.temp
  const condition = item.weather[0]

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase()
    if (desc.includes('clear') || desc.includes('sunny'))
      return <Sun className="w-6 h-6 text-yellow-400" />
    if (desc.includes('cloud')) return <Cloud className="w-6 h-6 text-gray-400" />
    if (desc.includes('rain')) return <CloudRain className="w-6 h-6 text-blue-400" />
    return <Cloud className="w-6 h-6 text-slate-400" />
  }

  return (
    <div className="bg-slate-700/50 rounded-lg p-3 text-center hover:bg-slate-700 transition-colors">
      <p className="text-slate-300 text-sm font-medium mb-2">
        {format(new Date(item.dt * 1000), 'HH:mm')}
      </p>
      <div className="flex justify-center mb-2">
        {getWeatherIcon(condition.description)}
      </div>
      <p className="text-white font-bold text-lg">{Math.round(temp)}°{unit}</p>
      <p className="text-slate-400 text-xs mt-1 capitalize">
        {condition.description}
      </p>
      <div className="flex items-center justify-center gap-2 mt-2 text-xs text-slate-400">
        <Droplets className="w-3 h-3" />
        <span>{item.main.humidity}%</span>
      </div>
      {item.pop > 0 && (
        <div className="flex items-center justify-center gap-1 mt-1 text-xs text-blue-400">
          <CloudRain className="w-3 h-3" />
          <span>{Math.round(item.pop * 100)}%</span>
        </div>
      )}
    </div>
  )
}

interface HourlyForecastProps {
  forecast: ForecastItem[]
  unit: 'C' | 'F'
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast, unit }) => {
  return (
    <Card className="animate-in">
      <h3 className="text-xl font-bold text-white mb-4">24-Hour Forecast</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-3 pb-2">
          {forecast.slice(0, 8).map((item) => (
            <div key={item.dt} className="flex-shrink-0 w-24">
              <ForecastItemComponent item={item} unit={unit} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default HourlyForecast
