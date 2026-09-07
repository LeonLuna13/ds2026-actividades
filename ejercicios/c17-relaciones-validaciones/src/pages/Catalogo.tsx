import { useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard'; 
import { useFetch } from '../hooks/useFetch';
import type { LibroCardProps } from '../types/LibroCardProps';

export function Catalogo() {
  // Consumimos el mock con nuestro custom hook
  const { data: libros, loading, error } = useFetch<LibroCardProps[]>('/libros.json');

  // Cumplimos el punto 1: useEffect para cambiar el título de la pestaña
  useEffect(() => {
    if (libros) {
      document.title = `Catálogo - ${libros.length} libros disponibles`;
    }
  }, [libros]);

  // La UI refleja los estados de carga y error
  if (loading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Cargando catálogo...</p>
    </Container>
  );

  if (error) return (
    <Container className="py-5">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  return (
    <Container className="py-5">
      <h2 className="mb-4">Catálogo Completo</h2>
      
      <Row xs={1} md={2} lg={4} className="g-4">
        {(libros ?? []).map((libro) => (
          <Col key={libro.id}>
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
    </Container>
  );
}