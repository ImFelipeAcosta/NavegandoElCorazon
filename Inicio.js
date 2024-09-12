// Selecciona el ícono y el cuadro de información
const locationIcon = document.getElementById('location-icon');
const infoBox = document.getElementById('info-box');

// Selecciona el segundo ícono de ubicación (que inicialmente estará oculto)
const locationMapa2 = document.getElementById('locationmapa2');

// Crear y agregar el botón de regresar (inicialmente oculto)
const backButton = document.createElement('button');
backButton.id = 'back-button';
backButton.innerHTML = '← Regresar';
backButton.style.display = 'none';  // Oculto inicialmente
document.body.appendChild(backButton);

// Crear y agregar el cuadro de texto y botón de "Ver carta" para locationmapa2
const infoBoxMap2 = document.createElement('div');
infoBoxMap2.id = 'info-box-map2';
infoBoxMap2.innerHTML = `Aquí, en la bulliciosa Plaza de la Aduana, un joven llamado Florentino Ariza vio por primera vez a Fermina Daza. Este encuentro, fugaz y aparentemente trivial, se convertiría en el origen de un amor que marcaría sus vidas para siempre. Para Florentino, fue amor a primera vista, un amor que no conocía límites ni razón, y que lo llevó a expresar sus sentimientos en palabras cuidadosamente elegidas.`;

// Crear y agregar el botón de cerrar dentro del cuadro rojo
const closeInfoBoxButton = document.createElement('button');
closeInfoBoxButton.id = 'close-info-box-map2';
closeInfoBoxButton.innerHTML = '×';
infoBoxMap2.appendChild(closeInfoBoxButton);

document.body.appendChild(infoBoxMap2);

const viewLetterButton = document.createElement('button');
viewLetterButton.id = 'view-letter-button';
viewLetterButton.innerHTML = 'Ver carta';
viewLetterButton.style.display = 'none';  // Oculto inicialmente
document.body.appendChild(viewLetterButton);

// Crear y agregar el cuadro de texto para la carta
const letterBox = document.createElement('div');
letterBox.id = 'letter-box';
letterBox.innerHTML = `Señorita Fermina Daza, desde el día en que la vi, mi corazón no ha conocido descanso. Cada latido es un recordatorio de su belleza, y cada suspiro, un anhelo de su presencia. No pido más que una oportunidad para demostrarle la sinceridad de mi afecto, y que mi amor por usted es eterno. Su devoto, Florentino Ariza.`;
letterBox.style.display = 'none';  // Oculto inicialmente
document.body.appendChild(letterBox);

// Selecciona el reproductor de audio
const audioPlayer = document.getElementById('audio-player');

// Muestra el cuadro de información cuando el cursor está sobre el ícono
locationIcon.addEventListener('mouseenter', function() {
    infoBox.style.display = 'block';
});

// Oculta el cuadro de información cuando el cursor sale del ícono
locationIcon.addEventListener('mouseleave', function() {
    infoBox.style.display = 'none';
});

// Cambia el fondo y muestra el nuevo ícono al hacer clic en el primer ícono de ubicación
locationIcon.addEventListener('click', function() {
    document.getElementById('map').src = 'Mapa 2.jpg';  // Cambia el fondo al nuevo mapa
    locationIcon.style.display = 'none';  // Oculta el primer ícono de ubicación
    locationMapa2.style.display = 'block';  // Muestra el segundo ícono de ubicación
    backButton.style.display = 'block';  // Muestra el botón de regresar
});

// Muestra el cuadro de información y el botón de ver carta en Mapa2
locationMapa2.addEventListener('click', function() {
    infoBoxMap2.style.display = 'block';
    viewLetterButton.style.display = 'block';
    viewLetterButton.style.position = 'absolute';
    viewLetterButton.style.left = '50px';  // Ajusta según sea necesario
    viewLetterButton.style.top = '400px';  // Ajusta según sea necesario
});

// Muestra el cuadro de la carta y el reproductor de audio cuando se hace clic en "Ver carta"
viewLetterButton.addEventListener('click', function() {
    infoBoxMap2.style.display = 'none';  // Oculta el texto anterior
    viewLetterButton.style.display = 'none';  // Oculta el botón "Ver carta"
    letterBox.style.display = 'block';  // Muestra el cuadro de la carta
    audioPlayer.style.display = 'block';  // Muestra el reproductor de audio
});

// Ocultar el cuadro de información al hacer clic en el botón de cerrar
closeInfoBoxButton.addEventListener('click', function() {
    infoBoxMap2.style.display = 'none';
    viewLetterButton.style.display = 'none';
});

// Acción para el botón de regresar
backButton.addEventListener('click', function() {
    document.getElementById('map').src = 'Mapa.jpg';  // Regresa al mapa original
    locationIcon.style.display = 'block';  // Vuelve a mostrar el primer ícono de ubicación
    locationMapa2.style.display = 'none';  // Oculta el segundo ícono de ubicación
    backButton.style.display = 'none';  // Oculta el botón de regreso
    infoBoxMap2.style.display = 'none';  // Oculta el cuadro de información de Mapa 2
    letterBox.style.display = 'none';  // Oculta el cuadro de la carta
    audioPlayer.style.display = 'none';  // Oculta el reproductor de audio
    audioPlayer.pause();  // Pausa la canción si estaba reproduciéndose
    audioPlayer.currentTime = 0;  // Reinicia la canción
});

window.addEventListener('resize', resizeMap);

function resizeMap() {
    const map = document.getElementById('map');
    map.style.width = window.innerWidth + 'px';
    map.style.height = window.innerHeight + 'px';
}

resizeMap();  // Ajusta el tamaño del mapa cuando se carga la página

// Oculta el overlay al hacer clic en el botón de continuar
document.getElementById('continue-button').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
});
