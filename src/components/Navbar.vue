<template>
    <div class="navbar__top container">
        <nav>
            <div>
                <router-link :to="{ name: 'Home' }"><img src="../assets/logo.png" alt="Page logo"
                        loading="lazy"></router-link>
            </div>
            <div class="navbar__top__links">
                <router-link :to="{ name: 'Home' }"><span>Home</span> <font-awesome-icon
                        icon="fa-solid fa-house" /></router-link>
                <router-link :to="{ name: 'Events' }"><span>Events</span> <font-awesome-icon
                        icon="fa-solid fa-calendar-days" /></router-link>
                <router-link :to="{ name: 'About' }"><span>About&Contact</span> <font-awesome-icon
                        icon="fa-solid fa-circle-info" /></router-link>
                <router-link :to="{ name: 'LoginRegister' }"><span>Account</span> <font-awesome-icon
                        icon="fa-solid fa-user" /></router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    setup() {

        return {}
    }
}
</script>

<style lang="scss" scoped>
.navbar__top {
    padding: 15px 0;

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            width: 340px;

            @media(min-width:768px) {
                width: 400px;
            }
        }
    }

    &__links {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100px;
        background: white;
        border-radius: 14px 14px 0 0;

        z-index: 2;
        justify-content: space-evenly;
        align-items: center;
        box-shadow: 1px -21px 83px -40px rgba(66, 68, 90, 1);

        @media(min-width:768px) {
            position: relative;
            height: unset;
            background: unset;
            justify-content: end;
        }

        display: flex;
        gap: 20px;

        a {
            @include link-mobile-nav;

            span {
                display: none;

                @media(min-width:768px) {
                    display: block;
                }
            }

            svg {
                display: block;
                background: $light-blue;
                padding: 17px;
                border-radius: 15px;
                color: $secondary-blue;

                @media(min-width:768px) {
                    display: none;
                }
            }

            &.router-link-active {
                font-weight: bold;
                color: $secondary-blue;

                svg {
                    background: $secondary-blue;
                    color: white;
                }
            }
        }
    }
}
</style>