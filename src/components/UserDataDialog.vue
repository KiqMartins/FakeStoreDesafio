<template>
  <v-dialog class="ma-4" v-model="showDialog" width="520">
      <v-form>
        <v-col>
          <v-card>
          <v-card-title style="color:var(--light-pink)" class="ma-2">Would you like to change something?</v-card-title>
          <v-row justify="center" class="mt-6"> 
            <span style="color:var(--cherry-pink); 
            font-family: 'Cursive	Brush Script MT'; font-weight: bold;"
            >My Account</span>
          </v-row>
          <v-row class="ma-4">
            <v-text-field  class="mx-2" v-model="firstName" :rules="basicRule"
            label="first name" autofocus="true">
            </v-text-field>
            <v-text-field class="mx-2" v-model="secondName" :rules="basicRule"
            label="second name">
            </v-text-field>
          </v-row>
          <v-row class="ma-4">
            <v-text-field  class="mx-2" v-model="userCPF" :rules="basicRule"
            label="CPF" autofocus="true">
            </v-text-field>
            <v-text-field class="mx-2" v-model="dateOfBirth" :rules="basicRule"
            label="date of birth">
            </v-text-field>
          </v-row>
          <v-col>
            <v-row justify="center" class="mt-4"> 
              <span 
              style="color:var(--cherry-pink); 
              font-family: 'Cursive	Brush Script MT'; font-weight: bold;"
              >My Address</span>
            </v-row>
            <v-row class="ma-4">
                <v-text-field class="mx-2" v-model="houseCEP" :rules="cepRule" label="CEP" >
                </v-text-field>
                <v-text-field class="mx-2" v-model="houseAddress" label="Your addres"  
                readonly ></v-text-field>
              </v-row>
              <v-row class="ma-4">
                <v-text-field class="mx-2" v-model="houseNumber" label="number" :rules="basicRule"  
                ></v-text-field>
                <v-text-field class="mx-2" v-model="houseCity" label="City"   
                readonly ></v-text-field>
              </v-row>
              <v-row  align="center" justify="space-around" class="my-1">
                <v-btn @click="saveChanges"
                style="color:var(--cherry-pink)">save changes</v-btn>
                <v-btn @click="showDialog=false "
                >discard</v-btn>
              </v-row>
          </v-col>
          </v-card>
        </v-col>
        </v-form>
  </v-dialog>
</template>

<script>
import { useUserStore } from '@/store/userLoginStore';
import { ref } from 'vue';
import axios from 'axios';

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
      },
  },
  mounted(){
  },
  setup(){
    const userStore = useUserStore()

    let firstName = ref(userStore.name);
    let secondName = ref(userStore.lastName);
    let houseCEP = ref(userStore.cep);
    let houseAddress = ref(userStore.houseAddress);
    let houseCity = ref(userStore.houseCity);
    let houseNumber = ref(userStore.houseNumber);
    let userCPF = ref(userStore.userCPF);
    let dateOfBirth = ref(userStore.dateOfBirth);

    return {userStore, firstName, secondName, houseCEP, houseAddress, houseCity, houseNumber,
    userCPF, dateOfBirth}
  },
  data() {
  },
  methods: {
    async getCEP(value) {
      try {
        const response = await axios
        .get(`https://viacep.com.br/ws/${value}/json`)
          return {
            houseAddress: response.data.logradouro,
            houseCity: response.data.localidade
          }
      } catch (error) {
        console.error(error);
      }
    },
    saveChanges(){
      this.userStore.name = this.firstName;
      this.userStore.lastName = this.secondName;
      this.userStore.userCPF = this.userCPF;
      this.userStore.cep = this.cep;
      this.userStore.houseAddress = this.houseAddress;
      this.userStore.houseCity = this.houseCity;
      this.userStore.houseNumber = this.houseNumber;
      this.userStore.dateOfBirth = this.dateOfBirth;      
    }   
  },
}
</script>

<style>
@import '../assets/colors.css';
</style>