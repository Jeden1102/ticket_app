<template>
  <div class="hero__search container">
    <div class="hero__search__box">
        <label for="">Event name</label>
        <input type="text">
        <span class="focus-border"></span>
    </div>
    <div class="hero__search__box">
        <label for="">Event Place</label>
        <input type="text">
    </div>
    <div class="hero__search__box">
        <label for="">Event Category</label>
        <VueMultiselect
        v-model="selected"
        :options="options">
        </VueMultiselect>
    </div>

  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
export default {
  components: { VueMultiselect },
  setup() {
    const selected = null;
    const options = ['Music', 'Concert', 'Stand-up','Rap battle','Others']
    return{
        selected,
        options
    }
  }
}
</script>
<style lang="scss" scoped>
    .hero__search{
        @include glass-card;
        padding:40px 20px;
        display:flex;
        justify-content: space-around;
        transform: translateY(100px);
        &__box{
            display: flex;
            flex-direction: column;
            gap:8px;
            label{
                color:white;
            }
        }
    }
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>