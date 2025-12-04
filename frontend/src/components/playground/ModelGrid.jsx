import React from "react";
import { Loader2 } from "lucide-react";
import ModelCard from "./ModelCard";

export default function ModelGrid({
  models = [],
  loading = false,
  error = null,
  onSelectModel = () => {},
  favorites = new Set(),
  onFavorite = () => {},
  compareSet = [],
  onCompare = () => {}
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm p-4 bg-red-500/10 rounded-lg text-center">
        {error}
      </div>
    );
  }

  if (!models || models.length === 0) {
    return (
      <div className="text-center text-slate-400 py-20">
        <p className="text-lg mb-2">No models found</p>
        <p className="text-sm">Try adjusting your filters or search query</p>
      </div>
    );
  }

  // defensive fallback
  const safeFavorites = favorites instanceof Set ? favorites : new Set();
  const safeCompare = Array.isArray(compareSet) ? compareSet : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          model={model}
          onSelect={() => onSelectModel(model)}
          onFavorite={() => onFavorite(model.id)}
          isFavorite={safeFavorites.has(model.id)}
          onCompare={() => onCompare(model.id)}
          isInCompare={safeCompare.includes(model.id)}
        />
      ))}
    </div>
  );
}
