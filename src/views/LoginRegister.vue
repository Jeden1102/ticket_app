<template>
    <div class="login__register">
        <div class="login__register__image">
            <img src="@/assets/login/login.svg" alt="">
        </div>
        <div class="login__register__content">
            <h2>Welcome</h2>
            <p>By signing in you are agreeing our <router-link :to="{ name: 'Home' }">Term and privacy
                    policy</router-link> </p>
            <div class="links">
                <router-link :to="{ name: 'Register' }">Register</router-link>
                <router-link :to="{ name: 'Login' }">Login</router-link>
            </div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.login__register {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    @media(min-width:768px) {
        flex-direction: row;
    }

    &__content {
        box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
        padding: 20px 40px;

        h2 {
            text-align: center;
            font-weight: 500;
            font-size: 1.5rem;
            margin-bottom: 16px;
        }

        p {
            font-weight: 200;

            a {
                color: $secondary-blue;
                font-weight: 400;
            }
        }

        .links {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin: 12px 0;

            a {
                font-size: 1.1rem;
                padding: 4px;

                &.router-link-active {
                    border-bottom: 1px solid $secondary-blue;
                }
            }
        }
    }
}
</style>