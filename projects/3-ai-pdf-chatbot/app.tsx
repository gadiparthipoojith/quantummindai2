"use client";

import React, { useState } from "react";
import { Bot, FileText, Send, Upload, Loader2, Sparkles, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sourcePages?: number[];
}

export default function PDFChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hi! Upload a PDF document and I will help you extract insights, answer questions, or summarize content." }
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    // Simulate RAG vector indexing
    setTimeout(() => {
      setUploading(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: `Successfully indexed '${file.name}' (${Math.round(file.size / 1024)} KB) into vector store. Ask me anything about this document!` }
      ]);
    }, 2000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Based on Page 4 of the document, the company's operating revenue increased by 14% year-over-year, driven by enterprise subscriptions.",
          sourcePages: [4]
        }
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <header className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-cyan-400" />
            <h1 className="text-xl font-bold">Aether PDF RAG Chatbot</h1>
          </div>
          <span className="text-xs text-zinc-500">FastAPI + Pinecone Vector Store</span>
        </header>

        <div className="grid gap-6 md:grid-cols-4 flex-1">
          {/* File Upload Panel */}
          <div className="md:col-span-1 glass border-zinc-800 rounded-xl p-4 h-fit space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Upload PDF</h3>
            <div className="border border-dashed border-zinc-850 rounded-lg p-4 text-center cursor-pointer hover:border-zinc-700 transition">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="pdf-upload"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label htmlFor="pdf-upload" className="cursor-pointer space-y-2 block">
                <Upload className="h-6 w-6 text-zinc-500 mx-auto" />
                <span className="text-xxs text-zinc-400 block">
                  {file ? file.name : "Select PDF Document"}
                </span>
              </label>
            </div>
            {file && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg py-2 text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Chunking...
                  </>
                ) : (
                  "Index Document"
                )}
              </button>
            )}
          </div>

          {/* Chat Window */}
          <div className="md:col-span-3 glass border-zinc-800 rounded-xl p-6 flex flex-col justify-between h-[450px]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-6 ${
                    msg.role === "user"
                      ? "ml-auto bg-cyan-950/30 border border-cyan-900/40 text-cyan-250"
                      : "bg-zinc-900/80 border border-zinc-800/80 text-zinc-300"
                  }`}
                >
                  <p>{msg.content}</p>
                  {msg.sourcePages && (
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-xxs uppercase tracking-wider text-cyan-400 font-semibold">Citations:</span>
                      {msg.sourcePages.map((page) => (
                        <span key={page} className="text-xxs bg-cyan-900/40 border border-cyan-850 px-1.5 py-0.5 rounded text-cyan-300 font-mono">
                          Page {page}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-zinc-500 italic pl-2">
                  <Loader2 className="h-3 w-3 animate-spin text-cyan-400" />
                  Searching vector indexes and generating response...
                </div>
              )}
            </div>

            <div className="flex gap-2 border-t border-zinc-800 pt-4 mt-4">
              <input
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                placeholder="Ask about your document..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg px-4 py-2 text-sm transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
