export {}; // Para evitar el error de funciones duplicadas que vimos antes

interface Usuario {
    id: number;
    name: string;
    email: string;
}

// Referencias a los elementos del DOM
const listaUl = document.getElementById('lista-usuarios') as HTMLUListElement;
const loader = document.getElementById('loader') as HTMLDivElement;
const errorDiv = document.getElementById('error-msg') as HTMLDivElement;

async function obtenerUsuarios(): Promise<Usuario[]> {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("Error en la API");
    return await respuesta.json();
}

async function renderizarApp() {
    // 1. Iniciamos el estado: mostramos cargando, ocultamos error y lista
    loader.style.display = 'block';
    errorDiv.style.display = 'none';
    listaUl.innerHTML = '';

    try {
        const usuarios = await obtenerUsuarios();

        // 2. Renderizado dinámico: creamos los <li> para cada usuario
        usuarios.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${user.name}</strong> - ${user.email}`;
            listaUl.appendChild(li);
        });

    } catch (error) {
        // 3. Manejo visual de errores
        errorDiv.style.display = 'block';
        console.error(error);
    } finally {
        // 4. Ocultamos el loader pase lo que pase
        loader.style.display = 'none';
    }
}

renderizarApp();