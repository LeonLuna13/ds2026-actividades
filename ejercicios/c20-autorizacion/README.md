# [AI-C20-B] Autorización en la Librería

Implementación de autenticación y autorización en el frontend para el sitio de la Librería, según lo desarrollado en la Clase 20.

## Características implementadas

1. **`src/context/AuthContext.tsx`**:
   - Manejo de estado de sesión global: `usuario`, `cargando`, `login`, `logout`, `estaAutenticado`, `tieneRol`.
   - Hook personalizado `useAuth()` con validación de contexto dentro del Provider.
   - El token vive en `localStorage` (a través de `sesion.ts`) y no forma parte del contexto de React.

2. **Rehidratación de sesión al recargar**:
   - Al iniciar la aplicación o hacer F5, si existe un token en almacenamiento local, se consulta `GET /auth/yo` para verificar la firma, vigencia y obtener los datos del usuario (`id`, `nombre`, `email`, `rol`).
   - El token nunca se decodifica en el cliente; el backend es la fuente de verdad.
   - Estado `cargando` inicializado adecuadamente para evitar redirecciones prematuras (flash a `/login`).

3. **`Login.tsx`**:
   - Invoca la función `login(datos)` provista por `useAuth()`.
   - Ningún componente de interfaz importa directamente `sesion.ts` (solo lo leen `api.ts` y el `AuthContext`).

4. **Navbar (`Header.tsx`)**:
   - Muestra el botón **"Ingresar"** si no hay sesión activa.
   - Muestra **"Hola, {nombre}"** y el botón **"Salir"** si la sesión está autenticada.
   - Link **"Nuevo libro"** visible exclusivamente para usuarios con rol `ADMIN`.

5. **`PrivateRoute.tsx`**:
   - Implementado como layout route con `<Outlet />`.
   - Presenta `<Spinner animation="border" />` mientras `cargando` es `true`.
   - Redirecciona con `<Navigate to="/login" replace />` si no hay usuario autenticado.
   - Redirecciona con `<Navigate to="/sin-permiso" replace />` si se requiere un rol y el usuario no lo posee.
   - El atributo `replace` previene el bucle en el historial al navegar hacia atrás.

6. **Página `/sin-permiso` y control de acceso**:
   - Ruta protegida `/libros/nuevo` exclusiva para rol `ADMIN`.
   - Visitante no logueado intenta entrar a `/libros/nuevo` $\rightarrow$ redirige a `/login`.
   - Usuario autenticado con rol `CLIENTE` intenta entrar a `/libros/nuevo` $\rightarrow$ redirige a `/sin-permiso`.
   - Usuario con rol `ADMIN` ingresa correctamente al formulario.

7. **Manejo de expiración de token en `apiFetch` (`api.ts`)**:
   - Clase personalizada `ApiError` que hereda de `Error` y expone la propiedad `status`.
   - Ante una respuesta `401 Unauthorized` habiendo enviado un token, dispara el evento global `window.dispatchEvent(new Event('sesion-expirada'))`.
   - `AuthProvider` escucha dicho evento y ejecuta automáticamente el cierre de sesión (`logout`).

## Verificación

```bash
# Comprobación de tipos con TypeScript
npx tsc -p tsconfig.app.json --noEmit

# Verificación de linter
npm run lint

# Build de producción
npm run build
```
