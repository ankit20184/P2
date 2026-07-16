import { AgentState } from "../state.js";

export async function plannerAgent(state: typeof AgentState.State) {
  console.log("Planner received:", state.question);

  return {
    intent: "sql",
  };
}
