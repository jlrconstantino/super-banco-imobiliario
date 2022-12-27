// Dependências
import mongoose from "mongoose";

// Esquema do produto
const product_schema = new mongoose.Schema({
    id: {
        type: Number, 
        required: true, 
        index: true, 
    }, 
    title: {
        type: String, 
        required: true, 
        trim: true, 
        unique: true, 
    }, 
    price: {
        type: Number,
        required: true, 
    }, 
    stock: {
        type: Number, 
        required: false, 
        default: 0, 
    }, 
    rating: {
        type: Number,
        required: false, 
        default: 0.0, 
    }, 
    sales: {
        type: Number,
        required: false, 
        default: 0, 
    }, 
    author: {
        type: String,
        required: false, 
    }, 
    publisher: {
        type: String,
        required: false, 
    }, 
    finishing: {
        type: String,
        required: false, 
    }, 
    year: {
        type: Number,
        required: false, 
    }, 
    language: {
        type: String,
        required: false, 
    }, 
    pages: {
        type: Number, 
        required: false, 
    }, 
    description: {
        type: String,
        required: false, 
    }, 
    image_source: {
        type: String,
        required: false, 
    }, 
});

// Exportação do esquema
export default product_schema;