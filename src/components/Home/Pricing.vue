<template>
    <div class="pricing container">
        <h2>Our <span>pricing</span></h2>
        <div class="pricing__toggle">
            {{ pricingLabel }}
            <Toggle v-model="pricingType" @change="changePricing"/>
        </div>
        <div class="cards" v-if="pricingStore.pricings">
            <div class="card shadow">
                <ul>
                    <li class="pack">{{ pricings.pricingRest[0].attributes.title }}</li>
                    <li id="basic" class="price bottom-bar">&dollar;
                        <number ref="number1"
                            :from="fromNumber(pricings.pricingRest[0].attributes.price_month, pricings.pricingRest[0].attributes.price_year)"
                            :to="toNumber(pricings.pricingRest[0].attributes.price_month, pricings.pricingRest[0].attributes.price_year)"
                            :duration="3" :delay="0" easing="Power1.easeOut" />
                    </li>
                    <li class="bottom-bar">{{ pricings.pricingRest[0].attributes.max_customers }}  customers max</li>
                    <li class="bottom-bar">{{ pricings.pricingRest[0].attributes.max_events }}  events max</li>
                    <li class="bottom-bar">{{ pricings.pricingRest[0].attributes.max_admins }} Admins Allowed </li>
                    <li class="bottom-bar">{{ pricings.pricingRest[0].attributes.margin }} % / ticket margin</li>
                    <li  class="bottom-bar">
                        <font-awesome-icon v-if="pricings.pricingRest[0].attributes.custom_seats" icon="fa-solid fa-check" />
                        <font-awesome-icon v-else icon="fa-solid fa-x" />
                        Custom seats
                    </li>
                    <li class="bottom-bar">
                        <font-awesome-icon v-if="pricings.pricingRest[0].attributes.config_help" icon="fa-solid fa-check" />
                        <font-awesome-icon v-else icon="fa-solid fa-x" />
                        Configuration help
                    </li>
                    <li><button class="btn">Try now!</button></li>
                </ul>
            </div>
            <div class="card active">
                <ul>
                    <li class="pack">{{ pricings.pricingMain[0].attributes.title }}</li>
                    <li id="basic" class="price bottom-bar">&dollar;
                        <number ref="number1"
                            :from="fromNumber(pricings.pricingMain[0].attributes.price_month, pricings.pricingMain[0].attributes.price_year)"
                            :to="toNumber(pricings.pricingMain[0].attributes.price_month, pricings.pricingMain[0].attributes.price_year)"
                            :duration="3" :delay="0" easing="Power1.easeOut" />
                    </li>
                    <li class="bottom-bar">{{ pricings.pricingMain[0].attributes.max_customers }} customers max</li>
                    <li class="bottom-bar">{{ pricings.pricingMain[0].attributes.max_events }} events max</li>
                    <li class="bottom-bar">{{ pricings.pricingMain[0].attributes.max_admins }} Admins Allowed </li>
                    <li class="bottom-bar">{{ pricings.pricingMain[0].attributes.margin }} % / ticket margin</li>
                    <li  class="bottom-bar">
                        <font-awesome-icon v-if="pricings.pricingMain[0].attributes.custom_seats" icon="fa-solid fa-check" />
                        <font-awesome-icon v-else icon="fa-solid fa-x" />
                        Custom seats
                    </li>
                    <li class="bottom-bar">
                        <font-awesome-icon v-if="pricings.pricingMain[0].attributes.config_help" icon="fa-solid fa-check" />
                        <font-awesome-icon v-else icon="fa-solid fa-x" />
                        Configuration help
                    </li>
                    <li><button class="btn active-btn">Try now!</button></li>
                </ul>
            </div>
            <div class="card shadow">
                <ul>
                    <li class="pack">{{ pricings.pricingRest[1].attributes.title }}</li>
                    <li id="basic" class="price bottom-bar">&dollar;
                        <number ref="number1"
                            :from="fromNumber(pricings.pricingRest[1].attributes.price_month, pricings.pricingRest[1].attributes.price_year)"
                            :to="toNumber(pricings.pricingRest[1].attributes.price_month, pricings.pricingRest[1].attributes.price_year)"
                            :duration="3" :delay="0" easing="Power1.easeOut" />
                    </li>
                    <li class="bottom-bar">{{ pricings.pricingRest[1].attributes.max_customers }} customers max</li>
                    <li class="bottom-bar">{{ pricings.pricingRest[1].attributes.max_events }} events max</li>
                    <li class="bottom-bar">{{ pricings.pricingRest[1].attributes.max_admins }} Admins Allowed </li>
                    <li class="bottom-bar">{{ pricings.pricingRest[1].attributes.margin }} % / ticket margin</li>
                    <li  class="bottom-bar">
                        <font-awesome-icon v-if="pricings.pricingRest[1].attributes.custom_seats" icon="fa-solid fa-check" />
                        <font-awesome-icon v-else icon="fa-solid fa-x" />
                        Custom seats
                    </li>
                    <li class="bottom-bar">
                        <font-awesome-icon v-if="pricings.pricingRest[1].attributes.config_help" icon="fa-solid fa-check" />
                        <font-awesome-icon v-else icon="fa-solid fa-x" />
                        Configuration help
                    </li>
                    <li><button class="btn">Try now!</button></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Toggle from '@vueform/toggle'
import { usePricingStore } from '../../store/pricing';
export default {
    components: {
        Toggle,
    },
    data() {
        return {
        pricingType :false,
        pricingStore : usePricingStore()
        }
    },
    computed:{
        pricingLabel(){
            return this.pricingType ? 'Yearly' : 'Monthly'
        },
        pricings(){
            if (!this.pricingStore.pricings) {
                return false;
            }
            return {
                pricingMain: this.pricingStore.pricings.filter(pricing => pricing.attributes.main === true),
                pricingRest: this.pricingStore.pricings.filter(pricing => pricing.attributes.main === false),
            }
        }
    },
    mounted() {
        this.pricingStore.getPricings()
    },
    methods: {
         fromNumber(monthly,yearly){
            return this.pricingType ? yearly : monthly;
        },
         toNumber(monthly,yearly){
            return this.pricingType ? yearly : monthly;
        },
    },
}
</script>
<style src="@vueform/toggle/themes/default.css">

</style>
<style lang="scss" scoped>
.pricing {
    margin-top: 64px;

    h2 {
        @include base-heading();
        margin-bottom: 32px;
    }

    &__toggle {
        display: flex;
        justify-content: center;
        gap: 16px;
        align-items: center;
    }
}

.sub {
    background: linear-gradient(135deg,
            rgba(163, 168, 240, 1) 0%,
            rgba(105, 111, 221, 1) 100%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 1.6rem;
    width: 3.3rem;
    border-radius: 1.6rem;
    padding: 0.3rem;
}

.circle {
    background-color: #fff;
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 50%;
}

.checkbox:checked+.sub {
    justify-content: flex-end;
}

.cards {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 0;
    flex-direction: row;
}

.card {
    background: #fff;
    color: hsl(233, 13%, 49%);
    border-radius: 0.8rem;
    width:100%;
}

.cards .card.active {
    background: linear-gradient(135deg,
            rgba(163, 168, 240, 1) 0%,
            rgba(105, 111, 221, 1) 100%);
    color: #fff;
    display: flex;
    align-items: center;
    transform: scale(1.1);
    z-index: 1;
}

ul {
    margin: 2.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width:70%;
    margin:0 auto;
}

ul li {
    list-style-type: none;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 1rem 0;
}

ul li.price {
    font-size: 3rem;
    color: hsl(232, 13%, 33%);
    padding-bottom: 2rem;
}

.shadow {
    box-shadow: -5px 5px 15px 1px rgba(0, 0, 0, 0.1);
}

.card.active .price {
    color: #fff;
}

.btn {
    margin-top: 1rem;
    @include button-base($secondary-blue,white);
}

.active-btn {
    @include button-base(white,$secondary-blue);
}

.bottom-bar {
    border-bottom: 2px solid hsla(240, 8%, 85%, 0.582);
    display:flex;
    gap:10px;
}

.card.active .bottom-bar {
    border-bottom: 2px solid hsla(240, 8%, 85%, 0.253);
}

.pack {
    font-size: 1.1rem;
}


@media  (max-width: 768px) {
    .card {
        margin-bottom: 1rem;
        margin-right: 1rem;
    }

    .cards .card.active {
        transform: scale(1);
    }
    .cards{
        flex-direction: column;
    }
}

@media (min-width: 768px) and (max-width: 1046px) {
    .cards {
        display: flex;
        flex-direction: row;
    }

    .card {
        margin-bottom: 1rem;
        margin-right: 1rem;
    }

    .cards .card.active {
        transform: scale(1);
    }
}
</style>