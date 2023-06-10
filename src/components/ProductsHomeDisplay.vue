<template>
  <div class="mb-5">
    <v-row justify="center">
      <v-col cols="3" align="center" v-for="category in categories" :key="category">
        <v-list-item style="color: var(--light-pink); font-weight: bold; font-size: large;">
          <v-list-item-action>
            <v-btn elevation="0" @click="getProductsByCategory(category)">{{ category }}
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-col>
    </v-row>
  </div>
  

  <v-row class="ma-3" justify="end" align="center">
    <v-row align="center" justify="center">
      <span style="color: var(--dark-pink); font-weight: bold;">sort by</span>
      <v-btn class="mx-3" style="color:var(--dark-pink)"
      v-model=mostE @click="sortByPriceME()">
        price
        <v-icon>
          mdi-arrow-up-thick
        </v-icon>
      </v-btn>
      <v-btn class="mx-3" style="color:var(--dark-pink)"
      v-model=leastE @click="sortByPriceLE()">
        price
        <v-icon>
          mdi-arrow-down-thick
        </v-icon>
      </v-btn>
      <v-btn class="mx-3" style="color:var(--dark-pink)"
      @click="sortByRate">
        top-rated
        <v-icon>
          mdi-star
        </v-icon>
      </v-btn>
    </v-row>
      
      <v-text-field  density="compact" label="looking for..." class="mb-2"
      append-inner-icon="mdi-magnify" single-line hide-details justify="end" 
      v-model="searchProduct" @click:append-inner="searchProducts">
      </v-text-field>
      
    </v-row>

  <div>
    <v-row align="center">
      <v-col cols="4" md="3" v-for="product in products" :key="product.id">
        <router-link :to="{name: 'ProductDetails', params: { id: product.id }}"
        style="text-decoration: none;">
          <v-card class="mx-5" align="center" height="300" width="250"
          style="border: 1px solid var(--platinum); border-radius: 4px;">
            <div align="center" justify="center">
              <v-img :src="product.image" height="200px" width="200px"></v-img>
            </div>
            <v-card-title>{{ product.title }}</v-card-title>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => {
    return {
      products: [],
      categories: [],
      newCategory: 'All',
      searchProduct: '',
      mostE : 'most-expensive',
      leastE: 'least-expensive',
      sortedProducts: []
    };
  },
  mounted() {
    this.getAllProducts();
    this.getAllCategories()
  },
  methods: {
    getAllProducts() {
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          this.products = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error(error);
        });
    },

    getProductsByCategory(category) {
      axios
        .get(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

    getAllCategories() {
      axios
        .get('https://fakestoreapi.com/products/categories')
        .then(response => {
          const categoryToRemove = 'electronics';
          this.categories = response.data.filter(category => category !== categoryToRemove);
        })
        .catch(error => {
          console.error(error);
        });
    },

    searchProducts() {
      const searchProduct = this.searchProduct.toLowerCase();
      let newShowingProducts;

      if (searchProduct == '') 
        return this.getAllProducts();

      newShowingProducts = this.products.filter(
        product =>
          product.title.toLowerCase().includes(searchProduct) ||
          product.description.toLowerCase().includes(searchProduct)
      );

      if(newShowingProducts=='')
        return

      this.products = newShowingProducts
    },

    sortByPriceLE(){
        this.products.sort((a, b) => a.price - b.price);
    },
    sortByPriceME(){
      this.products.sort((a, b) => b.price - a.price);
    },
    sortByRate(){
      this.products.sort((a, b) => b.rating.rate - a.rating.rate);
    }
  }
};
</script>

<style>
</style>
