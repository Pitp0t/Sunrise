import { useQuery } from '@tanstack/react-query';
import { fetchSunriseData } from '../services/sunriseApi';
import type { SunriseApiParams } from '../types/sunrise.types';

export const useSunriseData = (params: SunriseApiParams) => {
  return useQuery({
    queryKey: ['sunrise', params.lat, params.lng, params.date],
    queryFn: () => fetchSunriseData(params),
    select: (data) => data.results,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!params.lat && !!params.lng && !!params.date,
  });
};
