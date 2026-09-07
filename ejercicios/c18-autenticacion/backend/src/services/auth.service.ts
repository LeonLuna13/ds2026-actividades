import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } from "../config/env.js";
import { z } from "zod";
import { registroSchema, loginSchema } from "../validations/auth.validation.js";

type Registro = z.infer<typeof registroSchema>;
type Login = z.infer<typeof loginSchema>;

export async function registrar(datos: Registro) {
  // 1. Hasheamos la contraseña antes de guardarla
  const hash = await bcrypt.hash(datos.password, SALT_ROUNDS);
  
  // 2. Creamos el usuario en la base de datos
  return prisma.usuario.create({
    data: { nombre: datos.nombre, email: datos.email, passwordHash: hash },
    select: { id: true, email: true, nombre: true, rol: true }, // NUNCA devolver el hash
  });
}

export async function login(datos: Login) {
  // 1. Buscamos al usuario (acá SÍ necesitamos el hash, así que anulamos el omit global)
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
    omit: { passwordHash: false }, 
  });

  if (!usuario) return null;

  // 2. Comparamos la contraseña en texto plano con el hash de la base
  const coincide = await bcrypt.compare(datos.password, usuario.passwordHash);
  if (!coincide) return null; // Mismo return que arriba para evitar "User Enumeration"

  // 3. Si todo está ok, armamos el Payload y firmamos el Token
  const payload = { id: usuario.id, rol: usuario.rol };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return { 
    token, 
    usuario: { id: usuario.id, email: usuario.email, nombre: usuario.nombre, rol: usuario.rol } 
  };
}

export async function findById(id: number) {
  return prisma.usuario.findUnique({ where: { id } });
}