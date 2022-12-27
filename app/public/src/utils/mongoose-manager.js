"use strict"

// AXIOS
import axios from 'axios';

// Objeto controlador
const mongoose_manager = {};


///////// .:::: USER ::::. //////////

// POST
mongoose_manager.post_user = async function(user){
    let response = await axios.post(`/users`, {data: user});
    return response;
}


// PUT (by id)
mongoose_manager.put_user_by_id = async function(user, id){
    let response = await axios.put(`/users/id/${id}`, {data: user});
    return response;
}


// PUT (by email)
mongoose_manager.put_user_by_email = async function(user, email){
    let response = await axios.put(`/users/email/${email}`, {data: user});
    return response;
}


// DELETE (by id)
mongoose_manager.delete_user_by_id = async function(id){
    let response = await axios.delete(`/users/id/${id}`);
    return response;
}


// DELETE (by email)
mongoose_manager.delete_user_by_email = async function(email){
    let response = await axios.delete(`/users/email/${email}`);
    return response;
}


// GET (by id)
mongoose_manager.get_user_by_id = async function(id){
    let response = await axios.get(`/users/id/${id}`);
    response = await response.data;
    return response;
}


// GET (by email)
mongoose_manager.get_user_by_email = async function(email){
    let response = await axios.get(`/users/email/${email}`);
    response = await response.data;
    return response;
}


// GET ALL
mongoose_manager.get_all_users = async function(){
    let response = await axios.get(`/users`);
    response = await response.data;
    return response;
}



///////// .:::: CREDIT CARD ::::. //////////

// POST
mongoose_manager.post_credit_card = async function(credit_card){
    let response = await axios.post(`/credit_cards`, {data: credit_card});
    return response;
}


// PUT
mongoose_manager.put_credit_card = async function(credit_card, user, number){
    let response = await axios.put(`/credit_cards/${user}/${number}`, {data: credit_card});
    return response;
}


// DELETE
mongoose_manager.delete_credit_card = async function(user, number){
    let response = await axios.delete(`/credit_cards/${user}/${number}`);
    return response;
}


// DELETE ALL FROM USER
mongoose_manager.delete_all_credit_cards_from_user = async function(user){
    let response = await axios.delete(`/credit_cards/${user}`);
    return response;
}


// GET
mongoose_manager.get_credit_card = async function(user, number){
    let response = await axios.get(`/credit_cards/${user}/${number}`);
    response = await response.data;
    return response;
}


// GET ALL
mongoose_manager.get_all_credit_cards = async function(){
    let response = await axios.get(`/credit_cards`);
    response = await response.data;
    return response;
}


// GET ALL FROM USER
mongoose_manager.get_all_credit_cards_from_user = async function(user){
    let response = await axios.get(`/credit_cards/${user}`);
    response = await response.data;
    return response;
}



///////// .:::: DELIVERY ADDRESS ::::. //////////

// POST
mongoose_manager.post_delivery_address = async function(delivery_address){
    let response = await axios.post(`/delivery_addresses`, {data: delivery_address});
    return response;
}


// PUT
mongoose_manager.put_delivery_address = async function(delivery_address, user, zip){
    let response = await axios.put(`/delivery_addresses/${user}/${zip}`, {data: delivery_address});
    return response;
}


// DELETE
mongoose_manager.delete_delivery_address = async function(user, zip){
    let response = await axios.delete(`/delivery_addresses/${user}/${zip}`);
    return response;
}


// DELETE ALL FROM USER
mongoose_manager.delete_all_delivery_addresses_from_user = async function(user){
    let response = await axios.delete(`/delivery_addresses/${user}`);
    return response;
}


// GET
mongoose_manager.get_delivery_address = async function(user, zip){
    let response = await axios.get(`/delivery_addresses/${user}/${zip}`);
    response = await response.data;
    return response;
}


// GET ALL
mongoose_manager.get_all_delivery_addresses = async function(){
    let response = await axios.get(`/delivery_addresses`);
    response = await response.data;
    return response;
}


// GET ALL FROM USER
mongoose_manager.get_all_delivery_addresses_from_user = async function(user){
    let response = await axios.get(`/delivery_addresses/${user}`);
    response = await response.data;
    return response;
}



///////// .:::: RATINGS ::::. //////////

// POST
mongoose_manager.post_ratings = async function(ratings){
    let response = await axios.post(`/ratings`, {data: ratings});
    return response;
}


// PUT
mongoose_manager.put_ratings = async function(ratings, user, product){
    let response = await axios.put(`/ratings/${user}/${product}`, {data: ratings});
    return response;
}


// DELETE
mongoose_manager.delete_ratings = async function(user, product){
    let response = await axios.delete(`/ratings/${user}/${product}`);
    return response;
}


// DELETE ALL FROM USER
mongoose_manager.delete_all_ratings_from_user = async function(user){
    let response = await axios.delete(`/ratings/user/${user}`);
    return response;
}


// DELETE ALL FROM PRODUCT
mongoose_manager.delete_all_ratings_from_product = async function(product){
    let response = await axios.delete(`/ratings/product/${product}`);
    return response;
}


// GET
mongoose_manager.get_ratings = async function(user, product){
    let response = await axios.get(`/ratings/${user}/${product}`);
    response = await response.data;
    return response;
}


// GET ALL
mongoose_manager.get_all_ratings = async function(){
    let response = await axios.get(`/ratings`);
    response = await response.data;
    return response;
}


// GET ALL FROM USER
mongoose_manager.get_all_ratings_from_user = async function(user){
    let response = await axios.get(`/ratings/user/${user}`);
    response = await response.data;
    return response;
}


// GET ALL FROM PRODUCT
mongoose_manager.get_all_ratings_from_product = async function(product){
    let response = await axios.get(`/ratings/${product}`);
    response = await response.data;
    return response;
}



///////// .:::: SHOPPING CART ::::. //////////

// POST
mongoose_manager.post_shopping_cart = async function(shopping_cart){
    let response = await axios.post(`/shopping_carts`, {data: shopping_cart});
    return response;
}


// PUT
mongoose_manager.put_shopping_cart = async function(shopping_cart, user, invoice){
    let response = await axios.put(`/shopping_carts/${user}/${invoice}`, {data: shopping_cart});
    return response;
}


// DELETE
mongoose_manager.delete_shopping_cart = async function(user, invoice){
    let response = await axios.delete(`/shopping_carts/${user}/${invoice}`);
    return response;
}


// DELETE ALL FROM USER
mongoose_manager.delete_all_shopping_carts_from_user = async function(user){
    let response = await axios.delete(`/shopping_carts/${user}`);
    return response;
}


// GET
mongoose_manager.get_shopping_cart = async function(user, invoice){
    let response = await axios.get(`/shopping_carts/${user}/${invoice}`);
    response = await response.data;
    return response;
}


// GET ALL
mongoose_manager.get_all_shopping_carts = async function(){
    let response = await axios.get(`/shopping_carts`);
    response = await response.data;
    return response;
}


// GET ALL FROM USER
mongoose_manager.get_all_shopping_carts_from_user = async function(user){
    let response = await axios.get(`/shopping_carts/${user}`);
    response = await response.data;
    return response;
}



///////// .:::: CART PRODUCT ::::. //////////

// POST
mongoose_manager.post_cart_product = async function(cart_product){
    let response = await axios.post(`/cart_products`, {data: cart_product});
    return response;
}


// PUT
mongoose_manager.put_cart_product = async function(cart_product, user, cart, product){
    let response = await axios.put(`/cart_products/${user}/${cart}/${product}`, {data: cart_product});
    return response;
}


// DELETE ALL FROM USER
mongoose_manager.delete_all_cart_products_from_user = async function(user){
    let response = await axios.delete(`/cart_products/${user}`);
    return response;
}


// DELETE ALL FROM SHOPPING CART
mongoose_manager.delete_all_cart_products_from_shopping_cart = async function(user, cart){
    let response = await axios.delete(`/cart_products/${user}/${cart}`);
    return response;
}


// DELETE
mongoose_manager.delete_cart_product = async function(user, cart, product){
    let response = await axios.delete(`/cart_products/${user}/${cart}/${product}`);
    return response;
}


// GET
mongoose_manager.get_cart_product = async function(user, cart, product){
    let response = await axios.get(`/cart_products/${user}/${cart}/${product}`);
    response = await response.data;
    return response;
}


// GET ALL
mongoose_manager.get_all_cart_products = async function(){
    let response = await axios.get(`/cart_products`);
    response = await response.data;
    return response;
}


// GET ALL FROM USER
mongoose_manager.get_all_cart_products_from_shopping_cart = async function(user, cart){
    let response = await axios.get(`/cart_products/${user}/${cart}`);
    response = await response.data;
    return response;
}



///////// .:::: PRODUCT ::::. //////////

// POST
mongoose_manager.post_product = async function(product){
    let response = await axios.post(`/products`, {data: product});
    return response;
}


// PUT
mongoose_manager.put_product = async function(product, id){
    let response = await axios.put(`/products/${id}`, {data: product});
    return response;
}


// DELETE (by id)
mongoose_manager.delete_product_by_id = async function(id){
    let response = await axios.delete(`/products/id/${id}`);
    return response;
}


// DELETE (by title)
mongoose_manager.delete_product_by_title = async function(title){
    let response = await axios.delete(`/products/title/${title}`);
    return response;
}


// GET (by id)
mongoose_manager.get_product_by_id = async function(id){
    let response = await axios.get(`/products/id/${id}`);
    response = await response.data;
    return response;
}


// GET (by title)
mongoose_manager.get_product_by_title = async function(title){
    let response = await axios.get(`/products/title/${title}`);
    response = await response.data;
    return response;
}


// GET ALL
mongoose_manager.get_all_products = async function(){
    let response = await axios.get(`/products`);
    response = await response.data;
    return response;
}



///////// .:::: CATEGORY ::::. //////////

// POST
mongoose_manager.post_category = async function(category){
    let response = await axios.post(`/categories`, {data: category});
    return response;
}


// PUT
mongoose_manager.put_category = async function(category, id){
    let response = await axios.put(`/categories/${id}`, {data: category});
    return response;
}


// DELETE (by id)
mongoose_manager.delete_category_by_id = async function(id){
    let response = await axios.delete(`/categories/id/${id}`);
    return response;
}


// DELETE (by name)
mongoose_manager.delete_category_by_name = async function(name){
    let response = await axios.delete(`/categories/name/${name}`);
    return response;
}


// GET (by id)
mongoose_manager.get_category_by_id = async function(id){
    let response = await axios.get(`/categories/id/${id}`);
    response = await response.data;
    return response;
}


// GET (by name)
mongoose_manager.get_category_by_name = async function(name){
    let response = await axios.get(`/categories/name/${name}`);
    response = await response.data;
    return response;
}


// GET ALL
mongoose_manager.get_all_categories = async function(){
    let response = await axios.get(`/categories`);
    response = await response.data;
    return response;
}



///////// .:::: PRODUCT CATEGORY ::::. //////////

// POST
mongoose_manager.post_product_category = async function(product_category){
    let response = await axios.post(`/product_categories`, {data: product_category});
    return response;
}


// PUT
mongoose_manager.put_product_category = async function(product_category, product, category){
    let response = await axios.put(`/product_categories/${product}/${category}`, {data: product_category});
    return response;
}


// DELETE
mongoose_manager.delete_product_category = async function(product, category){
    let response = await axios.delete(`/product_categories/${product}/${category}`);
    return response;
}


// DELETE ALL FROM PRODUCT
mongoose_manager.delete_all_product_categories_from_product = async function(product){
    let response = await axios.delete(`/product_categories/product/${product}`);
    return response;
}


// DELETE ALL FROM CATEGORY
mongoose_manager.delete_all_product_categories_from_category = async function(category){
    let response = await axios.delete(`/product_categories/category/${category}`);
    return response;
}


// GET
mongoose_manager.get_product_category = async function(product, category){
    let response = await axios.get(`/product_categories/${product}/${category}`);
    response = await response.data;
    return response;
}


// GET ALL
mongoose_manager.get_all_product_categories = async function(){
    let response = await axios.get(`/product_categories`);
    response = await response.data;
    return response;
}


// GET ALL FROM PRODUCT
mongoose_manager.get_all_product_categories_from_product = async function(product){
    let response = await axios.get(`/product_categories/${product}`);
    response = await response.data;
    return response;
}



///////// .:::: EXPORT ::::. //////////

export default mongoose_manager;