import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faCalendarDays, faCircleInfo, faArrowRightFromBracket, faUser, faFire, faLocationDot, faX, faCheck, faPhone, faPlus, faMinus, faTriangleExclamation, faChartLine, faGear } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faInstagram, faPinterest, faRocketchat } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from 'pinia'
import VueNumber from 'vue-number-animation'
library.add(faHouse, faGear, faArrowRightFromBracket, faTriangleExclamation, faCalendarDays, faChartLine, faCircleInfo, faUser, faFire, faLocationDot, faX, faCheck, faFacebook, faInstagram, faPinterest, faRocketchat, faComments, faPhone, faPlus, faMinus);
import VueGoogleMaps from '@fawmi/vue-google-maps'

import { createValidation } from 'vue3-form-validation'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
const validation = createValidation({
    defaultValidationBehavior: 'lazy',
    validationBehavior: {
        change: ({ force }) => !force,
        lazy: ({ touched }) => touched,
        submit: ({ submit, hasError }) => submit || hasError
    }
})

const app = createApp(App);
app.use(createPinia());
app.component('Datepicker', Datepicker);
app.use(validation);
app.use(VueNumber)
app.use(Toast, {
        position: POSITION.BOTTOM_RIGHT
    })
    .use(VueGoogleMaps, {
        load: {
            key: "AIzaSyCMO7f1IdmC2znLs6fmVNgPwu98guyCWuY",
            libraries: "places"
        }
    })
app.component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')