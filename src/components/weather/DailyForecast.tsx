import React from 'react'
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui'
import type { ForecastData } from '@/types'
import { format } from 'date-fns'

interface DailyForecastProps {
  forecast: ForecastData
  unit: 'C' | 'F'
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecast, unit }) => {
  // Group forecast by day
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc
  }, {} as Record<string, typeof forecast.list>)

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase()
    if (desc.includes('clear') || desc.includes('sunny'))
      return <Sun className="w-6 h-6 text-yellow-400" />
    if (desc.includes('cloud')) return <Cloud className="w-6 h-6 text-gray-400" />
    if (desc.includes('rain')) return <CloudRain className="w-6 h-6 text-blue-400" />
    return <Cloud className="w-6 h-6 text-slate-400" />
  }

  return (
    <Card className="animate-in">
      <h3 className="text-xl font-bold text-white mb-4">5-Day Forecast</h3>
      <div className="space-y-3">
        {Object.entries(dailyForecasts).slice(0, 5).map(([date, items]) => {
          const temps = items.map((item) => item.main.temp)
          const minTemp = Math.min(...temps)
          const maxTemp = Math.max(...temps)
          const condition = items[0].weather[0]
          const avgHumidity = Math.round(
            items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length
          )
          const avgRain = items.filter((item) => item.pop > 0).length

          return (
            <div
              key={date}
              className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {getWeatherIcon(condition.description)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {format(new Date(date), 'EEEE, MMM d')}
                    </p>
                    <p className="text-slate-400 text-sm capitalize">
                      {condition.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {Math.round(unit === 'F' ? (maxTemp * 9) / 5 + 32 : maxTemp)}°
                    </p>
                    <p className="text-slate-400 text-sm">
                      {Math.round(unit === 'F' ? (minTemp * 9) / 5 + 32 : minTemp)}°
                    </p>
                  </div>

                  <div className="flex gap-3 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Droplets className="w-4 h-4" />
                      <span>{avgHumidity}%</span>
                    </div>
                    {avgRain > 0 && (
                      <div className="flex items-center gap-1 text-blue-400">
                        <CloudRain className="w-4 h-4" />
                        <span>{avgRain}x</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default DailyForecast
