import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import parks from "./parks.js";

let data = {
  nationalParks: parks,
  parkList: [],
};


new Vue({
  router,
  data,
  render: (h) => h(App),
}).$mount("#app");
