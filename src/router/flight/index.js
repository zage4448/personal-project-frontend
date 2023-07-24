import Vue from "vue";
import VueRouter from "vue-router";

import FlightProductListPage from "@/views/flight/FlightProductListPage.vue"

Vue.use(VueRouter);

const flightRoutes = [
    {
      path: "/flight-product-list-page",
      name: "FlightProductListPage",
      component: FlightProductListPage,
    },
]

export default flightRoutes