<template>
    <div class="navbar__top container">
        <nav>
            <div>
                <router-link :to="{name:'Home'}"><img src="../assets/logo.png" alt="Page logo" loading="lazy"></router-link>
            </div>
            <div class="navbar__top__links">
                <router-link :to="{name:'Home'}">Home</router-link>
                <router-link :to="{name:'Home'}">Events</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    setup () {

        return {}
    }
}
</script>

<style lang="scss" scoped>
.navbar__top{
    padding:15px;
    nav{
        display:flex;
        justify-content: space-between;
        align-items: center;
        img{
            width:400px;
        }
    }
    &__links{
        display:flex;
        gap:20px;
    }
}
</style>