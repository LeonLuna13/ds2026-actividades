"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Referencias a los elementos del DOM
const listaUl = document.getElementById('lista-usuarios');
const loader = document.getElementById('loader');
const errorDiv = document.getElementById('error-msg');
async function obtenerUsuarios() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const respuesta = await fetch(url);
    if (!respuesta.ok)
        throw new Error("Error en la API");
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
    }
    catch (error) {
        // 3. Manejo visual de errores
        errorDiv.style.display = 'block';
        console.error(error);
    }
    finally {
        // 4. Ocultamos el loader pase lo que pase
        loader.style.display = 'none';
    }
}
renderizarApp();
//# sourceMappingURL=app.js.map