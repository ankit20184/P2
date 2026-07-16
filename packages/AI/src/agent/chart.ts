// import { llm } from "../lib/llm";

// export async function chartAgent(state: any) {
//   if (!state.rows?.length) {
//     return {
//       chart: {
//         type: "table",
//       },
//     };
//   }

//   const prompt = `
// You are a BI dashboard assistant.

// Question:
// ${state.question}

// SQL Result:
// ${JSON.stringify(state.rows)}

// Choose the best visualization.

// Available charts:
// - bar
// - line
// - pie
// - table

// Return ONLY valid JSON.

// Example:

// {
//   "type":"bar",
//   "xAxis":"name",
//   "yAxis":"total",
//   "title":"Products Sold"
// }
// `;

//   const response = await llm.invoke(prompt);

//   return {
//     chart: JSON.parse(response.content.toString()),
//   };
// }
import { llm } from "../lib/llm.js";

export async function chartAgent(state: any) {
  const rows = state.rows ?? [];
  const columns = state.columns ?? [];

  if (!rows.length) {
    return {
      chart: {
        type: "table",
        title: "No Data",
        columns: [],
      },
    };
  }

  // -------------------------
  // Find column types
  // -------------------------

  const numericColumns = columns.filter(
    (c: string) => typeof rows[0][c] === "number",
  );

  const stringColumns = columns.filter(
    (c: string) => typeof rows[0][c] === "string",
  );

  const dateColumns = columns.filter((c: string) => {
    const value = rows[0][c];
    return (
      value instanceof Date ||
      (typeof value === "string" && !isNaN(Date.parse(value)))
    );
  });

  // ======================================================
  // RULE 1
  // One column -> Table
  // ======================================================

  if (columns.length === 1) {
    return {
      chart: {
        type: "table",
        columns,
        title: state.question,
      },
    };
  }

  // ======================================================
  // RULE 2
  // Date + Number -> Line
  // ======================================================

  if (dateColumns.length && numericColumns.length) {
    return {
      chart: {
        type: "line",
        xAxis: dateColumns[0],
        yAxis: numericColumns[0],
        title: state.question,
      },
    };
  }

  // ======================================================
  // RULE 3
  // String + Number -> Bar
  // ======================================================

  if (stringColumns.length && numericColumns.length) {
    return {
      chart: {
        type: "bar",
        xAxis: stringColumns[0],
        yAxis: numericColumns[0],
        title: state.question,
      },
    };
  }

  // ======================================================
  // RULE 4
  // Too many columns -> Table
  // ======================================================

  if (columns.length > 5) {
    return {
      chart: {
        type: "table",
        columns,
        title: state.question,
      },
    };
  }

  // ======================================================
  // RULE 5
  // Ask Gemini only when needed
  // ======================================================

  const prompt = `
You are an expert Business Intelligence visualization assistant.

User Question:
${state.question}

SQL:
${state.sql}

Columns:
${JSON.stringify(columns)}

Rows:
${JSON.stringify(rows)}

Available chart types:
- bar
- line
- pie
- table

Rules:
- Use existing column names only.
- xAxis and yAxis MUST exactly match one of the columns.
- Never invent column names.
- Return ONLY JSON.

Example:

{
  "type":"bar",
  "xAxis":"name",
  "yAxis":"total",
  "title":"Products Sold"
}
`;

  try {
    const response = await llm.invoke(prompt);

    return {
      chart: JSON.parse(response.content.toString()),
    };
  } catch (err) {
    console.error(err);

    return {
      chart: {
        type: "table",
        columns,
        title: state.question,
      },
    };
  }
}
