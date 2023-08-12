<template>
    <div style="display: none;">
        <img v-for="url in urls" :src="url" alt="weather icon" :key="url"/>
    </div>
</template>

<script setup lang="ts">
import { weatherIconUrl } from '../../api/common/helpers';

const urls = [
  '01', '02', '03', '04', '09', '10', '11', '13', '50',
].flatMap((x) => [`${x}d`, `${x}n`]).map((name) => weatherIconUrl(name));
</script>
