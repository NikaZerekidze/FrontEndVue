export const namespaced = true

// TODO I`ve to make separate module for the axios calls


import axios from 'axios';
import router from "@/router";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Accept'] = 'application/json';

export const state = {
    users: {}
}

export const mutations = {
    SET_USERS(state, data) {
        state.users = data;
    },

    ADD_USER(state, userData ){
        state.users.push(userData)
    },

    UPDATE_USERS( state, data ) {
        state.users.forEach( users => {
            if(users.id === data.id) {
                users.name = data.name;
                users.email = data.email;
            }
        });
    }
};

export const actions = {
    getUsers( { commit } ){
            return axios.get('api/users').then( response => {
                commit('SET_USERS', response.data);
            });
    },

    updateUsers( { commit }, data ){
            return axios.put('api/users/'+data.id,
                {
                    name: data.name ,
                    email: data.email
                }).then( () => {
                commit('UPDATE_USERS', data);
                console.log('success')
                alert("Update Success")
            }).catch((error) => {
                console.log(error)
                console.log(data)
                alert("Update not sucessfull")

            })
    },

    createUsers( { commit }, data ){
            return axios.post('api/users', data).then( () => {
                commit('ADD_USER', data);
                console.log("successfully added User")
                router.push({name: 'Users'}).catch( error => error );

            }).catch((error) => {
                console.log(error)
                console.log("could not add User")
                router.push({name: 'Users'}).catch( error => error );

            })
    },

    deleteUsers( { dispatch }, data ){
        return axios.delete('api/users/'+data.id).then( () => {
            dispatch('getCompanies')
        })
    }
};