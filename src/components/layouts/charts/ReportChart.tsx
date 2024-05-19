import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./ReportChart.css";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

export default function ReportChart() {
  return (
    <div className="chart-border">
      <LineChart
        width={500}
        height={300}
        series={[
          { data: pData, label: "pv", color: "#FF6347" },
          { data: uData, label: "uv", color: "#90EE90" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
}
