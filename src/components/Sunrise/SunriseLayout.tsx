import { useLayout } from '../../hooks/useLayout';
import { SunriseCard } from '../SunriseCard';
import { MetadataDisplay } from '../MetadataDisplay';
import { LocationSelector } from '../LocationSelector';
import { DatePicker } from '../DatePicker';
import { Loader2, AlertCircle } from 'lucide-react';

export const SunriseLayout = () => {
  const {
    location,
    date,
    sunriseData,
    isLoading,
    isError,
    error,
    setLocation,
    setDate,
    resetToToday,
  } = useLayout();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Sunrise & Sunset
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Track sunrise, sunset, and golden hour times for any location on Earth
          </p>
        </div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📍 Location
              </h3>
              <LocationSelector
                location={location}
                onLocationChange={setLocation}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📅 Date
              </h3>
              <DatePicker
                date={date}
                onDateChange={setDate}
                onResetToToday={resetToToday}
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Loading sunrise data...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="max-w-2xl mx-auto bg-destructive/10 border border-destructive rounded-lg p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-destructive mb-2">
                Error loading data
              </h3>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error ? error.message : 'An unknown error occurred'}
              </p>
            </div>
          </div>
        )}

        {/* Data Display */}
        {sunriseData && !isLoading && (
          <div className="space-y-12">
            <SunriseCard data={sunriseData} />
            <MetadataDisplay data={sunriseData} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Powered by{' '}
            <a
              href="https://sunrisesunset.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              Sunrise Sunset API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
