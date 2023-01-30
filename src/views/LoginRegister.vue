<template>
    <div class="login__register">
        <router-link :to="{ name: 'Login' }">Login</router-link>
        <router-link :to="{ name: 'Register' }">Register</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.login__register {
    box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
}
</style>