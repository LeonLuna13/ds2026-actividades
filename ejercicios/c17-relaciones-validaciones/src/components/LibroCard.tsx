import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { LibroCardProps } from '../types/LibroCardProps';

export function LibroCard({ id, titulo, autor, precio }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop" 
        alt={titulo} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{titulo}</Card.Title>
        <Card.Text className="text-muted mb-1">Autor: {autor}</Card.Text>
        <Card.Text className="text-primary fw-bold fs-5">${precio.toLocaleString('es-AR')}</Card.Text>
        
        <div className="mt-auto d-flex gap-2">
          {/* Usamos Link en lugar de un Button común para navegar sin recargar */}
          <Link to={`/libros/${id}`} className="btn btn-outline-primary w-100">
            Ver más
          </Link>
          <Button variant="outline-danger" onClick={() => setLikes(likes + 1)}>
            ❤️ {likes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}