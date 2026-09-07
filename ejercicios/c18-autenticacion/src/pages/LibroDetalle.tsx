import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { LibroCardProps } from '../types/LibroCardProps';

export function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const { data: libro, loading, error } = useFetch<LibroCardProps>(`http://localhost:3000/api/libros/${id}`);

  if (loading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" variant="primary" />
    </Container>
  );

  if (error || !libro) return (
    <Container className="py-5">
      <Alert variant="danger">{error || 'Libro no encontrado'}</Alert>
    </Container>
  );

  return (
    <Container className="py-5 text-center">
      <h2>{libro.titulo}</h2>
      <img src={libro.imagen} alt={libro.titulo} style={{ maxWidth: '300px' }} className="my-3 img-fluid shadow" />
      <h4>Autor: {libro.autor.nombre}</h4>
      <h3 className="text-primary mb-4">${libro.precio}</h3>
      <p className="lead mb-4">Acá iría la descripción completa, índice y reseñas del libro.</p>
      
      <Link to="/catalogo">
        <Button variant="secondary">Volver al catálogo</Button>
      </Link>
    </Container>
  );
}