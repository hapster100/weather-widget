import { defineCustomElement } from 'vue';
import WeatherWidget from './components/WeatherWidget.vue';
import * as api from './api';

customElements.define(
  'weather-widget',
  defineCustomElement(WeatherWidget),
);

const tryApi = async () => {
  const weatherRes = await api.data.weather(56.04, 92.88, 'metric', 'ru');
  console.log({ weatherRes });
  const directRes = await api.geo.direct('Красноярск');
  console.log({ directRes });

  const geo = await new Promise<GeolocationPosition>((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  const reverseRes = await api.geo.reverse(geo.coords.latitude, geo.coords.longitude);
  console.log({ reverseRes });
};

tryApi();
