import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import libroRoutes from "./routes/libro.routes.js";
import autorRoutes from "./routes/autor.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// 1. Middleware global
const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());

// 2. Montamos todas las rutas de la API
// Registro y login (públicas) y /yo (protegida)
app.use("/api/auth", authRoutes); 

// Rutas de recursos (Lectura pública, escritura protegida para ADMIN)
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/categorias", categoriaRoutes);

// 3. Manejador centralizado de errores
// ¡CUIDADO! Siempre debe ir DESPUÉS de todas las rutas para que funcione
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(errorHandler);

// 4. Levantamos el servidor
app.listen(3000, () => {
  console.log(`Servidor escuchando en http://localhost:3000`);
});