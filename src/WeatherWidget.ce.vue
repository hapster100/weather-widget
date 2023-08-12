<template>
  <WeatherIconsPrefetch />
  <div class="weather-widget">
    <FirstVisit v-if="isFirstVisit" :select="selectCityId"/>
    <Weather v-else-if="cityId" :cityId="cityId" :unselect="unselectCityId"/>
    <CityList v-else :select="selectCityId"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { isFirstVisit, firstVisitComplite } from '@/storages/firstVisit';
import FirstVisit from './components/FirstVisit/FirstVisit.ce.vue';
import Weather from './components/Weather/Weather.ce.vue';
import CityList from './components/CityList/CityList.ce.vue';
import { citiesStorage } from './storages/cities';
import WeatherIconsPrefetch from './components/WeatherIconsPrefetch/WeatherIconsPrefetch.vue';

export default defineComponent({
  name: 'weather-widget',
  components: {
    FirstVisit,
    Weather,
    CityList,
    WeatherIconsPrefetch,
  },
  async mounted() {
    const allCities = await citiesStorage.getAll();
    if (allCities.length) {
      this.$data.selectCityId(allCities[0].id || '');
    }
  },
  data() {
    const cityId = ref('');
    const selectCityId = (newCityId: string) => {
      cityId.value = newCityId;
    };
    const unselectCityId = () => { cityId.value = ''; };

    return {
      isFirstVisit,
      firstVisitComplite,
      cityId,
      selectCityId,
      unselectCityId,
    };
  },
});
</script>

<style lang="scss">
  @import './components/TemperatureInfo/style.scss';
  @import './components/FirstVisit/style.scss';
  @import './components/CityList/style.scss';
  @import './components/SearchCity/style.scss';

  * {
    box-sizing: border-box;
  }

  .weather-widget {
    padding: 12px;
    border: 1px solid black;

    overflow-y: scroll;
    width: 100%;
    height: 400px;

    font-family: monospace;
    font-size: 16px;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 0;
    }

    &__settings {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }

  .btn {
    border: none;
    cursor: pointer;
    padding: 8px;
    background-color: black;
    color: white;
    min-width: 44px;
    font-weight: bold;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #333;
    }

    &--icon {
      background-color: transparent;
      padding: 4px;
      min-width: unset;
      &:hover {
        background-color: rgba(0,0,0,0.1);
      }
    }

    &--outline {
      border: 1px solid black;
      background-color: transparent;
      color: black;
      &:hover {
        background-color: rgba(0,0,0,0.1);
      }
    }

    &--fullw {
      width: 100%;
    }
  }

  .input {
    border: 1px solid black;
    border-radius: 8px;
    padding: 4px 8px;
    width: 100%;
    outline: none;
  }

</style>
