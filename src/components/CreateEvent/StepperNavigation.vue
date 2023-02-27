<template>
    <div class="navigation">
        <button class="navigation__back" @click="changeStep('prev')" :disabled="currentStep == 0">Back</button>
        <button class="navigation__next" @click="changeStep('next')"
            :disabled="currentStep === steps.length - 1">Next</button>
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
    setup(props, { emit }) {
        // @todo na kliknięciu 'next' walidacja danych i jeśli ok to przechodzimy
        function changeStep(direction) {
            emit('change-step', direction)
        }

        return {
            changeStep
        }
    }
}
</script>

<style lang="scss" scoped>
.navigation {
    display: flex;
    gap: 16px;

    &__back {
        @include button-base(rgb(255, 255, 91), black)
    }

    &__next {
        @include button-primary;
    }

    &__back,
    &__next {
        &:disabled {
            opacity: .6;
        }
    }
}
</style>