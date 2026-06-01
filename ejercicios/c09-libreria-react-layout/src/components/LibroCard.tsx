import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import type { LibroCardProps } from '../types/LibroCardProps';

export function LibroCard({ titulo, autor, precio }: LibroCardProps) {
  // Estado local para el contador de corazones de cada tarjeta
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
          <Button variant="outline-primary" className="w-100">Ver más</Button>
          <Button variant="outline-danger" onClick={() => setLikes(likes + 1)}>
            ❤️ {likes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}