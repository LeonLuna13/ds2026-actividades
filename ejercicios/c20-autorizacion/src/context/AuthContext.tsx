import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Usuario, Rol, Credenciales, Sesion } from '../types/sesionType';
import { apiFetch } from '../services/api';
import { obtenerToken, guardarToken, borrarToken } from '../services/sesion';

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(obtenerToken() !== null);

  const logout = useCallback(() => {
    borrarToken();
    setUsuario(null);
  }, []);

  const login = async (credenciales: Credenciales) => {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });
    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  };

  // Rehidratación al recargar con GET /auth/yo
  useEffect(() => {
    if (!obtenerToken()) return;
    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false));
  }, []);

  // Escuchar evento de sesión expirada para cerrar sesión
  useEffect(() => {
    window.addEventListener('sesion-expirada', logout);
    return () => window.removeEventListener('sesion-expirada', logout);
  }, [logout]);

  const estaAutenticado = usuario !== null;
  const tieneRol = (rol: Rol) => usuario?.rol === rol;

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado,
        tieneRol,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return context;
}
