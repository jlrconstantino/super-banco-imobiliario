// Dependências
import db from "../config/models.config.js";

// Esquema
const cart_product = db.mongoose.model("cart_product");

// Instanciação do controlador
const cart_product_controller = {};



// Post
cart_product_controller.post = async (req, res) => {
    try{
        const item = new cart_product(req.body.data);
        await item.save();
        res.status(201).send({
            message: "New cart_product registered successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to register a new cart_product.", 
            data: e
        });
    }
};



// Put
cart_product_controller.put = async (req, res) => {
    try{
        const data_reference = req.body.data;
        await cart_product.findOneAndUpdate(
            {
                active: true, 
                user: req.params.user, 
                cart: req.params.cart, 
                product: req.params.product
            }, 
            { $set: {
                user: data_reference.user, 
                cart: data_reference.cart, 
                product: data_reference.product, 
                quantity: data_reference.quantity, 
                subtotal: data_reference.subtotal
            } }
        );
        res.status(201).send({
            message: "Updated cart_product successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to update cart_product.", 
            data: e
        });
    }
};



// Delete
cart_product_controller.delete = async (req, res) => {
    try{
        await cart_product.findOneAndRemove ({
            active: true, 
            user: req.params.user, 
            cart: req.params.cart, 
            product: req.params.product
        });
        res.status(200).send({
            message: "Removed cart_product successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove cart_product.", 
            data: e
        });
    }
};



// Delete all from shopping cart
cart_product_controller.delete_all_from_shopping_cart = async (req, res) => {
    try{
        await cart_product.remove ({
            active: true, 
            user: req.params.user, 
            cart: req.params.cart, 
        });
        res.status(200).send({
            message: "Removed cart_products successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove cart_products.", 
            data: e
        });
    }
};



// Delete all from user
cart_product_controller.delete_all_from_user = async (req, res) => {
    try{
        await cart_product.remove ({
            active: true, 
            user: req.params.user
        });
        res.status(200).send({
            message: "Removed cart_products successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove cart_products.", 
            data: e
        });
    }
};



// Get
cart_product_controller.get = async (req, res) => {
    try{
        const data = await cart_product.findOne({
            active: true, 
            user: req.params.user, 
            cart: req.params.cart, 
            product: req.params.product, 
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get cart_product.", 
            data: e
        });
    }
};



// Get all
cart_product_controller.get_all = async (_, res) => {
    try{
        const data = await cart_product.find({active: true});
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get cart_products.", 
            data: e
        });
    }
};



// Get all from shopping cart
cart_product_controller.get_all_from_shopping_cart = async (req, res) => {
    try{
        const data = await cart_product.find({
            active: true, 
            user: req.params.user, 
            cart: req.params.cart, 
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get cart_products.", 
            data: e
        });
    }
};



// Exportação do controlador
export default cart_product_controller;