import type { SunriseApiParams, SunriseApiResponse, SunriseApiRangeParams, SunriseApiRangeResponse } from "../types/sunrise.types";
import axiosInstance from "./axiosInstance";

export const fetchSunriseData = async (params: SunriseApiParams): Promise<SunriseApiResponse> => {
  const { lat, lng, date } = params;

  const { data } = await axiosInstance.get<SunriseApiResponse>("/json", {
    params: {
      lat,
      lng,
      date,
    },
  });

  return data;
};

export const fetchSunriseRangeData = async (params: SunriseApiRangeParams): Promise<SunriseApiRangeResponse> => {
  const { lat, lng, date_start, date_end } = params;

  const { data } = await axiosInstance.get<SunriseApiRangeResponse>("/json", {
    params: {
      lat,
      lng,
      date_start,
      date_end,
    },
  });

  return data;
};
