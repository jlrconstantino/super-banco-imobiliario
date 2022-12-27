// Dependências
import db from "../config/models.config.js";

// Esquema
const category = db.mongoose.model("category");

// Instanciação do controlador
const category_controller = {};



// Post
category_controller.post = async (req, res) => {
    try{
        const item = new category(req.body.data);
        await item.save();
        res.status(201).send({
            message: "New category registered successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to register a new category.", 
            data: e
        });
    }
};



// Put
category_controller.put = async (req, res) => {
    try{
        await category.findOneAndUpdate(
            {
                active: true, 
                id: req.params.id
            }, 
            { $set: {
                id: req.params.id, 
                name: req.body.data.name 
            } }
        );
        res.status(201).send({
            message: "Updated category successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to update category.", 
            data: e
        });
    }
};



// Delete (by id)
category_controller.delete_by_id = async (req, res) => {
    try{
        await category.findOneAndRemove ({
            active: true, 
            id: req.params.id
        });
        res.status(200).send({
            message: "Removed category successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove category.", 
            data: e
        });
    }
};



// Delete (by name)
category_controller.delete_by_name = async (req, res) => {
    try{
        await category.findOneAndRemove ({
            active: true, 
            name: req.params.name
        });
        res.status(200).send({
            message: "Removed category successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove category.", 
            data: e
        });
    }
};



// Get (by id)
category_controller.get_by_id = async (req, res) => {
    try{
        const data = await category.findOne({
            active: true, 
            id: req.params.id
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get category.", 
            data: e
        });
    }
};



// Get (by name)
category_controller.get_by_name = async (req, res) => {
    try{
        const data = await category.findOne({
            active: true, 
            name: {$regex: new RegExp(req.params.name, "i")}
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get category.", 
            data: e
        });
    }
};



// Get all
category_controller.get_all = async (_, res) => {
    try{
        const data = await category.find({active: true});
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get categories.", 
            data: e
        });
    }
};



// Exportação do controlador
export default category_controller;