import { AgentState } from "../state";

const blocked = [
  "DELETE",
  "DROP",
  "UPDATE",
  "INSERT",
  "ALTER",
  "TRUNCATE"
];

export async function sqlValidatorAgent(
  state:typeof AgentState.State
): Promise<Partial<typeof AgentState.State>> {

  const sql = state.sql?.toUpperCase() ?? "";

  const valid =
    !blocked.some(word =>
      sql.includes(word)
    );

  return {
    ...state,

    sqlValid: valid
  };
}