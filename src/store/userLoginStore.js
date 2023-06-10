import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    name: null,
    lastName: null,
    email: null,
    password: null,
    userCPF: null,
    dateOfBirth: null,
    
    cep: null,
    houseAddress: null,
    houseNumber: null,
    houseCity: null,

    isLoggedIn: false,
  }),
  actions: {
    userAdd(name, lastName, email, password, 
      cep, houseAddress, houseCity, houseNumber,
      userCPF, dateOfBirth){
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.cep = cep;
        this.houseNumber = houseNumber;
        this.houseAddress = houseAddress;
        this.userCPF = userCPF;
        this.dateOfBirth = dateOfBirth;
        this.houseCity = houseCity

        this.isLoggedIn = true;
    },
  },
  getters: {
    showUserName(){
        return this.name;
    }
  }
});