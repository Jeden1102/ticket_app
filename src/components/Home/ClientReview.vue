<template>
    <div class="client__review">
        <div class="client__review__image">
            <img :src="getImageURL(review)" alt="">
        </div>
        <div class="client__review__content">
            <h3 class="title">
                {{ review.attributes.title }}
            </h3>
            <h5 class="desc" v-html="review.attributes.description">
            </h5>
            <div class="event">
                <p class="event_title">{{ review.attributes.event.data.attributes.Title }}</p>
                <p class="event_location">{{ review.attributes.event.data.attributes.Location }}</p>
                <p class="event_data">{{ formatDate(review.attributes.event.data.attributes.Date) }}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['review'],
    setup() {
        function getImageURL(review) {
            return `${process.env.VUE_APP_IMAGES_API}${review.attributes.image.data.attributes.url}`;
        }
        function formatDate(date) {
            const newDate = new Date(date);
            const month = newDate.toLocaleString('default', { month: 'long' });
            const day = newDate.getDay();
            const year = newDate.getFullYear();
            return `${day} ${month} ${year}`
        }
        return {
            getImageURL,
            formatDate
        }
    }
}
</script>

<style lang="scss" scoped>
.client__review {
    width: 100%;
    margin: 0 5px;

    @media(min-width:992px) {
        display: flex;
        align-items: center;
        padding: 30px 0;
    }

    &__image {
        img {
            width: 100%;
            max-width: 550px;
            border-radius: 15px;

            @media(min-width:992px) {
                height: 90%;
            }
        }
    }

    &__content {
        @include glass-card;
        display: flex;
        gap: 6px;
        flex-direction: column;
        width: 90%;
        transform: translateY(-50px);
        margin: 0 auto;

        @media(min-width:992px) {
            transform: translate(-50px, 0);
            max-width: 650px;
        }

        .title {
            font-size: 1.2rem;
            font-weight: bold;
        }

        .desc {
            font-weight: 200;
        }

        .event {
            display: flex;
            flex-direction: column;
            gap: 5px;

            @media(min-width:768px) {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                margin-top: 20px;
            }

            .event_title {
                @include badge-base($secondary-blue, white);

                @media(min-width:768px) {
                    width: fit-content;
                }
            }
        }

    }
}
</style>