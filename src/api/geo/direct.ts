import { slowFetch } from '@/delay';
import { apiUrl, searchParamsFromObeject } from '../common/helpers';
import { Geo } from '../common/types';
import { GEO_API_VERSION } from '../constants';

export const direct = async (
  city: string,
  stateCode?: string,
  countryCode?: string,
  limit = 1,
) => {
  const url = apiUrl(
    'geo',
    GEO_API_VERSION,
    'direct',
    searchParamsFromObeject({
      q: [city, stateCode, countryCode].filter(Boolean).join(''),
      limit: limit.toString(),
    }),
  );

  const res = await slowFetch(url.toString());

  if (res.status !== 200) {
    throw new Error(res.status.toString());
  }

  const json = await res.json();
  return json as Array<Geo>;
};
