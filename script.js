// Función auxiliar para mostrar loading
function showLoading(elementId) {
    const resultElement = document.getElementById(elementId);
    const valueSpan = resultElement.querySelector('.result-value');
    valueSpan.innerHTML = '<span class="loading"></span> Procesando...';
}

// Función auxiliar para mostrar resultado
function showResult(elementId, text, isError = false) {
    const resultElement = document.getElementById(elementId);
    const valueSpan = resultElement.querySelector('.result-value');
    valueSpan.textContent = text;
    valueSpan.className = 'result-value ' + (isError ? 'error' : 'success');
}

// ==================== EJERCICIO 1 ====================
function saludar(nombre) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (nombre && nombre.trim() !== '') {
                // Para propósitos del ejemplo, consideramos "Alejo" como nombre válido
                // En un caso real, podrías comparar con un nombre específico
                if (nombre === "Alejo") {
                    resolve(`Hola ${nombre}, bienvenido`);
                } else {
                    reject("No te conozco");
                }
            } else {
                reject("Por favor ingresa un nombre");
            }
        }, 2000);
    });
}

function ejecutarEjercicio1() {
    const nombre = document.getElementById('nombreInput').value;
    showLoading('resultado1');
    
    saludar(nombre)
        .then((mensaje) => {
            showResult('resultado1', mensaje);
        })
        .catch((error) => {
            showResult('resultado1', `❌ ${error}`, true);
        });
}

// ==================== EJERCICIO 2 ====================
function obtenerNumero() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(10);
        }, 2000);
    });
}

function multiplicarPorDos(numero) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(numero * 2);
        }, 2000);
    });
}

// Versión correcta
function ejecutarEjercicio2() {
    showLoading('resultado2');
    
    obtenerNumero()
        .then((num) => {
            showResult('resultado2', `Número obtenido: ${num} → Multiplicando...`);
            return multiplicarPorDos(num); // ✅ Correcto: retornamos la promesa
        })
        .then((resultado) => {
            showResult('resultado2', `✅ Resultado final: ${resultado}`);
        })
        .catch((error) => {
            showResult('resultado2', `❌ Error: ${error}`, true);
        });
}

// Versión con error (para análisis)
function ejecutarEjercicio2Error() {
    showLoading('resultado2Error');
    
    obtenerNumero()
        .then((num) => {
            showResult('resultado2Error', `Número obtenido: ${num} → Multiplicando...`);
            multiplicarPorDos(num); // ❌ Error: NO retornamos la promesa
        })
        .then((resultado) => {
            showResult('resultado2Error', `✅ Resultado: ${resultado}`);
        })
        .catch((error) => {
            showResult('resultado2Error', `❌ Error: ${error}`, true);
        });
}

// ==================== EJERCICIO 3 ====================
function obtenerEdad(edad) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(edad);
        }, 2000);
    });
}

function verificarMayorDeEdad(edad) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (edad >= 18) {
                resolve(`✅ Eres mayor de edad (${edad} años)`);
            } else {
                reject(`❌ Eres menor de edad (${edad} años)`);
            }
        }, 2000);
    });
}

function ejecutarEjercicio3() {
    const edad = parseInt(document.getElementById('edadInput').value);
    
    if (isNaN(edad) || edad < 0) {
        showResult('resultado3', '❌ Por favor ingresa una edad válida', true);
        return;
    }
    
    showLoading('resultado3');
    
    obtenerEdad(edad)
        .then((edad) => {
            showResult('resultado3', `Edad obtenida: ${edad} años → Verificando...`);
            return verificarMayorDeEdad(edad);
        })
        .then((mensaje) => {
            showResult('resultado3', mensaje);
        })
        .catch((error) => {
            showResult('resultado3', error, true);
        });
}

// ==================== ANÁLISIS DEL ERROR ====================
console.log('=== ANÁLISIS DEL ERROR COMÚN ===');
console.log('¿Qué imprime el código con error?');
console.log('Imprime: undefined');
console.log('¿Por qué?');
console.log('Porque en el primer .then() no se retorna la promesa de multiplicarPorDos().');
console.log('Cuando no se retorna nada en un .then(), JavaScript retorna implícitamente undefined.');
console.log('¿Qué faltó?');
console.log('Faltó la palabra clave "return" antes de multiplicarPorDos(num)');
console.log('¿Qué retorna realmente .then()?');
console.log('.then() SIEMPRE retorna una nueva Promesa:');
console.log('- Si retornas un valor → se envuelve en Promesa resuelta');
console.log('- Si retornas una Promesa → se encadena');
console.log('- Si no retornas nada → Promesa resuelta con undefined');

// Agregar event listeners para mostrar análisis al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Página cargada - Lista para ejecutar promesas');
    
    // Ejemplo de explicación en consola
    console.log('\n📊 Criterios de Evaluación:');
    console.log('✓ Usa correctamente new Promise');
    console.log('✓ Retorna correctamente las promesas');
    console.log('✓ Usa .then() correctamente');
    console.log('✓ Maneja errores con .catch()');
    console.log('✓ Entiende el flujo asincrónico');
});