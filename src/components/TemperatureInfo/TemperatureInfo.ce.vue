<template>
    <div class="temperature">
        <div class="temperature__main">
          <div class="temperature__icon">
            <img alt="weather icon" :src="iconSrc"/>
          </div>
          <div class="temperature__value">
            {{ temperature }}℃
          </div>
        </div>
        <div class="temperature__feels-like">
          <span>
            Fills like {{ feelsLike }}℃.
          </span>
          <span>
            {{ descriptionCapitalize }}.
          </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'temperature-info',
  props: {
    description: { type: String, required: true },
    iconSrc: { type: String, required: true },
    temperature: { type: Number, required: true },
    feelsLike: { type: Number, required: true },
  },
  computed: {
    descriptionCapitalize() {
      const { description } = this.$props;
      return description[0].toUpperCase() + description.slice(1);
    },
  },
});
</script>

<style lang="scss">
  @import './style.scss';
</style>
