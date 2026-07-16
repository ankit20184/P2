import { llm } from "../lib/llm";

export async function chartAgent(state: any) {
  if (!state.rows?.length) {
    return {
      chart: {
        type: "table",
      },
    };
  }

  const prompt = `
You are a BI dashboard assistant.

Question:
${state.question}

SQL Result:
${JSON.stringify(state.rows)}

Choose the best visualization.

Available charts:
- bar
- line
- pie
- table

Return ONLY valid JSON.

Example:

{
  "type":"bar",
  "xAxis":"name",
  "yAxis":"total",
  "title":"Products Sold"
}
`;

  const response = await llm.invoke(prompt);

  return {
    chart: JSON.parse(response.content.toString()),
  };
}
