// Dependências
import mongoose from "mongoose";

// Esquema da avaliação
const ratings_schema = new mongoose.Schema({
    user: {
        type: String, 
        required: true, 
    }, 
    product: {
        type: String,
        required: true, 
    }, 
    rating: {
        type: Number, 
        required: true, 
    }, 
});

// Chave primária original
ratings_schema.index({user: 1, product: 1}, {unique: true});

// Exportação do esquema
export default ratings_schema;