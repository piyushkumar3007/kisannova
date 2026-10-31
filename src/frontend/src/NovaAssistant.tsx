
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Languages,
  MessageCircle,
  Send,
  Sprout,
  X,
  ImagePlus,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
};

const LANGUAGES = [
  "Auto-detect",
  "English",
  "Hindi",
  "Gujarati",
  "Punjabi",
  "Marathi",
  "Tamil",
  "Telugu",
  "Bengali",
];

const SUGGESTIONS = [
  "How can I protect my crops from pests?",
  "Why are my plant leaves turning yellow?",
  "How can I improve soil health?",
];

const GREETING =
  "Namaste! I'm Nova, your agricultural assistant. Ask me about crop care, soil health, irrigation, or pest management.";

export default function NovaAssistant() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("Auto-detect");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: GREETING },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading, open]);

  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImage]);

  async function sendMessage(text = input) {
    const question = text.trim();
    const imageFile = selectedImage;

    if ((!question && !imageFile) || loading) return;

    if (imageFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(imageFile.type)) {
        setMessages((current) => [
          ...current,
          { role: "assistant", content: "Please upload a JPG, PNG, or WebP image." },
        ]);
        return;
      }
      if (imageFile.size > 5 * 1024 * 1024) {
        setMessages((current) => [
          ...current,
          { role: "assistant", content: "Please choose an image smaller than 5 MB." },
        ]);
        return;
      }
    }

    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : undefined;
    const userQuestion = question || "Please analyze this crop image.";

    setMessages((current) => [
      ...current,
      { role: "user", content: userQuestion, imageUrl },
    ]);
    setInput("");
    setSelectedImage(null);
    setLoading(true);

    try {
      const formData = new FormData();
formData.append("message", question);
formData.append("language", language);

if (imageFile) {
  formData.append("image", imageFile);
}

const response = await fetch("http://localhost:3001/api/chat", {
  method: "POST",
  body: formData,
});

      let data: { reply?: string; error?: string } = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        const reason = data.error || `The AI service returned an error (HTTP ${response.status}).`;
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: `I'm sorry, Nova couldn't answer that right now.\n\n**Reason:** ${reason}\n\nPlease try again in a little while.`,
          },
        ]);
        return;
      }

      const reply =
        typeof data.reply === "string" && data.reply.trim()
          ? data.reply
          : "I'm sorry, Nova couldn't generate an answer this time. Please try again.";
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "I'm sorry, I couldn't reach Nova's server. Please check that the backend is running, then try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <section
          className="fixed bottom-24 right-4 z-[100] flex h-[min(640px,calc(100dvh-7rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-emerald-900/15 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:right-6"
          aria-label="Nova AI chat"
        >
          <header className="flex items-center gap-3 bg-[#164b35] px-4 py-4 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <Sprout className="h-6 w-6" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold">Nova AI</h2>
              <p className="text-xs text-white/80">
                Nova farming assistant
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Nova chat"
              className="rounded-full p-2 hover:bg-white/15"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex items-center gap-2 border-b bg-emerald-50 px-3 py-2 text-sm text-slate-800">
            <Languages className="h-4 w-4 shrink-0 text-emerald-800" />

            <label htmlFor="Nova-language" className="sr-only">
              Response language
            </label>

            <select
              id="Nova-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="w-full bg-transparent py-1 font-medium outline-none"
            >
              {LANGUAGES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7faf7] p-3">
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "whitespace-pre-wrap rounded-br-md bg-[#246847] text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-800 shadow-sm"
                  }`}
                >
                  {message.imageUrl && (
                    <img
                      src={message.imageUrl}
                      alt="Crop uploaded for analysis"
                      className="mb-2 max-h-56 w-full rounded-xl object-contain"
                    />
                  )}
                  {message.role === "assistant" && (
                    <Bot className="mb-1 mr-1 inline h-4 w-4 text-emerald-800" />
                  )}

                  {message.role === "assistant" ? (
                    <div className="Nova-markdown mt-1">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        skipHtml
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),

                          ul: ({ children }) => (
                            <ul className="mb-2 list-disc space-y-1 pl-5">
                              {children}
                            </ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="mb-2 list-decimal space-y-1 pl-5">
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => <li>{children}</li>,

                          h1: ({ children }) => (
                            <h3 className="mb-2 mt-3 text-base font-bold">
                              {children}
                            </h3>
                          ),

                          h2: ({ children }) => (
                            <h3 className="mb-2 mt-3 text-sm font-bold">
                              {children}
                            </h3>
                          ),

                          h3: ({ children }) => (
                            <h3 className="mb-1 mt-2 text-sm font-bold">
                              {children}
                            </h3>
                          ),

                          strong: ({ children }) => (
                            <strong className="font-bold">{children}</strong>
                          ),

                          em: ({ children }) => <em>{children}</em>,

                          hr: () => (
                            <hr className="my-3 border-slate-200" />
                          ),

                          blockquote: ({ children }) => (
                            <blockquote className="my-2 border-l-2 border-emerald-600 pl-3 text-slate-600">
                              {children}
                            </blockquote>
                          ),

                          code: ({ children }) => (
                            <code className="break-words rounded bg-slate-100 px-1 py-0.5 text-[0.9em]">
                              {children}
                            </code>
                          ),

                          pre: ({ children }) => (
                            <pre className="my-2 overflow-x-auto rounded-lg bg-slate-100 p-3 text-xs">
                              {children}
                            </pre>
                          ),

                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-700 underline underline-offset-2"
                            >
                              {children}
                            </a>
                          ),

                          table: ({ children }) => (
                            <div className="my-2 overflow-x-auto">
                              <table className="w-full border-collapse text-left text-xs">
                                {children}
                              </table>
                            </div>
                          ),

                          th: ({ children }) => (
                            <th className="border border-slate-200 bg-emerald-50 px-2 py-1.5 font-semibold">
                              {children}
                            </th>
                          ),

                          td: ({ children }) => (
                            <td className="border border-slate-200 px-2 py-1.5">
                              {children}
                            </td>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2 pt-1">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => void sendMessage(suggestion)}
                    className="block w-full rounded-xl border border-emerald-200 bg-white px-3 py-2.5 text-left text-sm text-emerald-950 transition hover:border-emerald-500 hover:bg-emerald-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div
                className="text-sm text-slate-600"
                role="status"
                aria-live="polite"
              >
                Nova is thinking…
              </div>
            )}

            <div ref={endRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage();
            }}
            className="flex items-end gap-2 border-t bg-white p-3"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              aria-label="Choose a crop image"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                setSelectedImage(file);
                event.target.value = "";
              }}
            />

            {selectedImage && imagePreview && (
              <div className="absolute bottom-20 right-3 z-10 w-40 rounded-xl border border-emerald-200 bg-white p-2 shadow-lg">
                <img
                  src={imagePreview}
                  alt="Selected crop preview"
                  className="h-24 w-full rounded-lg object-contain"
                />
                <p className="mt-1 truncate text-xs text-slate-600">
                  {selectedImage.name}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="mt-1 text-xs font-medium text-red-600"
                >
                  Remove image
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              aria-label="Upload crop image"
              title="Upload crop image"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200 text-emerald-800 transition hover:bg-emerald-50 disabled:opacity-40"
            >
              <ImagePlus className="h-5 w-5" />
            </button>

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage();
                }
              }}
              rows={1}
              maxLength={4000}
              placeholder="Ask Nova about your crops…"
              aria-label="Message Nova"
              className="max-h-28 min-h-11 flex-1 resize-y rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
            />

            <button
              type="submit"
              disabled={(!input.trim() && !selectedImage) || loading}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#246847] text-white transition hover:bg-[#164b35] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={
          open ? "Close Nova AI assistant" : "Open Nova AI assistant"
        }
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[101] flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#246847] text-white shadow-[0_8px_30px_rgba(15,75,47,0.45)] transition duration-200 hover:scale-105 hover:bg-[#164b35] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
        data-ocid="Nova.open_button"
      >
        <span className="absolute inset-0 animate-ping rounded-full border-2 border-emerald-300/80 opacity-30" />

        {open ? (
          <X className="relative h-7 w-7" />
        ) : (
          <span className="relative flex flex-col items-center">
            <MessageCircle className="h-6 w-6" />
            <span className="mt-0.5 text-[9px] font-bold tracking-wide">
              Nova AI
            </span>
          </span>
        )}
      </button>
    </>
  );
}
