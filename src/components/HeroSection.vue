<template>
  <div class="hero__section">
    <div class="hero__section__content">
      <div class="container">
        <img src="../assets/hero-section/festival.svg" alt="">
        <div class="content">
          <h2>Go<span>Tickets</span></h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore dicta impedit soluta vero nesciunt sequi
            modi cum ut suscipit. Molestiae nobis aut corrupti placeat mollitia sunt, ipsa quo autem tempora delectus
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hero__section {
  background: url('../assets/hero-section/hero-section-bg-1.jpg');
  min-height: calc(100vh - 97px);
  background-size: cover;
  background-repeat: no-repeat;

  &__content {
    width: 100%;
    min-height: calc(100vh - 97px);
    background: rgba(0, 0, 0, .7);
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
      display: flex;
      align-items: center;
      gap: 30px;
      background: white;
      border-radius: 20px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);

      img {
        max-width: 550px;
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
