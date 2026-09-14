export {};

declare global {
  namespace Express {
    interface Request {
      // Lo hacemos opcional (?) porque en rutas públicas no va a estar
      usuario?: { id: number; rol: "ADMIN" | "CLIENTE" };
    }
  }
}