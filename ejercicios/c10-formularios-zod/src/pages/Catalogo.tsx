import { Container, Row, Col } from 'react-bootstrap';
import { LibroCard } from '../components/LibroCard'; 
import type { LibroCardProps } from '../types/LibroCardProps';

interface Props {
  libros: LibroCardProps[];
}

export function Catalogo({ libros }: Props) {
  return (
    <Container className="py-5">
      <h2 className="mb-4">Catálogo Completo</h2>
      
      {/* Grilla responsiva: 1 columna en celulares, 2 en tablets, 4 en PC */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {libros.map((libro) => (
          <Col key={libro.id}>
            {/* Le pasamos todas las propiedades del libro a la tarjeta */}
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