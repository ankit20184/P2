import { AgentState } from "../state";

export async function plannerAgent(
  state: typeof AgentState.State
) {
  console.log(
    "Planner received:",
    state.question)

  return {
     intent:"sql",
   // ...state,

  //  intent: "sales_analysis",

  //  tables: [
   //   "Order",
  //    "OrderItem",
   //   "Product"
  //  ]
  };
}