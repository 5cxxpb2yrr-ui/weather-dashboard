import React, { useEffect, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Card } from '@/components/ui'
import type { ForecastData } from '@/types'
import { format } from 'date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface WeatherChartsProps {
  forecast: ForecastData
  unit: 'C' | 'F'
}

const WeatherCharts: React.FC<WeatherChartsProps> = ({ forecast, unit }) => {
  const labels = forecast.list.slice(0, 16).map((item) =>
    format(new Date(item.dt * 1000), 'HH:mm')
  )

  const temperatures = forecast.list.slice(0, 16).map((item) =>
    unit === 'F' ? (item.main.temp * 9) / 5 + 32 : item.main.temp
  )

  const humidity = forecast.list.slice(0, 16).map((item) => item.main.humidity)

  const precipitation = forecast.list.slice(0, 16).map((item) => item.pop * 100)

  const windSpeed = forecast.list.slice(0, 16).map((item) => item.wind.speed)

  const tempChartData = {
    labels,
    datasets: [
      {
        label: `Temperature (°${unit})`,
        data: temperatures,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  }

  const humidityChartData = {
    labels,
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidity,
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#06b6d4',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  }

  const precipitationChartData = {
    labels,
    datasets: [
      {
        label: 'Precipitation (%)',
        data: precipitation,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  }

  const windChartData = {
    labels,
    datasets: [
      {
        label: 'Wind Speed (m/s)',
        data: windSpeed,
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        borderColor: '#a855f7',
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0',
          font: { size: 12, weight: 'bold' as const },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: '#475569',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
      },
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
      },
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Temperature Chart */}
      <Card className="animate-in">
        <h3 className="text-lg font-bold text-white mb-4">Temperature Trend</h3>
        <Line data={tempChartData} options={chartOptions} height={300} />
      </Card>

      {/* Humidity Chart */}
      <Card className="animate-in">
        <h3 className="text-lg font-bold text-white mb-4">Humidity Level</h3>
        <Line data={humidityChartData} options={chartOptions} height={300} />
      </Card>

      {/* Precipitation Chart */}
      <Card className="animate-in">
        <h3 className="text-lg font-bold text-white mb-4">Precipitation Chance</h3>
        <Bar data={precipitationChartData} options={chartOptions} height={300} />
      </Card>

      {/* Wind Speed Chart */}
      <Card className="animate-in">
        <h3 className="text-lg font-bold text-white mb-4">Wind Speed</h3>
        <Bar data={windChartData} options={chartOptions} height={300} />
      </Card>
    </div>
  )
}

export default WeatherCharts
