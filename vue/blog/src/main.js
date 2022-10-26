import { createApp } from "vue";
import App from "./App.vue";
// 부트스트랩 import
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// 라우터 import
import 라우터만든거 from "./router.js";

// 라우터 import후 .use(라우터 import해온거 이름)
createApp(App).use(라우터만든거).mount("#app");
