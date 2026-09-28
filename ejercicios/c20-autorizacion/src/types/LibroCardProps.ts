export interface LibroCardProps {
  id: number;
  titulo: string;
  autor: { id: number; nombre: string; nacionalidad: string };
  precio: number;
  disponible: boolean;
  imagen: string;
}