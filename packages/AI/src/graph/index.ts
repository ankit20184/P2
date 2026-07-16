import { AgentState } from "../state.js";
import { plannerAgent } from "../agent/planner.js";
import { sqlGeneratorAgent } from "../agent/sql-generator.js";
import { sqlValidatorAgent } from "../agent/sqlValidato.js";
import { executeSQLAgent } from "../agent/db.js";
import { chartAgent } from "../agent/chart.js";
import { insightAgent } from "../agent/insight.js";
import { schemaAgent } from "../agent/schema.js";
import { StateGraph, START, END } from "@langchain/langgraph";

const graph = new StateGraph(AgentState)
  .addNode("planner_node", plannerAgent)
  .addNode("schema_node", schemaAgent)
  .addNode("sql_generated_node", sqlGeneratorAgent)
  .addNode("validator_node", sqlValidatorAgent)
  .addNode("execute_node", executeSQLAgent)
  .addNode("chart_node", chartAgent)
  .addNode("insight_node", insightAgent)
  .addEdge(START, "planner_node")
  .addEdge("planner_node", "schema_node")
  .addEdge("schema_node", "sql_generated_node")
  .addEdge("sql_generated_node", "validator_node")
  .addEdge("validator_node", "execute_node")
  .addEdge("execute_node", "chart_node")
  .addEdge("chart_node", "insight_node")
  .addEdge("insight_node", END);

export const workflow = graph.compile();
