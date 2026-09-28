import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { usuario, logout, tieneRol } = useAuth();
  const navigate = useNavigate();

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Librería UTN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            {tieneRol('ADMIN') && (
              <Nav.Link as={Link} to="/libros/nuevo">Nuevo libro</Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-center">
            {usuario ? (
              <>
                <Navbar.Text className="me-3">
                  Hola, {usuario.nombre}
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={manejarSesion}>
                  Salir
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" size="sm" onClick={manejarSesion}>
                  Ingresar
                </Button>
                <Nav.Link as={Link} to="/registro">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}