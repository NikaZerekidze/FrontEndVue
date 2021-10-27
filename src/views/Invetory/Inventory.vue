<template>
  <div class="container margin-content">
    <div class="accordion" id="accordionExample">
      <div v-if="!inventorys">No Inventorys found!</div>
      <div class="card" v-for="(inventory, index) in inventorys" :key="index">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button
              class="btn btn-block text-center w-100"
              data-toggle="collapse"
              :data-target="'#collapse' + index"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <h4><strong>Item Name: </strong> {{ inventory.name }}</h4>
            </button>
          </h2>
        </div>
        <div
          :id="'collapse' + index"
          class="collapse text-center"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <!--            <div class="card-body" v-for="(inventory,index) in inventory" :key="index" >-->
          <!--              <p>Inventory Name: {{inventory.name}}</p><p>Inventory Serial Number: {{ inventory.serial_number }}</p>-->
          <!--            </div>-->
          <p><strong>Price: </strong> {{ inventory.price }}</p>
          <p><strong>Purchase Date: </strong> {{ inventory.purchase_date }}</p>
          <router-link :to="{ name: 'update', params: { id: inventory.id }}" class="btn btn-danger">Update</router-link>  

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      inventorys: [],
    };
  },
  mounted() {
    this.getInventory();
  },
  methods: {
    getInventory: function () {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .get("/api/inventories")
          .then((response) => {
            this.inventorys = response.data;

            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>

<style scoped></style>
