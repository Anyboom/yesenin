import "@/assets/styles/index.scss";
import "flipbook-js/style.css";
import VueClickAway from "vue3-click-away";

import { createApp } from "vue";
import App from "./App.vue";

createApp(App).use(VueClickAway).mount("#app");
