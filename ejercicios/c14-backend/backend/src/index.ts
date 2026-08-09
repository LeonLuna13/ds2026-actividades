import express from "express";

const app = express();
const PORT = 3000;

// Definimos la estructura del libro
interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

// Creamos un array con 3 libros hardcodeados
const libros: Libro[] = [
  { id: 1, titulo: "Libro Uno", autor: "Autor A", precio: 5000, imagen: "img1.jpg", disponible: true },
  { id: 2, titulo: "Libro Dos", autor: "Autor B", precio: 6500, imagen: "img2.jpg", disponible: true },
  { id: 3, titulo: "Libro Tres", autor: "Autor C", precio: 4200, imagen: "img3.jpg", disponible: false }
];

// Endpoint original (Hello)
app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería" });
});

// NUEVO ENDPOINT: Devuelve la lista de libros
app.get("/libros", (_req, res) => {
  res.json(libros);
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});