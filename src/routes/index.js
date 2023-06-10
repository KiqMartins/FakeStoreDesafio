import { createWebHashHistory, createRouter } from "vue-router";
import Home from '../views/Home.vue';
import SignUp from '../views/SignUp.vue';
import ProductDetails from '../views/ProductDetails.vue';

const routes = [
  { path: "/", 
  component: Home,
  name: "Home"
},
{
  path: "/SignUp",
  component: SignUp,
  name: "SignUp",
},
{
  path: "/product/:id",
  name: "ProductDetails",
  component: ProductDetails,
  props: true,
},


]

const router = createRouter({

  history: createWebHashHistory(),
  routes,   
});

export default router;

