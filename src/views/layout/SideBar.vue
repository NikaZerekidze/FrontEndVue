<template>
  <div
    class="
      d-flex
      flex-column
      position-fixed
      h-100
      mb-2
      flex-shrink-0
      p-3
      text-white
      bg-dark
      sideBar
    "
  >
    <!--    spaceDiv-->
    <div style="margin-top: 30%"></div>
    <p>Welcome <br />{{ user.user.name }}</p>
    <hr />
<!--    TODO Change links to router-link-->
<!--    <ul class="nav nav-pills flex-column mb-auto">-->
      <router-link to="/home" class="nav-link text-white">Home</router-link>
      <router-link to="/users" class="nav-link text-white" >Users</router-link>
      <router-link to="/inventory" class="nav-link text-white">Inventory</router-link>
      <router-link to="/companies" class="nav-link text-white">Companies</router-link>

<!--    </ul>     -->
    <hr />
    <p id="foot">© Vakho, Vaso, Nika, Jaba</p>
    <router-link to="/change-password" class="nav-link text-white">Change password</router-link>


  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    checkUserLogin() {
      return this.user ? true : false;
    },
    ...mapState('Auth', ['user']),
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#foot {
  position: absolute;
  bottom: 0;
}
</style>
