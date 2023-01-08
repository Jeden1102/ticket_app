<template>
    <div class="footer">
        <div class="footer__content">
            <div class="footer__content__col">
                <div class="footer__item footer__item--title">
                    <img src="../assets/logo.png" alt="">
                </div>
                <div class="footer__item">
                    GoTickets is a global self-service ticketing platform for live experiences that allows anyone to
                    create, share, find and attend events that fuel their passions and enrich their lives.
                </div>
                <div class="footer__item footer__item--brands">
                    <a href="#"><font-awesome-icon icon="fa-brands fa-facebook" /></a>
                    <a href="#"><font-awesome-icon icon="fa-brands fa-instagram" /></a>
                    <a href="#"><font-awesome-icon icon="fa-brands fa-pinterest" /></a>
                </div>
            </div>
            <div class="footer__content__col">
                <div class="footer__item footer__item--title">
                    Plan events
                </div>
                <div class="footer__item footer__item--links">
                    <router-link :to="{ name: 'Home' }">Events list</router-link>
                    <router-link :to="{ name: 'Home' }">Create event</router-link>
                    <router-link :to="{ name: 'Home' }">Event map</router-link>
                    <router-link :to="{ name: 'Home' }">Refund ticket</router-link>
                </div>
            </div>
            <div class="footer__content__col">
                <div class="footer__item footer__item--title">
                    GoTickets
                </div>
                <div class="footer__item footer__item--links">
                    <router-link :to="{ name: 'Home' }">About us</router-link>
                    <router-link :to="{ name: 'Home' }">Press</router-link>
                    <router-link :to="{ name: 'Home' }">FAQ</router-link>
                    <router-link :to="{ name: 'Home' }">Help Center</router-link>
                    <router-link :to="{ name: 'Home' }">Privacy&Terms</router-link>
                </div>
            </div>
            <div class="footer__content__col">
                <div class="footer__item footer__item--title">
                    Stay in the loop
                </div>
                <div class="footer__item">
                    Join our mailing list to stay in the loop with our newest for Event and concert
                </div>
                <div class="footer__item footer__item--newsletter">
                    <label for="newsletter-email">
                        <input v-model="eventName" type="text" id="newsletter-email" placeholder="Email address">
                        <span>E-mail address</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="footer__copy">
            Copyright &copy; 2023 jeden1102 all right reserved.
        </div>
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
.footer {
    margin-top: 48px;
    background: #0A075F;
    padding: 25px 50px 15px 50px;

    @media(min-width:992px) {
        padding: 45px 75px 15px 75px;
    }

    &__content {
        display: grid;
        justify-content: center;
        gap: 50px;
        grid-template-columns: 1fr;

        @media(min-width:768px) {
            grid-template-columns: 1fr 1fr;
        }

        @media(min-width:992px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        &__col {
            max-width: 400px;

            .footer__item {
                color: white;
                font-weight: 300;

                a {
                    color: white;
                    transition: all .2s;

                    &:hover {
                        font-weight: 400;
                    }
                }

                &--newsletter {
                    @include floating-input-box;

                    span {
                        transform: unset;
                    }

                    label:focus-within>span,
                    input:not(:placeholder-shown)+span {
                        transform: translateY(-15px);
                    }
                }

                &--links {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                &--title {
                    margin-bottom: 24px;
                    font-size: 1.1rem;
                    font-weight: 600;
                }

                &--brands {
                    margin-top: 24px;
                    display: flex;
                    gap: 12px;
                    font-size: 24px;

                    a {
                        color: white;
                    }

                    svg {
                        cursor: pointer;
                        transition: transform .2s;

                        &:hover {
                            transform: translateY(-2px);
                        }
                    }
                }
            }

            display: flex;
            flex-direction: column;
        }

        img {
            width: 200px;
        }
    }

    &__copy {
        border-top: 1px solid rgb(151, 151, 151);
        padding-top: 12px;
        text-align: center;
        color: white;
        font-weight: 300;
        font-size: .7rem;
        margin-top: 48px;
    }
}
</style>