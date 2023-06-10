<template>
  <v-container class="pa-10">
    <NavBarApp/>
    <router-view/>
  </v-container>
</template>

<script>

import NavBarApp from './components/NavBarApp.vue';

export default {
  components:{
    NavBarApp
  }
}

</script>