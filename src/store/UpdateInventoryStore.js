export const namespaced = true


import axios from 'axios';


export const state = {
        data : null,
        successful: false,
    };

    
export const  mutations = {
        FILL_INPUTS(state , inventory){
            state.data = inventory ;
            if(inventory) state.successful = true;
        }
    };

export const actions = {
        addValues({commit}, inventory) {

            console.log(inventory);

            let id=window.location.pathname.split("/").pop();

            let user_id =this.state.Auth.user.user.id 

            inventory['user_id'] = user_id;

           return axios.put(`http://localhost:8000/api/inventories/${id}` , inventory)
                .then( () => {
                    commit('FILL_INPUTS' , inventory);
                });

        },
     
    }



