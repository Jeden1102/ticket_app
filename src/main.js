import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faCalendarDays, faCircleInfo, faUser, faFire, faLocationDot, faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from 'pinia'
import VueNumber from 'vue-number-animation'
library.add(faHouse, faCalendarDays, faCircleInfo, faUser, faFire, faLocationDot, faX, faCheck, faFacebook, faInstagram, faPinterest);
import VueGoogleMaps from '@fawmi/vue-google-maps'


const app = createApp(App);
app.use(createPinia());
app.use(VueNumber)
    .use(VueGoogleMaps, {
        load: {
            key: "AIzaSyCMO7f1IdmC2znLs6fmVNgPwu98guyCWuY",
            libraries: "places"
        }
    })
app.component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')