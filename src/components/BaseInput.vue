<template>
  <div class="form-group" :class="inputContainerClass">
    <label class="form-check-label fw-bold" v-if="label"> {{ label }} </label>
    <input
      class="form-control"
      :class="inputClass"
      v-on="listeners"
      v-on:value="value"
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
    />
      <slot></slot>

  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: "",
    },
    inputContainerClass: {
      type: String,
      default: "",
    },
    inputClass: {
      type: String,
      default: "",
    },
    value: [String, Number],
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value.target.value);
    },
  },
};
</script>

<style scoped></style>
