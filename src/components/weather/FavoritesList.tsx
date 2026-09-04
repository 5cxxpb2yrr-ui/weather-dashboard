import React from 'react'
import { Trash2, Plus, Star } from 'lucide-react'
import { Card, Button } from '@/components/ui'
import type { FavoriteLocation } from '@/types'

interface FavoritesListProps {
  favorites: FavoriteLocation[]
  onSelectFavorite: (location: FavoriteLocation) => void
  onRemoveFavorite: (id: string) => void
  isLoading?: boolean
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
  isLoading = false,
}) => {
  if (favorites.length === 0) {
    return (
      <Card className="text-center py-8">
        <Star className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
        <p className="text-slate-400 mb-4">No favorite locations yet</p>
        <p className="text-slate-500 text-sm">
          Add your favorite locations to access them quickly
        </p>
      </Card>
    )
  }

  return (
    <Card>
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-400" />
        Favorites
      </h3>
      <div className="space-y-2">
        {favorites.map((location) => (
          <div
            key={location.id}
            className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700 transition-colors"
          >
            <button
              onClick={() => onSelectFavorite(location)}
              disabled={isLoading}
              className="flex-1 text-left hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              <p className="text-white font-medium">{location.name}</p>
              <p className="text-slate-400 text-sm">{location.country}</p>
            </button>
            <button
              onClick={() => onRemoveFavorite(location.id)}
              disabled={isLoading}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors disabled:opacity-50"
              title="Remove favorite"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default FavoritesList
