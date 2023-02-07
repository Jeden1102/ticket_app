<template>
    <div>
        <Faq />
    </div>
</template>

<script>
import Faq from '@/views/Faq.vue';
export default {
    components: {
        Faq
    },
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
.faq__container {
    width: 90% !important;
    @include glass-card;
    box-shadow: 0px 5px 67px -43px rgb(66 68 90);
}
</style>