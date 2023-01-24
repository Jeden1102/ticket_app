<template>
    <div class="contact__box">
        <div class="icon__box">
            <font-awesome-icon :icon="box.icon" />
        </div>
        <h3>{{ box.title }}</h3>
        <h4>{{ box.desc }}</h4>
        <h5>{{ box.contact }}</h5>
    </div>
</template>

<script>
export default {
    props: {
        box: {
            type: Object,
            required: true,
        }
    },
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>
.contact__box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 14px;
    box-sizing: border-box;
    width: 246px;
    height: 290px;

    /* Gray/50 */

    background: #F9FAFB;
    border: 1px solid rgb(207, 207, 207);
    border-radius: 10px;

    .icon__box {
        background: $secondary-blue;
        min-width: 48px;
        min-height: 48px;
        display: grid;
        place-content: center;
        border-radius: 12px;

        svg {
            color: white;
        }
    }

    h3 {
        font-weight: 600;
        font-size: 22px;
        line-height: 30px;
        color: #101828;
        margin-top: 44px;
    }

    h4 {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #475467;
    }

    h5 {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: $primary-blue;
    }
}
</style>