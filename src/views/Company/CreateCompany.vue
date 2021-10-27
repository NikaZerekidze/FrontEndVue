<template>
  <div class="container margin-content text-center">
    <div class="row justify-content-center">
      <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded w-50">
        <div class="w-50 w-50 m-auto pt-2 border p-4 rounded">
          <form @submit.prevent>
            <BaseInput
              label="company name"
              class="mb-2"
              :value="company.name"
              @input="updateInput"
              placeholder="Enter a company name"
            />
            <BaseSubmit
              type="button"
              @click="add"
              class="btn-info w-50 rounded text-light"
            >
              Add
            </BaseSubmit>
          </form>
        </div>
      </blockquote>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSubmit from "@/components/BaseSubmit.vue";
export default {
  components: {
    BaseInput,
    BaseSubmit,
  },

  data() {
    return {
      company: {
        name: "",
      },
    };
  },

  methods: {
    add() {
      this.$store.dispatch("Company/addCompany", this.company).then(() => {
        this.$router.push({ name: "company" });
      });
    },

    updateInput(value) {
      this.company.name = value;
    },
  },
};
</script>

<style scoped></style>
