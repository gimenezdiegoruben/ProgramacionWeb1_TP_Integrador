const formulario = document.getElementById('formulario-1');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const mensaje = document.getElementById('mensaje');
const mensajeExitoContainer = document.getElementById('mensaje-exito');
const datosEnviadosContainer = document.getElementById('datos-enviados');

// Expresiones Regulares
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const validTel = /^\d{8,15}$/; // Solo números, entre 8 y 15 dígitos

// ----------------------------------------------------
// FUNCIONES DE MANEJO DE ERRORES Y ÉXITO
// ----------------------------------------------------

/**
 * Muestra un mensaje de error debajo del campo y resalta su borde.
 * @param {string} fieldId - El ID del campo ('nombre', 'email', etc.)
 * @param {string} msg - El mensaje de error a mostrar.
 */
function mostrarError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    let errorElement = document.getElementById(`error-${fieldId}`);
    
    // Si no existe el elemento de error, lo creamos
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.id = `error-${fieldId}`;
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    if (field) {
        field.classList.add('error-input');
    }
    
    if (errorElement) {
        errorElement.textContent = msg;
        errorElement.style.display = 'block';
    }
}

/**
 * Limpia todos los mensajes de error, bordes y el mensaje de éxito.
 */
function limpiarErroresYExito() {
    // Limpiar los bordes de error de todos los inputs/textarea
    document.querySelectorAll('input, textarea').forEach(field => {
        field.classList.remove('error-input');
    });

    // Ocultar y vaciar todos los contenedores de error
    document.querySelectorAll('.error').forEach(errorDiv => {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    });

    // Ocultar y vaciar el mensaje de éxito
    if (mensajeExitoContainer) {
        mensajeExitoContainer.innerHTML = '';
    }
    
    // Ocultar el div de datos enviados
    if (datosEnviadosContainer) {
        datosEnviadosContainer.style.display = 'none';
    }
}

/**
 * Muestra el mensaje de éxito solicitado.
 */
function mostrarMensajeExito() {
    mensajeExitoContainer.innerHTML = `
        <div class="mensaje-exito">
            Mensaje enviado con éxito... pronto nos contactaremos con usted
        </div>
    `;
}

/**
 * Muestra los datos enviados en el HTML, cumpliendo con la pauta de 'createElement'.
 */
function mostrarDatosEnviados(nombreValor, emailValor, telefonoValor, mensajeValor) {
    // Muestra el contenedor de datos
    datosEnviadosContainer.style.display = 'block';

    // Actualiza los spans con la información del formulario
    document.getElementById('nombre-usuario').textContent = nombreValor;
    document.getElementById('correo-span').textContent = emailValor;
    document.getElementById('telefono-divloco').textContent = telefonoValor || 'No proporcionado';
    document.getElementById('mensaje-span').textContent = mensajeValor || 'Sin mensaje';

    // Agrega el timestamp usando createElement
    const pTimestamp = document.createElement('p');
    pTimestamp.textContent = `Enviado: ${new Date().toLocaleString()}`;
    
    // Si ya existe un timestamp, lo reemplazamos
    const existingTimestamp = datosEnviadosContainer.querySelector('.timestamp');
    if (existingTimestamp) {
        datosEnviadosContainer.removeChild(existingTimestamp);
    }
    
    pTimestamp.classList.add('timestamp');
    datosEnviadosContainer.appendChild(pTimestamp);
}

// ----------------------------------------------------
// EVENTO SUBMIT DEL FORMULARIO
// ----------------------------------------------------

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    limpiarErroresYExito();
    
    let esValido = true;
    
    // VALIDACIONES

    // 1. Validar Nombre: obligatorio, solo letras y espacios, max 50
    const nombreValor = nombre.value.trim();
    if (nombreValor.length === 0) {
        mostrarError('nombre', 'El nombre y apellido es obligatorio.');
        esValido = false;
    } else if (!validNombre.test(nombreValor)) {
        mostrarError('nombre', 'El nombre solo debe contener letras y espacios.');
        esValido = false;
    } else if (nombreValor.length > 50) {
        mostrarError('nombre', 'El nombre no puede exceder los 50 caracteres.');
        esValido = false;
    }

    // 2. Validar Email: obligatorio, formato válido
    const emailValor = email.value.trim();
    if (emailValor.length === 0) {
        mostrarError('email', 'El correo electrónico es obligatorio.');
        esValido = false;
    } else if (!validEmail.test(emailValor)) {
        mostrarError('email', 'El formato del correo electrónico no es válido.');
        esValido = false;
    }

    // 3. Validar Teléfono: opcional, pero si se ingresa debe ser válido (solo números, 8-15 dígitos)
    const telefonoValor = telefono.value.trim();
    if (telefonoValor.length > 0 && !validTel.test(telefonoValor)) {
        mostrarError('telefono', 'El teléfono debe contener solo números (8-15 dígitos).');
        esValido = false;
    }
    
    // 4. Validar Mensaje: obligatorio
    const mensajeValor = mensaje.value.trim();
    if (mensajeValor.length === 0) {
        mostrarError('mensaje', 'El mensaje es obligatorio.');
        esValido = false;
    }
    

    if (esValido) {
        mostrarMensajeExito();
        mostrarDatosEnviados(nombreValor, emailValor, telefonoValor, mensajeValor);
        formulario.reset();
    }
});
