<template>
  <div>
    <section class="vh-100" style="background-color: #eee">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style="border-radius: 25px">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form class="mx-1 mx-md-4" @submit.prevent>
                      <!-- validation errors from the server has started -->
                      <!-- TODO make component of server validation errors or maybe global error notification component -->
                      <div
                        class="errorMessage alert alert-danger p-1 mt-2"
                        v-if="validationErrors"
                      >
                        <ul>
                          <li
                            v-for="error in validationErrors"
                            :key="error + '0'"
                          >
                            {{ error[0] }}
                          </li>
                        </ul>
                      </div>
                      <!-- validation erros from the server ended -->
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <BaseInput
                            label="name"
                            v-model="userData.name"
                            type="text"
                            @blur="$v.userData.name.$touch()"
                          />
                          <!-- TODO create notification component -->
                          <div
                            v-if="$v.userData.name.$error"
                            class="errorMessage alert alert-danger p-1 mt-2"
                          >
                            <ul>
                              <li v-if="!$v.userData.name.required">
                                Category is required
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <BaseInput
                            label="email"
                            v-model="userData.email"
                            type="email"
                            @blur="$v.userData.email.$touch()"
                          />
                          <div
                            v-if="$v.userData.email.$error"
                            class="errorMessage alert alert-danger p-1 mt-2"
                          >
                            <ul>
                              <li v-if="!$v.userData.email.email">
                                email is is not valid
                              </li>
                              <li v-if="!$v.userData.email.required">
                                email is required
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <BaseInput
                            label="Password"
                            v-model="userData.password"
                            type="password"
                            placeholder="password"
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
                              <li v-if="!$v.userData.password.minLength">
                                Minimum 6 symbol
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <BaseInput
                            label="Repeat your password"
                            v-model="userData.password_confirmation"
                            type="password"
                            placeholder="Repeat your password"
                            @blur="$v.userData.password_confirmation.$touch()"
                          />
                          <!-- TODO create notification component -->
                          <div
                            v-if="$v.userData.password_confirmation.$error"
                            class="errorMessage alert alert-danger p-1 mt-2"
                          >
                            <ul>
                              <li
                                v-if="
                                  !$v.userData.password_confirmation.required
                                "
                              >
                                password is is not valid
                              </li>
                              <li
                                v-if="
                                  !$v.userData.password_confirmation.minLength
                                "
                              >
                                Minimum 6 symbol
                              </li>
                              <li
                                v-if="
                                  !$v.userData.password_confirmation
                                    .sameAsPassword
                                "
                              >
                                Passwords does not match
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div class="text-center mb-4">
                        <a href="/login">Already have an account?</a>
                      </div>

                      <div
                        class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                      >
                        <BaseSubmit
                          @click="register"
                          :disabled="$v.$anyError"
                          buttonClass="btn btn-primary btn-lg"
                          >Register</BaseSubmit
                        >
                      </div>
                    </form>
                  </div>
                  <div
                    class="
                      col-md-10 col-lg-6 col-xl-7
                      d-flex
                      align-items-center
                      order-1 order-lg-2
                    "
                  >
                    <img
                      src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                      class="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSubmit from "@/components/BaseSubmit.vue";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  validations: {
    userData: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      password_confirmation: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs("password"),
      },
    },
  },
  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  components: {
    BaseInput,
    BaseSubmit,
  },
  methods: {
    register() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("Auth/register", this.userData);
      }
    },
  },
  computed: {
    // TODO rewrite store auth as getter
    // validation errors from the server
    validationErrors() {
      return this.$store.state.Auth.validErrors;
    },
  },
};
</script>
