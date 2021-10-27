<template>
  <div class="container margin-content text-center">
    <edit-user v-if="edit.show" v-on:getUpdatedUser="get" :data="edit.data" />
    <div class="row justify-content-center">
      <blockquote v-if="!edit.show" class="blockquote blockquote-custom bg-white p-5 shadow rounded w-100">
        <div class="text-center h1 fw-bold mb-4">Manage Users</div>

        <table class="table table-striped table-sm">
    <thead>
    <tr>
      <th scope="col">#Id</th>
      <th scope="col">Name</th>
      <th scope="col">E-Mail</th>
      <th scope="col">Company</th>
      <th scope="col">Role</th>
      <th scope="col">Edit</th>
<!--      <th scope="col">Delete</th>-->
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users.data" :key="user.id">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.company.name }}</td>
      <td>{{ user.role.name }}</td>
      <td><button class="btn btn-warning" @click="editEvent(user)">Edit</button></td>
<!--      <td><button class="btn btn-danger" @click="deleteUser(user)">Delete</button></td>-->
    </tr>
    </tbody>
  </table>
<!--        <nav aria-label="Page navigation example">-->
<!--          <div class="text-center mt-4">-->
<!--            <ul class="pagination" style="display: inline-flex">-->
<!--              <li :class="[{disabled: !pagination.prev_page_url}]"><a class="page-link " href="#"-->
<!--                                                                      @click="fetchPaginationData(pagination.prev_page_url)">Previous</a></li>-->

<!--              <li class="page-item disabled"><a class="page-link text-dark" href="#">Page: {{ pagination.current_page }} of {{ pagination.last_page}}</a></li>-->

<!--              <li class="disabled"><a class="page-link" href="#"-->
<!--                                      @click="fetchPaginationData(pagination.next_page_url)">Next</a></li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </nav>-->
      </blockquote>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import editUser from "./editUsers";


export default {
  components: {
    editUser,
      },
  data() {
    return {
      // userse: [],
      edit: {
        show: false,
        data: null,
      },
      pagination: {},
    }
  },
  created() {
    this.$store.dispatch("Users/getUsers");
    this.$store.dispatch("Company/getCompanies");
    // this.fetchPaginationData();

  },

  computed: {
    ...mapState("Users", ["users"]),
  },

  methods: {
    editEvent(users) {
      this.edit.data = users;
      this.edit.show = true;
    },

    get(payload) {
      console.log(payload);
    },
    // fetchPaginationData() {
    //
    //   let vm = this;
    //   let meta = this.users.meta
    //   let links = this.users.links
    //   console.log(meta)
    //   console.log(links)
    //         vm.makePagination(meta.current_page, meta.last_page, links.next, links.prev);
    //
    // },
    // makePagination(current_page, last_page, next, prev) {
    //   this.pagination = {
    //     current_page: current_page,
    //     last_page: last_page,
    //     next: next,
    //     prev: prev
    //   }
    //
    //   console.log(this.pagination)
    // },
  }
}


</script>

<style scoped>

</style>