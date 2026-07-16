import { any } from "zod/v4";
import { prisma } from "../../../db/src/index";
import { AgentState } from "../state";

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
  const rows = await prisma.$queryRawUnsafe(state.sql);
  console.log("Database Result:");
  console.log(rows);

  return {
    ...state,

    rows: normalizeSQLResult(rows),
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
