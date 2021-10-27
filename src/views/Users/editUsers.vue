<template>
  <div class="container margin-content text-center">
    <div class="row justify-content-center">
      <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded w-50">
        <div class="w-100">
          Change User Data:
          <form @submit.prevent >
            <BaseInput label="Name"
                       :value="user.name"
                       class="mb-2"
                       @input="updateName"
            />

            <BaseInput label="EMail"
                       :value="user.email"
                       @input="updateMail"
                       class="mb-2"
            />
            <BaseSubmit @click="updatingUser" class="btn-info w-50 rounded text-light"> Enter </BaseSubmit>
          </form>
        </div>
      </blockquote>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue';
import BaseSubmit from '@/components/BaseSubmit.vue';
import {mapState} from "vuex";
import axios from "axios";
export default {

  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        company_id: '',
      },
    }
  },
  components: {
    BaseInput,
    BaseSubmit,
  },

  created(){
    this.user.name = this.data.name
    this.user.email = this.data.email
    this.user.id = this.data.id
    this.user.company_id = this.data.company.id
  },

  methods: {
    updateName(value) {
      this.user.name = value;
    },
    updateMail(value) {
      this.user.email = value;
    },
    updatingUser(){
      axios.patch('/api/users/'+ this.user.id, this.user)
          .then((res) => {
            console.log(res)
            alert("successfully updated user");
            // this.data.name = this.user.name
            // this.data.email = this.user.email
            window.location.reload()
          })
          .catch((error) => {
            // error.response.status Check status code
            console.log(error);
            alert("could not change user data")
          }).finally(() => {
      });
    },
    // updateUser() {
    //   this.data.name = this.user.name
    //   this.data.email = this.user.email
    //   this.$store.dispatch('Users/updateUsers', this.user);
    // },
  },
  computed: {
    ...mapState('Users', ['users'])
  },
}
</script>

<style scoped>

</style>