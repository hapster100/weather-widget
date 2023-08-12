import { delay } from '@/delay';

export interface City {
  id?: string
  country: string
  name: string
  lon: number
  lat: number
}

class CitiesLocaleStorage {
  private static key = 'weather-widget-cities';

  private handlers: ((cities: City[]) => void)[];

  constructor() {
    this.handlers = [];
  }

  subscribe(fn: (cities: City[]) => void) {
    this.handlers.push(fn);
    return () => {
      this.handlers = this.handlers.filter((x) => x !== fn);
    };
  }

  private notify(list: City[]) {
    this.handlers.forEach((f) => f(list));
  }

  async add(newCity: City) {
    await delay();
    const all = await this.getAll();
    const id = `${newCity.lat}:${newCity.lon}`;
    if (!all.find((city) => city.id === id)) {
      all.push({ ...newCity, id });
    }
    this.putAll(all);
    return id;
  }

  async remove(cityId: string) {
    await delay();
    const all = await this.getAll();
    this.putAll(all.filter((city) => city.id !== cityId));
  }

  async get(cityId: string) {
    await delay();
    const all = await this.getAll();
    return all.find((city) => city.id === cityId);
  }

  async putAll(cities: Array<City>) {
    await delay();
    window.localStorage.setItem(CitiesLocaleStorage.key, JSON.stringify(cities));
    this.notify(cities);
  }

  async getAll() {
    await delay();
    const lsValue = window.localStorage.getItem(CitiesLocaleStorage.key);

    if (!lsValue) {
      return [] as Array<City>;
    }

    return JSON.parse(lsValue) as Array<City>;
  }
}

export const citiesStorage = new CitiesLocaleStorage();
