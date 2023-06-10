<template>
      <v-dialog
        v-model="showDialog"
        width="360">
        <v-card>
          <v-col>
            <h4 style="color: var(--cherry-pink)">Sign In, please</h4>

            <v-text-field
            class = "ma-2"
            v-model="userLogin"
            append-icon="mdi-account"
            label="e-mail"
            ></v-text-field>

            <v-text-field
            class = "ma-2"
            v-model="userPassword"
            :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isPasswordVisible ? 'text' : 'password'"
            label="password"
            counter
            @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="text-center"> 
              <v-btn
                rounded color = "#ffcad4" density="default" flat="true"
                class="ma-3" style="color: white"
                @click="verifyLogin"
                >Sign In</v-btn>
              </div>
            
              <div>
                <span>Don't have an account yet? </span>
                <router-link :to="{name: 'SignUp'}" style="text-decoration: none;">
                  <span style="color: var(--dark-pink); cursor: pointer; font-weight: bold;" 
                  @click="showDialog=false">Register now</span>
                </router-link>
              </div>
            </v-col>
        </v-card>
      </v-dialog>
  </template>
  
<script>
  import { useUserStore } from '@/store/userLoginStore';

  export default {
    props:['visible'],
    computed: {
      showDialog: {
        get(){
          return this.visible
        },
        set(value){
          if(!value){
            this.$emit('close') 
          }
        }
      }
    },
    setup(){
      const userStore = useUserStore()

      return{userStore}
    },
    data: () => ({
      isPasswordVisible: false,
      userPassword: '',
      userLogin: ''
    }),
    methods: {
      verifyLogin(){
        if(this.userLogin == this.userStore.email && this.userPassword == this.userStore.password){
          this.userStore.isLoggedIn = true
          this.showDialog = false
        } 
          
      }
    }
  };
</script>
  
  <style>
  @import '../assets/colors.css';
  </style>