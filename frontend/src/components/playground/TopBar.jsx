import React from "react";
import {
  Plus,
  Save,
  FolderOpen,
  FileDown,
  Settings,
  Keyboard,
  List
} from "lucide-react";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";
export default function TopBar({
  onOpenSettings,
  onNewChat,
  onSaveSession,
  onLoadSession,
  onExport,
  onToggleSidebar,
  hasActiveChat,
  models,
  selectedModel,
  setSelectedModel
}) {
  return (
    <div className="h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 flex items-center justify-between px-6 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
      <Link to="/">
  <img
    src={logo}
    alt="MetaMix Logo"
    className="h-10 w-auto object-contain cursor-pointer"
  />
</Link>

        <div>
          <div className="text-lg font-semibold text-white">MetaMix Playground</div>
          <div className="text-xs text-slate-400">Advanced AI Model Interface</div>
        </div>
      </div>

      <div className="flex items-center gap-2">

        <Tooltip content="Toggle Models Sidebar">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <List className="w-5 h-5 text-slate-300" />
          </button>
        </Tooltip>

        {hasActiveChat && selectedModel && (
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-2 border border-slate-700">
            <img
              src={selectedModel.avatar || selectedModel.image || logo}
              alt={selectedModel.title || selectedModel.name}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => (e.target.src = logo)}
            />
            <select
              value={selectedModel.id}
              onChange={(e) => {
                const newModel = models.find(m => m.id === e.target.value);
                if (newModel) setSelectedModel(newModel);
              }}
              className="bg-transparent text-white border-none outline-none text-sm"
            >
              {models.slice(0, 10).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title || m.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <Tooltip content="Save current session (Ctrl+S)">
          <button
            onClick={onSaveSession}
            disabled={!hasActiveChat}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5 text-slate-300" />
          </button>
        </Tooltip>

        <Tooltip content="Load saved session (Ctrl+O)">
          <button
            onClick={onLoadSession}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <FolderOpen className="w-5 h-5 text-slate-300" />
          </button>
        </Tooltip>

        <Tooltip content="Export chat (Ctrl+E)">
          <button
            onClick={onExport}
            disabled={!hasActiveChat}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileDown className="w-5 h-5 text-slate-300" />
          </button>
        </Tooltip>

        <Tooltip content="New Chat (Ctrl+N)">
          <button
            onClick={onNewChat}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </Tooltip>

        <Tooltip content="Parameters & Settings (Ctrl+,)">
          <button
            onClick={onOpenSettings}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-slate-300" />
          </button>
        </Tooltip>

        <Tooltip content="Keyboard Shortcuts (?)">
          <button
            onClick={() =>
              toast(
                "Keyboard Shortcuts:\nCtrl+N: New Chat\nCtrl+S: Save Session\nCtrl+O: Load Session\nCtrl+E: Export\nCtrl+,: Settings\nEnter: Send\nShift+Enter: New Line",
                { duration: 5000 }
              )
            }
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <Keyboard className="w-5 h-5 text-slate-300" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
