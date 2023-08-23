import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import "element-plus/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import router from "./router";
import store from "./store";
import { registerGlobalComponents } from "./utils/import";

const app = createApp(App);
registerGlobalComponents(app);
app.use(store);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
