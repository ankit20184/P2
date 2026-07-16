export async function sqlValidatorAgent(state: any) {
  const sql = state.sql.trim();

  const forbidden = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE"];

  const upper = sql.toUpperCase();

  for (const word of forbidden) {
    if (upper.includes(word)) {
      throw new Error(`Forbidden SQL detected: ${word}`);
    }
  }

  if (!upper.startsWith("SELECT")) {
    throw new Error("Only SELECT queries are allowed.");
  }

  return {
    sqlValid: true,
  };
}
