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

async function main() {
  // 1) Crear primero los autores y categorías
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  // 2) Crear los libros conectándolos a las tablas anteriores
  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map(nombre => ({ nombre })) },
      }
    });
  }
}

main();