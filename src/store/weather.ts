import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WeatherData, ForecastData, FavoriteLocation } from '@/types'

interface WeatherStore {
  // Current weather
  currentWeather: WeatherData | null
  setCurrentWeather: (weather: WeatherData | null) => void

  // Forecast
  forecast: ForecastData | null
  setForecast: (forecast: ForecastData | null) => void

  // Favorites
  favorites: FavoriteLocation[]
  addFavorite: (location: FavoriteLocation) => void
  removeFavorite: (id: string) => void
  getFavorite: (id: string) => FavoriteLocation | undefined

  // UI State
  unit: 'C' | 'F'
  setUnit: (unit: 'C' | 'F') => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void

  // Loading & Error
  loading: boolean
  setLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}

export const useWeatherStore = create<WeatherStore>(
  persist(
    (set, get) => ({
      currentWeather: null,
      setCurrentWeather: (weather) => set({ currentWeather: weather }),

      forecast: null,
      setForecast: (forecast) => set({ forecast }),

      favorites: [],
      addFavorite: (location) =>
        set((state) => ({
          favorites: [...state.favorites, location],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        })),
      getFavorite: (id) => get().favorites.find((fav) => fav.id === id),

      unit: 'C',
      setUnit: (unit) => set({ unit }),
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      loading: false,
      setLoading: (loading) => set({ loading }),
      error: null,
      setError: (error) => set({ error }),
    }),
    {
      name: 'weather-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        unit: state.unit,
        theme: state.theme,
      }),
    }
  )
)
