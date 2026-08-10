import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export function getAll(req: Request, res: Response) {
  // Leemos si mandaron el filtro por query string (?disponible=true)
  const disponibleParam = req.query.disponible;
  let disponible: boolean | undefined = undefined;
  
  if (disponibleParam === "true") disponible = true;
  if (disponibleParam === "false") disponible = false;

  const libros = libroService.findAll(disponible);
  res.json(libros);
}

export function getById(req: Request, res: Response) {
  const libro = libroService.findById(Number(req.params.id));
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(libro);
}

export function create(req: Request, res: Response) {
  const nuevo = libroService.create(req.body);
  return res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
  const libro = libroService.update(Number(req.params.id), req.body);
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(libro);
}

export function remove(req: Request, res: Response) {
  const ok = libroService.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
  return res.status(204).send();
}