import React, { useState } from "react";
import { X, Settings, HelpCircle } from "lucide-react";
import Tooltip from "./Tooltip";

export default function ParameterPanel({
  params,
  setParams,
  onClose,
  isOpen
}) {
  const [presets] = useState([
    { name: "Balanced", temp: 0.7, topP: 0.9, topK: 40, freqPenalty: 0 },
    { name: "Creative", temp: 0.9, topP: 0.95, topK: 50, freqPenalty: 0 },
    { name: "Precise", temp: 0.3, topP: 0.8, topK: 20, freqPenalty: 0.1 },
    { name: "Focused", temp: 0.5, topP: 0.85, topK: 30, freqPenalty: 0.2 }
  ]);

  const applyPreset = (preset) => {
    setParams({
      temperature: preset.temp,
      top_p: preset.topP,
      top_k: preset.topK,
      frequency_penalty: preset.freqPenalty,
      max_tokens: params.max_tokens || 1000
    });
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-700 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Parameters
        </h3>

        <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded">
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Presets */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Presets
          </label>

          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset, i) => (
              <button
                key={i}
                onClick={() => applyPreset(preset)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Tooltip content="Controls randomness. Lower = more focused, Higher = more creative">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-1 cursor-help">
                Temperature
                <HelpCircle className="w-3 h-3 text-slate-500" />
              </label>
            </Tooltip>

            <span className="text-sm font-semibold text-indigo-400 bg-slate-800 px-2 py-0.5 rounded">
              {params.temperature?.toFixed(2) || "0.70"}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={params.temperature || 0.7}
            onChange={(e) =>
              setParams((p) => ({ ...p, temperature: parseFloat(e.target.value) }))
            }
            className="w-full"
          />

          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>Deterministic</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Top P */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Tooltip content="Nucleus sampling: considers tokens with cumulative probability mass">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-1 cursor-help">
                Top P
                <HelpCircle className="w-3 h-3 text-slate-500" />
              </label>
            </Tooltip>

            <span className="text-sm font-semibold text-indigo-400 bg-slate-800 px-2 py-0.5 rounded">
              {params.top_p?.toFixed(2) || "0.90"}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={params.top_p || 0.9}
            onChange={(e) =>
              setParams((p) => ({ ...p, top_p: parseFloat(e.target.value) }))
            }
            className="w-full"
          />
        </div>

        {/* Top K */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Tooltip content="Limits sampling to top K most likely tokens">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-1 cursor-help">
                Top K
                <HelpCircle className="w-3 h-3 text-slate-500" />
              </label>
            </Tooltip>

            <span className="text-sm font-semibold text-indigo-400 bg-slate-800 px-2 py-0.5 rounded">
              {params.top_k || 40}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="200"
            step="1"
            value={params.top_k || 40}
            onChange={(e) =>
              setParams((p) => ({ ...p, top_k: parseInt(e.target.value) }))
            }
            className="w-full"
          />
        </div>

        {/* Frequency Penalty */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Tooltip content="Reduces likelihood of repeating tokens. Higher = less repetition">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-1 cursor-help">
                Frequency Penalty
                <HelpCircle className="w-3 h-3 text-slate-500" />
              </label>
            </Tooltip>

            <span className="text-sm font-semibold text-indigo-400 bg-slate-800 px-2 py-0.5 rounded">
              {params.frequency_penalty?.toFixed(1) || "0.0"}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={params.frequency_penalty || 0}
            onChange={(e) =>
              setParams((p) => ({
                ...p,
                frequency_penalty: parseFloat(e.target.value)
              }))
            }
            className="w-full"
          />
        </div>

        {/* Max Tokens */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Tooltip content="Maximum number of tokens in the response">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-1 cursor-help">
                Max Tokens
                <HelpCircle className="w-3 h-3 text-slate-500" />
              </label>
            </Tooltip>

            <span className="text-sm font-semibold text-indigo-400 bg-slate-800 px-2 py-0.5 rounded">
              {params.max_tokens || 1000}
            </span>
          </div>

          <input
            type="number"
            min="1"
            max="4000"
            value={params.max_tokens || 1000}
            onChange={(e) =>
              setParams((p) => ({
                ...p,
                max_tokens: parseInt(e.target.value) || 1000
              }))
            }
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
