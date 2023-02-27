<template>
    <div class="step step__general">
        <h3 class="step__title">
            General information
        </h3>
        <div class="step__field">
            <label for="">Event name</label>
            <input v-model="createEventsStore.eventData.step_1.name" type="text">
        </div>
        <div class="step__field">
            <label for="">Event description</label>
            <ckeditor v-model="createEventsStore.eventData.step_1.description" :editor="editor" :config="editorConfig">
            </ckeditor>
        </div>
        <div class="step__field">
            <label for="">Event category</label>
            <div class="step__field--radios">
                <div v-for="category in eventsStore.eventCategories" :key="category.id" class="step__field--radio">
                    <input v-model="createEventsStore.eventData.step_1.event_category" :value="category.attributes.Name"
                        name="category" :id="category.attributes.Name" type="radio">
                    <label :for="category.attributes.Name">
                        <span>{{ category.attributes.Name }}</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="step__field">
            <label for="">Event Place</label>
            <GMapAutocomplete @place_changed="setPlace" v-model="createEventsStore.eventData.step_1.location"
                id="event-place" placeholder="New Adddress">
            </GMapAutocomplete>
        </div>
        <div class="step__field">
            <label for="">Event Date</label>
            <Datepicker v-model="createEventsStore.eventData.step_1.date" :enable-time-picker="true"></Datepicker>
        </div>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCreateEventStore } from '../../store/create_event';
import { useEventsStore } from '../../store/events';
import { onMounted } from 'vue'
export default {
    components: {
    },
    setup() {
        const editor = ClassicEditor;
        const eventsStore = useEventsStore();
        const createEventsStore = useCreateEventStore();


        const editorConfig = {
            toolbar: {
                items: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    '|',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'insertTable',
                    '|',
                    'undo',
                    'redo'
                ]
            }
        }
        onMounted(() => {
            eventsStore.getEventCategories()
        })
        return {
            editor,
            editorConfig,
            eventsStore,
            createEventsStore
        }
    }
}
</script>

<style lang="scss" >
.step {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__title {
        font-size: 24px;
        font-weight: 500;
    }

    input[type='text'],
    .pac-target-input {
        @include profile-input;
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: 8px;

        &--radios {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        &--radio {
            width: fit-content;

            input {
                display: none;

                &:checked+label {
                    @include button-base($primary-blue, white);
                }
            }

            label {
                @include button-base(white, $primary-blue);
                display: grid;
                place-content: center;
                min-width: 200px;
                width: fit-content;
            }
        }
    }

    .ck-editor__main {
        min-height: 200px;

        .ck-content {
            min-height: 200px;
        }
    }
}
</style>