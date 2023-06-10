<template>
    <div>
        <div align="start" justify="center" class="ma-14">
            <v-row align="start">
                    <v-img :src="product.image" height="300px" width="250px" class="mx-2"
                    style="border: 1px solid var(--dark-pink); border-radius: 10px;"></v-img>
                    <v-col class="mt-2">
                        <h3 style="color:var(--dark-pink); font-family: 'Lucida Handwriting'; font-size: x-large;"
                        >{{product.title}}</h3>
                        <p class="mt-5">{{ product.description }}</p>
                        <v-row class="ma-4" justify="space-between">
                            <div>
                                <span style="font-family:'Lucida Console'; font-size: x-large;"
                                >R$ {{ product.price }}</span> 
                            </div>
                            <div>
                                <v-icon class="mb-1" 
                                style="color:gold; font-size: 40px;">mdi-star</v-icon>
                                <span style="font-size: 20px; font-family: 'Lucida Sans Regular';"> {{ productRate}}</span>
                            </div>
                        </v-row>
                        <v-btn style="color:var(--cherry-pink)" letiant="outlined"
                        @click="cartStore.addProduct(product.id)">Add to cart</v-btn>
                    </v-col>
            </v-row>     
        </div>

        <div>
            <v-col align="center">
                <span style="font-size: 32px; color:var(--dark-pink); font-weight: bold; font-family: 'Lucida Sans Regular';"
                >You might be interested in:</span>
                <v-row justify="center">
                    <v-slide-group>
                        <v-slide-group-item
                        v-for="recommendedProduct in products" :key="recommendedProduct.key">
                            <v-card height="250" width="150" class="ma-7" 
                            style="border: 1px solid var(--platinum); border-radius: 4px;">
                            <router-link :to="{name: 'ProductDetails', params: {id: recommendedProduct.id}}"
                        style="text-decoration: none;">
                                <v-img :src="recommendedProduct.image" height="250" width="150"></v-img>
                            </router-link>
                            </v-card>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-row>
            </v-col>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { useCartStore } from '@/store/userCartStore';

export default {
props: {
    id: {
    type: Number,
    required: true,
    },
},
setup(){
    const cartStore = useCartStore();

    return {cartStore}
},
data() {
    return {
    product: '',
    products: [],
    productRate: null,
    };
},
mounted() {
    this.fetchProduct();
    this.getProductsByCategory();
},
methods: {
    getProductsByCategory() {
      axios
        .get(`https://fakestoreapi.com/products?limit=9`)
        .then(response => {
          this.products = response.data;
          this.shuffleArray(this.products).slice(3)
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchProduct() {
      axios
        .get(`https://fakestoreapi.com/products/${this.id}`)
        .then(response => {
          this.product = response.data;
          this.productRate = response.data.rating.rate;
        })
        .catch(error => {
          console.error(error);
        });
    },
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },
},
};
</script>

<style>

</style>
  