import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma.js";

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" }
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Ficción" }
];

const libros = [
  { titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "img1.jpg", disponible: true, cats: ["Novela"] },
  { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 8000, imagen: "img2.jpg", disponible: true, cats: ["Novela", "Ficción"] }
];

const usuarios = [
  { email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN" as const, password: "Admin1234" },
  { email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" as const, password: "Cliente1234" }
];

async function main() {
  await prisma.autor.createMany({ data: autores, skipDuplicates: true });
  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true });

  for (const { autor, cats, ...datos } of libros) {
    const libroExiste = await prisma.libro.findFirst({ where: { titulo: datos.titulo } });
    if (!libroExiste) {
      await prisma.libro.create({
        data: {
          ...datos,
          autor: { connect: { nombre: autor } },
          categorias: { connect: cats.map(nombre => ({ nombre })) }
        }
      });
    }
  }

  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: {
        ...datos,
        passwordHash: await bcrypt.hash(password, 10)
      }
    });
  }
}

main();