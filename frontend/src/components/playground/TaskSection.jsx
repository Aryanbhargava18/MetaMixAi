import React from "react";
import { TASK_FILTERS } from "./tasks";

export default function TaskSection({ selected, setFilters }) {
  return (
    <div className="space-y-6">
      {TASK_FILTERS.map(({ category, children }) => (
        <div key={category}>
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
            {category}
          </h3>

          <div className="space-y-2">
            {children.map((task) => {
              const isSelected = selected.includes(task.id);

              return (
                <button
                  key={task.id}
                  onClick={() => {
                    setFilters((f) => {
                      const curr = f.taskTypes || [];
                      return {
                        ...f,
                        taskTypes: isSelected ? [] : [task.id],
                      };
                    });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {task.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
