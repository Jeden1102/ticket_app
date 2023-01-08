<template>
    <div class="container blogs__container">
        <h2>Blogs</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur tenetur libero assumenda expedita officia
            optio?</p>
        <div class="blogs">
            <div v-for="blog in blogsStore.blogs" :key="blog.id" class="blog">
                <img :src="getImageURL(blog)" alt="">
                <div class="blog__content">
                    <h2>{{ blog.attributes.title }}</h2>
                    <p v-html="blog.attributes.content.slice(0, 180) + '...'"></p>
                    <div class="badge">
                        <p>{{ blog.attributes.created_date }}</p>
                    </div>
                </div>
            </div>
        </div>
        <router-link class="read__all__btn" :to="{name:'Home'}"><span>Read All</span></router-link>
    </div>
</template>

<script>
import { useBlogsStore } from '../../store/blog';
import { onMounted } from 'vue';

export default {
    setup() {
        const blogsStore = useBlogsStore();
        onMounted(() => {
            blogsStore.getBlogs()
        })
        function getImageURL(review) {
            return `${process.env.VUE_APP_IMAGES_API}${review.attributes.image.data.attributes.url}`;
        }
        return {
            blogsStore,
            getImageURL
        }
    }
}
</script>

<style lang="scss" scoped>
.blogs__container {
    margin-top: 76px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .read__all__btn{
        @include button-base($secondary-blue,white);
        width:fit-content;
        margin:0 auto;
        display:flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;
        min-width:300px;
    }

    h2 {
        @include base-heading;
    }

    p {
        text-align: center;
    }

    .blogs {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 28px;
        margin-top: 16px;

        .blog {
            max-width: 300px;
            @include glass-card;
            padding: 0;
            position:relative;
            cursor: pointer;
            transition: transform .2s;
            &:hover{
                transform: translateY(-4px);
            }

            &__content {
                padding: 20px;
                display:flex;
                flex-direction: column;
                gap:8px;
            }

            h2 {
                font-size: 1.2rem;
                color: #0A075F;
                font-weight: 600;
            }

            img {
                width: 100%;
                border-radius: 20px;
            }
            .badge{
                position: absolute;
                right:10px;
                top:10px;
                @include badge-base(rgb(163, 163, 163),white);
            }
        }
    }
}
</style>