<template>
  <div class="container">
    <div class="about__container">
      <div class="form__container">
        <h1><span>Get in</span> touch</h1>
        <p>Our friendly team would love to hear from you.</p>
        <form>
          <div class="flex">
            <div class="form__item">
              <label for="newsletter-email">
                <input v-model="eventName" type="text" id="newsletter-email" placeholder="Name">
                <span>Name</span>
              </label>
            </div>
            <div class="form__item">
              <label for="newsletter-email">
                <input v-model="eventName" type="text" id="newsletter-email" placeholder="Surname">
                <span>Surname</span>
              </label>
            </div>
          </div>
          <div class="form__item">
            <label for="newsletter-email">
              <input v-model="eventName" type="text" id="newsletter-email" placeholder="Email address">
              <span>Email address</span>
            </label>
          </div>
          <div class="form__item">
            <label for="newsletter-email">
              <input v-model="eventName" type="text" id="newsletter-email" placeholder="Phone number">
              <span>Phone number</span>
            </label>
          </div>
          <div class="form__item">
            <textarea resizable="false" name="" id="" placeholder="Hi! I'd like to ask for..."></textarea>
          </div>
          <div class="form__item form__item--checkbox">
            <div class="checkbox-wrapper-12">
              <div class="cbx">
                <input id="cbx-12" type="checkbox" />
                <label for="cbx-12"></label>
                <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <!-- Gooey-->
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
                    <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12">
                    </fecolormatrix>
                    <feblend in="SourceGraphic" in2="goo-12"></feblend>
                  </filter>
                </defs>
              </svg>
            </div>
            <label class="checkbox-label" for="cbx-12">I agree with policy.</label>
          </div>
          <button>Send Message</button>
        </form>
      </div>
      <div class="image__container">
        <img src="../assets/contact/contact.jpg" alt="">
      </div>
    </div>
    <div class="contact__boxes">
      <ContactBox v-for="box in boxes" :key="box.icon" :box="box" />
    </div>
    <div class="about__section">
      <h2>About the company</h2>
      <p>Learn more about the company and the team behind it.</p>
      <div class="content">
        <div class="content__image">
          <img src="../assets/contact/about.jpg" alt="">
        </div>
        <div class="content__content">
          <span>Plan, create, have fun!</span>
          <h2>We're only just getting started.</h2>
          <div class="content__achievements">
            <div v-for="achievement in achievements" :key="achievement.heading" class="achievement">
              <h3>{{ achievement.heading }}</h3>
              <p>{{ achievement.desc }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ContactBox from '../components/Contact/ContactBox.vue';
export default {
  components: {
    ContactBox
  },
  setup() {
    const boxes = [
      {
        title: 'Chat to sales',
        desc: 'Speak to our friendly team.',
        contact: 'sales@untitledui.com',
        icon: 'fa-brands fa-rocketchat',
      },
      {
        title: 'Chat to support',
        desc: 'We???re here to help.',
        contact: 'support@untitledui.com',
        icon: 'fa-regular fa-comments',
      },
      {
        title: 'Visit us',
        desc: 'Visit our office HQ.',
        contact: '100 Smith Street Collingwood VIC 3066 AU',
        icon: 'fa-solid fa-location-dot',
      },
      {
        title: 'Call us',
        desc: 'Mon-Fri from 8am to 5pm.',
        contact: '+1 (555) 000-0000',
        icon: 'fa-solid fa-phone',
      }
    ]
    const achievements = [
      {
        heading: "600+",
        desc: "Events completed",
      },
      {
        heading: "100k+",
        desc: "Events attendants",
      },
      {
        heading: "1200+",
        desc: "Events creators",
      },
      {
        heading: "2k+",
        desc: "Positive reviews",
      },
      {
        heading: "40+",
        desc: "Product owners",
      },
      {
        heading: "2+",
        desc: "Years guarancy",
      }
    ]

    return {
      boxes,
      achievements
    }
  }
}
</script>

<style lang="scss" scoped>
.about__container {
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media(min-width:992px) {
    flex-direction: row;
  }

  .form__container {
    @include glass-card();
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex: 1;

    h1 {
      @include base-heading();
    }

    form {
      margin-top: 48px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .flex {
        display: flex;
        gap: 12px;
      }
    }

    .form__item {
      @include floating-input-box();

      label {
        color: black;
      }

      .checkbox-wrapper-12 {
        @include checkbox();


      }

      textarea {
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 8px;
        min-height: 200px;
        padding: 12px;
        resize: none;
      }

      span {
        transform: unset;
        color: black;
        pointer-events: none;
      }

      input {
        color: black;
        font-weight: 500;
      }

      label:focus-within>span,
      input:not(:placeholder-shown)+span {
        transform: translateY(-15px);
        color: black;
      }

      &--checkbox {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .checkbox-label {
        border: none;
      }
    }

    button {
      @include button-primary();
    }
  }

  .image__container {
    flex: 1;
    display: flex;

    img {
      max-width: 600px;
      max-height: 700px;
      border-radius: 20px;
    }
  }


}

.contact__boxes {
  margin-top: 64px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.about__section {
  margin-top: 48px;

  h2 {
    font-size: 2rem;
    font-weight: 500;
  }

  p {
    margin-top: 12px;
  }

  .content {
    display: flex;
    flex-direction: column;
    margin-top: 48px;
    justify-content: space-between;
    align-items: center;
    gap: 24px;

    &__content {
      span {
        color: $secondary-blue;
        font-weight: 600;
        margin-bottom: 12px;
        display: block;
      }

      .content__achievements {
        margin-top: 24px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px;

        .achievement {
          h3 {
            font-size: 2.5rem;
            font-weight: 500;
            color: $secondary-blue;
          }
        }
      }
    }

    &__image {
      img {
        max-width: 500px;
        max-height: 600px;
        border-radius: 5px;
      }
    }

    @media(min-width:768px) {
      flex-direction: row;
    }
  }
}
</style>