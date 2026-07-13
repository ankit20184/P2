import { AgentState } from "../state";

export async function sqlGeneratorAgent(
  state: typeof AgentState.State
): Promise<Partial<typeof AgentState.State>> {

  return {
    ...state,

    sql: `
SELECT
p.name,
SUM(oi.quantity) AS total
FROM "OrderItem" oi
JOIN "Product" p
ON p.id=oi."productId"
GROUP BY p.name
ORDER BY total DESC;
`
  };
}