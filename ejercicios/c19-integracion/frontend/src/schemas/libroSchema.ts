import { z } from 'zod';

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El titulo es obligatorio'),
  autorId: z.coerce.number().positive('El ID del autor es obligatorio'),
  precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
  disponible: z.boolean(),
});

export type LibroValidado = z.infer<typeof libroSchema>;