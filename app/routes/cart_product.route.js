// Dependências
import express from "express";
import cart_product_controller from "../controllers/cart_product.controller.js";

// Roteador
const cart_product_router = express.Router();

// Rotas
cart_product_router.post("/", cart_product_controller.post);
cart_product_router.put("/:user/:cart/:product", cart_product_controller.put);
cart_product_router.delete("/:user/:cart/:product", cart_product_controller.delete);
cart_product_router.delete("/:user/:cart", cart_product_controller.delete_all_from_shopping_cart);
cart_product_router.delete("/:user", cart_product_controller.delete_all_from_user);
cart_product_router.get("/:user/:cart/:product", cart_product_controller.get);
cart_product_router.get("/", cart_product_controller.get_all);
cart_product_router.get("/:user/:cart", cart_product_controller.get_all_from_shopping_cart);

// Exportação do roteador
export default cart_product_router;