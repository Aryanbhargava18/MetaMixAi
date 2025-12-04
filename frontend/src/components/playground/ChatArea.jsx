



import React, { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { Loader2, Sparkles } from "lucide-react";
import logo from "../../assets/logo.png";

export default function ChatArea({
  messages = [],
  model,
  onSend,
  loading
}) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ❗ If no model selected
  if (!model) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Welcome to MetaMix Playground
          </h3>
          <p className="text-slate-400">Select a model to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-auto p-6 scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4 border-4 border-indigo-500/50 shadow-xl">
                {model?.avatar || model?.image ? (
                  <img
                    src={model.avatar || model.image}
                    alt={model.title || model.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = logo)}
                  />
                ) : (
                  <img src={logo} alt="model" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                Chat with {model?.title || model?.name}
              </h3>

              <p className="text-slate-400 mb-6">Ask something to get started.</p>

              {/* Suggestion Buttons */}
              <div className="grid grid-cols-2 gap-3 text-left">
                {[
                  "Write a Python function",
                  "Generate creative ideas",
                  "Debug this code",
                  "Summarize this article",
                  "Create a story",
                  "Translate to French",
                  "Analyze this data"
                ].map(
                  (t, i) => (
                    <button
                      key={i}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-all hover:scale-[1.03] text-left"
                    >
                      {t}
                    </button>
                  )
                )}
              </div>
 
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg, i) => (
              <MessageBubble
                key={i}
                message={msg}
                modelAvatar={model?.avatar || model?.image}
              />
            ))}

            {/* Loading bubble */}
            {loading && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center border-2 border-indigo-500/50 shadow-lg">
                  <img
                    src={model?.avatar || model?.image || logo}
                    onError={(e) => (e.target.src = logo)}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 rounded-2xl border border-slate-700">
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span className="text-slate-400 text-sm">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput onSend={onSend} disabled={loading} selectedModel={model} />
    </div>
  );
}
