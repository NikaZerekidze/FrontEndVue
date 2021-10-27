export const namespaced = true;

// TODO I`ve to make separate module for the axios calls

import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Accept"] = "application/json";

export const state = {
  companies: {},
  pagination: {},
};

export const mutations = {
  SET_COMPANIES(state, data) {
    state.companies = data.data;
    state.pagination = data.meta;
  },
  ADD_COMPANY(state, data) {
    state.companies.push(data);
  },

  UPDATE_COMPANY(state, data) {
    state.companies.forEach((company) => {
      if (company.id === data.id) {
        company.name = data.name;
      }
    });
  },
};

export const actions = {
  getCompanies({ commit }, link = "api/companies") {
    axios.get("sanctum/csrf-cookie").then(() => {
      return axios.get(link).then((response) => {
        commit("SET_COMPANIES", response.data);
      });
    });
  },

  updateCompany({ commit }, data) {
    axios.get("sanctum/csrf-cookie").then(() => {
      return axios
        .patch("api/companies/" + data.id, { name: data.name })
        .then(() => {
          commit("UPDATE_COMPANY", data);
        });
    });
  },

  addCompany({ commit }, data) {
    axios.get("sanctum/csrf-cookie").then( () => {
      return axios
        .post("api/companies", data)
        .then(() => {
          commit("ADD_COMPANY", data);
        })
        .catch(() => {
          console.log("could not add ");
        });
    });
  },

  deleteCompany({ dispatch }, data) {
    axios.get("sanctum/csrf-cookie").then(() => {
      return axios.delete("api/companies/" + data.id).then(() => {
        dispatch("getCompanies");
      });
    });
  },
};
