import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugin/Axios";
import "bootstrap/dist/css/bootstrap.css"; // Introduced using the normal method
import "bootstrap/dist/js/bootstrap.min.js"; // Introduced using the normal method
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(router).use(store).mount("#app");

router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
