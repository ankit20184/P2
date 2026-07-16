import { Annotation } from "@langchain/langgraph";

export const AgentState = Annotation.Root({
  question: Annotation<string>({
    reducer: (a, b) => b ?? a,
    default: () => "",
  }),

  intent: Annotation<string>({
    reducer: (a, b) => b ?? a,
    default: () => "",
  }),

  tables: Annotation<string[]>({
    reducer: (a, b) => b ?? a,
    default: () => [],
  }),

  sql: Annotation<string>({
    reducer: (a, b) => b ?? a,
    default: () => "",
  }),

  sqlValid: Annotation<boolean>({
    reducer: (a, b) => b ?? a,
    default: () => false,
  }),

  rows: Annotation<any[]>({
    reducer: (a, b) => b ?? a,
    default: () => [],
  }),

  explanation: Annotation<string>({
    reducer: (a, b) => b ?? a,
    default: () => "",
  }),
  schema: Annotation<any[]>({
    reducer: (a, b) => b ?? a,
    default: () => [],
  }),
  chart: Annotation<any>({
    reducer: (a, b) => b ?? a,
    default: () => null,
  }),
});
