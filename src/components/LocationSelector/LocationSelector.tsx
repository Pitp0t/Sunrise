import { Loader2, MapPin, Navigation, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { searchLocations } from "../../services/geocodingApi";
import type { LocationData } from "../../types/sunrise.types";
import { Button } from "../ui/Button1";
import { Input } from "../ui/Input1";

interface LocationSelectorProps {
  location: LocationData;
  onLocationChange: (location: LocationData) => void;
}

interface SearchResult {
  id: number;
  name: string;
  lat: number;
  lng: number;
  fullName: string;
}

export const LocationSelector = ({ location, onLocationChange }: LocationSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        setIsSearching(true);
        const results = await searchLocations(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSelectLocation = (result: SearchResult) => {
    onLocationChange({
      lat: result.lat,
      lng: result.lng,
      name: result.name,
    });
    setSearchQuery("");
    setShowResults(false);
    setSearchResults([]);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          onLocationChange({
            lat: newLat,
            lng: newLng,
            name: "Tu Ubicación",
          });
        },
        (error) => {
          alert("No se pudo obtener tu ubicación: " + error.message);
        },
      );
    } else {
      alert("Geolocalización no soportada por tu navegador");
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Location Display */}
      <div className="flex items-center gap-2 text-sm font-medium text-white bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-3 py-2 rounded-lg">
        <MapPin className="w-4 h-4 text-orange-500" />
        <span>{location.name || "Ubicación personalizada"}</span>
        <span className="text-xs text-gray-400 ml-auto">
          {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
        {isSearching && <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500 animate-spin z-10" />}
        <Input
          type="text"
          placeholder="Buscar ciudad, país o lugar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
        />

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
            {searchResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelectLocation(result)}
                className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0 flex items-start gap-3"
              >
                <MapPin className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate text-white">{result.name}</p>
                  <p className="text-xs text-gray-400 truncate">{result.fullName}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.lat.toFixed(4)}, {result.lng.toFixed(4)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {showResults && searchResults.length === 0 && searchQuery.length >= 3 && !isSearching && (
          <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-4">
            <p className="text-sm text-gray-400 text-center">No se encontraron resultados</p>
          </div>
        )}
      </div>

      {/* Use Current Location Button */}
      <Button
        variant="outline"
        onClick={handleUseCurrentLocation}
        className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white border-0 font-semibold"
      >
        <Navigation className="w-4 h-4" />
        Usar Mi Ubicación Actual
      </Button>
    </div>
  );
};
