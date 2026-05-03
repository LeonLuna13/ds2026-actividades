export {}; // Módulo aislado para evitar conflictos

// Definimos la interface según pide la cátedra
interface LibroOL {
    title: string;
    author_name?: string[]; // La API devuelve un array de strings
    first_publish_year?: number;
}

const input = document.getElementById('input-busqueda') as HTMLInputElement;
const btn = document.getElementById('btn-buscar') as HTMLButtonElement;
const resultadosDiv = document.getElementById('resultados') as HTMLDivElement;
const errorMsg = document.getElementById('error-msg') as HTMLParagraphElement;

async function buscarLibros(query: string) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    
    try {
        resultadosDiv.innerHTML = 'Buscando...';
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        // La API devuelve un objeto con un campo 'docs'
        const libros: LibroOL[] = datos.docs;
        
        renderizarResultados(libros.slice(0, 10)); // Solo los primeros 10

    } catch (error) {
        errorMsg.innerText = 'Error al conectar con la API de Open Library.';
    }
}

function renderizarResultados(libros: LibroOL[]) {
    resultadosDiv.innerHTML = '';
    
    if (libros.length === 0) {
        resultadosDiv.innerHTML = 'No se encontraron libros.';
        return;
    }

    libros.forEach(libro => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Validamos campos opcionales con operador ternario o "||"
        const autor = libro.author_name ? libro.author_name.join(', ') : 'Autor desconocido';
        const año = libro.first_publish_year || 'Año no disponible';

        card.innerHTML = `
            <h3>${libro.title}</h3>
            <p><strong>Autor:</strong> ${autor}</p>
            <p><strong>Año:</strong> ${año}</p>
        `;
        resultadosDiv.appendChild(card);
    });
}

// Evento del botón con validación
btn.addEventListener('click', () => {
    const texto = input.value.trim();
    errorMsg.innerText = '';

    if (texto === "") {
        errorMsg.innerText = "El campo de búsqueda no puede estar vacío.";
        return; // No hace el fetch
    }

    buscarLibros(texto);
});