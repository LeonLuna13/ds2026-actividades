import { Container, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

export function LibroDetalle() {
  // useParams lee el :id directo desde la barra de direcciones
  const { id } = useParams<{ id: string }>();

  return (
    <Container className="py-5 text-center">
      <h2>Detalle del libro ID: {id}</h2>
      <p className="lead mb-4">Acá iría la descripción completa, índice y reseñas del libro.</p>
      
      <Link to="/">
        <Button variant="secondary">Volver al inicio</Button>
      </Link>
    </Container>
  );
}