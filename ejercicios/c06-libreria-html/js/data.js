// Referencias al DOM
const input = document.getElementById('input-busqueda');
const btn = document.getElementById('btn-buscar');
const resultadosDiv = document.getElementById('resultados');
const errorMsg = document.getElementById('error-msg');

// Validamos que el botón exista para que el script no tire error en las otras páginas
if (btn) {
    btn.addEventListener('click', () => {
        const texto = input.value.trim();
        errorMsg.style.display = 'none';

        if (texto === "") {
            errorMsg.innerText = "El campo de búsqueda no puede estar vacío.";
            errorMsg.style.display = 'block';
            return;
        }

        buscarLibros(texto);
    });
}

async function buscarLibros(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    
    try {
        // Spinner de carga de Bootstrap
        resultadosDiv.innerHTML = `
            <div class="col-12 text-center my-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2 text-muted">Buscando libros...</p>
            </div>`;
        
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        // Tomamos solo los primeros 10 resultados
        const libros = datos.docs.slice(0, 10);
        renderizarResultados(libros);

    } catch (error) {
        errorMsg.innerText = 'Error al conectar con la API de Open Library.';
        errorMsg.style.display = 'block';
        resultadosDiv.innerHTML = '';
    }
}

function renderizarResultados(libros) {
    resultadosDiv.innerHTML = '';
    
    if (libros.length === 0) {
        resultadosDiv.innerHTML = '<div class="col-12 text-center"><p class="text-muted fs-5">No se encontraron libros.</p></div>';
        return;
    }

    // Por cada libro, creamos una card de Bootstrap de 4 columnas (igual que en index)
    libros.forEach(libro => {
        const autor = libro.author_name ? libro.author_name.join(', ') : 'Autor desconocido';
        const año = libro.first_publish_year || 'S/D';
        
        // Usamos una imagen genérica para mantener el diseño prolijo
        const cardHTML = `
            <div class="col-12 col-md-4">
                <div class="card h-100 shadow-sm">
                    <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop" class="card-img-top" alt="Libro">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${libro.title}</h5>
                        <p class="card-text text-muted mb-1"><small><strong>Autor:</strong> ${autor}</small></p>
                        <p class="card-text text-muted mb-3"><small><strong>Año:</strong> ${año}</small></p>
                        <a href="libro.html" class="btn btn-outline-primary mt-auto w-100">Ver más</a>
                    </div>
                </div>
            </div>
        `;
        
        resultadosDiv.innerHTML += cardHTML;
    });
}