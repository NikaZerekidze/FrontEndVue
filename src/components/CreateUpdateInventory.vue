<template>
    <form  class="mt-5 " v-on:submit.prevent>
        <BaseInput  v-model="$v.event.name.$model" class="mb-3" type="text"  placeholder="name of inventory"  @blur="$v.event.name.$touch()" >
             <div v-if="$v.event.name.$error">
                    <p v-if="!$v.event.name.required" class="alert bg-danger mt-1">name is required</p>
            </div>
        </BaseInput>
      
        <BaseInput v-model="$v.event.serial_number.$model"  class="mb-3" type="number"  placeholder="serial number of inventory" @blur="$v.event.serial_number.$touch()">
                <div v-if="$v.event.serial_number.$error">
                    <p v-if="!$v.event.serial_number.required" class="alert bg-danger mt-1" >name is required</p>
                </div>
        </BaseInput>
        <BaseInput  v-model="$v.event.price.$model"  class="mb-3"  type="number"  placeholder="price of inventory"  @blur="$v.event.price.$touch()">
                <div v-if="$v.event.price.$error"> 
                    <p v-if="!$v.event.price.required" class="alert bg-danger mt-1" >price is required</p>
                    <p v-if="!$v.event.price.numeric" class="alert bg-danger mt-1" >price must be positive</p>
                </div>
        </BaseInput>

        <slot>
            <BaseSubmit type="submit" @click='editFunc'  :value="value" class="btn btn-primary">{{value}}</BaseSubmit> 
        </slot>

    </form>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue';
import BaseSubmit from '@/components/BaseSubmit.vue';

import {required, maxLength , minLength } from 'vuelidate/lib/validators';

    function isPositive (value) {

               return new Promise((resolve) => {
                    resolve(value>0);
                }, 100)
    };

  export default {
    
       data (){
        return { 
            event: {
                name: '',
                serial_number: '',
                price: ''
            },
            show: false,
            value: '',
        }
    },
    props: {
            label: {
                type: String,
                default: '',
            },
    },
     components: {
            BaseInput,
            BaseSubmit,
    },

    validations: {
        event: {

                name: { required, maxLength: maxLength(50)  , minLength: minLength(2)},

                serial_number: { required, maxLength: maxLength(255)  , minLength: minLength(5) },

                price: {
                    required, 
                    numeric: isPositive,
                }
        }
    },

    methods: {
        	// setValue(value) {
            //     this.value = value;
            // },
            editFunc() {
                this.$emit( 'submitValues' ,  this.event );
            }
        }


      
  }

</script>