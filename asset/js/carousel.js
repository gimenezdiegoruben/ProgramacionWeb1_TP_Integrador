// asset/js/carousel.js remains the same as it meets the requirements (array-based, circular, student-created)
let indice = 0;
let imagenes = []; // Array global para imágenes

// Inicializa el carousel con un array de imágenes
function initCarousel(imgs) {
    if (imgs && imgs.length > 0) {
        imagenes = imgs;
        mostrarImagen();
    } else {
        console.error("Array de imágenes vacío o no definido.");
    }
}

// Muestra la imagen actual
function mostrarImagen() {
    const imgElement = document.getElementById('imagen-carrusel');
    if (imgElement && imagenes.length > 0) {
        imgElement.src = imagenes[indice];
    } else {
        console.error("Elemento 'imagen-carrusel' no encontrado o array de imágenes vacío.");
    }
}

// Navega a la siguiente imagen
function siguienteImagen() {
    if (imagenes.length > 0) {
        indice = (indice + 1) % imagenes.length;
        mostrarImagen();
    }
}

// Navega a la imagen anterior
function anteriorImagen() {
    if (imagenes.length > 0) {
        indice = (indice - 1 + imagenes.length) % imagenes.length;
        mostrarImagen();
    }
}

// Opcional: Vincular eventos a botones al cargar (si no están ya en HTML)
document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.flecha.izquierda');
    const nextButton = document.querySelector('.flecha.derecha');
    if (prevButton) prevButton.onclick = anteriorImagen;
    if (nextButton) nextButton.onclick = siguienteImagen;
});