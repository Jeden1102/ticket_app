<template>
    <div class="faq__container container">
        <div class="faq__container__header">
            <span>The FAQs</span>
            <h1>Help Centre</h1>
            <p>Everything you need to know about the product and billing.</p>
        </div>
        <div class="faq__container__content">
            <div class="desc">
                <span>Support</span>
                <h2>FAQs</h2>
                <p>Everything you need to know about the product and billing. Can’t find the answer you’re looking for?
                    Please chat to our friendly team.</p>
            </div>
            <div class="content">
                <div class="faq__box" v-for="faq in faqsStore.faqs" :key="faq.id">
                    <h4 @click="expand(faq.id)">{{ faq.attributes.question }} <font-awesome-icon
                            :icon="currentExpanded == faq.id ? 'fa-solid fa-minus' : 'fa-solid fa-plus'" /></h4>
                    <TransitionGroup name="list" tag="p">
                        <p v-if="currentExpanded == faq.id" v-html="faq.attributes.answer"></p>
                    </TransitionGroup>
                </div>
            </div>
        </div>
        <div class="faq__container__bottom">
            <h2>Still have questions?</h2>
            <p>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
            <router-link :to="{ name: 'About' }">
                <span>Get in touch</span>
            </router-link>
        </div>
    </div>
</template>

<script>
import { useFaqsStore } from '../store/faqs';
import { onMounted, ref } from 'vue';
export default {
    setup() {
        const faqsStore = useFaqsStore();
        const currentExpanded = ref(null);
        function expand(id) {
            if (currentExpanded.value === id) {
                currentExpanded.value = null;
                return;
            }
            currentExpanded.value = id;
        }
        onMounted(() => {
            faqsStore.getFaqs()
        })
        return {
            faqsStore,
            expand,
            currentExpanded
        }
    }
}
</script>

<style lang="scss" scoped>
.faq__container {
    span {
        color: $secondary-blue;
        font-weight: 600;
    }

    &__header {
        padding-bottom: 64px;
        border-bottom: 1px solid rgb(204, 204, 204);


        h1 {
            margin: 8px 0 24px 0;
            font-size: 48px;
            font-weight: 600;
        }
    }

    &__content {
        display: flex;
        gap: 24px;
        margin-top: 24px;
        flex-direction: column;

        @media(min-width:768px) {
            flex-direction: row;
        }

        h2 {
            margin: 8px 0 24px 0;
            text-align: left;
            font-weight: bold;
            font-size: 48px;
        }

        .content {
            display: flex;
            flex-direction: column;
            gap: 16px;

            .list-move,
            /* apply transition to moving elements */
            .list-enter-active,
            .list-leave-active {
                transition: all 0.5s ease;
            }

            .list-enter-from,
            .list-leave-to {
                opacity: 0;
                transform: translateY(30px);
            }

            /* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
            .list-leave-active {
                position: absolute;
            }
        }

        .desc,
        .content {
            width: 100%;

            @media(min-width:768px) {
                width: 50%;
            }

            .faq__box {
                h4 {
                    font-weight: 600;
                    font-size: 1.1rem;
                    margin: 6px 0;
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer;
                }

                p {
                    font-weight: 300;
                    max-width: 500px;
                }
            }
        }
    }

    &__bottom {
        margin-top: 48px;

        h2 {
            font-size: 2rem;
        }

        p {
            margin-top: 12px;
        }

        a {
            display: flex;
            align-items: center;
            max-width: 200px;
            justify-content: center;
            margin-top: 16px;

            span {
                color: white;
            }

            @include button-primary();
        }
    }
}
</style>