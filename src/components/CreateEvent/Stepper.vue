<template>
    <div class="stepper">
        <button v-for="step, idx in steps" :key="step"
            :class="[idx <= currentStep ? 'active' : '', idx == currentStep ? 'current' : '', 'stepper__step']">
        </button>
    </div>
</template>

<script>
export default {
    props: {
        steps: {
            type: Array,
            required: true,
        },
        currentStep: {
            type: Number,
            required: true,
        }
    },
}
</script>

<style lang="scss" scoped>
.stepper {
    display: flex;
    gap: 8px;

    &__step {
        width: 60px;
        height: 4px;
        background: $secondary-blue;
        cursor: pointer;
        transition: .3s;
        border: none;
        outline: none;



        &.active {
            background: #8a90ff;
        }

        &.current {
            background: $primary-blue;
            width: 80px;
        }
    }
}
</style>