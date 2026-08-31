import { prisma } from "../config/prisma.js";
import { Prisma } from "../generated/prisma/client";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;
export type LibroDetalle = Prisma.LibroGetPayload<{ include: { autor: true, categorias: true } }>;

export async function findAll(disponible?: boolean, categoria?: string): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    where: { 
      disponible,
      categorias: categoria ? { some: { nombre: categoria } } : undefined
    },
    include: { autor: true }
  });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({ where: { id }, include: { autor: true, categorias: true } });
}

export async function create(datos: any): Promise<LibroDetalle> {
  return prisma.libro.create({ data: datos, include: { autor: true, categorias: true } });
}

export async function update(id: number, datos: any): Promise<LibroDetalle | null> {
  return prisma.libro.update({ where: { id }, data: datos, include: { autor: true, categorias: true } });
}

export async function remove(id: number): Promise<void> {
  await prisma.libro.delete({ where: { id } });
}