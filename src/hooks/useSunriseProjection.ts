import { useQuery } from "@tanstack/react-query";
import { fetchSunriseRangeData } from "../services/sunriseApi";
import type { SunriseApiRangeParams } from "../types/sunrise.types";

export const useSunriseProjection = (params: SunriseApiRangeParams | null) => {
  return useQuery({
    queryKey: ["sunrise-projection", params?.lat, params?.lng, params?.date_start, params?.date_end],
    queryFn: () => fetchSunriseRangeData(params!),
    enabled: !!params,
    staleTime: 1000 * 60 * 60, // 1 hour - datos históricos no cambian
    select: (data) => data.results,
  });
};
