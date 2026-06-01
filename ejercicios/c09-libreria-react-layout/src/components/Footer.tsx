import { Container } from 'react-bootstrap';

export function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <Container>
        <p className="mb-0">© 2026 Desarrollo de Software - UTN FRLP</p>
        <small className="text-muted">Maquetado individual con React + TypeScript</small>
      </Container>
    </footer>
  );
}