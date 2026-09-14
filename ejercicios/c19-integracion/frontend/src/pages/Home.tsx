import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { LibroCardProps } from '../types/LibroCardProps';

export function Home() {
  const { data: libros, loading, error } = useFetch<LibroCardProps[]>('/libros');
  const librosDestacados = libros ? libros.slice(0, 6) : [];

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
        
        {loading && <div className="text-center"><Spinner animation="border" variant="primary" /></div>}
        {error && <Alert variant="danger">{error}</Alert>}
        
        {!loading && !error && (
          <Row className="g-4">
            {librosDestacados.map((libro) => (
              <Col key={libro.id} xs={12} md={4}>
                <LibroCard 
                  id={libro.id}
                  titulo={libro.titulo} 
                  autor={libro.autor} 
                  precio={libro.precio} 
                  disponible={libro.disponible}
                  imagen={libro.imagen}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}