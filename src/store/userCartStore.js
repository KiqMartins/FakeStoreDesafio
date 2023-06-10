import { defineStore } from 'pinia';
import axios from 'axios';

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        products : []
    }),
    actions: {
        addProduct(product){
            axios
                .get(`https://fakestoreapi.com/products/${product}`)
                .then(response => {
                this.products.push(response.data);
                })
                .catch(error => {
                console.error(error);
                });
        },
        removeProduct(product){
            const newProducts = this.products.filter(e => e.id !== product);
            this.products = newProducts;
        },
        removeAllProducts(){
            this.products = [];
        },
    },
})