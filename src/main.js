import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import store from "./store/index.js";
import "view-design/dist/styles/iview.css";
import "./common/css/common.less";
import filters from "./common/js/filter.js";
import i18n from "./i18n/index.js";

import { Modal, Notice, Table,Page,Spin,Icon,Tooltip,Poptip } from "view-design";

Vue.component("Table", Table);
Vue.component("Modal", Modal);
Vue.component("Notice", Notice);
Vue.component("Page", Page);
Vue.component("Spin", Spin);
Vue.component("Icon", Icon);
Vue.component("Tooltip", Tooltip);
Vue.component("Poptip", Poptip);




Vue.prototype.$Notice = Notice;
Vue.prototype.$Modal = Modal;

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
new Vue({
  i18n,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
