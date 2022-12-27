// Dependências
import db from "../config/models.config.js";

// Esquema
const delivery_address = db.mongoose.model("delivery_address");

// Instanciação do controlador
const delivery_address_controller = {};



// Post
delivery_address_controller.post = async (req, res) => {
    try{
        const item = new delivery_address(req.body.data);
        await item.save();
        res.status(201).send({
            message: "New delivery_address registered successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to register a new delivery_address.", 
            data: e
        });
    }
};



// Put
delivery_address_controller.put = async (req, res) => {
    try{
        const data_reference = req.body.data;
        await delivery_address.findOneAndUpdate(
            {
                active: true, 
                user: req.params.user, 
                zip: req.params.zip
            }, 
            { $set: {
                user: data_reference.user, 
                zip: data_reference.zip, 
                title: data_reference.title, 
                state: data_reference.state, 
                city: data_reference.city, 
                district: data_reference.district, 
                street: data_reference.street, 
                number: data_reference.number, 
                complement: data_reference.complement
            } }
        );
        res.status(201).send({
            message: "Updated delivery_address successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to update delivery_address.", 
            data: e
        });
    }
};



// Delete
delivery_address_controller.delete = async (req, res) => {
    try{
        await delivery_address.findOneAndRemove ({
            active: true, 
            user: req.params.user, 
            zip: req.params.zip, 
        });
        res.status(200).send({
            message: "Removed delivery_address successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove delivery_address.", 
            data: e
        });
    }
};



// Delete all from user
delivery_address_controller.delete_all_from_user = async (req, res) => {
    try{
        await delivery_address.remove ({
            active: true, 
            user: req.params.user
        });
        res.status(200).send({
            message: "Removed delivery_addresses successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove delivery_addresses.", 
            data: e
        });
    }
};



// Get
delivery_address_controller.get = async (req, res) => {
    try{
        const data = await delivery_address.findOne({
            active: true, 
            user: req.params.user, 
            zip: req.params.zip, 
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get delivery_address.", 
            data: e
        });
    }
};



// Get all
delivery_address_controller.get_all = async (_, res) => {
    try{
        const data = await delivery_address.find({active: true});
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get delivery_addresses.", 
            data: e
        });
    }
};



// Get all from user
delivery_address_controller.get_all_from_user = async (req, res) => {
    try{
        const data = await delivery_address.find({
            active: true, 
            user: req.params.user
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get delivery_addresses.", 
            data: e
        });
    }
};



// Exportação do controlador
export default delivery_address_controller;