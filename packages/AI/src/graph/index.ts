import { AgentState } from "../state";
import { plannerAgent } from "../agent/planner";
import { sqlGeneratorAgent } from "../agent/sql-generator";
import { sqlValidatorAgent } from "../agent/sqlValidato";
import { executeSQLAgent } from "../agent/db";
import { chartAgent } from "../agent/chart";
import { insightAgent } from "../agent/insight";

import { StateGraph, START, END } from "@langchain/langgraph";

const graph = new StateGraph(AgentState)
  .addNode("planner_node", plannerAgent)
  .addNode("sql_generated_node", sqlGeneratorAgent)
  .addNode("validator_node", sqlValidatorAgent)
  .addNode("execute_node", executeSQLAgent)
  .addNode("chart_node", chartAgent)
  .addNode("insight_node", insightAgent)
  .addEdge(START, "planner_node")
  .addEdge("planner_node", "sql_generated_node")
  .addEdge("sql_generated_node", "validator_node")
  .addEdge("validator_node", "execute_node")
  .addEdge("execute_node", "chart_node")
  .addEdge("chart_node", "insight_node")
  .addEdge("insight_node", END);

export const workflow = graph.compile();