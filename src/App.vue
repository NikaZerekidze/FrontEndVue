<template>
  <div id="app">
    <router-view v-if="!getLoginStatus" />
    <div class="wrapper overflow-auto" v-if="getLoginStatus">
      <header class="main-head"><Header /></header>
      <nav class="main-nav">
        <SideBar />
      </nav>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from "@/views/layout/SideBar.vue";
import Header from "@/views/layout/Header.vue";
import { mapState } from 'vuex';

export default {
  computed: {
    getLoginStatus() {
      return this.user ? true : false;
    },
    ...mapState('Auth', ['user'])
  },
  components: {
    SideBar,
    Header,
  },
};
</script>

<style scoped>
.main-head {
  grid-area: header;
}
.content {
  grid-area: content;
}
.main-nav {
  grid-area: nav;
}

.wrapper {
  font-family: "Press Start 2P", cursive;
  display: grid;
  gap: 20px;
  grid-template-areas:
    "header"
    "sidebar content";
}

@media (min-width: 500px) {
  .wrapper {
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      "header  header"
      "nav     nav"
      "sidebar content"
      "ad      footer";
  }
  nav ul {
    display: flex;
    height: 100%;
    justify-content: space-between;
  }
}

@media (min-width: 700px) {
  .wrapper {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-areas:
      "header header  header"
      "nav    content sidebar"
      "nav    content ad"
      "footer footer  footer";
  }
  nav ul {
    flex-direction: column;
  }
}

.margin-content {
  margin-top: 7%;
}
</style>
