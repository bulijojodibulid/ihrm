import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { router } from "./router/router";
import '@/common/css/global.css'
import errMsg from '@/instructions/inputErrorMsg.js'
import store from '@/store/store.js'
import './permission'
import '@/utils/elementui.js'


Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueRouter);
Vue.directive('errmsg', errMsg)

const vue = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
