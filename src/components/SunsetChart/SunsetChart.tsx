import { useMemo } from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { SunriseData } from "../../types/sunrise.types";
import { Sunset, Sun } from "lucide-react";

type ApexOptions = any;

interface SunsetChartProps {
  data: SunriseData[];
}

const timeToMinutes = (timeStr: string): number => {
  // Convierte "6:14:43 PM" a minutos desde medianoche
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

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 400,
      background: 'transparent',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#fb923c"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData.dates,
      labels: {
        rotate: -45,
        rotateAlways: false,
        style: {
          colors: '#9ca3af',
        },
        formatter: (value: string) => {
          const date = new Date(value);
          return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
        },
      },
    },
    yaxis: {
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
      theme: 'dark',
      y: {
        formatter: (value: number) => formatTime(value),
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      labels: {
        colors: '#d1d5db',
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
    },
    grid: {
      borderColor: "#374151",
      strokeDashArray: 3,
    },
  };

  const series = [
    {
      name: "Hora del Sunset",
      data: chartData.sunsetTimes,
    },
  ];

  const currentData = data[0];
  const lastData = data[data.length - 1];
  const sunsetDiff = timeToMinutes(lastData.sunset) - timeToMinutes(currentData.sunset);

  return (
    <Card className="w-full shadow-2xl bg-gray-900/50 backdrop-blur-sm border-gray-800">
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
            <div>
              <p className="text-xs text-gray-400">Cambio en 6 meses</p>
              <p className="text-sm font-semibold text-orange-500">
                {sunsetDiff > 0 ? "+" : ""}{Math.round(sunsetDiff)} minutos
              </p>
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
        <Chart options={options} series={series} type="line" height={400} />
      </CardContent>
    </Card>
  );
};
