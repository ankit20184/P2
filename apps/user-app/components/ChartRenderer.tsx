"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Props {
  chart: any;

  rows: any[];
}

export default function ChartRenderer({ chart, rows }: Props) {
  if (!chart) return null;

  if (chart.type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={rows}>
          <XAxis dataKey={chart.xAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={chart.yAxis} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "line") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={rows}>
          <XAxis dataKey={chart.xAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey={chart.yAxis} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={rows} dataKey={chart.yAxis} nameKey={chart.xAxis} label>
            {rows.map((_, index) => (
              <Cell key={index} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(rows[0] || {}).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row: any, index: number) => (
          <tr key={index}>
            {Object.values(row).map((value: any, i) => (
              <td key={i}>{String(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
