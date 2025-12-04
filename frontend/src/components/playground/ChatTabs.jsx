import React from "react";
import { X, Plus } from "lucide-react";

export default function ChatTabs({
  chats,
  activeChatId,
  onSwitch,
  onNewChat,
  onCloseChat
}) {
  return (
    <div className="border-b border-slate-700 bg-slate-900 overflow-x-auto flex items-center px-2 gap-1 h-12">
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSwitch(chat.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            chat.id === activeChatId
              ? "bg-indigo-600 text-white shadow"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <span className="truncate max-w-[140px]">{chat.title}</span>

          <X
            onClick={(e) => {
              e.stopPropagation();
              onCloseChat(chat.id);
            }}
            className="w-4 h-4 text-slate-300 hover:text-white"
          />
        </button>
      ))}

      {/* New Chat Tab */}
      <button
        onClick={onNewChat}
        className="p-2 ml-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}
