// Dependências
import db from "../config/models.config.js";

// Esquemas
const product = db.mongoose.model("product");

// Instanciação do controlador
const product_controller = {};



// Post
product_controller.post = async (req, res) => {
    try{
        const item = new product(req.body.data);
        await item.save();
        res.status(201).send({
            message: "New product registered successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to register a new product.", 
            data: e
        });
    }
};



// Put
product_controller.put = async (req, res) => {
    try{
        const data_reference = req.body.data;
        await product.findOneAndUpdate(
            {
                active: true, 
                id: req.params.id
            }, 
            { $set: {
                id: data_reference.id, 
                title: data_reference.title, 
                price: data_reference.price, 
                stock: data_reference.stock, 
                rating: data_reference.rating, 
                sales: data_reference.sales, 
                author: data_reference.author, 
                publisher: data_reference.publisher, 
                finishing: data_reference.finishing, 
                year: data_reference.year, 
                language: data_reference.language, 
                pages: data_reference.pages, 
                description: data_reference.description, 
                image_source: data_reference.image_source, 
            } }
        );
        res.status(201).send({
            message: "Updated product successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to update product.", 
            data: e
        });
    }
};



// Delete (by id)
product_controller.delete_by_id = async (req, res) => {
    try{
        await product.findOneAndRemove ({
            active: true, 
            id: req.params.id, 
        });
        res.status(200).send({
            message: "Removed product successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove product.", 
            data: e
        });
    }
};



// Delete (by title)
product_controller.delete_by_title = async (req, res) => {
    try{
        await product.findOneAndRemove ({
            active: true, 
            title: req.params.title, 
        });
        res.status(200).send({
            message: "Removed product successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove product.", 
            data: e
        });
    }
};



// Get (by id)
product_controller.get_by_id = async (req, res) => {
    try{
        const data = await product.findOne({
            active: true, 
            id: req.params.id, 
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get product.", 
            data: e
        });
    }
};



// Get (by title)
product_controller.get_by_title = async (req, res) => {
    try{
        const data = await product.findOne({
            active: true, 
            title: req.params.title, 
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get product.", 
            data: e
        });
    }
};



// Get all
product_controller.get_all = async (_, res) => {
    try{
        const data = await product.find({active: true});
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get products.", 
            data: e
        });
    }
};


// Exportação do controlador
export default product_controller;