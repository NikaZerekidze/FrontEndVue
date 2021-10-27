<template>
  <div class="container margin-content text-center">
    <div class="row justify-content-center">
      <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded w-100">
        <h1 class="mb-4">Manage Companies</h1>
        <div v-if="user.user.role.name === 'Admin'">
          <router-link class="mb-3 btn btn-info" :to="{ name: 'createCompany' }">
            Add new company</router-link
          >
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Total Employees</th>
                <th scope="col">view</th>
                <th scope="col">edit</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="company in this.companies" :key="company.id">
                <td>{{ company.id }}</td>
                <td>{{ company.name }}</td>
                <td>{{ company.users ? company.users.length : 0 }}</td>
                <td><div v-if="company.permisions.view"><button class="btn btn-info">View</button></div></td>
                <td>
                  <div v-if="company.permisions.update">
                   <router-link
                    class="btn btn-warning"
                    :to="{
                      name: 'editCompany',
                      params: { userId: company.id },
                    }"
                  >
                    Edit
                  </router-link>
                  </div>
                </td>
                <td>
                  <div v-if="company.permisions.delete">
                    <button
                      class="btn btn-danger"
                      @click="deleteComp(company)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </blockquote>
    </div>
    <!-- pagination  -->
      <div v-if="companies.length>10">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li
                v-for="page in pagination.links"
                :key="page.label"
                class="page-item"
                >
                <button
                    class="page-link"
                    v-html="page.label"
                    @click="getCompanies(page.url)"
                    :disabled="!page.url"
                ></button>
                </li>
            </ul>
        </nav> 

      </div>
    <!-- end pagination -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.getCompanies();
  },

  methods: {
    ...mapActions('Company', ["deleteCompany","getCompanies"]),

    deleteComp( company ) {
      this.deleteCompany( company )
        .then(() => {
          console.log("succerss");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  computed: {
    ...mapState("Company", ["companies", "pagination"]),
    ...mapState("Auth", ["user"]),
  },
};
</script>

<style scoped></style>
