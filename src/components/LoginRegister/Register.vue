<template>
    <div class="register">
        <div class="register__box register__box--floating">
            <label for="login">
                <input v-model="userData.login" type="text" id="login" placeholder="login">
                <span>Login</span>
            </label>
        </div>
        <span class="error-box" v-if="v$.login.$error"> {{ v$.login.$errors[0].$message }} </span>
        <div class="register__box register__box--floating">
            <label for="e-mail">
                <input v-model="userData.email" type="text" id="e-mail" placeholder="e-mail">
                <span>E-mail address</span>
            </label>
        </div>
        <span class="error-box" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }} </span>
        <div class="register__box register__box--floating">
            <label for="password">
                <input v-model="userData.password" type="password" id="password" placeholder="Password">
                <span>Password</span>
            </label>
        </div>
        <span class="error-box" v-if="v$.password.$error"> {{ v$.password.$errors[0].$message }} </span>
        <div class="register__box register__box--floating">
            <label for="password-rpt">
                <input v-model="userData.passwordRepeat" type="password" id="password-rpt" placeholder="Password">
                <span>Password repeat</span>
            </label>
        </div>
        <span class="error-box" v-if="v$.passwordRepeat.$error"> {{ v$.passwordRepeat.$errors[0].$message }} </span>
        <div class="register__box register__box--checkbox">
            <label for="cbx-12">Remember me</label>
            <div class="checkbox-wrapper-12">
                <div class="cbx">
                    <input id="cbx-12" type="checkbox" />
                    <label for="cbx-12"></label>
                    <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                        <path d="M2 8.36364L6.23077 12L13 2"></path>
                    </svg>
                </div>
                <!-- Gooey-->
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="goo-12">
                            <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
                            <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                                result="goo-12">
                            </fecolormatrix>
                            <feblend in="SourceGraphic" in2="goo-12"></feblend>
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
        <div class="register__box">
            <button @click="submitForm">Register</button>
        </div>
        <div v-if="error" class="error-box error-box--main">
            {{ error }}
        </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minLength, email, sameAs } from '@vuelidate/validators'
import { reactive, computed, ref } from 'vue';
import { useAuthStore } from '../../store/auth';
export default {
    setup() {
        const authStore = useAuthStore();
        const error = ref('');
        const userData = reactive({
            login: '',
            email: '',
            password: '',
            passwordRepeat: '',
        })
        const rules = computed(() => {
            return {
                login: { required, minLength: minLength(6) },
                email: { required, email },
                password: { required, minLength: minLength(6) },
                passwordRepeat: { required, minLength: minLength(6), sameAs: sameAs(userData.password) },
            }
        })

        function submitForm() {
            this.v$.$validate()
            if (this.v$.$error) {
                error.value = "Please fill out all fields correctly."
                return;
            }
            authStore.register({
                username: userData.login,
                email: userData.email,
                password: userData.password,
            })
        }
        const v$ = useValidate(rules, userData)
        return {
            userData,
            rules,
            error,
            v$,
            submitForm,
            authStore
        }
    }
}
</script>

<style lang="scss" scoped>
.register {
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

    &__box {
        @include floating-input-box;

        span {
            transform: unset;
            color: black;
        }

        label:focus-within>span,
        input:not(:placeholder-shown)+span {
            transform: translateY(-15px);
            color: black;
        }

        input {
            color: black;
            font-weight: 400;
        }

        &--checkbox {
            margin: 16px 0;
            display: flex;
            flex-direction: row-reverse;
            gap: 8px;
            align-items: center;
            justify-content: flex-end;

            .checkbox-wrapper-12 {
                @include checkbox();
            }

            label {
                color: black;
                border: none;
            }
        }

        button {
            @include button-primary;
            width: 100%;
        }
    }
}
</style>