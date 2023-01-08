<template>
    <div class="events__routing container">
        <router-link :to="{ name: 'EventsMap' }">
            <p>Event map</p>
            <img src="../assets/events/event-map.svg" alt="">
        </router-link>
        <router-link :to="{ name: 'EventsList' }">
            <p>Event list</p>
            <img src="../assets/events/event-list.svg" alt="">
        </router-link>
    </div>
    <div class="events__view container">
        <router-view></router-view>
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
.events__routing {
    display:flex;
    gap:24px;
    justify-content: center;
    flex-direction: column;
    @media(min-width:768px){
        flex-direction: row;
    }
    a {
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:24px;
        @include glass-card;
        transition: .2s;
        &.router-link-active{
            background: $secondary-blue;
            color:white;
            font-weight: 500;
        }
        &:hover{
            transform: translateY(-4px);
        }
        p{
            font-size:1.5rem;
        }
        img{
            max-height: 250px;
            width:100%;
        }
    }
}
</style>