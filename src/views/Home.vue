<template>
  <v-row justify="center">
    <h1 
    style="color:var(--dark-pink); font-family: 'Lucida Console';"
    class="mb-7"
    >PRODUCTS</h1>
  </v-row>
  
  <div>
    <ProductsHomeDisplay/>
  </div>

</template>
  
<script>
  import ProductsHomeDisplay from '@/components/ProductsHomeDisplay.vue';
  import {useUserStore} from '../store/userLoginStore';
  
  export default{
    components:{
    ProductsHomeDisplay,
  }, 
  setup(){
    const userStore = useUserStore()

    return {userStore}
  },
}
</script>
  
<style>
    @import '../assets/colors.css';
</style>