import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registroSchema, loginSchema } from "../validations/auth.validation.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// Registro y login son PÚBLICAS
router.post("/registro", validate(registroSchema), authController.registrar);
router.post("/login", validate(loginSchema), authController.login);

// /yo es PROTEGIDA (requiere saber quién sos)
router.get("/yo", authenticate, authController.yo);

export default router;