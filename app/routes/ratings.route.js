// Dependências
import express from "express";
import ratings_controller from "../controllers/ratings.controller.js";

// Roteador
const ratings_router = express.Router();

// Rotas
ratings_router.post("/", ratings_controller.post);
ratings_router.put("/:user/:product", ratings_controller.put);
ratings_router.delete("/:user/:product", ratings_controller.delete);
ratings_router.delete("/user/:user", ratings_controller.delete_all_from_user);
ratings_router.delete("/product/:product", ratings_controller.delete_all_from_product);
ratings_router.get("/:user/:product", ratings_controller.get);
ratings_router.get("/", ratings_controller.get_all);
ratings_router.get("/user/:user", ratings_controller.get_all_from_user);
ratings_router.get("/:product", ratings_controller.get_all_from_product);

// Exportação do roteador
export default ratings_router;