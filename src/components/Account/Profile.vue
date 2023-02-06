<template>
    <div class="profile">
        <div class="profile__heading ">
            <img :src="getImageURL(localUser.avatar)" alt="">
            <h2>{{ user.username }}</h2>
            <h3>{{ user.email }}</h3>
        </div>
        <div class="profile__general card">
            <input type="text" placeholder="JohnDoe" v-model="localUser.username">
            <span class="error-box" v-if="v$.username && v$.username.$error"> {{ v$.username.$errors[0].$message }}
            </span>
        </div>
        <div class="profile__personal card">
            <input type="text" placeholder="John" v-model="localUser.name">
            <span class="error-box" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }} </span>
            <input type="text" placeholder="Doe" v-model="localUser.surname">
            <span class="error-box" v-if="v$.surname.$error"> {{ v$.surname.$errors[0].$message }} </span>
            <input type="text" placeholder="+48 512 093 332" v-model="localUser.phone_number">
            <span class="error-box" v-if="v$.phone_number.$error"> {{ v$.phone_number.$errors[0].$message }} </span>
            {{ getAddress }}
            <span v-if="user.address">{{ user.address.formatted_address }}</span>
            <GMapAutocomplete @place_changed="setPlace" v-model="localUser.location" id="event-place"
                placeholder="New Adddress">
            </GMapAutocomplete>
            <Datepicker v-model="localUser.birth_date" :enable-time-picker="false"></Datepicker>
        </div>
        <div class="profile__personal card">
            <input type="text" placeholder="NIP" v-model="localUser.nip">
            <span class="error-box" v-if="v$.nip.$error"> {{ v$.nip.$errors[0].$message }} </span>
            <input type="text" placeholder="PESEL" v-model="localUser.pesel">
            <span class="error-box" v-if="v$.pesel.$error"> {{ v$.pesel.$errors[0].$message }} </span>
        </div>
        <button @click="updateUserDetails">Save Details</button>
    </div>
</template>

<script>
import { computed } from 'vue';
import useValidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { useUserStore } from '../../store/user'
import { useToast } from "vue-toastification";
export default {
    props: {
        user: {
            type: Object,
            requrired: true
        }
    },
    setup(props) {
        const toast = useToast();
        const userStore = useUserStore()
        const localUser = computed(() => {
            return props.user
        })
        const getAddress = computed(() => {
            if (!localUser.value.address)
                return '';
            return JSON.parse(localUser.value.address).formatted_address
        })
        const rules = computed(() => {
            let rules = {
                username: { required, minLength: minLength(6) },
            };
            const validations = [{
                field: 'name',
                validation: { minLength: minLength(2) }
            },
            {
                field: 'surname',
                validation: { minLength: minLength(2) }
            },
            {
                field: 'address',
                validation: { minLength: minLength(2) }
            },
            {
                field: 'phone_number',
                validation: { minLength: minLength(7), maxLength: maxLength(11) }
            },
            {
                field: 'location',
                validation: { minLength: minLength(7) }
            },
            {
                field: 'nip',
                validation: { minLength: minLength(9), maxLength: maxLength(10) }
            },
            {
                field: 'pesel',
                validation: { minLength: minLength(7), maxLength: maxLength(11) }
            }
            ]
            validations.forEach(val => {
                if (localUser.value[val.field]) {
                    rules[val.field] = val.validation
                } else {
                    rules[val.field] = {}
                }
            });

            return rules
        })
        const test = computed(() => {
            return localUser.value.name
        })
        function setPlace(place) {
            localUser.value.address = JSON.stringify(place)
        }
        function getImageURL(avatar) {
            return `${process.env.VUE_APP_IMAGES_API}${avatar.url}`;
        }
        function updateUserDetails() {
            this.v$.$validate()

            if (this.v$.$error) {
                toast.error("There was some error updating profile details", {
                    timeout: 5000
                });
                return
            }
            toast.info("Profile updated succesfully!", {
                timeout: 5000
            });
            userStore.updateUser(localUser.value)
        }
        const v$ = useValidate(rules, localUser)

        return {
            localUser,
            setPlace,
            getImageURL,
            updateUserDetails,
            v$,
            test,
            rules,
            userStore,
            getAddress,
            toast
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