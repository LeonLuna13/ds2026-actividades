// Declaración con const para datos inmutables [cite: 456, 523]
const nombre = "Leon Luna Guelfo"; 
const edad = 20; 
const materia = "Desarrollo de Software";

// Mostramos el mensaje usando Template Literals (con las comillas ` backticks) [cite: 464-467, 524]
console.log(`Me llamo ${nombre}, tengo ${edad} años y curso ${materia}`);

// Declaración con let porque el valor va a cambiar [cite: 456, 525]
let contador = 0;

// Sumamos 1 tres veces [cite: 525]
contador = contador + 1;
contador = contador + 1;
contador = contador + 1;

// Mostramos el valor final [cite: 526]
console.log("El valor final del contador es:", contador);