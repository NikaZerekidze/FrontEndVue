<template>
  <div class="container margin-content text-center">
    <div class="row justify-content-center">
      <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded w-50">
        <div class="text-center h1 fw-bold mb-4">Create a new User</div>

        <form id="signup-form" @submit.prevent>
          <div class="form-group mb-3">
            <label for="name" class="fw-bold">Name</label>
            <BaseInput
              id="name"
              name="name"
              placeholder="Name"
              v-model="userData.name"
              type="text"
              @blur="$v.userData.name.$touch()"
            />
            <div
              v-if="$v.userData.name.$error"
              class="errorMessage alert alert-danger p-1 mt-2"
            >
              <ul>
                <li v-if="!$v.userData.name.required">Category is required</li>
              </ul>
            </div>
          </div>

          <div class="form-group mb-3">
            <label for="email" class="fw-bold">Email address</label>
            <BaseInput
              id="email"
              name="email"
              placeholder="name@example.com"
              v-model="userData.email"
              type="email"
              @blur="$v.userData.email.$touch()"
            />
            <div
              v-if="$v.userData.email.$error"
              class="errorMessage alert alert-danger p-1 mt-2"
            >
              <ul>
                <li v-if="!$v.userData.email.email">email is is not valid</li>
                <li v-if="!$v.userData.email.required">email is required</li>
              </ul>
            </div>
          </div>

          <div class="form-group mb-3">
            <label for="password" class="fw-bold">Password</label>
            <BaseInput
              v-model="userData.password"
              type="password"
              id="password"
              name="password"
              placeholder="Minimum length: 6"
              @blur="$v.userData.password.$touch()"
            />
            <!-- TODO create notification component -->
            <div
              v-if="$v.userData.password.$error"
              class="errorMessage alert alert-danger p-1 mt-2"
            >
              <ul>
                <li v-if="!$v.userData.password.required">
                  password is is not valid
                </li>
                <li v-if="!$v.userData.password.minLength">Minimum 6 symbol</li>
              </ul>
            </div>
          </div>

          <div class="form-group mb-3">
            <div class="form-check-label fw-bold mb-2">User Role</div>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                v-model="userData.roles_id"
                :value="1"
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                checked
              />
              <label class="btn btn-outline-primary" for="btnradio1"
                >Admin</label
              >

              <input
                v-model="userData.roles_id"
                :value="2"
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="btnradio2"
                >User</label
              >
            </div>
          </div>

          <div class="form-group mb-3">
            <label for="company" class="fw-bold">Company</label>
            <select
              id="company"
              v-model="userData.company_id"
              class="form-control"
              aria-label="Default select example"
            >
              <option value="" disabled selected>
                Select the Company for this User
              </option>
              <option
                v-for="(company, name) in companyList"
                :key="name"
                :value="company.id"
                selected
              >
                {{ company.name }}
              </option>
            </select>
          </div>

          <hr />
          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <BaseSubmit
              @click="createUsers"
              :disabled="$v.$anyError"
              buttonClass="btn btn-primary btn-lg"
              >Register</BaseSubmit
            >
          </div>
        </form>
      </blockquote>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSubmit from "@/components/BaseSubmit.vue";
import { required, email, minLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  validations: {
    userData: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      password_confirmation: { required, minLength: minLength(6)},
      company: { required },
      role: { required },

    },
  },
  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
        company_id: "",
        roles_id: "",
      },
      companyList: [],
    };
  },
  components: {
    BaseInput,
    BaseSubmit,
  },
  mounted() {
    this.getCompanies();
  },
  methods: {
    createUsers() {
      console.log(this.userData)
      this.$store.dispatch('Users/createUsers', this.userData)
    },
    getCompanies: function () {
        axios
          .get("/api/allCompanies")
          .then((response) => {
            this.companyList = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
  computed: {

  },
};
</script>

<style scoped></style>
