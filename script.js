// script.js

// Obtener referencias a elementos del DOM (Document Object Model)
const fechaNacimientoInput = document.getElementById('fecha_nacimiento'); // Input de fecha de nacimiento
const edadSpan = document.getElementById('edad'); // Span para mostrar la edad
const form = document.querySelector('.form-registro'); // Formulario de registro
const telefonoInput = document.getElementById('telefono'); // Input de teléfono
const nombreInput = document.getElementById('nombre'); // Input de nombre
const paisInput = document.getElementById('pais'); // Input de país
const estadoInput = document.getElementById('estado'); // Input de estado

// Evento para calcular la edad cuando cambia la fecha de nacimiento
fechaNacimientoInput.addEventListener('change', () => {
    // Obtener la fecha de nacimiento del input
    const fechaNacimiento = new Date(fechaNacimientoInput.value);
    // Obtener la fecha actual
    const hoy = new Date();
    // Calcular la edad restando los años
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    // Obtener el mes
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    // Ajustar la edad si el mes de nacimiento aún no ha pasado
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    // Mostrar la edad en el span, o dejarlo vacío si la fecha no es válida
    edadSpan.textContent = (edad >= 0) ? `Tienes ${edad} años` : "";
});

// Función para validar que solo haya letras, espacios y acentos
function validarTexto(input) {
    // Expresión regular que permite letras (mayúsculas y minúsculas), espacios y acentos
    const regex = /^[a-zA-Z\u00C0-\u017F\s]*$/;
    // Retornar true si el valor del input cumple con la expresión regular, false de lo contrario
    return regex.test(input.value);
}

// Función para validar el email
function validarEmail(input) {
    // Expresión regular para validar el formato del email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Retornar true si el valor del input cumple con la expresión regular, false de lo contrario
    return regex.test(input.value);
}

// Función para validar el teléfono (solo 10 números)
function validarTelefono(input) {
    // Eliminar cualquier carácter que no sea un número
    const telefono = input.value.replace(/[^0-9]/g, '');
    // Verificar que tenga exactamente 10 números
    return telefono.length === 10;
}

// Evento submit del formulario (se dispara al enviar el formulario)
form.addEventListener('submit', function(event) {
    // Array para guardar los errores
    let errores = [];

    // Validar Nombre
    if (!validarTexto(nombreInput)) {
        errores.push("El nombre solo puede contener letras, espacios y acentos (sin caracteres especiales).");
    }

    // Validar Estado
    if (!validarTexto(estadoInput)) {
        errores.push("El estado solo puede contener letras, espacios y acentos (sin caracteres especiales).");
    }

     // Validar Pais
     if (!validarTexto(paisInput)) {
        errores.push("El pais solo puede contener letras, espacios y acentos (sin caracteres especiales).");
    }

    // Validar Email
    if (!validarEmail(emailInput)) {
        errores.push("Por favor, introduce un email válido.");
    }

     // Validar Telefono
     if (!validarTelefono(telefonoInput)) {
        errores.push("El teléfono debe contener exactamente 10 números.");
    }

    // Si hay errores, prevenimos el envío del formulario y mostramos los errores
    if (errores.length > 0) {
        // Evita que se envíe el formulario
        event.preventDefault();
        // Muestra los errores en una alerta
        alert(errores.join('\n'));
    }

    // Si no hay errores, el formulario se enviará normalmente al backend
    // Aquí es donde se enviarán los datos para ser procesados en el servidor
});

// Evento para controlar la entrada en el campo de teléfono
telefonoInput.addEventListener('input', function(event) {
    // Obtener el input que disparó el evento
    const input = event.target;
    // Obtener el valor actual del input
    const value = input.value;

    // Eliminar cualquier carácter que no sea un número
    const numbersOnly = value.replace(/[^0-9]/g, '');

    // Truncar a 10 dígitos
    const truncatedValue = numbersOnly.slice(0, 10);

    // Actualizar el valor del input
    input.value = truncatedValue;
});

// Evento para controlar la entrada en el campo de nombre
nombreInput.addEventListener('input', function(event) {
    // Obtener el input que disparó el evento
    const input = event.target;
    // Obtener el valor actual del input
    const value = input.value;

    // Eliminar cualquier carácter que no sea una letra, un acento o un espacio
    const lettersOnly = value.replace(/[^a-zA-Z\u00C0-\u017F\s]/g, '');

    // Actualizar el valor del input
    input.value = lettersOnly;
});

// Evento para controlar la entrada en el campo de pais
paisInput.addEventListener('input', function(event) {
    // Obtener el input que disparó el evento
    const input = event.target;
    // Obtener el valor actual del input
    const value = input.value;

    // Eliminar cualquier carácter que no sea una letra, un acento o un espacio
    const lettersOnly = value.replace(/[^a-zA-Z\u00C0-\u017F\s]/g, '');

    // Actualizar el valor del input
    input.value = lettersOnly;
});

// Evento para controlar la entrada en el campo de estado
estadoInput.addEventListener('input', function(event) {
    // Obtener el input que disparó el evento
    const input = event.target;
    // Obtener el valor actual del input
    const value = input.value;

    // Eliminar cualquier carácter que no sea una letra, un acento o un espacio
    const lettersOnly = value.replace(/[^a-zA-Z\u00C0-\u017F\s]/g, '');

    // Actualizar el valor del input
    input.value = lettersOnly;
});
