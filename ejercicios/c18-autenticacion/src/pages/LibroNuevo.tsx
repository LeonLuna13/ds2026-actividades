import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { libroSchema } from '../schemas/libroSchema';
import type { LibroValidado } from '../schemas/libroSchema';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro';

export default function LibroNuevo() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LibroValidado>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(libroSchema) as any
  });

  const onSubmit = async (data: LibroValidado) => {
    setSubmitError(null);
    try {
      const res = await fetch('http://localhost:3000/api/libros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo: data.titulo,
          autorId: data.autorId,
          precio: data.precio,
          disponible: data.disponible,
          imagen: 'placeholder.jpg' // Simplificación, idealmente se subiría la URL
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al agregar el libro');
      }

      navigate('/catalogo'); 
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>
      
      {submitError && <Alert variant="danger">{submitError}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
        <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor ID</Form.Label>
        <Form.Control type="number" {...register('autorId')} isInvalid={!!errors.autorId} />
        <Form.Control.Feedback type="invalid">{errors.autorId?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" {...register('precio')} isInvalid={!!errors.precio} />
        <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Check className="mb-3" label="Disponible" {...register('disponible')} />

      <Button type="submit">Agregar libro</Button>
    </Form>
  );
}