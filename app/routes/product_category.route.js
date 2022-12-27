// Dependências
import express from "express";
import product_category_controller from "../controllers/product_category.controller.js";

// Roteador
const product_category_router = express.Router();

// Rotas
product_category_router.post("/", product_category_controller.post);
product_category_router.put("/:product/:category", product_category_controller.put);
product_category_router.delete("/:product/:category", product_category_controller.delete);
product_category_router.delete("/product/:product", product_category_controller.delete_all_from_product);
product_category_router.delete("/category/:category", product_category_controller.delete_all_from_category);
product_category_router.get("/:product/:category", product_category_controller.get);
product_category_router.get("/", product_category_controller.get_all);
product_category_router.get("/:product", product_category_controller.get_all_from_product);

// Exportação do roteador
export default product_category_router;