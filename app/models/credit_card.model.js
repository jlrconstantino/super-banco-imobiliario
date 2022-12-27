// Dependências
import mongoose from "mongoose";

// Esquema do cartão
const credit_card_schema = new mongoose.Schema({
    user: {
        type: String, 
        required: true, 
    }, 
    number: {
        type: String, 
        required: true, 
    }, 
    title: {
        type: String, 
        required: true, 
        trim: true, 
    }, 
    security_code: {
        type: Number, 
        required: true, 
    }, 
    cardholder: {
        type: String, 
        required: true, 
        trim: true, 
    }, 
    expiration_date: {
        type: String, 
        required: true, 
    }, 
});

// Chave primária original
credit_card_schema.index({user: 1, number: 1}, {unique: true});

// Exportação do esquema
export default credit_card_schema;