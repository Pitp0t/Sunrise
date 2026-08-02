import { format } from "date-fns";
import { useEffect, useState } from "react";
import type { LocationData } from "../types/sunrise.types";
import { useSunriseData } from "./useSunriseData";

// Default location: Buenos Aires, Argentina
const DEFAULT_LOCATION: LocationData = {
  lat: -34.5847341,
  lng: -58.4175449,
  name: "Buenos Aires, Argentina",
};

export const useLayout = () => {
  const [location, setLocation] = useState<LocationData>(DEFAULT_LOCATION);
  const [date, setDate] = useState<Date>(new Date());

  // Format date as YYYY-MM-DD for API
  const formattedDate = format(date, "yyyy-MM-dd");

  // Fetch sunrise data using React Query
  const {
    data: sunriseData,
    isLoading,
    isError,
    error,
    refetch,
  } = useSunriseData({
    lat: location.lat,
    lng: location.lng,
    date: formattedDate,
  });

  // Get user's current location on mount (optional)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: "Your Location",
          });
        },
        () => {
          console.log("Geolocation not available, using default location");
        },
      );
    }
  }, []);

  const handleLocationChange = (newLocation: LocationData) => {
    setLocation(newLocation);
  };

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const resetToToday = () => {
    setDate(new Date());
  };

  return {
    // State
    location,
    date,
    formattedDate,

    // Data
    sunriseData,
    isLoading,
    isError,
    error,

    // Actions
    setLocation: handleLocationChange,
    setDate: handleDateChange,
    resetToToday,
    refetch,
  };
};

export type UseLayoutReturn = ReturnType<typeof useLayout>;
