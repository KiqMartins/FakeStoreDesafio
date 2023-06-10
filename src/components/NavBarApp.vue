<template>
  <v-toolbar >
    
    <v-toolbar-title style="font-weight: bold; font-size: 30px;">
      <router-link to="/" 
      
      style="color:var(--cherry-pink); text-decoration: none; font-family: 'Cursive	Brush Script MT';"
      >FAKE STORE</router-link>
    </v-toolbar-title>
  
    <v-btn icon
    @click="openCartDialog"
    >
      <v-icon
        v-model="homeChart"  
        style="color:var(--cherry-pink); 
        font-size: 30px;"
        >mdi-shopping
      </v-icon>
      <LoginDialog :visible="showLoginDialog" @close="showLoginDialog=false"/>
      <CartDialog :visible="showCartDialog" @close="showCartDialog=false"/>
    </v-btn>

  <v-btn icon
  @click="openUserDataDialog">
    <v-icon 
    style="color:var(--cherry-pink); 
    font-size: 30px;"
    >mdi-account
    </v-icon>
    <LoginDialog :visible="showLoginDialog2" @close="showLoginDialog=false"/>
    <UserDataDialog :visible="showUserDataDialog" @close="showUserDataDialog=false"/>
  </v-btn>

  </v-toolbar>
  
</template>
  
<script>

import LoginDialog from './LoginDialog.vue';
import UserDataDialog from './UserDataDialog.vue';
import {useUserStore} from '../store/userLoginStore';
import CartDialog from './CartDialog.vue';

export default {
  
  name: "NavBarApp",
  components: {
    LoginDialog,
    UserDataDialog,
    CartDialog
  },
  data() {
    return {
      showLoginDialog: false,
      showLoginDialog2: false,
      showUserDataDialog: false,
      showCartDialog: false
    };
  },
  methods: {
    openLoginDialog() {
      if(!this.userStore.isLoggedIn)
        this.showLoginDialog = true;
    },
    openUserDataDialog() {
      if(this.userStore.isLoggedIn)
        this.showUserDataDialog = true;
      else
        this.showLoginDialog = true
    },
    openCartDialog(){
      if(!this.userStore.isLoggedIn)
        this.showLoginDialog = true
      else
        this.showCartDialog = true
    }
    
  },
  setup(){
    const userStore = useUserStore()

    return {userStore}
  },
};
</script>

<style>

@import '../assets/colors.css';


</style>