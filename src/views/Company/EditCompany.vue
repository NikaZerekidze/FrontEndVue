<template>
  <div class="container margin-content text-center">
    <div class="row justify-content-center">
      <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded w-25">
        <div class="w-100">
          <form @submit.prevent>
            <BaseInput
              label="company name"
              :value="company.name"
              class="mb-2"
              @input="updateValue"
            />
            <BaseSubmit @click="run" class="btn-info w-50 rounded text-light">
              Enter
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
import { mapActions, mapState } from 'vuex';
export default {
  components: {
    BaseInput,
    BaseSubmit,
  },
  data() {
    return {
      company: {
        id: "",
        name: "",
      },
    };
  },

  created() {
    // bind companies id and name from the vuex state
    // TODO if vuex state doesnot exist in a case if user open direct edit page we have to first fetch data
    this.company.id = this.$route.params.userId;
    this.company.name = this.companies.find(
      (company) => company.id === this.$route.params.userId
    ).name;
  },
  methods: {

      ...mapActions('Company', ['updateCompany']),
    run() {
      this.updateCompany(this.company).then(() => {
        this.$router.push({ name: "company" });
      });
    },

    updateValue(value) {
      this.company.name = value;
    },
  },
  computed: {
    ...mapState('Company', ['companies']),
  }
};
</script>

<style scoped></style>
