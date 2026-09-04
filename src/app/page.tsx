'use client'

import React, { useEffect, useState } from 'react'
import { Cloud, MapPin, RefreshCw, Star, Settings, Menu, X } from 'lucide-react'
import { useWeatherStore } from '@/store/weather'
import { weatherAPI, geoAPI } from '@/lib/api'
import { Button, Card } from '@/components/ui'
import {
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  LocationSearch,
  FavoritesList,
} from '@/components/weather'
import { WeatherCharts } from '@/components/charts'
import type { WeatherData, ForecastData, GeoLocation, FavoriteLocation } from '@/types'

export default function Home() {
  const {
    currentWeather,
    setCurrentWeather,
    forecast,
    setForecast,
    unit,
    setUnit,
    sidebarOpen,
    setSidebarOpen,
    loading,
    setLoading,
    error,
    setError,
    favorites,
    addFavorite,
    removeFavorite,
  } = useWeatherStore()

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number
    lon: number
  } | null>(null)
  const [locationName, setLocationName] = useState<string>('')

  // Get user's geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation({ lat: latitude, lon: longitude })
          await fetchWeatherByCoords(latitude, longitude)
        },
        (error) => {
          console.error('Geolocation error:', error)
          // Fallback to default city
          fetchWeatherByCity('London')
        }
      )
    }
  }, [])

  const fetchWeatherByCity = async (city: string) => {
    setLoading(true)
    setError(null)
    try {
      const weather = await weatherAPI.getCurrentWeatherByCity(city)
      const forecastData = await weatherAPI.getForecast(weather.coord.lat, weather.coord.lon)
      setCurrentWeather(weather)
      setForecast(forecastData)
      setLocationName(city)
      setCurrentLocation({ lat: weather.coord.lat, lon: weather.coord.lon })
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true)
    setError(null)
    try {
      const weather = await weatherAPI.getCurrentWeatherByCoords(lat, lon)
      const forecastData = await weatherAPI.getForecast(lat, lon)
      setCurrentWeather(weather)
      setForecast(forecastData)
      setLocationName(weather.name)
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectLocation = async (location: GeoLocation) => {
    await fetchWeatherByCoords(location.lat, location.lon)
  }

  const handleAddFavorite = () => {
    if (currentWeather && currentLocation) {
      const favorite: FavoriteLocation = {
        id: `${currentLocation.lat}-${currentLocation.lon}`,
        name: currentWeather.name,
        lat: currentLocation.lat,
        lon: currentLocation.lon,
        country: currentWeather.sys.country,
        addedAt: Date.now(),
      }
      addFavorite(favorite)
    }
  }

  const handleSelectFavorite = (location: FavoriteLocation) => {
    fetchWeatherByCoords(location.lat, location.lon)
  }

  const isFavorited = currentLocation
    ? favorites.some(
        (fav) => fav.lat === currentLocation.lat && fav.lon === currentLocation.lon
      )
    : false

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">Weather Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                °{unit === 'C' ? 'F' : 'C'}
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside
          className={`lg:col-span-1 space-y-6 ${
            sidebarOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Location Search */}
          <Card>
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white">Search Location</h2>
              <LocationSearch
                onSelectLocation={handleSelectLocation}
                isLoading={loading}
              />
            </div>
          </Card>

          {/* Current Location Info */}
          {currentWeather && (
            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border-blue-500/30">
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-sm">Current Location</p>
                  <p className="text-white font-semibold truncate">{locationName}</p>
                </div>
              </div>
              <button
                onClick={handleAddFavorite}
                disabled={loading || isFavorited}
                className="w-full mt-3 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
              >
                <Star className="w-4 h-4" />
                {isFavorited ? 'Added to Favorites' : 'Add to Favorites'}
              </button>
            </Card>
          )}

          {/* Favorites */}
          {favorites.length > 0 && (
            <FavoritesList
              favorites={favorites}
              onSelectFavorite={handleSelectFavorite}
              onRemoveFavorite={removeFavorite}
              isLoading={loading}
            />
          )}
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Error Alert */}
          {error && (
            <Card className="bg-red-500/20 border-red-500/50">
              <div className="flex items-center justify-between">
                <p className="text-red-400">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </Card>
          )}

          {/* Loading State */}
          {loading && !currentWeather ? (
            <Card className="h-96 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
                <p className="text-slate-400">Loading weather data...</p>
              </div>
            </Card>
          ) : currentWeather ? (
            <>
              {/* Current Weather */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">
                    {currentWeather.name}, {currentWeather.sys.country}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Last updated:{' '}
                    {new Date(currentWeather.dt * 1000).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => fetchWeatherByCoords(currentLocation!.lat, currentLocation!.lon)}
                  disabled={loading}
                  className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors disabled:opacity-50"
                  title="Refresh weather data"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <CurrentWeather weather={currentWeather} unit={unit} />

              {/* Hourly Forecast */}
              {forecast && (
                <>
                  <HourlyForecast forecast={forecast.list} unit={unit} />
                  <DailyForecast forecast={forecast} unit={unit} />
                  <WeatherCharts forecast={forecast} unit={unit} />
                </>
              )}
            </>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center">
                <Cloud className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No weather data available</p>
                <p className="text-slate-500 text-sm mt-2">
                  Please enable location access or search for a location
                </p>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
