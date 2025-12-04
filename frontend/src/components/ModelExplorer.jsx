import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetchModels from "./playground/useFetchModels";
import { Search, Filter, ArrowRight, Loader2 } from "lucide-react";

const ModelExplorer = () => {
  const navigate = useNavigate();
  const { models, loading, error } = useFetchModels("/api/ai/models");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Extract unique types
  const types = useMemo(() => {
    const set = new Set(models.map((m) => m.type || "other"));
    return ["all", ...set];
  }, [models]);

  // Filter models
  const filteredModels = useMemo(() => {
    let result = models;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          (m.title || m.name || "").toLowerCase().includes(q) ||
          (m.summary || "").toLowerCase().includes(q)
      );
    }

    if (selectedType !== "all") {
      result = result.filter((m) => (m.type || "other") === selectedType);
    }

    return result;
  }, [models, search, selectedType]);

  return (
    <div id="models" className="w-full bg-[#0A0A0F] py-20 px-6 sm:px-20 xl:px-32">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cinzel">
          Explore <span className="text-[#6B8CFF]">AI Models</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Discover and deploy state-of-the-art AI models for chat, image generation, coding, and more.
          Powered by OpenRouter & DeepInfra.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search models (e.g. Llama, Mistral, Vision)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1A1A23] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#6B8CFF] transition-colors"
          />
        </div>
        
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-3 rounded-xl whitespace-nowrap capitalize font-medium transition-all ${
                selectedType === type
                  ? "bg-[#6B8CFF] text-white shadow-lg shadow-blue-500/20"
                  : "bg-[#1A1A23] text-gray-400 hover:bg-[#252530] hover:text-white border border-white/5"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-[#6B8CFF] animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-400 py-10 bg-red-500/10 rounded-xl">
          Failed to load models. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.slice(0, 12).map((model) => (
            <div
              key={model.id}
              onClick={() => navigate("/playground")}
              className="group relative bg-[#13131A] border border-white/5 rounded-2xl p-6 hover:border-[#6B8CFF]/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6B8CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1A1A23] flex items-center justify-center border border-white/5 group-hover:border-[#6B8CFF]/30 transition-colors">
                    {model.image ? (
                      <img src={model.image} alt="" className="w-8 h-8 object-cover rounded-lg" />
                    ) : (
                      <div className="text-2xl">🤖</div>
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#1A1A23] text-xs font-medium text-gray-400 border border-white/5 capitalize">
                    {model.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#6B8CFF] transition-colors line-clamp-1">
                  {model.title || model.name}
                </h3>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 h-10">
                  {model.summary || "Advanced AI model ready for deployment."}
                </p>

                <div className="flex items-center text-[#6B8CFF] font-medium text-sm group/btn">
                  Try Model 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      {!loading && !error && filteredModels.length > 12 && (
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/playground")}
            className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center"
          >
            View All {filteredModels.length} Models
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ModelExplorer;
