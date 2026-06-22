import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { LibroDetalle } from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import type { LibroCardProps } from "./types/LibroCardProps"; // <-- Import correcto con llaves

const librosIniciales: LibroCardProps[] = [
  { id: 1, titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 12000, disponible: true, imagen: "https://placehold.co/300x400" },
  { id: 2, titulo: "1984", autor: "George Orwell", precio: 15000, disponible: true, imagen: "https://placehold.co/300x400" },
  { id: 3, titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 11000, disponible: false, imagen: "https://placehold.co/300x400" }
];

function App() {
  const [libros, setLibros] = useState<LibroCardProps[]>(librosIniciales);

  // Le decimos explícitamente a TypeScript qué tipo de dato es 'nuevo'
  const agregarLibro = (nuevo: LibroCardProps) => {
    setLibros([...libros, nuevo]);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>
  );
}

export default App;