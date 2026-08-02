import { AlertCircle, Loader2 } from "lucide-react";
import { useLayout } from "../../hooks/useLayout";
import { DatePicker } from "../DatePicker";
import { LocationSelector } from "../LocationSelector";
import { MetadataDisplay } from "../MetadataDisplay";
import { SunriseCard } from "../SunriseCard";
import { SunsetChart } from "../SunsetChart";

export const LayoutPresentational = () => {
  const { location, date, sunriseData, isLoading, isError, error, projectionData, isLoadingProjection, setLocation, setDate, resetToToday } = useLayout();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-orange-500">Sunrise & Sunset</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">Track sunrise, sunset, and golden hour times for any location on Earth</p>
        </div>

        {/* Controls */}
        <div className="mx-auto bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
            <div className="flex-1 w-full min-w-0">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">📍 Location</h3>
              <LocationSelector location={location} onLocationChange={setLocation} />
            </div>
            <div className="w-full lg:flex-1 lg:max-w-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">📅 Date</h3>
              <DatePicker date={date} onDateChange={setDate} onResetToToday={resetToToday} />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
            <p className="text-lg text-gray-400">Loading sunrise data...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="max-w-2xl mx-auto bg-red-950/20 border border-red-900 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-400 mb-2">Error loading data</h3>
              <p className="text-sm text-gray-400">{error instanceof Error ? error.message : "An unknown error occurred"}</p>
            </div>
          </div>
        )}

        {/* Data Display */}
        {sunriseData && !isLoading && (
          <div className="space-y-12">
            {/* Main Cards */}
            <SunriseCard data={sunriseData} />

            {/* Sunset Projection Chart */}
            {isLoadingProjection ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
                <p className="text-gray-400">Cargando proyección del sunset...</p>
              </div>
            ) : projectionData && projectionData.length > 0 ? (
              <SunsetChart data={projectionData} />
            ) : null}

            {/* Detailed Metadata */}
            <MetadataDisplay data={sunriseData} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500"></div>
      </footer>
    </div>
  );
};
