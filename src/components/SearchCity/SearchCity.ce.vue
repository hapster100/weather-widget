<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div style="display: flex; align-items: stretch; justify-content: stretch; gap: 4px;">
    <input class="input" :value="search" @input="handleSearch"/>
    <button class="btn btn--icon" @click="() => cancel()">
      <CrossIcon :size="20"/>
    </button>
  </div>
  <template v-if="!loading">
    <template v-if="list.length">
      <template v-for="res in list" :key="`${res.lat}:${res.lon}`">
        <div class="result-row" @click="() => handleAddCity(res)">
          {{ res.name }} {{ res.country }}
        </div>
      </template>
    </template>
    <p v-else>
      Нечего не найденно :(
    </p>
  </template>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import * as api from '@/api';
import { Geo } from '@/api/common/types';
import { citiesStorage, City } from '@/storages/cities';
import CrossIcon from '@/components/CrossIcon.vue';

export default defineComponent({
  name: 'search-city',
  components: { CrossIcon },
  props: {
    select: {
      type: Function,
      required: true,
    },
    cancel: {
      type: Function,
      required: true,
    },
  },
  data() {
    const search = ref('London');
    const loading = ref(false);
    const list = ref([] as Geo[]);

    const updateList = (searchValue: string, res: Geo[]) => {
      if (search.value === searchValue) {
        list.value = res;
        loading.value = false;
      }
    };

    const fetchAndUpdateList = async (value: string) => {
      const res = await api.geo.direct(value, undefined, undefined, 10);
      updateList(value, res);
    };

    const handleSearch = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        const { value } = e.target;
        if (value) {
          search.value = value;
          loading.value = true;
          list.value = [];
          fetchAndUpdateList(value);
        }
      }
    };

    const handleAddCity = async (city: City) => {
      const id = await citiesStorage.add(city);
      this.select(id);
    };

    fetchAndUpdateList(search.value);

    return {
      handleAddCity,
      handleSearch,
      loading,
      search,
      list,
    };
  },
});
</script>

<style land="scss">
    @import './style.scss';
</style>
