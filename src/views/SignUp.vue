<template>
    <v-row class="pt-16" align="center" justify="start">
      <v-col>
        <v-sheet width="400" class="mx-auto" style="border: 5px solid var(--platinum); border-radius: 4px;">
        <v-form @submit.prevent v-model="isForm1Valid" lazy-validation>
          <div class="ma-5">About you</div> 
          <v-row class="ma-4">
              <v-text-field  class="mx-2" v-model="firstName" :rules="basicRule"
              label="First name" autofocus="true">
              </v-text-field>
            <v-text-field class="mx-2" v-model="secondName" :rules="basicRule"
            label="Second name"></v-text-field>
          </v-row>
          <v-row class="ma-4">
            <v-text-field class="mx-2" v-model="email" label="e-mail" :rules="emailRule">
            </v-text-field>
          </v-row>
          <v-row class="ma-4">
            <v-text-field class="mx-2" v-model="cpf" label="CPF" type="number" :rules="cpfRule">
            </v-text-field>
            <v-text-field class="mx-2" v-model="dateOfBirth" label="date of birth" type="date" 
            :rules="basicRule">
            </v-text-field>
          </v-row>
          <v-row class="ma-4">
            <v-text-field class="mx-2" v-model="firstPassword" :rules="passwordRule"
            label="password" type="password">
            </v-text-field>
            <v-text-field class="mx-2" v-model="secondPassword" :rules="secondPasswordRule"
            label="type again" type="password">
            </v-text-field>
          </v-row>
          </v-form>
      </v-sheet>
      </v-col>
      <v-col justify="center">
        <v-sheet width="400" class="mx-auto"
        style="border: 5px solid var(--platinum); border-radius: 4px;">
        <v-form @submit.prevent v-model="isForm2Valid" lazy-validation
        :disabled="!isForm1Valid">
          <div class="ma-5">Your Adress</div> 
          <v-row class="ma-4">
            <v-text-field class="mx-2" v-model="houseCEP" :rules="cepRule" label="CEP"
            >
            </v-text-field>
            <v-text-field class="mx-2" v-model="houseAddress" label="Your address"  
            readonly ></v-text-field>
          </v-row>
          <v-row class="ma-4">
            <v-text-field class="mx-2" v-model="houseNumber" label="number" :rules="basicRule"  
            ></v-text-field>
            <v-text-field class="mx-2" v-model="houseCity" label="City"   
            readonly ></v-text-field>
          </v-row>
        </v-form>
      </v-sheet>
      <v-row justify="center" align="center">
          <v-btn rounded color = "#ffcad4" density="default"
          class="mt-16" style="color: white" :disabled="!isForm2Valid || !isForm1Valid"
          @click="userStore.userAdd(
            firstName, 
            secondName, 
            secondPassword, 
            email, 
            houseCEP,
            houseAddress, 
            houseCity,
            houseNumber,
            cpf,
            dateOfBirth)"
          >
          <router-link :to="{name: 'Home'}" style="text-decoration: none;">
          Sign Up
          </router-link>
        </v-btn> 
      </v-row> 
    </v-col> 
  </v-row>
</template>
  
<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {useUserStore} from '../store/userLoginStore';

const userStore = useUserStore();

const isForm1Valid = ref(false);
const isForm2Valid = ref(false);

const firstName = ref('');
const secondName = ref('')
const firstPassword = ref('');
const secondPassword = ref('');
const email = ref('');
const cpf = ref('')
const dateOfBirth = ref('')

const houseCEP = ref('');
let houseAddress = ref('');
const houseNumber = ref('');
let houseCity = ref('');

const basicRule = [
  value => {
    if (value) return true
    return 'type please'
  }
]

const emailRule = [
  value => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) 
      return true;
    return 'invalid e-mail'
  }
]

const cpfRule = [
  value => {
    if(value.length !== 11)
      return 'invalid CPF'
    return true      
  }
]

const passwordRule =[
  value => {
    if(value.length < 6)
      return 'too short password'
    return true
  }
]

const secondPasswordRule = [
  value => {
    if (checkPasswordMismatch() || value.length < 6)
      return 'different passwords'
    return true
  }
]

const cepRule = [
  async (value) => {
    if (value.length !== 8) {
      return 'invalid CEP';
    }
    const infoCEP = await getCEP(value);
    houseAddress.value = infoCEP.houseAddress;
    houseCity.value = infoCEP.houseCity;
    return true;
  }
];

function checkPasswordMismatch(){
  if(firstPassword.value !== secondPassword.value)
    return true
}

async function getCEP(value) {
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
}

</script>

<style>

</style>