import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";

const app = express();
const PORT = 3000;

// 1. Middleware FUNDAMENTAL para poder leer los JSON que mandamos en los POST y PUT
app.use(express.json());

// 2. Montamos las rutas (Todo lo que vaya a /api/libros lo maneja libroRoutes)
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

// 3. Levantamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});