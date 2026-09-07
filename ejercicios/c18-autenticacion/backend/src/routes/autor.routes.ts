import { Router } from "express";
import * as autorController from "../controllers/autor.controller.js";
import { validate, validateParams } from "../middlewares/validate.middleware.js";
import { autorCreateSchema, autorUpdateSchema, idParamSchema } from "../validations/schemas.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// LECTURA PÚBLICA
router.get("/", autorController.getAll);
router.get("/:id", validateParams(idParamSchema), autorController.getById);
router.get("/:id/libros", validateParams(idParamSchema), autorController.getLibros);

// ESCRITURA PROTEGIDA (Solo ADMIN)
router.post("/", authenticate, authorize("ADMIN"), validate(autorCreateSchema), autorController.create);
router.put("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(autorUpdateSchema), autorController.update);
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), autorController.remove);

export default router;