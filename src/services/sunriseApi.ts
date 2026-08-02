import axiosInstance from './axiosInstance';
import type { SunriseApiParams, SunriseApiResponse } from '../types/sunrise.types';

export const fetchSunriseData = async (
  params: SunriseApiParams
): Promise<SunriseApiResponse> => {
  const { lat, lng, date } = params;
  
  const { data } = await axiosInstance.get<SunriseApiResponse>('/json', {
    params: {
      lat,
      lng,
      date,
    },
  });
  
  return data;
};
