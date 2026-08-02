export interface SunriseApiResponse {
  results: SunriseData;
  status: string;
}

export interface SunriseApiRangeResponse {
  results: SunriseData[];
  status: string;
  tzid: string;
}

export interface SunriseData {
  date: string;
  sunrise: string;
  sunset: string;
  first_light: string;
  last_light: string;
  dawn: string;
  dusk: string;
  solar_noon: string;
  golden_hour: string;
  day_length: string;
  timezone: string;
  utc_offset: number;
  sun_altitude: number;
  sun_azimuth: number;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  moon_altitude?: number;
  moon_azimuth?: number;
  nautical_twilight_begin: string;
  nautical_twilight_end: string;
}

export interface LocationData {
  lat: number;
  lng: number;
  name?: string;
}

export interface SunriseApiParams {
  lat: number;
  lng: number;
  date: string; // Format: YYYY-MM-DD
}

export interface SunriseApiRangeParams {
  lat: number;
  lng: number;
  date_start: string; // Format: YYYY-MM-DD
  date_end: string; // Format: YYYY-MM-DD
}
