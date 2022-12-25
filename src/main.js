import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faCalendarDays, faCircleInfo, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from 'pinia'
library.add(faHouse, faCalendarDays, faCircleInfo, faUser);

createApp(App).use(createPinia()).component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')