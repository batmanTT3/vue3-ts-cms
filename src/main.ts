import { createApp } from "vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "normalize.css";
import "./assets/css/index.less";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import {setupStore} from "./store"
import {globalRegister} from "./global/index";

const app = createApp(App);
app.use(globalRegister);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
};
app.use(ElementPlus);
app.use(store);
setupStore();   //维护vuex中的数据
app.use(router);
app.mount("#app");
