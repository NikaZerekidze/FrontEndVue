export const namespaced = true;

import axios from "axios";

export const state = {
  data: null,
  successful: false,
};

export const mutations = {
  FILL_INPUTS(state, inventory) {
    state.data = inventory;
    if (inventory) state.successful = true;
  },
};

export const actions = {
  addValues({ commit }, inventory) {
    let user_id = this.state.Auth.user.user.id;

    inventory["user_id"] = user_id;

    console.log(inventory);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.state.Auth.user.token}`;

    return axios
      .post("http://localhost:8000/api/inventories", inventory)
      .then(() => {
        commit("FILL_INPUTS", inventory);
      });
  },

}        