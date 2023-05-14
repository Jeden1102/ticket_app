<template>
  <div class="container">
    <div class="image">
      <img src="@/assets/icons/money-return.svg" alt="Money return icon" />
    </div>
    <div class="content">
      <h4>Refund your ticket</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        ipsa omnis nihil in quia labore optio facilis aliquam voluptate
        similique.
      </p>
      <input type="text" v-model="code" placeholder="Enter ticket code" />
      <button @click="refundTicket">Refund ticket</button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useTicketsStore } from "../store/tickets";
export default {
  setup() {
    const ticketsStore = useTicketsStore();
    const code = ref(null);
    onMounted(() => {
      code.value = new URLSearchParams(window.location.search).get("code");
    });
    function refundTicket() {
      if (code.value === "") {
        return;
      }
      ticketsStore.refundTicket(code.value);
    }
    return {
      code,
      refundTicket,
      ticketsStore,
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  @include glass-card();
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  .image {
    img {
      max-height: 300px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    button {
      @include button-base($primary-blue, white);
      margin-top: 8px;
      width: fit-content;
    }
    input {
      @include profile-input;
    }
  }
}
</style>