// Dependências
import express from "express";
import credit_card_controller from "../controllers/credit_card.controller.js";

// Roteador
const credit_card_router = express.Router();

// Rotas
credit_card_router.post("/", credit_card_controller.post);
credit_card_router.put("/:user/:number", credit_card_controller.put);
credit_card_router.delete("/:user/:number", credit_card_controller.delete);
credit_card_router.delete("/:user", credit_card_controller.delete_all_from_user);
credit_card_router.get("/:user/:number", credit_card_controller.get);
credit_card_router.get("/", credit_card_controller.get_all);
credit_card_router.get("/:user", credit_card_controller.get_all_from_user);

// Exportação do roteador
export default credit_card_router;