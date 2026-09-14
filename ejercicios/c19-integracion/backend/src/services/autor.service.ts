import { prisma } from "../config/prisma.js";
import { Prisma } from "../generated/prisma/client";

export async function findAll() {
  return prisma.autor.findMany();
}

export async function findById(id: number) {
  return prisma.autor.findUnique({ where: { id } });
}

export async function findLibrosByAutor(id: number) {
  return prisma.libro.findMany({ where: { autorId: id }, include: { categorias: true } });
}

export async function create(datos: any) {
  return prisma.autor.create({ data: datos });
}

export async function update(id: number, datos: any) {
  return prisma.autor.update({ where: { id }, data: datos });
}

export async function remove(id: number) {
  await prisma.autor.delete({ where: { id } });
}