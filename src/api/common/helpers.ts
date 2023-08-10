import { API_KEY, BASE_API_URL } from '../constants';

export const apiUrl = (
  apiName: string,
  apiVersion: string,
  method: string,
  searchParams: URLSearchParams,
): URL => {
  const url = new URL(`${BASE_API_URL}/${apiName}/${apiVersion}/${method}`);

  url.searchParams.set('appid', API_KEY);
  searchParams.forEach(
    (value, key) => url.searchParams.set(key, value),
  );

  return url;
};

export const searchParamsFromObeject = (
  obj: {[key: string]: string},
) : URLSearchParams => new URLSearchParams(Object.entries(obj));
