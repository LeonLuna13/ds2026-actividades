import { z } from "zod";

// Comunes
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});

// Libro
export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio").max(200),
  precio: z.number().int().positive("El precio debe ser mayor a 0"),
  imagen: z.string().min(1, "La imagen es obligatoria"),
  autorId: z.number().int().positive("El autor es obligatorio"),
  disponible: z.boolean().optional(),
});
export const libroUpdateSchema = libroCreateSchema.partial();

// Autor
export const autorCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio"),
  nacionalidad: z.string().trim().min(1, "La nacionalidad es obligatoria")
});
export const autorUpdateSchema = autorCreateSchema.partial();

// Categoria
export const categoriaCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio")
});
export const categoriaUpdateSchema = categoriaCreateSchema.partial();