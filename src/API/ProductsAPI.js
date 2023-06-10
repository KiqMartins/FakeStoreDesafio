import axios from 'axios';

export const getCurrentProduct = (id) => {
    axios
    .get(`https://fakestoreapi.com/products/${id}`);
}

export const getProductsByCategory= (category) => {
    axios
    .get(`https://fakestoreapi.com/products/category/${category}`);
}

