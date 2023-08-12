import { DATA_API_VERSION } from '../constants';
import { apiUrl, searchParamsFromObeject, weatherIconUrl } from '../common/helpers';
import { Language, UnitsType } from '../common/types';

/* eslint-disable camelcase */
interface CurrentWeatherResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
    iconSrc: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain?: {
    ['1h']?: number
    ['3h']?: number
  }
  snow?: {
    ['1h']?: number
    ['3h']?: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}
/* eslint-enable camelcase */

export const weather = async (
  lat: number,
  lon: number,
  units: UnitsType = 'standard',
  lang: Language = 'en',
) => {
  const url = apiUrl(
    'data',
    DATA_API_VERSION,
    'weather',
    searchParamsFromObeject({
      lat: lat.toString(),
      lon: lon.toString(),
      units,
      lang,
    }),
  );

  const res = await fetch(url.toString());

  if (res.status !== 200) {
    throw new Error(res.status.toString());
  }

  const json = await res.json();

  const currentWeather = json as CurrentWeatherResponse;
  currentWeather.weather = currentWeather.weather.map(({ icon, ...other }) => ({
    ...other,
    icon,
    iconSrc: weatherIconUrl(icon),
  }));

  return currentWeather;
};
