// Dependências
import mongoose from "mongoose";

// Esquema da categoria
const category_schema = new mongoose.Schema({
    id: {
        type: Number, 
        required: true, 
        index: true, 
    }, 
    name: {
        type: String, 
        required: true, 
        index: true,
    }, 
});

// Exportação do esquema
export default category_schema;