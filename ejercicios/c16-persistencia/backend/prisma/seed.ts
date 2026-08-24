import { prisma } from "../src/config/prisma.js";

const libros = [
  { titulo: "Libro Uno", autor: "Autor A", precio: 5000, imagen: "img1.jpg", disponible: true },
  { titulo: "Libro Dos", autor: "Autor B", precio: 6500, imagen: "img2.jpg", disponible: true },
  { titulo: "Libro Tres", autor: "Autor C", precio: 4200, imagen: "img3.jpg", disponible: false }
];

const autores = [
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombiana" },
  { nombre: "Isabel Allende", nacionalidad: "Chilena" }
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();