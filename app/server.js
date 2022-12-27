'use strict'

// Dependências gerais
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./config/models.config.js";

// Rotas a serem adicionadas
import cart_product_router from "./routes/cart_product.route.js";
import category_router from "./routes/category.route.js";
import credit_card_router from "./routes/credit_card.route.js";
import delivery_address_router from "./routes/delivery_address.route.js";
import product_category_router from "./routes/product_category.route.js";
import product_router from "./routes/product.route.js";
import ratings_router from "./routes/ratings.route.js";
import shopping_cart_router from "./routes/shopping_cart.route.js";
import user_router from "./routes/user.route.js";

// Aplicação
const app = express();

// Opções de CORS
const cors_options = {
  origin: "http://localhost:3000"
};
app.use(cors(cors_options));

// Opções de manipulação de corpos de requisição/resposta
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Aplicação da parte do cliente
const path = './app/public/dist/';
app.use('/', express.static(path));

// Roteamento
app.use("/cart_products", cart_product_router);
app.use("/categories", category_router);
app.use("/credit_cards", credit_card_router);
app.use("/delivery_addresses", delivery_address_router);
app.use("/product_categories", product_category_router);
app.use("/products", product_router);
app.use("/ratings", ratings_router);
app.use("/shopping_carts", shopping_cart_router);
app.use("/users", user_router);

// Conexão à base de dados
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database successfully.");
  })
  .catch(err => {
    console.log("Failed to connect to the database.", err);
    process.exit();
  });

// Porta a ser utilizada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT + ".");
  console.log("Local:\thttp://localhost:3000/");
});

// Exportação da aplicação
export default app;