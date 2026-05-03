// 1. Definimos la interface para tipar los datos de la API
interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

// 2. Función asíncrona para obtener los usuarios
async function obtenerUsuarios(): Promise<Usuario[]> {
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
        // Realizamos la petición fetch
        const respuesta = await fetch(url);

        // Verificamos si la respuesta es correcta
        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`);
        }

        // Convertimos a JSON y le aplicamos el tipo Usuario[]
        const datos: Usuario[] = await respuesta.json();
        return datos;

    } catch (error) {
        // Manejo de errores con try/catch
        console.error("Error al obtener los datos de la API:", error);
        throw error;
    }
}

// 3. Llamamos a la función y mostramos los resultados en consola
async function ejecutarApp() {
    try {
        const usuarios = await obtenerUsuarios();

        console.log("--- Listado de Usuarios (Nombre y Email) ---");
        
        // Recorremos el array para mostrar lo solicitado
        usuarios.forEach((user) => {
            console.log(`> ${user.name} - Correo: ${user.email}`);
        });

    } catch (error) {
        console.log("Hubo un fallo en la ejecución de la app.");
    }
}

// Iniciamos la aplicación
ejecutarApp();