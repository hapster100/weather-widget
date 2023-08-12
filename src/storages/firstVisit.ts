import { ref } from 'vue';

const FIRST_VISIT_KEY = 'weather-widget-first-visit-key';

const isFirstVisit = ref(window.localStorage.getItem(FIRST_VISIT_KEY) === null);

const firstVisitComplite = () => {
  window.localStorage.setItem(FIRST_VISIT_KEY, '1');
  isFirstVisit.value = false;
};

export {
  isFirstVisit,
  firstVisitComplite,
};
