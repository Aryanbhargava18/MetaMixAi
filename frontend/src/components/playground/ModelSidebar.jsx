import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import TaskSection from "./TaskSection";

export default function ModelSidebar({
  filters,
  setFilters,
  onClose,
  providers,
  types
}) {
  const [activeFilterTab, setActiveFilterTab] = useState("tasks");

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-700 flex flex-col h-full overflow-hidden">
      
      {/* HEADER */}
      <div className="p-6 border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Filters</h2>

          <button
            onClick={onClose}
            className="md:hidden p-1 hover:bg-slate-800 rounded"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-4">
          {["tasks", "languages", "developer"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilterTab(tab)}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeFilterTab === tab
                  ? "bg-slate-800 text-white shadow-lg"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800/70"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* RESET */}
        <button
          onClick={() => {
            setFilters({
              type: "all",
              provider: "any",
              language: "any",
              framework: null,
              sort: "relevance",
              curated: false,
              verified: false,
              query: "",
              taskTypes: [],
              modelSize: null,
              minLikes: null,
              minDownloads: null,
              hasImage: false,
              inferenceReady: false
            });
            toast.success("Filters reset");
          }}
          className="text-sm text-slate-400 hover:text-slate-300 underline mb-4"
        >
          Reset
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* TASKS */}
        {activeFilterTab === "tasks" && (
          <TaskSection
            selected={filters.taskTypes || []}
            setFilters={setFilters}
          />
        )}

        {/* LANGUAGES */}
        {activeFilterTab === "languages" && (
          <div className="space-y-3">
            {[
              "Any Language",
              "English",
              "Multilingual",
              "Spanish",
              "French",
              "German",
              "Chinese",
              "Japanese",
              "Korean"
            ].map((lang) => {
              const langValue =
                lang === "Any Language" ? "any" : lang.toLowerCase();
              const isSelected = filters.language === langValue;

              return (
                <button
                  key={lang}
                  onClick={() =>
                    setFilters((f) => ({ ...f, language: langValue }))
                  }
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        )}

        {/* DEVELOPER */}
        {activeFilterTab === "developer" && (
          <div className="space-y-4">

            {/* PROVIDER */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
                Provider
              </h3>

              <select
                value={filters.provider || "any"}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, provider: e.target.value }))
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="any">Any Provider</option>
                {providers.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* FRAMEWORKS */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
                Framework
              </h3>

              <div className="space-y-2">
                {["pytorch", "tensorflow", "jax", "safetensors", "onnx"].map(
                  (framework) => {
                    const isSelected = filters.framework === framework;

                    return (
                      <button
                        key={framework}
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            framework: isSelected ? null : framework
                          }))
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {framework}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
