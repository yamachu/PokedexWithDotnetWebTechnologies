import { createApp } from "vue";
import App from "./App.vue";

const render = () => createApp(App).mount("#js-root");

export const renderJSComponent = render;
