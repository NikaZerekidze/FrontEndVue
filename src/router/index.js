import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Authentication/Register.vue";
import Login from "../views/Authentication/Login.vue";

import CreateInventory from "../views/Invetory/CreateInventory.vue";
import Update from "../views/Invetory/UpdateInventory.vue";

import Company from "@/views/Company/Company.vue";
import CreateCompany from "@/views/Company/CreateCompany.vue";
import EditCompany from "@/views/Company/EditCompany.vue";

import createUser from "../views/Users/createUsers";
import Users from "../views/Users/Users";
import inventory from "../views/Invetory/Inventory";
import Home from "../views/Home";
import Companies from "../views/Company/Company";
import ChangePassword from "../views/Authentication/ChangePassword.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    redirect: { name: "Home" },
    meta: {
      auth: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      auth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      auth: false,
    },
  },
  {
    path: "/create-user",
    name: "Create-user",
    component: createUser,
    meta: {
      auth: true,
    },
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: inventory,
    meta: {
      auth: true,
    },
  },
  {
    path: "/companies",
    name: "Companies",
    component: Companies,
    meta: {
      auth: true,
    },
  },
  {
    path: "/company",
    name: "company",
    component: Company,
    meta: {
      auth: true,
    },
  },
  {
    path: "/create-company",
    name: "createCompany",
    component: CreateCompany,
    meta: {
      auth: true,
    },
  },
  {
    path: "/edit-company/:userId",
    name: "editCompany",
    component: EditCompany,
    meta: {
      auth: true,
    },
  },
  {
    path: "/change-password",
    name: "Change-password",
    component: ChangePassword,
    meta: {
      auth: true,
    },
  },
  {
    path: "/update/inventory/:id",
    name: 'update',
    component: Update,
    meta: {
      auth: true,
    }
  },
  {
    path: "/create/inventory",
    name: 'create',
    component: CreateInventory,
    meta: {
      auth: true,
    }
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// TODO needs refactor

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem("user")) {
      next();
    } else {
      router.push({ name: "login" });
    }
  } else {
    if (!localStorage.getItem("user")) {
      if (to.name === "login" || to.name === "register") {
        next();
      } else {
        router.push({ name: "login" });
      }
    }
    // else {
    //   router.push({name: 'dashboard'})
    // }
  }
});

export default router;
