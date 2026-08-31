import { Router } from "express";
import * as autorController from "../controllers/autor.controller.js";
import { validate, validateParams } from "../middlewares/validate.middleware.js";
import { autorCreateSchema, autorUpdateSchema, idParamSchema } from "../validations/schemas.js";

const router = Router();

router.get("/", autorController.getAll);
router.get("/:id", validateParams(idParamSchema), autorController.getById);
// La extensión de la clase: obtener libros de un autor
router.get("/:id/libros", validateParams(idParamSchema), autorController.getLibros); 
router.post("/", validate(autorCreateSchema), autorController.create);
router.put("/:id", validateParams(idParamSchema), validate(autorUpdateSchema), autorController.update);
router.delete("/:id", validateParams(idParamSchema), autorController.remove);

export default router;