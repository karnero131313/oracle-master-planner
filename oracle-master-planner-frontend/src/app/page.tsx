"use client";

import { useState } from "react";

// Define types for our data structures
interface Hexagram {
  name: string;
  judgement: string;
  image: string;
}

interface DivinationResult {
  question: string;
  primary_hexagram: Hexagram;
  changing_lines: number[];
  future_hexagram: Hexagram | null;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<DivinationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCast = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/v1/divine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        throw new Error("The Oracle is silent at this moment.");
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      // Here you could set an error state to display to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-slate-300 font-serif">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-center">
        {!result && (
          <>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] font-sans">
              The Oracle
            </h1>
            <p className="text-2xl text-slate-400">
              Quiet your mind, and ask.
            </p>
            <div className="w-full max-w-lg">
              <textarea
                className="w-full rounded-md border border-slate-700 bg-slate-800 p-4 text-lg text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows={4}
                placeholder="What weighs on your mind?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={isLoading}
              />
              <button
                className="mt-4 rounded-md bg-amber-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-amber-500 font-sans disabled:opacity-50"
                onClick={handleCast}
                disabled={isLoading}
              >
                {isLoading ? "Casting..." : "Cast the Reading"}
              </button>
            </div>
          </>
        )}

        {result && (
          <div className="w-full max-w-2xl animate-fade-in">
            <h2 className="text-lg text-slate-400">Your Question:</h2>
            <p className="text-xl text-white mb-8">"{result.question}"</p>
            
            <h3 className="text-3xl font-bold text-amber-400">{result.primary_hexagram.name}</h3>
            <p className="text-xl text-slate-300 mt-2 mb-4">"{result.primary_hexagram.judgement}"</p>
            <p className="text-md text-slate-400 italic mb-8">{result.primary_hexagram.image}</p>

            {result.future_hexagram && (
              <>
                <p className="text-amber-500 mb-4">Changing lines on {result.changing_lines.join(', ')} lead to...</p>
                <h3 className="text-3xl font-bold text-amber-400">{result.future_hexagram.name}</h3>
                <p className="text-xl text-slate-300 mt-2 mb-4">"{result.future_hexagram.judgement}"</p>
                <p className="text-md text-slate-400 italic mb-8">{result.future_hexagram.image}</p>
              </>
            )}
            
            <button
              className="mt-8 rounded-md bg-slate-700 px-8 py-3 text-lg font-semibold text-white transition hover:bg-slate-600 font-sans"
              onClick={() => {
                setResult(null);
                setQuestion("");
              }}
            >
              Ask Another Question
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

