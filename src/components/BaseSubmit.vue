<template>
  <div>
    <button
      v-on="$listeners"
      class="w-100 btn btn-lg"
      v-bind="$attrs"
      :class="buttonClass"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped></style>
