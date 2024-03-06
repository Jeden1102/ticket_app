<template>
    <div class="stepper">
        <button v-for="step, idx in createEventStore.steps" :key="step"
            :class="[idx <= createEventStore.currentStep ? 'active' : '', idx == createEventStore.currentStep ? 'current' : '', 'stepper__step']">
        </button>
    </div>
</template>

<script>
import {useCreateEventStore} from '../../store/create_event';
export default {
    setup() {
        const createEventStore=  useCreateEventStore()

        return {
            createEventStore
        }
    }
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