// Dependências
import express from "express";
import category_controller from "../controllers/category.controller.js";

// Roteador
const category_router = express.Router();

// Rotas
category_router.post("/", category_controller.post);
category_router.put("/:id", category_controller.put);
category_router.delete("/id/:id", category_controller.delete_by_id);
category_router.delete("/name/:name", category_controller.delete_by_name);
category_router.get("/id/:id", category_controller.get_by_id);
category_router.get("/name/:name", category_controller.get_by_name);
category_router.get("/", category_controller.get_all);

// Exportação do roteador
export default category_router;