import React from "react";
import { Star, Zap, GitCompare } from "lucide-react";

export default function ModelCard({
  model,
  onSelect,
  onFavorite,
  isFavorite,
  onCompare,
  isInCompare
}) {
    const getCategoryLabel = (tags = [], type = "") => {
        // Tags override type if present
        const tag = (tags[0] || type || "").toLowerCase();
      
        if (tag.includes("vision") || tag.includes("image")) return "IMAGE GENERATION";
        if (tag.includes("audio") || tag.includes("asr") || tag.includes("voice")) return "VOICE";
        if (tag.includes("tts")) return "TEXT-TO-SPEECH";
        if (tag.includes("embedding")) return "EMBEDDINGS";
        if (tag.includes("code")) return "CODE";
        if (tag.includes("video")) return "VIDEO";
        if (tag.includes("ocr")) return "OCR";
        if (tag.includes("translation")) return "TRANSLATION";
        if (tag.includes("summarization")) return "SUMMARIZATION";
      
        return "CHAT"; // default
      };
      
      

  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div
      onClick={() => onSelect(model)}
      className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 rounded-lg p-4 transition-all duration-200 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-white text-sm truncate">
              {model.title || model.name}
            </h4>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavorite(model.id);
              }}
              className={`p-1 rounded transition-colors flex-shrink-0 ${
                isFavorite
                  ? "text-yellow-400"
                  : "text-slate-500 hover:text-yellow-400"
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-2">
          <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded font-medium">
  {getCategoryLabel(model.tags, model.type)}
</span>


            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Zap className="w-3 h-3" />
              <span>Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
          {model.downloads > 0 && (
            <span className="px-2 py-1 bg-slate-700/50 rounded">
              {formatNumber(model.downloads)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400 line-clamp-1 flex-1">
          {model.summary || model.provider_suggestion || "AI Model"}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onCompare(model.id);
          }}
          className={`p-1.5 rounded transition-colors flex-shrink-0 ${
            isInCompare
              ? "bg-indigo-600 text-white"
              : "bg-slate-700/50 text-slate-400 hover:bg-slate-700"
          }`}
          title="Compare"
        >
          <GitCompare className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
