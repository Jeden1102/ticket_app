<template>
    <div class="account__container container">
        <TransitionGroup name="list">
            <div class="account__container__main">
                <h1>Profile</h1>
                <div class="account__container__header" :class="{ 'account__container__header--collapsed': !fullMenu }">
                    <img src="@/assets/avatars/avatar.svg" alt="">
                    <div v-if="fullMenu" class="details">
                        <h2>{{ authStore.user.username }}</h2>
                        <h3>{{ authStore.user.email }}</h3>
                    </div>
                </div>
                <div class="account__container__links" :class="{ 'account__container__links--collapsed': !fullMenu }">
                    <router-link :to="{ name: 'Profile' }">
                        <div class="icon"><font-awesome-icon icon="fa-solid fa-user" /></div>
                        <div v-if="fullMenu">
                            <p>My Account</p>
                            <span>Change your account details</span>
                        </div>
                        <span v-if="fullMenu" class="show__more">&gt;</span>
                    </router-link>
                    <router-link :to="{ name: 'DangerZone' }">
                        <div class="icon"><font-awesome-icon icon="fa-solid fa-triangle-exclamation" /></div>
                        <div v-if="fullMenu">
                            <p>Danger Zone</p>
                            <span>Change password & delete account</span>
                        </div>
                        <span v-if="fullMenu" class="show__more">&gt;</span>
                    </router-link>
                    <router-link :to="{ name: 'Statistics' }">
                        <div class="icon"><font-awesome-icon icon="fa-solid fa-chart-line" /></div>
                        <div v-if="fullMenu">
                            <p>Statistics</p>
                            <span>Check your stats!</span>
                        </div>
                        <span v-if="fullMenu" class="show__more">&gt;</span>
                    </router-link>
                    <router-link :to="{ name: 'AccountEvents' }">
                        <div class="icon"><font-awesome-icon icon="fa-solid fa-calendar-days" /></div>
                        <div v-if="fullMenu">
                            <p>Events</p>
                            <span>Everything about your events</span>
                        </div>
                        <span v-if="fullMenu" class="show__more">&gt;</span>
                    </router-link>
                </div>
                <p class="others">More</p>
                <div class="account__container__links" :class="{ 'account__container__links--collapsed': !fullMenu }">
                    <router-link :to="{ name: 'Settings' }">
                        <div class="icon"><font-awesome-icon icon="fa-solid fa-gear" /></div>
                        <div v-if="fullMenu">
                            <p>Settings</p>
                            <span>Customize your app</span>
                        </div>
                        <span v-if="fullMenu" class="show__more">&gt;</span>
                    </router-link>
                    <router-link :to="{ name: 'Help' }">
                        <div class="icon"><font-awesome-icon icon="fa-solid fa-circle-info" /></div>
                        <div v-if="fullMenu">
                            <p>Help</p>
                            <span>Need some help?</span>
                        </div>
                        <span v-if="fullMenu" class="show__more">&gt;</span>
                    </router-link>
                </div>
                <button @click="logout" class="logout__btn">
                    <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
                    <span v-if="fullMenu">Logout</span>
                </button>
            </div>
            <div class="account__container__view">
                <router-view class="about__view" :user="authStore.user" v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
                <router-link v-if="!fullMenu" class="back__btn" :to="{ name: 'Account' }">
                    <span class="show__more">&lt;</span>
                    <p>Return</p>
                </router-link>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import { useAuthStore } from '../store/auth';
import router from '../router';
import { computed } from 'vue';
export default {
    setup() {
        const authStore = useAuthStore();
        function logout() {
            authStore.logout()
        }
        const fullMenu = computed(() => {
            return (router.currentRoute.value.path === "/account" || router.currentRoute.value.path === "/account/") || window.innerWidth > 992;
        })
        return {
            authStore,
            logout,
            fullMenu
        }
    }
}
</script>

<style lang="scss" scoped>
.account__container {
    display: flex;
    gap: 12px;

    @media(max-width:768px) {
        width: calc(100% - 20px);
    }

    @media(min-width:1200px) {
        gap: 64px;
    }

    h1 {
        font-size: 24px;
        font-weight: 500;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    &__header {
        background: $secondary-blue;
        border-radius: 8px;
        padding: 12px;
        margin: 12px 0;
        box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
        display: flex;
        align-items: center;
        gap: 24px;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid white;
        }

        h2,
        h3 {
            color: white;
        }

        h3 {
            font-size: .85rem;
            font-weight: 200;
            margin-top: 4px;
        }

        &--collapsed {
            img {
                width: 30px;
                height: 30px;
                margin: 0 auto;
            }
        }
    }

    p.others {
        margin: 16px 0;
        font-size: 1.2rem;
        font-weight: 500;
    }

    .logout__btn {
        @include button-base($primary-blue, white);
        width: 100%;
        margin-top: 16px;
    }

    &__links {
        display: flex;
        flex-direction: column;
        @include glass-card;

        a {
            height: 64px;
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 4px 12px;
            border-radius: 8px;
            transition: .2s;

            &.router-link-active {
                background: rgba(158, 176, 233, 0.2);
            }

            &:hover {
                transition: .2s;
                background: rgba(121, 150, 237, .2);

                .show__more {
                    transition: .2s;
                    transform: translateX(3px);
                }
            }

            p {
                font-weight: 500;
                margin-bottom: 4px;
            }

            span {
                font-weight: 200;
                font-size: .85rem;
            }

            .icon {
                width: 35px;
                height: 35px;
                background: $secondary-blue;
                display: grid;
                place-content: center;
                border-radius: 50%;

                svg {
                    color: white;
                    width: 35px;
                }
            }

            .show__more {
                transition: .2s;
                font-size: 1.3rem;
                margin-left: auto;
                font-weight: 500;
            }
        }

        &--collapsed {
            padding: 4px 3px;
        }
    }

    &__view {
        width: 100%;
        max-width: 550px;

        .about__view {
            max-width: 550px;
        }

        .back__btn {
            display: flex;
            @include button-base($secondary-blue, white);
            height: fit-content;
            gap: 12px;
            padding: 6px;
            position: fixed;
            right: 0;
            bottom: 110px;
            width: 100px;
            justify-content: center;
            align-items: center;
            height: 40px;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>