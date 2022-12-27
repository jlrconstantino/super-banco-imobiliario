// Dependências
import db from "../config/models.config.js";

// Esquema
const credit_card = db.mongoose.model("credit_card");

// Instanciação do controlador
const credit_card_controller = {};



// Post
credit_card_controller.post = async (req, res) => {
    try{
        const item = new credit_card(req.body.data);
        await item.save();
        res.status(201).send({
            message: "New credit_card registered successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to register a new credit_card.", 
            data: e
        });
    }
};



// Put
credit_card_controller.put = async (req, res) => {
    try{
        const data_reference = req.body.data;
        await credit_card.findOneAndUpdate(
            {
                active: true, 
                user: req.params.user, 
                number: req.params.number
            }, 
            { $set: {
                user: data_reference.user, 
                number: data_reference.number, 
                title: data_reference.title, 
                security_code: data_reference.security_code, 
                cardholder: data_reference.cardholder, 
                expiration_date: data_reference.expiration_date
            } }
        );
        res.status(201).send({
            message: "Updated credit_card successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to update credit_card.", 
            data: e
        });
    }
};



// Delete
credit_card_controller.delete = async (req, res) => {
    try{
        await credit_card.findOneAndRemove ({
            active: true, 
            user: req.params.user, 
            number: req.params.number, 
        });
        res.status(200).send({
            message: "Removed credit_card successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove credit_card.", 
            data: e
        });
    }
};



// Delete all from user
credit_card_controller.delete_all_from_user = async (req, res) => {
    try{
        await credit_card.remove ({
            active: true, 
            user: req.params.user
        });
        res.status(200).send({
            message: "Removed credit_cards successfully."
        });
    }catch(e){
        res.status(400).send({
            message: "Failed to remove credit_cards.", 
            data: e
        });
    }
};



// Get
credit_card_controller.get = async (req, res) => {
    try{
        const data = await credit_card.findOne({
            active: true, 
            user: req.params.user, 
            number: req.params.number, 
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get credit_card.", 
            data: e
        });
    }
};



// Get all
credit_card_controller.get_all = async (_, res) => {
    try{
        const data = await credit_card.find({active: true});
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get credit_cards.", 
            data: e
        });
    }
};



// Get all from user
credit_card_controller.get_all_from_user = async (req, res) => {
    try{
        const data = await credit_card.find({
            active: true, 
            user: req.params.user
        });
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({
            message: "Failed to get credit_cards.", 
            data: e
        });
    }
};



// Exportação do controlador
export default credit_card_controller;