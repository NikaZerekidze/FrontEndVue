<template>
  <section class="vh-100" style="background-color: #eee">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <div class="form-signin">
                    <form @submit.prevent>
                      <h1 class="h3 mb-3 fw-normal">Sign in</h1>
                      <label> Email </label>
                      <BaseInput
                        v-model="userData.email"
                        type="email"
                        @blur="$v.userData.email.$touch()"
                      />
                      <!-- TODO add error notification component -->
                      <div
                        v-if="$v.userData.email.$error"
                        class="errorMessage alert alert-danger p-1 mt-2"
                      >
                        <ul>
                          <li v-if="!$v.userData.email.email">
                            Email is not valid
                          </li>
                          <li v-if="!$v.userData.email.required">
                            Email is required
                          </li>
                        </ul>
                      </div>
                      <label> Password </label>
                      <BaseInput
                        v-model="userData.password"
                        type="password"
                        @blur="$v.userData.password.$touch()"
                      />
                      <!-- TODO add error notification component -->
                      <div
                        class="errorMessage alert alert-danger p-1 mt-2"
                        v-if="$v.userData.password.$error"
                      >
                        <ul>
                          <li v-if="!$v.userData.password.required">
                            password is required
                          </li>
                        </ul>
                      </div>
                      <div class="checkbox mb-2 mt-3">
                        <label>
                          <input
                            type="checkbox"
                            v-model="rememberMe"
                            @click="checkBox"
                          />
                          Remember me
                        </label>
                        <p><a href="/register">Dont have an account?</a></p>
                      </div>
                      <BaseSubmit
                        :disabled="$v.$anyError"
                        @click="login"
                        buttonClass="btn-danger"
                        >Sign in</BaseSubmit
                      >
                    </form>
                  </div>
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
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSubmit from "@/components/BaseSubmit.vue";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  validations: {
    userData: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
  },
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
      rememberMe: false,
    };
  },
  components: {
    BaseInput,
    BaseSubmit,
  },
  methods: {
    checkBox() {
      this.rememberMe = !this.rememberMe;
    },
    login() {
      this.$store.dispatch("Auth/login", this.userData);
    },
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  height: auto;
}
</style>
