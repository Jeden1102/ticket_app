<template>
  <div class="event__card">
    <div class="event__card__image">
      <img :src="getImageURL(event)" alt="" />
      <div class="event__card__badges">
        <div v-if="event.attributes.Featured" class="event__card__featured">
          Featured
          <font-awesome-icon icon="fa-solid fa-fire" />
        </div>
        <div class="event__card__date">
          {{ formatDate(event.attributes.Date) }}
          <font-awesome-icon icon="fa-solid fa-calendar-days" />
        </div>
      </div>
    </div>
    <div class="event__card__content">
      <h2>{{ event.attributes.Title }}</h2>
      <div class="flex">
        <div class="event__card__content__category">
          {{ event.attributes.event_category.data.attributes.Name }}
        </div>
        <div
          v-if="event.attributes.attendants"
          class="event__card__content__attendants"
        >
          <div class="avatars">
            <div v-for="avatar in randomAvatars()" class="avatar" :key="avatar">
              <img :src="require(`@/assets/avatars/${avatar}`)" alt="" />
            </div>
          </div>
          <p>going {{ event.attributes.attendants }}</p>
        </div>
      </div>
      <div class="flex">
        <div class="event__card__content__location">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"
            />
          </svg>
          {{ event.attributes.Location }}
        </div>
        <div class="event__card__content__favorites">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["event"],
  setup() {
    function getImageURL(event) {
      if (!event.attributes.Main_image) {
        return "";
      }
      return `${process.env.VUE_APP_IMAGES_API}${
        event.attributes.Images.data[event.attributes.Main_image].attributes.url
      }`;
    }
    function formatDate(date) {
      const newDate = new Date(date);
      const month = newDate.toLocaleString("default", { month: "short" });
      const day = newDate.getDay();
      return `${day} ${month}`;
    }
    function randomAvatars() {
      let arr = [];
      for (let i = 0; i < 3; i++) {
        let rand = Math.floor(Math.random(0, 1) * 6) + 1;
        arr.push(`profile${rand}.jpg`);
      }
      return arr;
    }
    return {
      getImageURL,
      formatDate,
      randomAvatars,
    };
  },
};
</script>

<style lang="scss" scoped>
.event__card {
  width: 100%;
  @include glass-card;
  padding: 0;
  box-shadow: unset;
  border: 1px solid rgb(226, 226, 226);
  margin: 0 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.01);
    border: 1px solid rgb(211, 211, 211);
    transition: 0.2s;
  }

  &__image {
    width: 100%;
    height: 200px;
    position: relative;

    img {
      border-radius: 20px 20px 0 0;
      width: 100%;
      height: 100%;
    }
  }

  &__badges {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__featured {
    @include badge-base(rgb(255, 85, 85), white);
    font-weight: 600;
  }

  &__date {
    @include badge-base(rgb(85, 159, 255), white);
    font-weight: 600;
  }

  &__content {
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    h2 {
      font-weight: 600;
      font-size: 1.3rem;
      text-align: left;
    }

    .flex {
      align-items: center;
      justify-content: space-between;
    }

    &__category {
      @include badge-base($secondary-blue, $secondary-blue);
      background: white;
    }

    &__location {
      display: flex;
      align-items: center;
      gap: 6px;

      svg {
        fill: $secondary-blue;
        width: 15px;
      }
    }

    &__favorites {
      svg {
        width: 20px;
        fill: $secondary-blue;
      }
    }

    &__attendants {
      display: flex;
      gap: 8px;
      align-items: center;

      p {
        font-weight: 200;
      }

      .avatars {
        display: flex;
        transform: translateX(30px);

        .avatar {
          height: 32px;
          width: 32px;
          border-radius: 50%;
          border: 2px solid $secondary-blue;
          transform: translateX(-15px);

          &:first-child {
            transform: none;
          }

          &:last-child {
            transform: translateX(-30px);
          }

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>