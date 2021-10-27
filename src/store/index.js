import Vue from "vue";
import Vuex from "vuex";
import * as Auth from '@/store/Auth/Auth.js';
import * as Users from '@/store/Users/Users.js';
import * as Company from '@/store/Company/Company.js';
import * as CreateInventoryStore from '@/store/CreateInventoryStore.js';
import * as UpdateInventoryStore from '@/store/UpdateInventoryStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    CreateInventoryStore,
    UpdateInventoryStore,
    Auth,
    Company,
    Users,
  },
});
