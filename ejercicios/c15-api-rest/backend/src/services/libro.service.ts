import { Libro } from "../types/libro.types";

// Los datos hardcodeados
const libros: Libro[] = [
  { id: 1, titulo: "Libro Uno", autor: "Autor A", precio: 5000, imagen: "img1.jpg", disponible: true },
  { id: 2, titulo: "Libro Dos", autor: "Autor B", precio: 6500, imagen: "img2.jpg", disponible: true },
  { id: 3, titulo: "Libro Tres", autor: "Autor C", precio: 4200, imagen: "img3.jpg", disponible: false }
];

let proximoId = 4;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter(l => l.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find(l => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return undefined;
  
  libros[index] = { id, ...datos };
  return libros[index];
}

export function remove(id: number): boolean {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return false;
  
  libros.splice(index, 1);
  return true;
}