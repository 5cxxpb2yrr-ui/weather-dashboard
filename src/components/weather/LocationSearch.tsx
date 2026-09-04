import React, { useState } from 'react'
import { Search, X, MapPin } from 'lucide-react'
import { Input, Button } from '@/components/ui'
import { geoAPI } from '@/lib/api'
import type { GeoLocation } from '@/types'

interface LocationSearchProps {
  onSelectLocation: (location: GeoLocation) => void
  isLoading?: boolean
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onSelectLocation,
  isLoading = false,
}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeoLocation[]>([])
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setSearching(true)
    try {
      const locations = await geoAPI.searchLocations(searchQuery, 5)
      setResults(locations)
      setShowResults(true)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const handleSelectResult = (location: GeoLocation) => {
    onSelectLocation(location)
    setQuery('')
    setResults([])
    setShowResults(false)
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setShowResults(false)
  }

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search location..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              handleSearch(e.target.value)
            }}
            className="pl-10 pr-10"
            disabled={isLoading}
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
          {results.map((location) => (
            <button
              key={`${location.lat}-${location.lon}`}
              onClick={() => handleSelectResult(location)}
              className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors border-b border-slate-700/50 last:border-0 flex items-center gap-3"
            >
              <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{location.name}</p>
                <p className="text-slate-400 text-sm">
                  {location.state && `${location.state}, `}
                  {location.country}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {searching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 text-center">
          <p className="text-slate-400 text-sm">Searching...</p>
        </div>
      )}

      {showResults && query && results.length === 0 && !searching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 text-center">
          <p className="text-slate-400 text-sm">No locations found</p>
        </div>
      )}
    </div>
  )
}

export default LocationSearch
