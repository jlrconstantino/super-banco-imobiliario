// Dependências
import db from "../config/models.config.js";

// Esquema
const ratings = db.mongoose.model("ratings");

// Instanciação do controlador
const ratings_controller = {};



// Post
ratings_controller.post = async (req, res) => {
    try{
        const item = new ratings(req.body.data);
        await item.save();
        res.status(201).send({
            message: "New ratings sample registered successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to register a new ratings sample.", 
            data: e
        });
    }
};



// Put
ratings_controller.put = async (req, res) => {
    try{
        const data_reference = req.body.data;
        await ratings.findOneAndUpdate(
            {
                active: true, 
                user: req.params.user, 
                product: req.params.product
            }, 
            { $set: {
                user: data_reference.user, 
                product: data_reference.product, 
                rating: data_reference.rating
            } }
        );
        res.status(201).send({
            message: "Updated ratings sample successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to update ratings sample.", 
            data: e
        });
    }
};



// Delete
ratings_controller.delete = async (req, res) => {
    try{
        await ratings.findOneAndRemove ({
            active: true, 
            user: req.params.user, 
            product: req.params.product, 
        });
        res.status(200).send({
            message: "Removed ratings sample successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove ratings sample.", 
            data: e
        });
    }
};



// Delete all from user
ratings_controller.delete_all_from_user = async (req, res) => {
    try{
        await ratings.remove ({
            active: true, 
            user: req.params.user
        });
        res.status(200).send({
            message: "Removed user ratings successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove user ratings.", 
            data: e
        });
    }
};



// Delete all from product
ratings_controller.delete_all_from_product = async (req, res) => {
    try{
        await ratings.remove ({
            active: true, 
            product: req.params.product
        });
        res.status(200).send({
            message: "Removed product ratings successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove product ratings.", 
            data: e
        });
    }
};



// Get
ratings_controller.get = async (req, res) => {
    try{
        const data = await ratings.findOne({
            active: true, 
            user: req.params.user, 
            product: req.params.product, 
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get ratings sample.", 
            data: e
        });
    }
};



// Get all
ratings_controller.get_all = async (_, res) => {
    try{
        const data = await ratings.find({active: true});
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get ratings.", 
            data: e
        });
    }
};



// Get all from user
ratings_controller.get_all_from_user = async (req, res) => {
    try{
        const data = await ratings.find({
            active: true, 
            user: req.params.user
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get user ratings.", 
            data: e
        });
    }
};



// Get all from product
ratings_controller.get_all_from_product = async (req, res) => {
    try{
        const data = await ratings.find({
            active: true, 
            product: req.params.product
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get product ratings.", 
            data: e
        });
    }
};



// Exportação do controlador
export default ratings_controller;