import { Router } from "express";
import * as categoriaController from "../controllers/categoria.controller.js";
import { validate, validateParams } from "../middlewares/validate.middleware.js";
import { categoriaCreateSchema, categoriaUpdateSchema, idParamSchema } from "../validations/schemas.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// LECTURA PÚBLICA
router.get("/", categoriaController.getAll);
router.get("/:id", validateParams(idParamSchema), categoriaController.getById);

// ESCRITURA PROTEGIDA (Solo ADMIN)
router.post("/", authenticate, authorize("ADMIN"), validate(categoriaCreateSchema), categoriaController.create);
router.put("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(categoriaUpdateSchema), categoriaController.update);
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), categoriaController.remove);

export default router;