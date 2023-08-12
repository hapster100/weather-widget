<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <template v-if="!isSearch">
        <div class="city-list__header">
            <h4>Your Cities</h4>
        </div>
        <CircleLoader v-if="loading"/>
        <TransitionGroup v-else class="city-list" name="city-list" tag="div">
            <div
                class="city-list__item"
                v-for="city, i in list"
                v-bind:key="city.id"
                @dragstart="() => currentDrag = i"
                @dragover="() => currentDragOver = i"
                @dragend="handleDragEnd"
                draggable="true"
            >
                <div @click="() => select(city.id||'')" class="city-list__item-name">
                    {{ city.name }} {{ city.country }}
                </div>
                <button class="btn btn--icon" @click="() => handleRemove(i)">
                    <DeleteIcon :size="30" color="#AA1215" />
                </button>
            </div>
        </TransitionGroup>
        <button class="btn btn--fullw" @click="isSearch = true">
            Add
        </button>
    </template>
    <SearchCity v-else :select="select" :cancel="() => {isSearch = false}"/>
</template>

<script setup lang="ts">
import {
  onMounted, ref, defineProps, onUnmounted,
} from 'vue';
import { citiesStorage, City } from '@/storages/cities';
import SearchCity from '@/components/SearchCity/SearchCity.ce.vue';
import DeleteIcon from '../DeleteIcon.vue';
import CircleLoader from '../CircleLoader/CircleLoader.vue';

const list = ref([] as Array<City>);
const isSearch = ref(false);
const loading = ref(true);

let storageUnsub: (() => void)|null = null;

const handleRemove = async (i: number) => {
  const { id } = list.value[i];
  list.value = list.value.filter((citi) => citi.id !== id);
  await citiesStorage.remove(id || '');
};

const currentDragOver = ref<number|null>(null);
const currentDrag = ref<number|null>(null);
const handleDragEnd = () => {
  const from = currentDrag.value;
  const to = currentDragOver.value;
  if (from !== null && to !== null && from !== to) {
    const newList = list.value.map((x, i, arr) => {
      if (i === from) return arr[to];
      if (i === to) return arr[from];
      return x;
    });
    citiesStorage.putAll(newList);
    list.value = newList;
  }
};

defineProps<{
    select:(id: string) => void
}>();

onMounted(async () => {
  list.value = await citiesStorage.getAll();
  loading.value = false;
  storageUnsub = citiesStorage.subscribe((cities) => {
    list.value = cities;
  });
});
onUnmounted(() => {
  storageUnsub?.();
});
</script>

<style lang="scss">
    @import './style.scss';
</style>
