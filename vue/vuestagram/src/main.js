import { createApp } from "vue";
import App from "./App.vue";
// mitt 라이브러리 셋팅
import mitt from "mitt";
const emitter = mitt();
const app = createApp(App);
// 모든 컴포넌트에서 변수를 사용하고 싶을 때 사용
// so 자주 쓰는 라이브러리 그런거 있으면 여기다가 다 등록하셈
// ex) app.config.globalProperties.axios = axios; => 이렇게 하면 이제 vue파일에서 import axios 해올 필요없이 this.axios로 사용가능
app.config.globalProperties.emitter = emitter;

// 모든 컴포넌트들이 store안에 있는 데이터를 공유함
import store from "./store.js";

app.use(store).mount("#app");
