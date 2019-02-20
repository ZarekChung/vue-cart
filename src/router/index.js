import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from '@/components/HelloWorld'
import Login from "@/components/pages/Login";
import Dashboard from "@/components/Dashboard";
import Products from "@/components/pages/Products";
import CustomerOrder from "@/components/pages/CustomerOrder";
import Coupons from "@/components/pages/Coupons";
import PayOrder from "@/components/pages/PayOrder";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "login"
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true }
    // },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "products",
          name: "Products",
          component: Products,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "coupons",
          name: "coupons",
          component: Coupons,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "customer_Order",
          name: "CustomerOrder",
          component: CustomerOrder
        },
        {
          path: "pay_order/:orderId",
          name: "PayOrder",
          component: PayOrder
        }
      ]
    }
  ]
});
