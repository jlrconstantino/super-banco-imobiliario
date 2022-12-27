// Dependências
import mongoose from "mongoose";

// Esquema do usuário
const user_schema = new mongoose.Schema({
    id: {
        type: Number, 
        required: true, 
        index: true, 
    }, 
    email: {
        type: String, 
        required: true, 
        index: true, 
        unique: true, 
    }, 
    name: {
        type: String, 
        required: true, 
    }, 
    password: {
        type: String, 
        required: true, 
    }, 
    phone_number: {
        type: String, 
        required: true, 
    }, 
    birth_date: {
        type: String, 
        required: true, 
    }, 
    role: {
        type: String, 
        required: true, 
    }, 
});

// Exportação do esquema
export default user_schema;