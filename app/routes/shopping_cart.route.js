// Dependências
import express from "express";
import shopping_cart_controller from "../controllers/shopping_cart.controller.js";

// Roteador
const shopping_cart_router = express.Router();

// Rotas
shopping_cart_router.post("/", shopping_cart_controller.post);
shopping_cart_router.put("/:user/:invoice", shopping_cart_controller.put);
shopping_cart_router.delete("/:user/:invoice", shopping_cart_controller.delete);
shopping_cart_router.delete("/:user", shopping_cart_controller.delete_all_from_user);
shopping_cart_router.get("/:user/:invoice", shopping_cart_controller.get);
shopping_cart_router.get("/", shopping_cart_controller.get_all);
shopping_cart_router.get("/:user", shopping_cart_controller.get_all_from_user);

// Exportação do roteador
export default shopping_cart_router;