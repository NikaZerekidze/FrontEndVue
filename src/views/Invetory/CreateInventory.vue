<template>
  <div class="container margin-content text-center">
    <div class="row justify-content-center">
      <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded w-50">
        <div class="d-flex justify-content-center align-items-center container">
          <div class="container margin-content text-center">
            <div class="text-center h1 fw-bold mb-4">Create new Item</div>
              <div class="alert alert-success" v-if="show">
                <strong>Success!</strong>successfully edited inventory .
              </div>
              <div class="d-flex justify-content-center align-items-center container">
                <CreateUpdateInventory ref="mychild" @submitValues="onCreate($event)"/>
              </div>
          </div>
        </div>
      </blockquote>
    </div>
  </div>

</template>
<script>

import CreateUpdateInventory from '../../components/CreateUpdateInventory.vue';
import router from "@/router";

  export default {
    data (){
        return { 
            event: {
                name: '',
                serial_number: '',
                price: ''
            },
           
            show: false
        }
    },
    components: {
            CreateUpdateInventory,
        },

 

  methods: {
    onCreate (event)
    {
        this.event.name=event.name;
        this.event.price=event.price;
        this.event.serial_number=event.serial_number;

            this.$refs.mychild.$v.$touch();


        if(!this.$refs.mychild.$v.$invalid)
        {
            this.$store.dispatch('CreateInventoryStore/addValues', this.event)
                    .then( () => 
                        this.show=true,
                        setTimeout( () => { this.show= true , router.push({name: 'Home'}) }, 2000),

                        );
            
            
        }
    },
  },
};
</script>
