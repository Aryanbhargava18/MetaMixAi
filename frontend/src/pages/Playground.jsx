import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../api";

// Hooks
import useFetchModels from "../components/playground/useFetchModels";

// Context (⭐ IMPORTANT)
import { useChat } from "../Context/ChatContext";

// Components
import TopBar from "../components/playground/TopBar";
import ModelSidebar from "../components/playground/ModelSidebar";
import ModelGrid from "../components/playground/ModelGrid";
import ChatArea from "../components/playground/ChatArea";
import ParameterPanel from "../components/playground/ParameterPanel";

const MODELS_ENDPOINT = "/ai/models";

export default function Playground() {
  // Fetch HuggingFace + Local models
  const {
    models,
    loading: modelsLoading,
    error: modelsError,
  } = useFetchModels(MODELS_ENDPOINT);

  // ⭐ Global Chat Context
  const {
    selectedModel,
    setSelectedModel,
    messages,
    setMessages,
    sendMessage,
    loading,
    params,
    setParams,
    context,
    setContext,
  } = useChat();

  // UI Panels
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [paramsPanelOpen, setParamsPanelOpen] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    type: "all",
    provider: "any",
    nsfw: "any",
    license: "any",
    tags: "",
    sort: "relevance",
    curated: false,
    verified: false,
    query: "",
  });

  // Favorites
  const [favorites, setFavorites] = useState(new Set());

  const handleFavorite = (modelId) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(modelId) ? next.delete(modelId) : next.add(modelId);
      return next;
    });
  };

  const newChat = () => {
    setMessages([]);
    setContext("");
    toast.success("New chat started!");
  };

  const saveSession = () => {
    const session = { messages, selectedModel, params, context };
    localStorage.setItem("chatSession", JSON.stringify(session));
    toast.success("Session saved!");
  };

  const loadSession = () => {
    const sessionStr = localStorage.getItem("chatSession");
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      setMessages(session.messages || []);
      setSelectedModel(session.selectedModel || null);
      setParams(session.params || params);
      setContext(session.context || "");
      toast.success("Session loaded!");
    } else {
      toast.error("No saved session found.");
    }
  };

  const exportChat = () => {
    if (messages.length === 0) {
      toast.error("No chat to export.");
      return;
    }
    const chatText = messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join("\n\n---\n\n");
    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `metamix-chat-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Chat exported!");
  };

  const openSettings = () => {
    setParamsPanelOpen(!paramsPanelOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Providers / Types Dynamic Extraction
  const types = useMemo(() => {
    const setx = new Set(models.map((m) => m.type || "other"));
    return [...setx];
  }, [models]);

  const providers = useMemo(() => {
    const setx = new Set(models.map((m) => m.provider_suggestion || "hf-inference"));
    return [...setx];
  }, [models]);

  // Filtered models
  const filteredModels = useMemo(() => {
    let result = [...models];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (m) =>
          (m.title || "").toLowerCase().includes(q) ||
          (m.summary || "").toLowerCase().includes(q) ||
          (m.tags || []).some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (filters.type !== "all") {
      result = result.filter((m) => (m.type || "other") === filters.type);
    }

    if (filters.provider !== "any") {
      result = result.filter((m) =>
        (m.provider_suggestion || "").toLowerCase().includes(filters.provider)
      );
    }

    return result;
  }, [models, filters]);

  // Selecting a Model = update global context only (⭐)
  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">

      <TopBar 
        onNewChat={newChat}
        onSaveSession={saveSession}
        onLoadSession={loadSession}
        onExport={exportChat}
        onOpenSettings={openSettings}
        onToggleSidebar={toggleSidebar}
        hasActiveChat={messages.length > 0}
        models={models}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />

      <div className="flex-1 flex overflow-hidden">

        {/* Sidebar */}
        {sidebarOpen && (
          <ModelSidebar
            models={models}
            loading={modelsLoading}
            error={modelsError}
            filters={filters}
            setFilters={setFilters}
            onSelectModel={handleSelectModel}
            favorites={favorites}
            onFavorite={handleFavorite}
            providers={providers}
            types={types}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!selectedModel ? (
            <>
              <div className="p-6 bg-slate-900 border-b border-slate-700">
                <input
                  type="text"
                  placeholder="Search models..."
                  value={filters.query}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, query: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg"
                />
              </div>

              <div className="flex-1 overflow-y-auto">
                <ModelGrid
                  models={filteredModels}
                  loading={modelsLoading}
                  error={modelsError}
                  onSelectModel={handleSelectModel}
                  favorites={favorites}
                  onFavorite={handleFavorite}
                />
              </div>
            </>
          ) : (
            <ChatArea
              messages={messages}
              model={selectedModel}
              onSend={sendMessage}
              loading={loading}
            />
          )}
        </div>

        <ParameterPanel
          isOpen={paramsPanelOpen}
          onClose={() => setParamsPanelOpen(false)}
          params={params}
          setParams={setParams}
        />

      </div>
    </div>
  );
}
