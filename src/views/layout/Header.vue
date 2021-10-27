<template>
  <header class="p-3 mb-0 bg-dark-light position-fixed possiton">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-between ">
        <a href="/" class=" align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

<!--        TODO change a links to router-links-->
<!--        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">-->
          <div class="d-flex" v-if="this.$store.state.Auth.user.user.role.name == 'Admin'">
            <router-link to="/create-company" class="nav-link px-2 link-dark text-white">Add Company</router-link>
            <router-link to="/create/inventory" class="nav-link px-2 link-dark text-white">Add Item</router-link>
            <router-link to="/create-user" class="nav-link px-2 link-dark text-white">Add User</router-link>
          </div>
          
        <button class="btn btn-primary float-right" @click="logout">log out</button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
    export default {
        methods: {
          // TODO rewrite calling with map helpers
          logout() {
            this.$store.dispatch('Auth/logout');
          },
        },

        computed: {
          ...mapState('Auth', ['user']),
        }
        
    }
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
.bg-dark-light {
  background-color: #3d464e;
}
.possiton {
  z-index: 1;
  width: 100%;
}
</style>
