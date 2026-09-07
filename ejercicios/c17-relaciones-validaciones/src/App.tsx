import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { LibroDetalle } from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* El catálogo ya no necesita recibir props */}
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        
        {/* El alta queda maquetada hasta que tengamos backend real */}
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={() => {}} />} />
      </Routes>
    </Layout>
  );
}

export default App;