export interface AIResponse {
  question: string;

  sql: string;

  rows: any[];

  chart: {
    type: "bar" | "line" | "pie" | "table";

    xAxis: string;

    yAxis: string;

    title: string;
  };

  explanation: string;
}
