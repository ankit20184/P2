import { prisma } from "@repo/db";
import { AgentState } from "../state.js";

export async function executeSQLAgent(
  state: typeof AgentState.State,
): Promise<Partial<typeof AgentState.State>> {
  if (!state.sqlValid) {
    return {
      ...state,
    };
  }
  console.log("EXECUTING SQL:");
  console.log(state.sql);
  // const rows = await prisma.$queryRawUnsafe(state.sql);
  console.log("Database Result:");
  const rows = normalizeSQLResult(await prisma.$queryRawUnsafe(state.sql));
  console.log(rows);
  const columns = rows.length ? Object.keys(rows[0]) : [];

  return {
    ...state,

    rows: normalizeSQLResult(rows),
    metadata: {
      rowCount: rows.length,
      columns,
    },
  };
}
function normalizeSQLResult(rows: any[]) {
  return rows.map((row) => {
    const newRow: any = {};

    for (const key in row) {
      const value = row[key];

      newRow[key] = typeof value === "bigint" ? Number(value) : value;
    }

    return newRow;
  });
}
