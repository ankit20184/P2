const API = "http://localhost:4000";

export async function askAI(question: string) {
  const res = await fetch(`${API}/ai/query`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      question,
    }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  return res.json();
}
