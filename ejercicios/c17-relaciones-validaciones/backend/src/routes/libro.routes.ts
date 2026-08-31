import { Router } from "express";
import * as libroController from "../controllers/libro.controller.js";
import { validate, validateParams } from "../middlewares/validate.middleware.js";
import { libroCreateSchema, libroUpdateSchema, idParamSchema } from "../validations/schemas.js";

const router = Router();

router.get("/", libroController.getAll);
router.get("/:id", validateParams(idParamSchema), libroController.getById);
router.post("/", validate(libroCreateSchema), libroController.create);
// El PUT valida primero que el ID sea un número, y después que el body esté bien
router.put("/:id", validateParams(idParamSchema), validate(libroUpdateSchema), libroController.update);
router.delete("/:id", validateParams(idParamSchema), libroController.remove);

export default router;