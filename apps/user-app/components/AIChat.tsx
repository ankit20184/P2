"use client";

import { useState } from "react";
import { askAI } from "../lib/api";
import ChartRenderer from "./ChartRenderer";

export default function AIChat() {
  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>();

  async function submit() {
    if (!question.trim()) return;

    setLoading(true);

    const data = await askAI(question);

    setResult(data);

    setLoading(false);
  }

  return (
    <div>
      <h1>AI Analytics</h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything..."
      />

      <button onClick={submit}>Ask AI</button>

      {loading && <p>Thinking...</p>}

      {result && (
        <>
          <h3>{result.explanation}</h3>

          <ChartRenderer chart={result.chart} rows={result.rows} />

          <pre>{result.sql}</pre>
        </>
      )}
    </div>
  );
}
