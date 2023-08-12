<template>
    <p class="first-visit__geo-question">
        It seems you are here for the first time.<br /><br />
        Can we access your location?<br /><br />
        This will help identify your city.
    </p>
    <div class="first-visit__controls">
        <button class="btn" @click="yesClickHandler">Yes</button>
        <button class="btn btn--outline" @click="noClickHandler">No</button>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import * as api from '@/api';
import { citiesStorage } from '@/storages/cities';
import { firstVisitComplite } from '@/storages/firstVisit';

type GeolocationPosition = {
  coords: {
    latitude: number
    longitude: number
  }
}

const props = defineProps<{
  select:(citiId: string) => void
}>();

const addCityFromGeolocation = async (geoPos: GeolocationPosition) => {
  const { coords: { latitude, longitude } } = geoPos;
  const reverseRes = await api.geo.reverse(latitude, longitude);
  if (reverseRes.length) {
    const {
      lat, lon, name, country,
    } = reverseRes[0];

    const id = await citiesStorage.add({
      lat, lon, name, country,
    });
    props.select(id);
  }
};

const yesClickHandler = async () => {
  try {
    const geoPos = await new Promise<GeolocationPosition>((res, rej) => {
      window.navigator.geolocation.getCurrentPosition(res, rej);
    });
    await addCityFromGeolocation(geoPos);
  } catch (e) {
    console.error(e);
  } finally {
    firstVisitComplite();
  }
};

const noClickHandler = firstVisitComplite;

</script>

<style lang="scss">
    @import './style.scss';
</style>
