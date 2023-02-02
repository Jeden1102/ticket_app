<template>
    <div class="profile">
        <div class="profile__heading ">
            <img src="@/assets/avatars/avatar.svg" alt="">
            <h2>{{ user.username }}</h2>
            <h3>{{ user.email }}</h3>
        </div>
        <div class="profile__general card">
            <input type="text" placeholder="JohnDoe" v-model="localUser.username">
        </div>
        <div class="profile__personal card">
            <input type="text" placeholder="John" v-model="localUser.name">
            <input type="text" placeholder="Doe" v-model="localUser.surname">
            <input type="text" placeholder="+48 512 093 332" v-model="localUser.phone_number">
            <Datepicker v-model="localUser.birth_date" :enable-time-picker="false"></Datepicker>
        </div>
        <button>Save Details</button>
    </div>
</template>

<script>
import { computed } from 'vue';
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

        return {
            localUser
        }
    }
}
</script>

<style lang="scss" scoped>
.profile {
    @include glass-card;

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

        input[type='text'] {
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