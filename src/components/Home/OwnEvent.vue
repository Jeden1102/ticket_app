<template>
    <div class="own__event">
        <div class="own__event__container container">
            <div class="image">
                <img src="../../assets/home/create_event.svg" alt="">
            </div>
            <div class="content">
                <h2>Make your own event</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, quod? Omnis quaerat architecto tempore
                    nulla eos quisquam reprehenderit harum placeat!</p>
                <button>Create event</button>
            </div>
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
.own__event {
    background: $secondary-blue;
    padding: 15px;

    @media(min-width:992px) {
        margin-top:100px;
    }

    &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 70px;

        .image {
            flex: 1;

            img {
                width: 100%;
                max-width: 400px;

                @media(min-width:768px) {
                    transform: scale(1.4) translateY(-20px);
                }
            }
        }

        .content {
            flex: 1;
            color: white;
            display: flex;
            flex-direction: column;
            gap: 12px;

            h2 {
                font-size: 2rem;
            }

            button {
                @include button-base(white, $secondary-blue);
                width: fit-content;
            }
        }

        @media(min-width:768px) {
            flex-direction: row;
        }
    }
}
</style>