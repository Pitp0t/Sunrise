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
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
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
    colors: ["#f97316"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData.dates,
      labels: {
        rotate: -45,
        rotateAlways: false,
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
          color: "#f97316",
          fontSize: "12px",
          fontWeight: 600,
        },
      },
      labels: {
        formatter: (value: number) => formatTime(value),
        style: {
          colors: ["#f97316"],
        },
      },
      min: Math.min(...chartData.sunsetTimes) - 30,
      max: Math.max(...chartData.sunsetTimes) + 30,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => formatTime(value),
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
    },
  };

  const series = [
    {
      name: "Hora del Sunset",
      data: chartData.sunsetTimes,
    },
  ];

  const currentData = data[data.length - 1];
  const firstData = data[0];
  const sunsetDiff = timeToMinutes(currentData.sunset) - timeToMinutes(firstData.sunset);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg">
            <Sunset className="w-6 h-6 text-white" />
          </div>
          Proyección del Sunset
        </CardTitle>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
            <Sunset className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-xs text-muted-foreground">Sunset actual</p>
              <p className="text-lg font-bold text-orange-600">{currentData.sunset}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <p className="text-xs text-muted-foreground">Cambio en 6 meses</p>
              <p className="text-sm font-semibold text-blue-600">
                {sunsetDiff > 0 ? "+" : ""}{Math.round(sunsetDiff)} minutos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg border border-purple-200">
            <Sun className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-xs text-muted-foreground">Duración del día</p>
              <p className="text-lg font-bold text-purple-600">{currentData.day_length}</p>
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
