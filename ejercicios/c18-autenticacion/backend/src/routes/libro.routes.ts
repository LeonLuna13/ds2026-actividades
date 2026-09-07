import { Router } from "express";
import * as libroController from "../controllers/libro.controller.js";
import { validate, validateParams } from "../middlewares/validate.middleware.js";
import { libroCreateSchema, libroUpdateSchema, idParamSchema } from "../validations/schemas.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// LECTURA PÚBLICA
router.get("/", libroController.getAll);
router.get("/:id", validateParams(idParamSchema), libroController.getById);

// ESCRITURA PROTEGIDA (Solo ADMIN)
router.post("/", authenticate, authorize("ADMIN"), validate(libroCreateSchema), libroController.create);
router.put("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(libroUpdateSchema), libroController.update);
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), libroController.remove);

export default router;