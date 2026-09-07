import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

interface PayloadToken {
  id: number;
  rol: "ADMIN" | "CLIENTE";
}

// 1. AUTHENTICATE: ¿Quién sos? (Verifica la firma del token)
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Falta el token" });
  }

  try {
    // Saca la palabra "Bearer " (los primeros 7 caracteres) y verifica la firma
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as PayloadToken;
    req.usuario = { id: payload.id, rol: payload.rol };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expirado" });
    }
    return res.status(401).json({ error: "Token inválido" });
  }
}

// 2. AUTHORIZE: ¿Qué podés hacer? (Verifica el rol)
export function authorize(...roles: Array<"ADMIN" | "CLIENTE">) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) return res.status(401).json({ error: "No autenticado" });

    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ error: "No tenés permiso para esta operación" });
    }
    next();
  };
}