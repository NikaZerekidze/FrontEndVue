<template>
          <div class="d-flex-column justify-content-center align-items-center container ">

                    <h1>edit inventory</h1>
                    <div class="alert alert-success" v-if="show"> 
                            <strong>Success!</strong>successfully edited inventory .
                    </div>
                    <CreateUpdateInventory ref="mychild" v-bind:event="event" @submitValues="updateInventory($event)"/>    

          </div>

</template>

<script>

import CreateUpdateInventory from '../../components/CreateUpdateInventory.vue';
// import {required} from 'vuelidate/lib/validators';
import router from "@/router";

//   @editFunc="updateInventory" 
  export default {
       data (){
        return { 
            event: {
                name: '',
                serial_number: '',
                price: ''
            },
            // CreateUpdateInventory: {
            //     nested: '',
            // },
            show: false
        }
    },
     components: {
            CreateUpdateInventory,
        },

    // validations: {
    //     CreateUpdateInventory: {
    //         nested: {
    //             required
    //         },
           
    //     },
    // },    

    methods: {
        updateInventory (event)
        {
            this.event.name=event.name;
            this.event.price=event.price;
            this.event.serial_number=event.serial_number;

            this.$refs.mychild.$v.$touch();

       
            
            if(!this.$refs.mychild.$v.$invalid)
            {
                
                    this.$store.dispatch('UpdateInventoryStore/addValues', this.event)
                    .then( () => 
                        this.show=true,
                        setTimeout( () => { this.show= true , router.push({name: 'Home'}) }, 2000),

                        );
                
                
            }
        },

  },
      
  }


</script>
