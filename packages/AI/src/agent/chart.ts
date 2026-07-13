import { AgentState } from "../state";

export async function chartAgent(
  state: typeof AgentState.State
):Promise<Partial<typeof AgentState.State>>{
  return {
    ...state,
   
  };
}