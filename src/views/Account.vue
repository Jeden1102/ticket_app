<template>
    <div>
        Account
        {{ authStore.user }}
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
import { useAuthStore } from '../store/auth';
export default {
    setup() {
        const authStore = useAuthStore();
        function logout() {
            authStore.logout()
        }
        return {
            authStore,
            logout
        }
    }
}
</script>

<style lang="scss" scoped>

</style>