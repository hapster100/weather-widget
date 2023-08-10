import { apiUrl, searchParamsFromObeject } from '../common/helpers';
import { Geo } from '../common/types';
import { GEO_API_VERSION } from '../constants';

export const reverse = async (lat: number, lon: number, limit = 1) => {
  const url = apiUrl('geo', GEO_API_VERSION, 'reverse', searchParamsFromObeject({
    lat: lat.toString(),
    lon: lon.toString(),
    limit: limit.toString(),
  }));

  const res = await fetch(url.toString());

  if (res.status !== 200) {
    throw new Error(res.status.toString());
  }

  const json = await res.json();

  return json as Array<Geo>;
};
