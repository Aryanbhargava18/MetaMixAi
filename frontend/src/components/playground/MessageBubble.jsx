import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { User, Copy, Check, Zap } from "lucide-react";
import logo from "../../assets/logo.png";

export default function MessageBubble({
  message,
  onCopy,
  onRegenerate,
  modelAvatar
}) {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "justify-end" : "justify-start"
      } group animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`flex gap-3 max-w-[85%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isUser && (
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 border-2 border-indigo-500/50 shadow-lg">
            {modelAvatar ? (
              <img
                src={modelAvatar}
                alt="Model"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = logo;
                }}
              />
            ) : (
              <img
                src={logo}
                alt="MetaMix"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}

        {isUser && (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0 border-2 border-slate-600/50 shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
        )}

        <div
          className={`flex flex-col gap-2 ${
            isUser ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`rounded-2xl px-4 py-3 ${
              isUser
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "bg-slate-800 text-slate-100 border border-slate-700"
            }`}
          >
            {isUser ? (
              <div className="whitespace-pre-wrap break-words">
                {message.text}
              </div>
            ) : (
              <div className="markdown-content">
                <ReactMarkdown
                  components={{
                    code: ({ inline, className, children, ...props }) => {
                      return !inline ? (
                        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto my-2">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      ) : (
                        <code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm">
                          {children}
                        </code>
                      );
                    },
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-2 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-2 space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="ml-4">{children}</li>,
                    h1: ({ children }) => (
                      <h1 className="text-xl font-bold mb-2 mt-4 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-lg font-bold mb-2 mt-3 first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base font-bold mb-2 mt-2 first:mt-0">
                        {children}
                      </h3>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-2 text-slate-300">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 underline"
                      >
                        {children}
                      </a>
                    )
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
  <span className="text-xs text-slate-500">
    {new Date(message.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })}
  </span>

  {!isUser && message.model && (
    <span className="text-[10px] text-indigo-400 font-semibold">
      {message.model}
    </span>
  )}


            {!isUser && (
              <>
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                <button
                  onClick={() => onRegenerate?.(message)}
                  className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                >
                  <Zap className="w-4 h-4 text-slate-400" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
