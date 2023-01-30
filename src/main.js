import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faCalendarDays, faCircleInfo, faUser, faFire, faLocationDot, faX, faCheck, faPhone, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faInstagram, faPinterest, faRocketchat } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from 'pinia'
import VueNumber from 'vue-number-animation'
library.add(faHouse, faCalendarDays, faCircleInfo, faUser, faFire, faLocationDot, faX, faCheck, faFacebook, faInstagram, faPinterest, faRocketchat, faComments, faPhone, faPlus, faMinus);
import VueGoogleMaps from '@fawmi/vue-google-maps'

import { createValidation } from 'vue3-form-validation'

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
app.use(validation);
app.use(VueNumber)
    .use(VueGoogleMaps, {
        load: {
            key: "AIzaSyCMO7f1IdmC2znLs6fmVNgPwu98guyCWuY",
            libraries: "places"
        }
    })
app.component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')