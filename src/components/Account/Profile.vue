<template>
    <div class="profile">
        <div class="profile__heading ">
            <img :src="getImageURL(localUser.avatar)" alt="">
            <h2>{{ user.username }}</h2>
            <h3>{{ user.email }}</h3>
        </div>
        <div class="profile__general card">
            <input type="text" placeholder="JohnDoe" v-model="localUser.username">
            <span class="error-box" v-if="v$.username.$error"> {{ v$.username.$errors[0].$message }} </span>
        </div>
        <div class="profile__personal card">
            <input type="text" placeholder="John" v-model="localUser.name">
            <input type="text" placeholder="Doe" v-model="localUser.surname">
            <input type="text" placeholder="+48 512 093 332" v-model="localUser.phone_number">
            <GMapAutocomplete @place_changed="setPlace" v-model="localUser.location" id="event-place"
                placeholder="Address">
            </GMapAutocomplete>
            <Datepicker v-model="localUser.birth_date" :enable-time-picker="false"></Datepicker>
        </div>
        <div class="profile__personal card">
            <input type="text" placeholder="NIP" v-model="localUser.nip">
            <input type="text" placeholder="PESEL" v-model="localUser.pesel">
        </div>
        <button @click="updateUserDetails">Save Details</button>
    </div>
</template>

<script>
import { computed } from 'vue';
import useValidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
export default {
    props: {
        user: {
            type: Object,
            requrired: true
        }
    },
    setup(props) {
        const localUser = computed(() => {
            return props.user
        })
        const rules = computed(() => {
            return {
                username: { required, minLength: minLength(6) },
                email: { required, email },
            }
        })
        function setPlace(place) {
            console.log(place)
        }
        function getImageURL(avatar) {
            return `${process.env.VUE_APP_IMAGES_API}${avatar.url}`;
        }
        function updateUserDetails() {
            this.v$.$validate()

            if (this.v$.$error) {
                console.log("sometgin rong")
            }
        }
        const v$ = useValidate(rules, localUser)

        return {
            localUser,
            setPlace,
            getImageURL,
            updateUserDetails,
            v$,
            rules
        }
    }
}
</script>

<style lang="scss" scoped>
.profile {
    @include glass-card;

    .error-box {
        background: rgb(255, 215, 215);
        padding: 4px;
        border-radius: 4px;
        border: 1px solid rgb(255, 198, 198);
        margin: 2px 0;
        display: block;
        font-size: .9rem;

        &--main {
            padding: 10px;
            margin: 6px 0;
        }
    }

    &__heading {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            max-width: 100px;
        }

        h2 {
            font-size: 1.5rem;
            font-weight: 500;
            margin: 8px 0;
        }

        h3 {
            font-weight: 200;
        }
    }

    .card {
        margin: 16px 0;
        border: 1px solid rgb(226, 226, 226);
        padding: 16px;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        input[type='text'],
        #event-place {
            @include profile-input;
            width: 90%;
        }

        .dp__main.dp__theme_light {
            max-width: 95%;
        }
    }

    button {
        @include button-base($primary-blue, white);
    }
}
</style>