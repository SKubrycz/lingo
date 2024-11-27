import { LineChart } from "@mui/x-charts";

import { defaultTheme } from "../../defaultTheme";

export default function MainProfileChart() {
  const dataset = [
    { date: new Date(2024, 7, 1), count: 1 },
    { date: new Date(2024, 7, 2), count: 2 },
    { date: new Date(2024, 7, 3), count: 4 },
    { date: new Date(2024, 7, 4), count: 5 },
    { date: new Date(2024, 7, 5), count: 2 },
    { date: new Date(2024, 7, 6), count: 8 },
    { date: new Date(2024, 7, 7), count: 7 },
  ];

  const valueFormatter = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <LineChart
      dataset={dataset}
      xAxis={[
        {
          dataKey: "date",
          scaleType: "point",
          valueFormatter,
        },
      ]}
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
              borderRadius: "2px",
              backgroundColor: "primary.light",
              boxShadow: "0px 2px 5px gray",
            },
          },
        },
      }}
      sx={{
        ".MuiMarkElement-root": {
          fill: defaultTheme.palette.primary.contrastText,
        },
      }}
    ></LineChart>
  );
}
