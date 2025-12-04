import React, { useState, useRef } from "react";
import { SendHorizontal, Paperclip, X, FileText } from "lucide-react";
import api from "../../api";
import { useChat } from "../../Context/ChatContext";
import toast from "react-hot-toast";

export default function ChatInput({
  onSend = () => {},
  disabled = false,
}) {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  const { context, setContext } = useChat();

  const safeInput = input || ""; // avoid undefined crash

  const handleKeyDown = (e) => {
    if (isComposing) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && safeInput.trim() !== "") {
        onSend(safeInput);
        setInput("");
      }
    }
  };

  const handleSend = () => {
    if (disabled) return;
    if (safeInput.trim() === "") return;

    onSend(safeInput);
    setInput("");
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    const toastId = toast.loading("Uploading & extracting text...");

    try {
      const res = await api.post("/api/ai/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setContext(res.data.text);
        toast.success("File context added!", { id: toastId });
      } else {
        toast.error("Failed to process file", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed", { id: toastId });
    } finally {
      setUploading(false);
      // Reset input so same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const clearContext = () => {
    setContext("");
    toast.success("Context cleared");
  };

  return (
    <div className="flex flex-col bg-slate-900 border-t border-slate-700">
      {/* Context Indicator */}
      {context && (
        <div className="px-4 py-2 bg-indigo-900/30 border-b border-indigo-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-300 text-sm">
            <FileText className="w-4 h-4" />
            <span className="truncate max-w-xs">File context attached ({context.length} chars)</span>
          </div>
          <button 
            onClick={clearContext}
            className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="p-4 flex items-end gap-3">
        {/* File Upload Button */}
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.txt,.md,.csv" // Add more types as needed
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || uploading}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700"
            title="Attach file context"
          >
            {uploading ? (
              <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Paperclip className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="relative flex-1">
          <textarea
            value={safeInput}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            rows={1}
            placeholder={context ? "Ask about the file..." : "Send a message..."}
            className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 focus:border-indigo-500 transition-colors rounded-lg px-4 py-3 text-white resize-none outline-none"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={disabled || safeInput.trim() === ""}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-lg"
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
