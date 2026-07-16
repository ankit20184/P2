import { llm } from "../lib/llm";

export async function sqlGeneratorAgent(state: any) {
  const prompt = `
   You are an expert PostgreSQL engineer.

   Database Schema:
   ${JSON.stringify(state.schema, null, 2)}

  Question:
   ${state.question}
   
   Rules:

   - Only generate PostgreSQL SQL.
   - Never explain.
   - Never add markdown.
   - Use ONLY tables and columns from the schema.
   - Use quoted identifiers for camelCase columns.
   - Return only SQL.
   `;

  const response = await llm.invoke(prompt);
  console.log(response);
  return {
    sql: response.content.toString().trim(),
  };
}
