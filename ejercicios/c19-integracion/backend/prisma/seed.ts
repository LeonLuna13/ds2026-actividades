import bcrypt from "bcrypt";
import { prisma } from "../src/config/prisma.js";

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombia" },
  { nombre: "Ian Sommerville", nacionalidad: "Reino Unido" },
  { nombre: "Robert C. Martin", nacionalidad: "Estados Unidos" },
  { nombre: "Don Norman", nacionalidad: "Estados Unidos" },
  { nombre: "Andrew S. Tanenbaum", nacionalidad: "Estados Unidos" },
  { nombre: "Erich Gamma", nacionalidad: "Suiza" },
  { nombre: "Abraham Silberschatz", nacionalidad: "Israel" }
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Ficción" },
  { nombre: "Ingeniería" },
  { nombre: "Diseño" },
  { nombre: "Sistemas" },
  { nombre: "Bases de Datos" }
];

const libros = [
  { titulo: "Ingeniería de Software", autor: "Ian Sommerville", precio: 28000, imagen: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop", disponible: true, cats: ["Ingeniería"] },
  { titulo: "Clean Code", autor: "Robert C. Martin", precio: 25500, imagen: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop", disponible: true, cats: ["Ingeniería"] },
  { titulo: "Diseño UX/UI", autor: "Don Norman", precio: 19000, imagen: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop", disponible: true, cats: ["Diseño"] },
  { titulo: "Sistemas Operativos", autor: "Andrew S. Tanenbaum", precio: 31000, imagen: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop", disponible: true, cats: ["Sistemas"] },
  { titulo: "Patrones de Diseño", autor: "Erich Gamma", precio: 24000, imagen: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop", disponible: true, cats: ["Ingeniería"] },
  { titulo: "Base de Datos", autor: "Abraham Silberschatz", precio: 27500, imagen: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop", disponible: true, cats: ["Bases de Datos"] }
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