// 1. Seleccionamos los elementos del DOM [cite: 483-485]
const inputAltura = document.querySelector('#altura');
const btnGenerar = document.querySelector('#btnGenerar');
const outputResultado = document.querySelector('#resultado');
const outputError = document.querySelector('#error');

// 2. Escuchamos el click del botón [cite: 486-487]
btnGenerar.addEventListener('click', () => {
    const altura = parseInt(inputAltura.value); // Convertimos el texto a número
    
    // Limpiamos resultados previos
    outputResultado.innerText = "";
    outputError.innerText = "";

    // 3. Validación de datos 
    if (isNaN(altura) || altura < 1) {
        outputError.innerText = "Error: Por favor, ingresá un número mayor a 0.";
        return; // Cortamos la ejecución
    }

    // 4. Generación del medio-árbol [cite: 559-564]
    let arbol = "";
    for (let i = 1; i <= altura; i++) {
        // Usamos un bucle interno para los asteriscos de cada fila [cite: 553-555]
        for (let j = 0; j < i; j++) {
            arbol += "*";
        }
        arbol += "\n"; // Salto de línea al final de cada fila
    }

    // 5. Mostrar el resultado en la página [cite: 492, 565]
    outputResultado.innerText = arbol;
});