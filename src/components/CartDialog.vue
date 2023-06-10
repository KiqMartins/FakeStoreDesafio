<template>
    <v-dialog class="ma-1" v-model="showDialog" align="center" height="auto">
        <v-form>
            <v-sheet :width="520">
                <v-col>
                    <v-row v-for="product in products" :key="product">
                        <v-card justify="center" align="center" class="ma-3"
                        style="border: 1px solid var(--platinum); border-radius: 2px;">
                            <v-row justify="start" align="center">
                                <div align="center" justify="center" class="my-3">
                                    <v-img :src="product.image" height="120px" width="150px"></v-img>
                                </div>
                                <v-col align="center" justify="center">
                                    <h4 style="font-size: 13px;">{{ product.title }}</h4>
                                    <p style="font-size: 9px">{{ product.description }}</p>
                                </v-col>
                                <v-btn icon class="mx-5">
                                    <v-icon style="color:var(--dark-pink)"
                                    @click="removeProduct(product.id)">mdi-cancel</v-icon>
                                </v-btn>
                            </v-row>
                        </v-card>
                    </v-row>
                    <v-col>
                        <v-btn class="mx-2" variant="outlined"
                        style="color:var(--cherry-pink); font-weight: bold;"
                        @click="this.showDialog=false"
                        >keep buying</v-btn>
                        <v-btn class="mx-2" variant="outlined"
                        style="color:var(--dark-pink);"
                        @click="clearCart">clear cart</v-btn>
                    </v-col>
                </v-col>
        </v-sheet>
        </v-form>
    </v-dialog>
</template>

<script>
import { useCartStore } from '@/store/userCartStore';
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
        }
      },
    data: () => {
        return {
        products: [],
        newProducts: [],

        }
    },
    beforeMount(){
        this.products = this.cartStore.products
    },
    setup(){
        const cartStore = useCartStore()

        return {cartStore};
    },  
    methods: {
         getProducts(ids) {  
            ids.forEach(id => {
                axios
                .get(`https://fakestoreapi.com/products/${id}`)
                .then(response => {
                this.products.push(response.data);
                })
                .catch(error => {
                console.error(error);
                });
            })
        },
        clearCart(){
            this.cartStore.removeAllProducts();
            this.products = this.cartStore.products
        },
        removeProduct(productId){
            this.cartStore.removeProduct(productId); 
            this.products = this.cartStore.products;
        }
    }       
}
</script>