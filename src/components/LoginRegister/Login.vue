<template>
  <div class="login">
    <div class="login__box login__box--floating">
      <label for="login">
        <input v-model="userData.identifier" type="text" id="login" placeholder="Login" />
        <span>Login</span>
      </label>
    </div>
    <span class="error-box" v-if="v$.identifier.$error">
      {{ v$.identifier.$errors[0].$message }}
    </span>
    <div class="login__box login__box--floating">
      <label for="password">
        <input v-model="userData.password" type="password" id="password" placeholder="Password" />
        <span>Password</span>
      </label>
    </div>
    <span class="error-box" v-if="v$.password.$error">
      {{ v$.password.$errors[0].$message }}
    </span>
    <span class="error-box login-error" v-if="authStore.loginError">
      {{ authStore.loginError }}
    </span>
    <div class="login__box login__box--checkbox">
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
                result="goo-12"></fecolormatrix>
              <feblend in="SourceGraphic" in2="goo-12"></feblend>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
    <div class="login__box">
      <button @click="submitForm">Login</button>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, computed, ref } from "vue";
import { useAuthStore } from "../../store/auth";
export default {
  setup() {
    const authStore = useAuthStore();
    const error = ref("");
    const userData = reactive({
      identifier: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        identifier: { required, minLength: minLength(6) },
        password: { required, minLength: minLength(6) },
      };
    });

    function submitForm() {
      this.v$.$validate();
      if (this.v$.$error) {
        error.value = "Please fill out all fields correctly.";
        return;
      }
      try {
        authStore.login({
          identifier: userData.identifier,
          password: userData.password,
        });
      } catch (err) {
        console.log(err);
      }
    }
    const v$ = useValidate(rules, userData);
    return {
      userData,
      rules,
      error,
      v$,
      submitForm,
      authStore,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  .error-box {
    background: rgb(255, 215, 215);
    padding: 4px;
    border-radius: 4px;
    border: 1px solid rgb(255, 198, 198);
    margin: 2px 0;
    display: block;
    font-size: 0.9rem;

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