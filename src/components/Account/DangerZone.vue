<template>
    <div class="profile">
        <div class="profile__personal card">
            <p>Set new password</p>
            <input type="password" placeholder="Old password" v-model="pwdChange.oldPassword">
            <span class="error-box" v-if="v$.oldPassword.$error"> {{
                v$.oldPassword.$errors[0].$message
            }} </span>
            <input type="password" placeholder="New password" v-model="pwdChange.newPassword">
            <span class="error-box" v-if="v$.newPassword.$error"> {{
                v$.newPassword.$errors[0].$message
            }} </span>
            <input type="password" placeholder="Repeat new password" v-model="pwdChange.passwordRepeat">
            <span class="error-box" v-if="v$.passwordRepeat.$error"> {{
                v$.passwordRepeat.$errors[0].$message
            }} </span>
            <span class="error-box" v-if="userStore.changePasswordError"> {{
                userStore.changePasswordError
            }} </span>
            <button @click="updateUserDetails">Set new password</button>
        </div>
        <div class="profile__personal card">
            <p>Delete accout</p>
            <span>Notice! Operation in not reversable!</span>
            <span class="error-box" v-if="deleteAccountTriggered">All of your data such as user details, events history
                or statistics will be lost! Type your password and click 'confirm' to remove your account. </span>
            <input v-if="deleteAccountTriggered" type="password" placeholder="Password" v-model="deleteAccountPwd">
            <button class="delete__account" @click="deleteAccount">
                {{ deleteAccountTriggered? 'Confirm': 'Delete account' }}
            </button>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import useValidate from '@vuelidate/core'
import { minLength, sameAs, required } from '@vuelidate/validators'
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
        const deleteAccountTriggered = ref(false);
        const deleteAccountPwd = ref(null);
        const toast = useToast();
        const pwdChange = ref({
            oldPassword: null,
            newPassword: null,
            passwordRepeat: null,
        })
        const userStore = useUserStore()
        const localUser = computed(() => {
            return props.user
        })
        const rules = computed(() => {
            return {
                oldPassword: { required, minLength: minLength(6) },
                newPassword: { required, minLength: minLength(6) },
                passwordRepeat: { required, minLength: minLength(6), sameAs: sameAs(pwdChange.value.newPassword) },
            }
        })
        function updateUserDetails() {
            this.v$.$validate()

            if (this.v$.$error) {
                return
            }

            userStore.changePassword({ currentPassword: pwdChange.value.oldPassword, password: pwdChange.value.newPassword, passwordConfirmation: pwdChange.value.passwordRepeat })
        }
        function deleteAccount() {
            if (!deleteAccountTriggered.value) {
                deleteAccountTriggered.value = true;
                return
            }
            userStore.removeAccount(deleteAccountPwd.value)
        }
        const v$ = useValidate(rules, pwdChange)

        return {
            localUser,
            updateUserDetails,
            v$,
            rules,
            userStore,
            toast,
            pwdChange,
            deleteAccountPwd,
            deleteAccountTriggered,
            deleteAccount
        }
    }
}
</script>

<style lang="scss" scoped>
.profile {
    @include glass-card;
    box-shadow: 0px 5px 67px -43px rgb(66 68 90);

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

    .card {
        margin: 16px 0;
        border: 1px solid rgb(226, 226, 226);
        padding: 16px;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        input[type='password'],
        input[type='text'],
        #event-place {
            @include profile-input;
        }

        .dp__main.dp__theme_light {
            max-width: 95%;
        }
    }

    button {
        @include button-base($primary-blue, white);

        &.delete__account {
            @include button-base(rgb(255, 43, 43), white);
        }
    }
}
</style>