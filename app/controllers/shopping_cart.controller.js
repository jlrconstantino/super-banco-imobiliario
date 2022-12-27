// Dependências
import db from "../config/models.config.js";

// Esquema
const shopping_cart = db.mongoose.model("shopping_cart");

// Instanciação do controlador
const shopping_cart_controller = {};



// Post
shopping_cart_controller.post = async (req, res) => {
    try{
        const item = new shopping_cart(req.body.data);
        await item.save();
        res.status(201).send({
            message: "New shopping_cart registered successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to register a new shopping_cart.", 
            data: e
        });
    }
};



// Put
shopping_cart_controller.put = async (req, res) => {
    try{
        const data_reference = req.body.data;
        await shopping_cart.findOneAndUpdate(
            {
                active: true, 
                user: req.params.user, 
                invoice: req.params.invoice
            }, 
            { $set: {
                user: data_reference.user, 
                invoice: data_reference.invoice, 
                datetime: data_reference.datetime, 
                subtotal: data_reference.subtotal, 
                freight: data_reference.freight
            } }
        );
        res.status(201).send({
            message: "Updated shopping_cart successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to update shopping_cart.", 
            data: e
        });
    }
};



// Delete
shopping_cart_controller.delete = async (req, res) => {
    try{
        await shopping_cart.findOneAndRemove ({
            active: true, 
            user: req.params.user, 
            invoice: req.params.invoice, 
        });
        res.status(200).send({
            message: "Removed shopping_cart successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove shopping_cart.", 
            data: e
        });
    }
};



// Delete all from user
shopping_cart_controller.delete_all_from_user = async (req, res) => {
    try{
        await shopping_cart.remove ({
            active: true, 
            user: req.params.user
        });
        res.status(200).send({
            message: "Removed shopping_carts successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove shopping_carts.", 
            data: e
        });
    }
};



// Get
shopping_cart_controller.get = async (req, res) => {
    try{
        const data = await shopping_cart.findOne({
            active: true, 
            user: req.params.user, 
            invoice: req.params.invoice, 
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get shopping_cart.", 
            data: e
        });
    }
};



// Get all
shopping_cart_controller.get_all = async (_, res) => {
    try{
        const data = await shopping_cart.find({active: true});
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get shopping_carts.", 
            data: e
        });
    }
};



// Get all from user
shopping_cart_controller.get_all_from_user = async (req, res) => {
    try{
        const data = await shopping_cart.find({
            active: true, 
            user: req.params.user
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get shopping_carts.", 
            data: e
        });
    }
};



// Exportação do controlador
export default shopping_cart_controller;