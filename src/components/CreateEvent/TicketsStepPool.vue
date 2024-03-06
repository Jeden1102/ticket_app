<template>
  <div class="pool">
    <h4 class="pool__title">
      #{{ poolNr }} <font-awesome-icon icon="fa-solid fa-ticket" />
    </h4>
    <div class="pool__content">
      <div class="pool__content__box--flex">
        <div>
          <label for="">Ticket type</label>
          <VueMultiselect
            :showLabels="false"
            v-model="createEventStore.ticketPools[poolNr - 1].types"
            :options="ticketSettings.types"
          ></VueMultiselect>
        </div>
        <div>
          <label for="">Ticket variant</label>
          <VueMultiselect
            :showLabels="false"
            v-model="createEventStore.ticketPools[poolNr - 1].variant"
            :options="ticketSettings.variant"
          ></VueMultiselect>
        </div>
      </div>
      <div class="pool__content__box--flex">
        <div>
          <label for="">Price</label>
          <input
            type="text"
            v-model="createEventStore.ticketPools[poolNr - 1].price"
          />
        </div>
        <div>
          <label for="">Pool amount</label>
          <input
            type="text"
            v-model="createEventStore.ticketPools[poolNr - 1].amount"
          />
        </div>
      </div>
    </div>
    <button
      v-if="createEventStore.ticketPools.length > 1"
      @click="removePool"
      class="pool__remove"
    >
      Remove
    </button>
  </div>
</template>

<script>
import { useCreateEventStore } from "../../store/create_event";
import { ref } from "vue";
import VueMultiselect from "vue-multiselect";

export default {
  components: {
    VueMultiselect,
  },
  props: {
    poolNr: {
      type: Number,
      required: true,
    },
    poolID: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const createEventStore = useCreateEventStore();
    const ticketSettings = {
      types: ["vip", "seated", "standed", "table", "plate"],
      variant: ["normal", "reduced"],
    };
    const poolValues = ref({
      types: null,
      variant: null,
      price: null,
      amount: null,
    });

    function removePool() {
      createEventStore.removePool(props.poolID);
    }
    return { removePool, createEventStore, ticketSettings, poolValues };
  },
};
</script>

<style lang="scss" scoped>
.pool {
  @include glass-card;
  box-shadow: 0 3px 9px 0 rgb(31 38 111 / 37%);
  position: relative;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    &__box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      input {
        max-height: 40px;
      }
      &--flex {
        display: flex;
        gap: 40px;
        div {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
      }
    }
  }
  &__remove {
    position: absolute;
    right: 20px;
    top: 20px;
    @include badge-base(rgb(255, 75, 75), white);
  }
}
</style>