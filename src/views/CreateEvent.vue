<template>
    <div class="create__event container">
        <div class="create__event__heading">
            <h1>Hi <b>{{ authStore.user.username }}</b>!</h1>
            <p>
                You've got <b>basic</b> plan. Want to upgrade?
            </p>
            <div class="flex">
                <button>Upgrade my plan</button>
                <button @click="createEventToggled = true">Create event</button>
            </div>
            <div v-if="createEventToggled" class="create__event__content">
                <div>
                    <Stepper :steps="steps" :currentStep="currentStep" @change-step="changeStep" />
                </div>
                <div>
                    <KeepAlive>
                        <component class="card" :is="steps[currentStep]"></component>
                    </KeepAlive>
                </div>
                <div>
                    <StepperNavigation :steps="steps" :currentStep="currentStep" @change-step="changeStep" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../store/auth'
import { ref } from 'vue'
import GeneralInfoStep from '../components/CreateEvent/GeneralInfoStep.vue';
import SettingsStep from '../components/CreateEvent/SettingsStep.vue';
import TicketsStep from '../components/CreateEvent/TicketsStep.vue';
import SummaryStep from '../components/CreateEvent/SummaryStep.vue';
import Stepper from '../components/CreateEvent/Stepper.vue';
import StepperNavigation from '../components/CreateEvent/StepperNavigation.vue';
export default {
    components: {
        GeneralInfoStep,
        SettingsStep,
        TicketsStep,
        SummaryStep,
        Stepper,
        StepperNavigation
    },
    setup() {
        const authStore = useAuthStore()
        const createEventToggled = ref(false)
        const steps = ['GeneralInfoStep', 'SettingsStep', 'TicketsStep', 'SummaryStep']
        const currentStep = ref(0);
        function changeStep(direction) {
            let newStep = currentStep.value;
            if (direction === 'next' || direction === 'prev') {
                if (direction === 'next') {
                    newStep = ++currentStep.value;
                } else {
                    newStep = --currentStep.value;
                }
            } else {
                newStep = direction
            }
            currentStep.value = newStep;
        }
        return {
            authStore,
            createEventToggled,
            steps,
            currentStep,
            changeStep
        }
    }
}
</script>

<style lang="scss" scoped>
.create__event {

    &__heading {
        button {
            @include button-base(white, black);
            width: fit-content;
        }

        h1 {
            font-size: 36px;

            b {
                font-weight: 600;
            }
        }

        display: flex;
        flex-direction: column;
        gap:12px;

        .flex {
            display: flex;
            gap: 12px;
        }
    }

    &__content {
        margin-top: 32px;
        display: flex;
        gap: 16px;
        flex-direction: column;

        .card {
            @include glass-card;
        }
    }
}
</style>