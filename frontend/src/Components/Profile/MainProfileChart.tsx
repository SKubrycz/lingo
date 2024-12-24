import { LineChart } from "@mui/x-charts";

import { defaultTheme } from "../../defaultTheme";
import { Stats } from "./Profile";

interface MainProfileChartProps {
  stats: Stats;
}

export default function MainProfileChart({ stats }: MainProfileChartProps) {
  const today = new Date(Date.now());
  let tempDate = new Date();

  const dataset = [
    {
      date: new Date(tempDate.setDate(today.getDate() - 6)),
      count: (stats?.timestamps && typeof stats?.timestamps === "number") ? stats?.timestamps[6] : 0,
    },
    {
      date: new Date(tempDate.setDate(today.getDate() - 5)),
      count: (stats?.timestamps && typeof stats?.timestamps === "number") ? stats?.timestamps[5] : 0,
    },
    {
      date: new Date(tempDate.setDate(today.getDate() - 4)),
      count: (stats?.timestamps && typeof stats?.timestamps === "number") ? stats?.timestamps[4] : 0,
    },
    {
      date: new Date(tempDate.setDate(today.getDate() - 3)),
      count: (stats?.timestamps && typeof stats?.timestamps === "number") ? stats?.timestamps[3] : 0,
    },
    {
      date: new Date(tempDate.setDate(today.getDate() - 2)),
      count: (stats?.timestamps && typeof stats?.timestamps === "number") ? stats?.timestamps[2] : 0,
    },
    {
      date: new Date(tempDate.setDate(today.getDate() - 1)),
      count: (stats?.timestamps && typeof stats?.timestamps === "number") ? stats?.timestamps[1] : 0,
    },
    { date: today, count: (stats?.timestamps && typeof stats?.timestamps === "number") ? stats?.timestamps[0] : 0 },
  ];

  const valueFormatter = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <LineChart
      dataset={dataset}
      xAxis={[
        {
          dataKey: "date",
          label: "Data",
          scaleType: "point",
          valueFormatter,
        },
      ]}
      yAxis={[{ label: "Ilość ukończonych lekcji", min: 0 }]}
      series={[
        {
          dataKey: "count",
          curve: "linear",
          color: defaultTheme.palette.primary.contrastText,
        },
      ]}
      height={500}
      slotProps={{
        popper: {
          sx: {
            "& .MuiChartsTooltip-table": {
              borderRadius: "5px",
              backgroundColor: "primary.light",
              boxShadow: "0px 2px 5px gray",
            },
            "& .MuiChartsTooltip-mark": {
              border: "2px solid",
              borderColor: "primary.contrastText",
            },
          },
        },
      }}
      sx={{
        minWidth: 350,
        ".MuiMarkElement-root": {
          fill: defaultTheme.palette.primary.contrastText,
        },
      }}
    ></LineChart>
  );
}
