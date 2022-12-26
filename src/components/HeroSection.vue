<template>
  <div class="hero__section">
    <div class="hero__section__content">
      <div class="container container-override">
        <img src="../assets/hero-section/festival.svg" alt="">
        <div class="content">
          <h2>Go<span>Tickets</span></h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore dicta impedit soluta vero nesciunt sequi
            modi cum ut suscipit. <span class="bold">Molestiae nobis aut corrupti placeat mollitia sunt</span>, ipsa quo autem tempora delectus
            minima magni laudantium iure quisquam debitis beatae excepturi explicabo!
          </p>
          <div class="hero__buttons">
            <button class="hero__btn hero__btn--events">
              Events list <font-awesome-icon icon="phone" />
            </button>
            <button class="hero__btn hero__btn--create-event">
              Create an event
            </button>
          </div>
        </div>
      </div>
    <HeroSectionSearch/>
    </div>
  </div>
</template>

<script>
import HeroSectionSearch from '@/components/HeroSectionSearch.vue';
export default {
  name: 'HeroSection',
  components:{
    HeroSectionSearch
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hero__section {
  background: url('../assets/hero-section/hero-section-bg-1.jpg');
  min-height: calc(85vh - 97px);
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 100px;

  &__content {
    width: 100%;
    min-height: calc(85vh - 97px);
    background: rgba(0, 0, 0, .7);
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

    .container-override {
      display: flex;
      align-items: center;
      gap: 30px;
      @include glass-card;
      flex-direction: column;
      margin:15px 15px;
      @media(min-width:992px){
        flex-direction: row;
      }

      img {
        max-width: 500px;
        width: 100%;
      }

      .content {
        border-radius: 20px;
        color: white;

        h2 {
          font-size: 3rem;

          span {
            font-weight: bold;
          }
        }

        p {
          font-size: 1.3rem;
          letter-spacing: 2px;
        }

        .hero__buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;

          .hero__btn {
            &--events {
              @include button-primary;
            }

            &--create-event {
              @include button-white;
            }
          }
        }

        display: flex;
        flex-direction: column;
        gap:30px;
      }
    }
  }
}
</style>
