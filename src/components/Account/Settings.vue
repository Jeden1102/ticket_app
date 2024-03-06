<template>
    <div class="settings">
        <label for="">Select app language</label>
        <VueMultiselect :allow-empty="false" @select="setLocale" :show-labels="false" v-model="language"
            :options="languages"></VueMultiselect>
        <label for="">Dark mode</label>
        <input @change="setDarkMode" v-model="darkMode" class="container_toggle" type="checkbox" id="switch" name="mode">
        <label class="switch-label" for="switch">Toggle</label>
    </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import { ref } from 'vue';
export default {
    components: {
        VueMultiselect
    },
    setup() {
        const language = ref(localStorage.getItem('go-tickets__locale') ? localStorage.getItem('go-tickets__locale') : 'en');
        const languages = ["pl", "en"];
        const darkMode = ref(localStorage.getItem('go-tickets__dark') ? localStorage.getItem('go-tickets__dark') : false);

        function setDarkMode() {
            localStorage.setItem("go-tickets__dark", darkMode.value)
        }
        function setLocale(selectedOption) {
            localStorage.setItem("go-tickets__locale", selectedOption)
        }
        return {
            language,
            languages,
            darkMode,
            setDarkMode,
            setLocale
        }
    }
}
</script>

<style lang="scss" scoped>
.settings {
    @include glass-card;
}

input[type=checkbox] {
    height: 0;
    width: 0;
    visibility: hidden;
}

label {
    margin: 14px 0;
    display: block;
}

.switch-label {
    cursor: pointer;
    text-indent: -9999px;
    width: 55px;
    height: 30px;
    background: $secondary-blue;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    position: relative;
    margin: 0;
}

label:after {
    content: '';
    background: #fff;
    width: 20px;
    height: 20px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 4px;
    transition: cubic-bezier(0.68, -0.55, 0.27, 01.55) 320ms;
}

input:checked+label {
    background: $primary-blue;
}

input:checked+label:after {
    left: calc(100% - 5px);
    -webkit-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
    -ms-transform: translateX(-100%);
    -o-transform: translateX(-100%);
    transform: translateX(-100%);
}
</style>