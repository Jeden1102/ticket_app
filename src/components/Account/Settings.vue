<template>
    <div class="settings">
        <label for="">Select app language</label>
        <VueMultiselect :show-labels="false" v-model="language" :options="languages"></VueMultiselect>
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
        const language = ref("pl");
        const languages = ["pl", "en"];

        return {
            language,
            languages
        }
    }
}
</script>

<style lang="scss" scoped>
.settings {
    @include glass-card;
}
</style>