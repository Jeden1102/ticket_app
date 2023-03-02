<template>
  <div class="restricted">
    <p>
      This feature is avaiable only for <b>{{ group }}</b> users.
    </p>
    <button>Upgrade plan</button>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.restricted {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  z-index: 4;
  border: 1px solid $secondary-blue;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
  p,
  button {
    z-index: 3;
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
  }
  button {
    @include badge-base($secondary-blue, white);
  }
}
</style>