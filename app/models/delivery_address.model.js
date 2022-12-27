// Dependências
import mongoose from "mongoose";

// Esquema do endereço
const delivery_address_schema = new mongoose.Schema({
    user: {
        type: String, 
        required: true, 
    }, 
    zip: {
        type: String, 
        required: true, 
    }, 
    title: {
        type: String, 
        required: true, 
        trim: true, 
    }, 
    state: {
        type: String, 
        required: true, 
    }, 
    city: {
        type: String, 
        required: true, 
    }, 
    district: {
        type: String, 
        required: true, 
    }, 
    street: {
        type: String, 
        required: true, 
    }, 
    number: {
        type: Number, 
        required: true, 
    }, 
    complement: {
        type: String, 
        required: false, 
    }, 
});

// Chave primária original
delivery_address_schema.index({user: 1, zip: 1}, {unique: true});

// Exportação do esquema
export default delivery_address_schema;