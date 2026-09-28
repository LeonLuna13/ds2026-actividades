import { Navigate, Outlet } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types/sesionType';

interface PrivateRouteProps {
  rol?: Rol;
}

export function PrivateRoute({ rol }: PrivateRouteProps) {
  const { usuario, cargando } = useAuth();

  // 1. ¿ya sé quién sos?
  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // 2. ¿sos alguien? (401)
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 3. ¿podés? (403)
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  // sí: pasá
  return <Outlet />;
}
