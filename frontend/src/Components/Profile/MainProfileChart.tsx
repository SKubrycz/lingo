import { LineChart } from "@mui/x-charts";

import { defaultTheme } from "../../defaultTheme";
import { Stats } from "./Profile";
import { useEffect, useState } from "react";

interface Labels {
  x: string;
  y: string;
}

interface MainProfileChartProps {
  stats: Stats | undefined;
  languageData: any;
}

const dateFromNow = (days: number) => {
  const today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);
  const DAY = 1000 * 60 * 60 * 24;

  return new Date(today.getTime() - DAY * days);
};

export default function MainProfileChart({
  stats,
  languageData,
}: MainProfileChartProps) {
  const [labels, setLabels] = useState<Labels>({
    y: "Ilość ukończonych lekcji",
    x: "Data",
  });

  const dataset = [
    {
      date: dateFromNow(6),
      count:
        stats?.timestamps && typeof stats?.timestamps[6] === "number"
          ? stats?.timestamps[6]
          : 0,
    },
    {
      date: dateFromNow(5),
      count:
        stats?.timestamps && typeof stats?.timestamps[5] === "number"
          ? stats?.timestamps[5]
          : 0,
    },
    {
      date: dateFromNow(4),
      count:
        stats?.timestamps && typeof stats?.timestamps[4] === "number"
          ? stats?.timestamps[4]
          : 0,
    },
    {
      date: dateFromNow(3),
      count:
        stats?.timestamps && typeof stats?.timestamps[3] === "number"
          ? stats?.timestamps[3]
          : 0,
    },
    {
      date: dateFromNow(2),
      count:
        stats?.timestamps && typeof stats?.timestamps[2] === "number"
          ? stats?.timestamps[2]
          : 0,
    },
    {
      date: dateFromNow(1),
      count:
        stats?.timestamps && typeof stats?.timestamps[1] === "number"
          ? stats?.timestamps[1]
          : 0,
    },
    {
      date: dateFromNow(0),
      count:
        stats?.timestamps && typeof stats?.timestamps[0] === "number"
          ? stats?.timestamps[0]
          : 0,
    },
  ];

  const valueFormatter = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
    });
  };

  const formatYAxis = (num: number) => {
    if (num === Math.floor(num)) return String(Math.floor(num));
    else return "";
  };

  useEffect(() => {
    if (languageData && languageData.x && languageData.y) {
      const labelsObj: Labels = {
        x: languageData?.x,
        y: languageData?.y,
      };

      setLabels(labelsObj);
    }
  }, [languageData]);

  return (
    <LineChart
      dataset={dataset}
      xAxis={[
        {
          dataKey: "date",
          label: labels.x,
          scaleType: "point",
          valueFormatter,
        },
      ]}
      yAxis={[
        {
          label: labels.y,
          min: 0,
          valueFormatter: formatYAxis,
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
