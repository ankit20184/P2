import { any } from "zod/v4";
import { prisma } from "../../../db/src/index";
import { AgentState } from "../state";

export async function executeSQLAgent(
  state: typeof AgentState.State
):Promise<Partial<typeof AgentState.State>> {

  if (!state.sqlValid) {

    return {
      ...state,
     
    };

  }
  console.log("EXECUTING SQL:");
  console.log(state.sql);
  const rows =
    await prisma.$queryRawUnsafe(
      state.sql!
    );

  return {
    ...state,

    rows
  };

}