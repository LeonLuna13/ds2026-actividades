import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service.js";

export async function getAll(_req: Request, res: Response) {
  res.json(await categoriaService.findAll());
}
export async function getById(req: Request, res: Response) {
  const cat = await categoriaService.findById(Number(req.params.id));
  if (!cat) return res.status(404).json({ error: "Categoría no encontrada" });
  return res.json(cat);
}
export async function create(req: Request, res: Response) {
  res.status(201).json(await categoriaService.create(req.body));
}
export async function update(req: Request, res: Response) {
  res.json(await categoriaService.update(Number(req.params.id), req.body));
}
export async function remove(req: Request, res: Response) {
  await categoriaService.remove(Number(req.params.id));
  res.status(204).send();
}