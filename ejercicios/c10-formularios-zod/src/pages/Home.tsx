import { Container, Row, Col } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';

export function Home() {
  const librosDestacados = [
    { id: '1', titulo: 'Ingeniería de Software', autor: 'Ian Sommerville', precio: 28000 },
    { id: '2', titulo: 'Clean Code', autor: 'Robert C. Martin', precio: 25500 },
    { id: '3', titulo: 'Diseño UX/UI', autor: 'Don Norman', precio: 19000 },
    { id: '4', titulo: 'Sistemas Operativos', autor: 'Andrew S. Tanenbaum', precio: 31000 },
    { id: '5', titulo: 'Patrones de Diseño', autor: 'Erich Gamma', precio: 24000 },
    { id: '6', titulo: 'Base de Datos', autor: 'Abraham Silberschatz', precio: 27500 }
  ];

  return (
    <>
      <section className="bg-primary text-white text-center py-5 mb-5 shadow">
        <Container>
          <h1 className="display-3 fw-bold">¡Bienvenidos a Librería UTN!</h1>
          <p className="lead">Tu puerta de acceso al conocimiento y la ingeniería, ahora en React.</p>
        </Container>
      </section>
      <Container className="mb-5">
        <h2 className="text-center mb-4">Libros Destacados</h2>
        <Row className="g-4">
          {librosDestacados.map((libro) => (
            <Col key={libro.id} xs={12} md={4}>
              <LibroCard 
                id={libro.id}
                titulo={libro.titulo} 
                autor={libro.autor} 
                precio={libro.precio} 
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}