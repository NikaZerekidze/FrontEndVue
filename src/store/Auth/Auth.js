export const namespaced = true;

// TODO I`ve to make separate module for the axios calls

import axios from "axios";
import router from "@/router";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Accept"] = "application/json";

export const state = {
  user: null,
  validErrors: null,
};

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData;
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  },
  CLEAR_USER_DATA(state) {
    state.user = null;
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
  },
  SET_VALIDATION_ERRORS(state, data) {
    state.validErrors = data;
  },
  UNSET_VALIDATION_ERRORS(state) {
    state.validErrors = null;
  },
};

export const actions = {
  // TODO need to change API response ( in my opinion )
  register({ commit }, credentials) {
    axios.get("/sanctum/csrf-cookie").then(() => {
      return axios
        .post("/api/register", credentials)
        .then((response) => {
          commit("SET_USER_DATA", response.data);
          router.push({ name: "Home" }).catch((error) => error);
        })
        .catch((error) => {
          commit("SET_VALIDATION_ERRORS", error.response.data.errors);
        });
    });
  },

  login({ commit }, credentials) {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios.post("/api/login", credentials).then((response) => {
        commit("SET_USER_DATA", response.data);
        router.push({ name: "Home" }).catch((error) => error);
        // window.location.reload();
      });
    });
  },

  logout({ commit }) {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios.post("api/logout").then(() => {
        commit("CLEAR_USER_DATA");
        router.push({ name: "login" }).catch((error) => error);
        // window.location.reload();
      });
    });
  },
};
