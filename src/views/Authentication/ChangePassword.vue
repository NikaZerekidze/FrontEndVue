<template>
    <div class="container margin-content text-center">
        <div class="row justify-content-center">
            <blockquote class="blockquote blockquote-custom bg-white shadow rounded w-50">
                <div class="text-center h1 fw-bold mb-4">Change Your Password</div>

                <div class="d-flex justify-content-center align-items-center container">
                    <form class="mt-5" @submit.prevent>
                        <div class="form-group mb-3">
                            <label for="oldPassword" class="fw-bold">Old Password</label>
                            <BaseInput
                                id="old_password" 
                                type="password"
                                name="old_password"
                                v-model="userData.old_password"
                                placeholder="Password"
                                @blur="$v.userData.old_password.$touch()"
                            />
                            <div
                                v-if="$v.userData.old_password.$error"
                                class="errorMessage alert alert-danger p-1 mt-2"
                                >
                                    <ul>
                                        <li v-if="!$v.userData.old_password.required">old Password is required</li>
                                    </ul>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="newPassword" class="fw-bold">New Password</label>
                            <BaseInput 
                                id="new_password" 
                                type="password"
                                name="new_password"
                                v-model="userData.new_password"
                                placeholder="New password"
                                @blur="$v.userData.new_password.$touch()"
                            />
                             <div
                                v-if="$v.userData.new_password.$error"
                                class="errorMessage alert alert-danger p-1 mt-2"
                                >
                                    <ul>
                                        <li v-if="!$v.userData.new_password.required">new password is required</li>
                                    </ul>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <label for="repeatPassword" class="fw-bold">Repeat Password</label>
                            <BaseInput
                                id="confirm_password"  
                                type="password"
                                name="confirm_password"
                                v-model="userData.confirm_password"
                                placeholder="Repeat password"
                                @blur="$v.userData.confirm_password.$touch()"
                            />
                            <div
                                v-if="$v.userData.confirm_password.$error"
                                class="errorMessage alert alert-danger p-1 mt-2"
                                >
                                    <ul>
                                        <li v-if="!$v.userData.confirm_password.required">required</li>
                                        <li v-if="!$v.userData.confirm_password.sameAsPassword"> Passwords does not match</li>
                                    </ul>
                            </div>
                        </div>
                            
                        
                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <BaseSubmit @click="createNewPassword" buttonClass="btn btn-primary btn-lg" >Change</BaseSubmit>
                        </div>

                    </form>
                </div>
            </blockquote>
        </div>
    </div>
    
</template>


<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSubmit from "@/components/BaseSubmit.vue";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";


export default {
    validations: {
        userData: {
            old_password: {required, minLength: minLength(6)},
            new_password: { required, minLength: minLength(6)},
            confirm_password: { required, minLength: minLength(6), sameAsPassword: sameAs('new_password')}
        },
  },
  data() {
    return {
      userData: {
        old_password: "",
        new_password: "",
        confirm_password: "",
      }
    };
  },

    components: {
        BaseInput,
        BaseSubmit,
  },
  methods: {
      createNewPassword() {
          console.log(this.userData);
      axios.post('/api/change-password', this.userData)
          .then((res) => {
            console.log(res)
           alert(res.data);
           this.$router.push('Home')
          })
          .catch((error) => {
            console.log(error)
            alert("Somthing went wront pleas try agane");

          }).finally(() => {
        console.log(this.userData);
      });
    },
  }
  
}
</script>