// Dependências
import express from "express";
import product_controller from "../controllers/product.controller.js";

// Roteador
const product_router = express.Router();

// Rotas
product_router.post("/", product_controller.post);
product_router.put("/:id", product_controller.put);
product_router.delete("/id/:id", product_controller.delete_by_id);
product_router.delete("/title/:title", product_controller.delete_by_title);
product_router.get("/id/:id", product_controller.get_by_id);
product_router.get("/title/:title", product_controller.get_by_title);
product_router.get("/", product_controller.get_all);

// Exportação do roteador
export default product_router;