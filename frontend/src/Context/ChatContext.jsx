import { createContext, useContext, useState } from "react";
import api from "../api"; // axios instance

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    temperature: 0.7,
    top_p: 0.9,
    top_k: 40,
    frequency_penalty: 0,
    max_tokens: 1000,
  });

  const [context, setContext] = useState(""); // Stores extracted file text

  const sendMessage = async (prompt) => {
    if (!selectedModel) return;
    if (!prompt.trim()) return;

    const now = new Date().toISOString();

    // add user message to UI instantly
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: prompt,
      timestamp: now,
      hasContext: !!context, // Indicator for UI
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // build history for backend
    const history = messages.map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));

    try {
      const res = await api.post("/api/ai/chat", {
        modelId: selectedModel.id,
        prompt,
        history,
        params,
        context, // Send extracted text
        saveToDB: true,
      });

      const replyText = res.data?.content || "No response";

      const assistantMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        text: replyText,
        timestamp: new Date().toISOString(),
        model: selectedModel.title || selectedModel.name || selectedModel.id, // which model replied
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        text: "⚠️ Error contacting AI server.",
        timestamp: new Date().toISOString(),
        model: "system",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        selectedModel,
        setSelectedModel,
        sendMessage,
        loading,
        params,
        setParams,
        context,
        setContext,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
