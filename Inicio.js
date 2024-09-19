// Selecciona el ícono y el cuadro de información
const locationIcon = document.getElementById('location-icon');
const infoBox = document.getElementById('info-box');

// Selecciona el segundo ícono de ubicación (que inicialmente estará oculto)
const locationMapa2 = document.getElementById('locationmapa2');

// Crear y agregar el botón de regresar (inicialmente oculto)
const backButton = document.createElement('button');
backButton.id = 'back-button';
backButton.innerHTML = '<i class="fa-solid fa-arrow-left" style="color: #ffffff;"></i> Regresar';
backButton.style.display = 'none';  // Oculto inicialmente
backButton.style.backgroundColor = 'black';  // Cambiado a negro
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

// Crear el contenido de la carta
const letterContent = document.createElement('p');
letterContent.innerHTML = `Señorita Fermina Daza, desde el día en que la vi, mi corazón no ha conocido descanso. Cada latido es un recordatorio de su belleza, y cada suspiro, un anhelo de su presencia. No pido más que una oportunidad para demostrarle la sinceridad de mi afecto, y que mi amor por usted es eterno. Su devoto, Florentino Ariza.`;
letterBox.appendChild(letterContent);

// Crear y agregar la barra de progreso personalizada (primero)
const progressContainer = document.createElement('div');
progressContainer.id = 'progress-container';
progressContainer.innerHTML = `
    <span id="current-time">0:00</span>
    <input id="progress-bar" type="range" min="0" max="100" value="0">
    <span id="duration-time">4:00</span>
`;
letterBox.appendChild(progressContainer);

// Crear y agregar los controles personalizados para el reproductor de audio (después)
const customAudioControls = document.createElement('div');
customAudioControls.id = 'custom-audio-controls';
customAudioControls.innerHTML = `
    <button id="rewind-button"><i class="fa-solid fa-backward fa-2xs" style="color: #ffffff;"></i></button>
    <button id="play-pause-button"><i id="play-icon" class="fa-solid fa-play fa-2xs" style="color: #ffffff;"></i></button>
    <button id="forward-button"><i class="fa-solid fa-forward fa-2xs" style="color: #ffffff;"></i></button>
    <button id="repeat-button"><i class="fa-solid fa-repeat fa-2xs" style="color: #ffffff;"></i></button>
    <button id="volume-control"><i class="fa-solid fa-volume-up fa-2xs" style="color: #ffffff;"></i></button> <!-- Botón de control de volumen -->
    <input id="volume-slider" type="range" min="0" max="100" value="100" style="width:100px;"> <!-- Barra de volumen -->
`;
letterBox.appendChild(customAudioControls);

// Crear y agregar el botón de regresar dentro del cuadro de la carta
const backToInfoBoxButton = document.createElement('button');
backToInfoBoxButton.id = 'back-to-info-box';
backToInfoBoxButton.innerHTML = '<i class="fa-solid fa-arrow-left" style="color: #ffffff;"></i>';
letterBox.appendChild(backToInfoBoxButton);

// Añadir el letterBox al body del documento
document.body.appendChild(letterBox);

// Crear y agregar la nueva imagen Florentino encima del cuadro de la carta
const florentinoImage = document.createElement('img');
florentinoImage.id = 'florentino-image';
florentinoImage.src = 'Florentino.png';
florentinoImage.style.position = 'absolute';
florentinoImage.style.display = 'none';  // Oculto inicialmente
document.body.appendChild(florentinoImage);

// Selecciona el reproductor de audio
const audioPlayer = document.getElementById('audio-player');

// Funcionalidad del botón de control de volumen
const volumeControl = document.getElementById('volume-control');
const volumeSlider = document.getElementById('volume-slider');
let isMuted = false;

volumeControl.addEventListener('click', function() {
    if (isMuted) {
        audioPlayer.muted = false;
        volumeControl.querySelector('i').classList.remove('fa-volume-mute');
        volumeControl.querySelector('i').classList.add('fa-volume-up');
        volumeSlider.value = audioPlayer.volume * 100;  // Ajusta la barra de volumen al valor actual
    } else {
        audioPlayer.muted = true;
        volumeControl.querySelector('i').classList.remove('fa-volume-up');
        volumeControl.querySelector('i').classList.add('fa-volume-mute');
        volumeSlider.value = 0;  // Si se silencia, la barra de volumen se pone en 0
    }
    isMuted = !isMuted;
});

// Funcionalidad de la barra de volumen
volumeSlider.addEventListener('input', function() {
    const volume = volumeSlider.value / 100;
    audioPlayer.volume = volume;
    if (volume === 0) {
        isMuted = true;
        volumeControl.querySelector('i').classList.remove('fa-volume-up');
        volumeControl.querySelector('i').classList.add('fa-volume-mute');
    } else {
        isMuted = false;
        volumeControl.querySelector('i').classList.remove('fa-volume-mute');
        volumeControl.querySelector('i').classList.add('fa-volume-up');
    }
});

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
    viewLetterButton.style.display = 'block';  // Asegura que el botón se muestre

    // Posicionar el botón justo debajo del cuadro de texto
    viewLetterButton.style.left = infoBoxMap2.style.left;  // Alineado con el cuadro de texto
    viewLetterButton.style.top = (parseInt(infoBoxMap2.style.top) + infoBoxMap2.offsetHeight + 20) + 'px';  // 20px debajo del cuadro de texto

    // Muestra la imagen Gabriel2 al lado izquierdo del rectángulo rojo
    const gabriel2Image = document.getElementById('gabriel2-image');
    gabriel2Image.style.display = 'block';
});

// Muestra el cuadro de la carta, el reproductor de audio, y la imagen de Florentino cuando se hace clic en "Ver carta"
viewLetterButton.addEventListener('click', function() {
    infoBoxMap2.style.display = 'none';  // Oculta el texto anterior
    viewLetterButton.style.display = 'none';  // Oculta el botón "Ver carta"
    letterBox.style.display = 'block';  // Muestra el cuadro de la carta
    audioPlayer.style.display = 'block';  // Muestra el reproductor de audio
    document.getElementById('custom-audio-controls').style.display = 'flex';  // Muestra los controles personalizados
    document.getElementById('progress-container').style.display = 'flex'; // Muestra la barra de progreso

    // Oculta la imagen Gabriel2 y muestra la imagen de Florentino
    const gabriel2Image = document.getElementById('gabriel2-image');
    gabriel2Image.style.display = 'none';  // Asegura que Gabriel2 no aparezca

    // Muestra la imagen de Florentino
    florentinoImage.style.display = 'block';  // Muestra la imagen de Florentino
});

// Ocultar el cuadro de información y el botón "Ver carta" al hacer clic en el botón de cerrar
closeInfoBoxButton.addEventListener('click', function() {
    infoBoxMap2.style.display = 'none';  // Oculta el cuadro de información
    viewLetterButton.style.display = 'none';  // Oculta el botón "Ver carta"
    const gabriel2Image = document.getElementById('gabriel2-image');
    gabriel2Image.style.display = 'none';  // Oculta la imagen Gabriel2
});

// Acción para regresar al cuadro anterior
backToInfoBoxButton.addEventListener('click', function() {
    letterBox.style.display = 'none';
    infoBoxMap2.style.display = 'block';
    viewLetterButton.style.display = 'block';  // Asegura que el botón siga visible
    florentinoImage.style.display = 'none';  // Oculta la imagen de Florentino

    // Restaurar la visibilidad de Gabriel2
    const gabriel2Image = document.getElementById('gabriel2-image');
    gabriel2Image.style.display = 'block';  // Asegura que Gabriel2 esté visible nuevamente
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
    document.getElementById('custom-audio-controls').style.display = 'none';  // Oculta los controles personalizados
    document.getElementById('progress-container').style.display = 'none'; // Oculta la barra de progreso
    viewLetterButton.style.display = 'none';  // Oculta el botón "Ver carta"
    audioPlayer.pause();  // Pausa la canción si estaba reproduciéndose
    audioPlayer.currentTime = 0;  // Reinicia la canción
    const gabriel2Image = document.getElementById('gabriel2-image');
    gabriel2Image.style.display = 'none';  // Oculta la imagen Gabriel2
    florentinoImage.style.display = 'none';  // Oculta la imagen de Florentino
});

// Funcionalidad de los controles personalizados para el reproductor de audio
const playPauseButton = document.getElementById('play-pause-button');
const playIcon = playPauseButton.querySelector('i');  // Selecciona el ícono de Font Awesome dentro del botón
const rewindButton = document.getElementById('rewind-button');
const forwardButton = document.getElementById('forward-button');
const repeatButton = document.getElementById('repeat-button');

// Evento para reproducir o pausar la canción
playPauseButton.addEventListener('click', function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.classList.remove('fa-play');  // Cambia a icono de pausa
        playIcon.classList.add('fa-pause');
    } else {
        audioPlayer.pause();
        playIcon.classList.remove('fa-pause');  // Cambia a icono de reproducción
        playIcon.classList.add('fa-play');
    }
});

// Evento para retroceder 10 segundos en la canción
rewindButton.addEventListener('click', function() {
    audioPlayer.currentTime -= 10; // Retrocede 10 segundos
});

// Evento para adelantar 10 segundos en la canción
forwardButton.addEventListener('click', function() {
    audioPlayer.currentTime += 10; // Avanza 10 segundos
});

// Evento para activar/desactivar la repetición de la canción
let repeatMode = false;  // Inicializa el modo de repetición

repeatButton.addEventListener('click', function() {
    repeatMode = !repeatMode;  // Alterna el modo de repetición
    if (repeatMode) {
        audioPlayer.loop = true;  // Activa la repetición
        repeatButton.style.backgroundColor = 'transparent';  // Mantiene el fondo transparente
        repeatButton.querySelector('i').style.color = 'red';  // Cambia el color del ícono a rojo
    } else {
        audioPlayer.loop = false;  // Desactiva la repetición
        repeatButton.style.backgroundColor = 'transparent';  // Mantiene el fondo transparente
        repeatButton.querySelector('i').style.color = 'white';  // Cambia el color del ícono a blanco
    }
});

// Ajuste del tamaño del mapa al cambiar el tamaño de la ventana
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

// Barra de progreso personalizada
const progressBar = document.getElementById('progress-bar');
const currentTimeElement = document.getElementById('current-time');
const durationTimeElement = document.getElementById('duration-time');

// Actualiza la barra de progreso y los tiempos
audioPlayer.addEventListener('timeupdate', function() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    progressBar.value = (currentTime / duration) * 100;
    currentTimeElement.innerText = formatTime(currentTime);
    durationTimeElement.innerText = formatTime(duration);
});

// Permite cambiar la posición del audio al arrastrar la barra de progreso
progressBar.addEventListener('input', function() {
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (progressBar.value / 100) * duration;
});

// Formato para los tiempos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Inicializa el tiempo total cuando el audio se carga
audioPlayer.addEventListener('loadedmetadata', function() {
    durationTimeElement.innerText = formatTime(audioPlayer.duration);
});

// Selecciona el cuadro de información específico para "PLAZA DE LA ADUANA"
const infoBoxmap2Small = document.getElementById('info-box-map2-small');

// Muestra el cuadro de información "PLAZA DE LA ADUANA" cuando el cursor está sobre el ícono locationmapa2
locationMapa2.addEventListener('mouseenter', function() {
    infoBoxmap2Small.style.display = 'block';
    // Posiciona el cuadro de información si es necesario
    infoBoxmap2Small.style.left = '1500px';  // Ajusta la posición según sea necesario
    infoBoxmap2Small.style.top = '180px';    // Ajusta la posición según sea necesario
});

// Oculta el cuadro de información "PLAZA DE LA ADUANA" cuando el cursor sale del ícono locationmapa2
locationmapa2.addEventListener('mouseleave', function() {
    infoBoxmap2Small.style.display = 'none';
});
