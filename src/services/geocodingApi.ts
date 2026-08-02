import axios from "axios";

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  type: string;
  importance: number;
}

interface LocationSearchResult {
  id: number;
  name: string;
  lat: number;
  lng: number;
  fullName: string;
}

const nominatimInstance = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  headers: {
    "User-Agent": "SunriseApp/1.0",
  },
});

export const searchLocations = async (query: string): Promise<LocationSearchResult[]> => {
  if (!query || query.length < 3) return [];

  try {
    const { data } = await nominatimInstance.get<NominatimResult[]>("/search", {
      params: {
        q: query,
        format: "json",
        limit: 5,
        addressdetails: 1,
      },
    });

    return data.map((result) => ({
      id: result.place_id,
      name: result.display_name.split(",")[0],
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      fullName: result.display_name,
    }));
  } catch (error) {
    console.error("Error searching locations:", error);
    return [];
  }
};

export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    const { data } = await nominatimInstance.get("/reverse", {
      params: {
        lat,
        lon: lng,
        format: "json",
      },
    });

    return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
};
