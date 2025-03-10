// Obtener referencias a elementos del DOM
const fechaNacimientoInput = document.getElementById('fecha_nacimiento');
const edadSpan = document.getElementById('edad');
const form = document.querySelector('.form-registro');
const telefonoInput = document.getElementById('telefono');
const nombreInput = document.getElementById('nombre');
const paisInput = document.getElementById('pais');
const estadoInput = document.getElementById('estado');
const emailInput = document.getElementById('email');

// Calcular la edad al cambiar la fecha de nacimiento
fechaNacimientoInput.addEventListener('change', () => {
    const fechaNacimiento = new Date(fechaNacimientoInput.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    edadSpan.textContent = (edad >= 0) ? `Tienes ${edad} años` : "";
});

// Función para validar que solo haya letras, espacios y acentos
function validarTexto(input) {
    const regex = /^[a-zA-ZÀ-ſ\s]*$/;
    return regex.test(input.value);
}

// Función para validar el email
function validarEmail(input) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input.value);
}

// Función para validar el teléfono (10 números)
function validarTelefono(input) {
    const telefono = input.value.replace(/[^0-9]/g, '');
    return telefono.length === 10;
}

// Evento submit del formulario
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    let errores = [];

    if (!validarTexto(nombreInput)) {
        errores.push("El nombre solo puede contener letras, espacios y acentos.");
    }
    if (!validarTexto(estadoInput)) {
        errores.push("El estado solo puede contener letras, espacios y acentos.");
    }
    if (!validarTexto(paisInput)) {
        errores.push("El país solo puede contener letras, espacios y acentos.");
    }
    if (!validarEmail(emailInput)) {
        errores.push("Introduce un email válido.");
    }
    if (!validarTelefono(telefonoInput)) {
        errores.push("El teléfono debe contener exactamente 10 números.");
    }

    if (errores.length > 0) {
        alert(errores.join('\n'));
        return;
    }

    // Enviar los datos al servidor si no hay errores
    const formData = {
        nombre: nombreInput.value,
        edad: fechaNacimientoInput.value,
        tipo: document.querySelector("input[name='tipo']:checked")?.value,
        pais: paisInput.value,
        estado: estadoInput.value,
        email: emailInput.value,
        telefono: telefonoInput.value,
    };

    try {
        const response = await fetch("http://localhost:3000/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        
        const result = await response.json();
        alert(result.message || "Registro exitoso");
    } catch (error) {
        alert("Error en el registro");
    }
});

// Eventos para validar y restringir la entrada de datos
[nombreInput, paisInput, estadoInput].forEach(input => {
    input.addEventListener('input', event => {
        event.target.value = event.target.value.replace(/[^a-zA-ZÀ-ſ\s]/g, '');
    });
});

telefonoInput.addEventListener('input', event => {
    const numbersOnly = event.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    event.target.value = numbersOnly;
});
