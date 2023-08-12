<template>
  <div class="weather-widget__top">
      <h4 class="weather-widget__title">
        <template v-if="state.city">
          {{ state.city.name }} {{ state.city.country }}
        </template>
      </h4>
      <button class="btn btn--icon" @click="() => unselect()">
        <GearIcon :size="30" />
      </button>
    </div>

    <div class="weather-widget__main">
      <TemperatureInfo v-if="state.temperatureInfo"
        :description="state.temperatureInfo.description"
        :icon-src="state.temperatureInfo.iconSrc"
        :feels-like="state.temperatureInfo.feelsLike"
        :temperature="state.temperatureInfo.temperature"
      />
    <div v-else>
      <CircleLoader />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import GearIcon from '@/components/Gear.ce.vue';
import TemperatureInfo from '@/components/TemperatureInfo/TemperatureInfo.ce.vue';
import { citiesStorage, City } from '@/storages/cities';
import * as api from '@/api';
import CircleLoader from '../CircleLoader/CircleLoader.vue';

export default defineComponent({
  name: 'weather-view',
  components: { GearIcon, TemperatureInfo, CircleLoader },
  props: {
    cityId: {
      type: String,
      required: true,
    },
    unselect: {
      type: Function,
      required: true,
    },
  },
  data() {
    const state = reactive<{
      temperatureInfo: {
        iconSrc: string
        description: string
        feelsLike: number
        temperature: number
      } | null
      city: City|null
    }>({
      temperatureInfo: null,
      city: null,
    });

    return { state };
  },
  async mounted() {
    const { cityId } = this.$props;
    console.log('mounted', cityId);
    const city = await citiesStorage.get(cityId);
    console.log('city', city);
    if (city) {
      this.$data.state.city = city;
      const weather = await api.data.weather(city.lat, city.lon, 'metric');
      const { iconSrc, description } = weather.weather[0];
      const { feels_like: feelsLike, temp: temperature } = weather.main;
      this.$data.state.temperatureInfo = {
        iconSrc,
        description,
        feelsLike,
        temperature,
      };
    }
  },
});
</script>
