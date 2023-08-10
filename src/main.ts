import { defineCustomElement } from 'vue';
import WeatherWidget from './components/WeatherWidget.vue';

customElements.define(
  'weather-widget',
  defineCustomElement(WeatherWidget),
);
