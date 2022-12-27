// Dependências
import express from "express";
import user_controller from "../controllers/user.controller.js";

// Roteador
const user_router = express.Router();

// Rotas
user_router.post("/", user_controller.post);
user_router.put("/id/:id", user_controller.put_by_id);
user_router.put("/email/:email", user_controller.put_by_email);
user_router.delete("/id/:id", user_controller.delete_by_id);
user_router.delete("/email/:email", user_controller.delete_by_email);
user_router.get("/id/:id", user_controller.get_by_id);
user_router.get("/email/:email", user_controller.get_by_email);
user_router.get("/", user_controller.get_all);

// Exportação do roteador
export default user_router;