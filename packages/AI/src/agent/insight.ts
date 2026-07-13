import { AgentState } from "../state";

export async function insightAgent(
  state: typeof AgentState.State
):  Promise<Partial<typeof AgentState.State>> {
  return {
    ...state,
    explanation:
      "Products are ranked by total quantity sold.",
  };
}