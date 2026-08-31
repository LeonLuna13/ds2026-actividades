import express from "express";
import libroRoutes from "./routes/libro.routes.js";
import autorRoutes from "./routes/autor.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// 1. Middleware para leer JSON
app.use(express.json());

// 2. Montamos las rutas
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/categorias", categoriaRoutes);

// 3. Manejador centralizado de errores (¡SIEMPRE DESPUÉS DE LAS RUTAS!)
app.use(errorHandler);

// 4. Levantamos el servidor
app.listen(3000, () => {
  console.log(`Servidor escuchando en http://localhost:3000`);
});