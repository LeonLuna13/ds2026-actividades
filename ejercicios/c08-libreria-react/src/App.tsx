import { CustomNavbar } from './components/CustomNavbar';
import { LibroCard } from './components/LibroCard';
import { Footer } from './components/Footer';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  // Reutilizamos el listado de libros del ejercicio de la Clase 6
  const librosDestacados = [
    { titulo: 'Ingeniería de Software', autor: 'Ian Sommerville', precio: 28000 },
    { titulo: 'Clean Code', autor: 'Robert C. Martin', precio: 25500 },
    { titulo: 'Diseño UX/UI', autor: 'Don Norman', precio: 19000 },
    { titulo: 'Sistemas Operativos', autor: 'Andrew S. Tanenbaum', precio: 31000 },
    { titulo: 'Patrones de Diseño', autor: 'Erich Gamma', precio: 24000 },
    { titulo: 'Base de Datos', autor: 'Abraham Silberschatz', precio: 27500 }
  ];

  return (
    <>
      {/* Navbar propia */}
      <CustomNavbar />

      {/* Sección Hero de la Home */}
      <section className="bg-primary text-white text-center py-5 mb-5 shadow">
        <Container>
          <h1 className="display-3 fw-bold">¡Bienvenidos a Librería UTN!</h1>
          <p className="lead">Tu puerta de acceso al conocimiento y la ingeniería, ahora en React.</p>
        </Container>
      </section>

      {/* Grilla con la lista de componentes LibroCard mapeados */}
      <Container className="mb-5">
        <h2 className="text-center mb-4">Libros Destacados</h2>
        <Row className="g-4">
          {librosDestacados.map((libro, index) => (
            <Col key={index} xs={12} md={4}>
              <LibroCard 
                titulo={libro.titulo} 
                autor={libro.autor} 
                precio={libro.precio} 
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer propio */}
      <Footer />
    </>
  );
}

export default App;