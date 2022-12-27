// Dependências
import mongoose from "mongoose";
import { db_url } from "./db.config.js";

// Para exportação
const db = {};
db.mongoose = mongoose;
db.url = db_url;

// Modelos esquemáticos do banco de dados
import cart_product_schema from "../models/cart_product.model.js";
import category_schema from "../models/category.model.js";
import credit_card_schema from "../models/credit_card.model.js";
import delivery_address_schema from "../models/delivery_address.model.js";
import product_category_schema from "../models/product_category.model.js";
import product_schema from "../models/product.model.js";
import ratings_schema from "../models/ratings.model.js";
import shopping_cart_schema from "../models/shopping_cart.model.js";
import user_schema from "../models/user.model.js";

// Conexão
await db.mongoose.connect(db_url);

// Atribuição dos modelos
db.mongoose.model("cart_product", cart_product_schema);
db.mongoose.model("ratings", ratings_schema);
db.mongoose.model("shopping_cart", shopping_cart_schema);
db.mongoose.model("credit_card", credit_card_schema);
db.mongoose.model("delivery_address", delivery_address_schema);
db.mongoose.model("category", category_schema);
db.mongoose.model("product_category", product_category_schema);
db.mongoose.model("product", product_schema);
db.mongoose.model("user", user_schema);

// Desconecta
await db.mongoose.disconnect();

export default db;