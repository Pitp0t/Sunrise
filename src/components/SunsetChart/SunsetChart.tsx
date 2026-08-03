import { Sun, Sunset } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import type { SunriseData } from "../../types/sunrise.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

type ApexOptions = any;

interface SunsetChartProps {
  data: SunriseData[];
}

const timeToMinutes = (timeStr: string): number => {
  const match = timeStr.match(/(\d+):(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const seconds = parseInt(match[3]);
  const period = match[4].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes + seconds / 60;
};

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${mins.toString().padStart(2, "0")} ${period}`;
};

export const SunsetChart = ({ data }: SunsetChartProps) => {
  const chartData = useMemo(() => {
    // Filtrar datos cada 15 días
    const filteredData = data.filter((_, index) => index % 15 === 0);

    const dates = filteredData.map((d) => d.date);
    const sunsetTimes = filteredData.map((d) => timeToMinutes(d.sunset));

    return { dates, sunsetTimes };
  }, [data]);

  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 768px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: isMobile ? "bar" : "line",
      height: isMobile ? 700 : 400,
      background: "transparent",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
      zoom: {
        enabled: false,
      },
    },

    selection: {
      enabled: false,
    },

    colors: ["#fb923c"],

    stroke: {
      curve: "smooth",
      width: isMobile ? 0 : 3,
    },

    plotOptions: isMobile
      ? {
          bar: {
            horizontal: true,
            borderRadius: 6,
            barHeight: "55%",
            dataLabels: {
              position: "top",
            },
          },
        }
      : {},

    dataLabels: {
      enabled: isMobile,
      formatter: (value: number) => formatTime(value),
      offsetX: 20,
      offsetY: 0,
      textAnchor: "start",
      style: {
        fontSize: "11px",
        fontWeight: 400,
        colors: ["#d1d5db"],
      },
      background: {
        enabled: false,
      },
    },

    xaxis: isMobile
      ? {
          categories: chartData.dates,
          min: Math.min(...chartData.sunsetTimes) - 60,
          max: Math.max(...chartData.sunsetTimes) + 120,
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        }
      : {
          categories: chartData.dates,
          labels: {
            rotate: -45,
            style: {
              colors: "#9ca3af",
            },
            formatter: (value: string) => {
              const date = new Date(value);

              return date.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
              });
            },
          },
        },

    yaxis: isMobile
      ? {
          labels: {
            formatter: (_value: string, opts: any) => {
              const date = new Date(chartData.dates[opts.dataPointIndex]);

              return date.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
              });
            },
            style: {
              colors: "#9ca3af",
              fontSize: "11px",
              fontWeight: 400,
            },
          },
        }
      : {
          title: {
            text: "Hora del Sunset",
            style: {
              color: "#fb923c",
              fontSize: "12px",
              fontWeight: 600,
            },
          },
          labels: {
            formatter: (value: number) => formatTime(value),
            style: {
              colors: ["#fb923c"],
            },
          },
          min: Math.min(...chartData.sunsetTimes) - 30,
          max: Math.max(...chartData.sunsetTimes) + 30,
        },

    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
      y: {
        formatter: (value: number) => formatTime(value),
      },
    },

    legend: {
      show: !isMobile,
      position: "top",
      horizontalAlign: "center",
      labels: {
        colors: "#d1d5db",
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
    },

    grid: {
      show: !isMobile,
      borderColor: "#374151",
      strokeDashArray: 3,
      padding: {
        right: isMobile ? 120 : 0,
        left: isMobile ? 10 : 0,
      },
    },

    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.15,
        },
      },
    },
  };

  const series = [
    {
      name: "Hora del Sunset",
      data: chartData.sunsetTimes,
    },
  ];

  const currentData = data[0];

  return (
    <Card className="w-full shadow-2xl bg-gray-900/50 backdrop-blur-sm border-gray-800 ">
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl flex items-center gap-3 text-white">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Sunset className="w-6 h-6 text-orange-500" />
          </div>
          Proyección del Sunset
        </CardTitle>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 rounded-lg border border-gray-700">
            <Sunset className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-gray-400">Sunset actual</p>
              <p className="text-lg font-bold text-orange-500">{currentData.sunset}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 rounded-lg border border-gray-700">
            <Sun className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-gray-400">Duración del día</p>
              <p className="text-lg font-bold text-orange-500">{currentData.day_length}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Chart options={options} series={series} type={isMobile ? "bar" : "line"} height={isMobile ? 650 : 400} />
      </CardContent>
    </Card>
  );
};
