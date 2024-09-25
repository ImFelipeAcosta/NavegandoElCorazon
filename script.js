// Función para cargar las locaciones desde el archivo JSON
fetch('locaciones.json')
    .then(response => response.json())
    .then(data => {
        const locacionesContainer = document.getElementById('locaciones-container');
        let locacionesPrimeroMapa = [];  // Almacena las locaciones del primer mapa
        const plazaAudio = document.getElementById('plaza-audio');
        const cartaAudio = document.getElementById('carta-audio');

        data.locaciones.forEach(locacion => {
            // Crear el contenedor de cada locación
            const locacionWrapper = document.createElement('div');
            locacionWrapper.style.position = 'absolute';
            locacionWrapper.style.left = locacion.coordenadas.x + 'px';
            locacionWrapper.style.top = locacion.coordenadas.y + 'px';

            // Crear el icono de la locación
            const locacionIcon = document.createElement('img');
            locacionIcon.src = locacion.imagen;
            locacionIcon.classList.add('locacion-icon');

            // Crear el tooltip con el nombre de la locación
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = locacion.nombre;

            // Añadir el icono y el tooltip al contenedor de la locación
            locacionWrapper.appendChild(locacionIcon);
            locacionWrapper.appendChild(tooltip);

            // Almacenar locaciones del primer mapa en un array y agregar al DOM
            if (locacion.nombre !== 'Plaza de la Aduana' && locacion.nombre !== 'Casa Fermina') {
                locacionesContainer.appendChild(locacionWrapper);
                locacionesPrimeroMapa.push(locacionWrapper);  // Guardar locaciones del primer mapa
            }

            // Evento para cambiar a Mapa2.jpg cuando se haga clic en las locaciones del primer mapa
            locacionIcon.addEventListener('click', function() {
                if (locacion.nombre !== 'Plaza de la Aduana' && locacion.nombre !== 'Casa Fermina') {
                    // Cambiar fondo a Mapa2.jpg
                    document.body.style.backgroundImage = "url('Mapa2.jpg')";

                    // Ocultar las locaciones del primer mapa
                    locacionesPrimeroMapa.forEach(locacion => locacion.style.display = 'none');

                    // Mostrar las locaciones del segundo mapa
                    const locacionesSegundoMapa = ['Plaza de la Aduana', 'Casa Fermina'];
                    locacionesSegundoMapa.forEach(nombreLocacion => {
                        const locacionData = data.locaciones.find(loc => loc.nombre === nombreLocacion);
                        const nuevaLocacion = document.createElement('div');
                        nuevaLocacion.style.position = 'absolute';
                        nuevaLocacion.style.left = locacionData.coordenadas.x + 'px';
                        nuevaLocacion.style.top = locacionData.coordenadas.y + 'px';

                        const nuevaLocacionIcon = document.createElement('img');
                        nuevaLocacionIcon.src = locacionData.imagen;
                        nuevaLocacionIcon.classList.add('locacion-icon');

                        const nuevaTooltip = document.createElement('div');
                        nuevaTooltip.classList.add('tooltip');
                        nuevaTooltip.textContent = locacionData.nombre;

                        nuevaLocacion.appendChild(nuevaLocacionIcon);
                        nuevaLocacion.appendChild(nuevaTooltip);
                        locacionesContainer.appendChild(nuevaLocacion);

                        // Mostrar el contenido dinámico al hacer clic en Plaza de la Aduana
                        if (nombreLocacion === 'Plaza de la Aduana') {
                            nuevaLocacionIcon.addEventListener('click', function() {
                                const plazaContent = locacionData.contenido;

                                document.getElementById('content-plaza').style.display = 'flex';
                                document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Aplica opacidad
                                document.getElementById('plaza-text').textContent = plazaContent.texto;
                                document.getElementById('gabriel2').src = plazaContent.imagen;
                                
                                // Reproducir el audio de la locación
                                plazaAudio.src = plazaContent.audio; // Asignar el audio desde el JSON
                                plazaAudio.play(); // Iniciar la reproducción del audio
                            });
                        }

                        // Mostrar el contenido dinámico al hacer clic en Casa Fermina
                        if (nombreLocacion === 'Casa Fermina') {
                            nuevaLocacionIcon.addEventListener('click', function() {
                                const casaFerminaContent = locacionData.contenido;

                                document.getElementById('content-plaza').style.display = 'flex';
                                document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Aplica opacidad
                                document.getElementById('plaza-text').textContent = casaFerminaContent.texto;
                                document.getElementById('gabriel2').src = casaFerminaContent.imagen;
                                
                                // Reproducir el audio de Casa Fermina
                                plazaAudio.src = casaFerminaContent.audio; // Asignar el audio desde el JSON
                                plazaAudio.play(); // Iniciar la reproducción del audio
                            });
                        }
                    });
                }
            });

            // Mostrar tooltip al pasar el mouse sobre las locaciones
            locacionIcon.addEventListener('mouseover', function() {
                tooltip.style.visibility = 'visible';
            });

            // Ocultar tooltip cuando se quite el mouse
            locacionIcon.addEventListener('mouseout', function() {
                tooltip.style.visibility = 'hidden';
            });
        });
    });

// Evento para ocultar el overlay y otros elementos al hacer clic en "Continuar"
document.getElementById('continue-btn').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none'; 
    document.getElementById('gabriel').style.display = 'none'; 
    document.querySelector('.text-box').style.display = 'none'; 
    document.getElementById('continue-btn').style.display = 'none'; 
});

// Evento para cerrar el contenido de la Plaza de la Aduana o Casa Fermina
document.getElementById('cerrar-btn').addEventListener('click', function() {
    document.getElementById('content-plaza').style.display = 'none';
    document.getElementById('overlay').style.backgroundColor = 'transparent'; // Quitar opacidad al cerrar
    const plazaAudio = document.getElementById('plaza-audio');
    plazaAudio.pause(); // Detener el audio cuando se cierre el contenido
    plazaAudio.currentTime = 0; // Reiniciar el audio para que empiece desde el inicio la próxima vez
});

// Evento para mostrar la carta (puede ser de Plaza de la Aduana o Casa Fermina)
document.getElementById('ver-carta-btn').addEventListener('click', function () {
    fetch('locaciones.json')
        .then(response => response.json())
        .then(data => {
            const plazaContent = data.locaciones.find(loc => loc.nombre === 'Plaza de la Aduana').contenido;
            const casaFerminaContent = data.locaciones.find(loc => loc.nombre === 'Casa Fermina').contenido;

            // Determinar qué carta mostrar según el contenido visible
            const isPlazaAduana = document.getElementById('plaza-text').textContent === plazaContent.texto;
            const content = isPlazaAduana ? plazaContent.carta : casaFerminaContent.carta;

            // Ocultar Plaza de la Aduana o Casa Fermina y mostrar la carta
            document.getElementById('content-plaza').style.display = 'none';
            document.getElementById('carta-container').style.display = 'flex';
            document.getElementById('carta-text').textContent = content.texto;
            document.getElementById('florentino-img').src = content.imagen;

            // Cambiar el audio a la carta correspondiente
            const cartaAudio = document.getElementById('carta-audio');
            cartaAudio.src = content.audio;
            cartaAudio.play();
        });
});

// Evento para volver a la locación desde la carta
document.getElementById('volver-plaza-btn').addEventListener('click', function () {
    document.getElementById('carta-container').style.display = 'none';  // Ocultar carta
    document.getElementById('content-plaza').style.display = 'flex';  // Mostrar Plaza de la Aduana o Casa Fermina

    // Pausar el audio de la carta y reanudar el de la locación
    const cartaAudio = document.getElementById('carta-audio');
    cartaAudio.pause();
    cartaAudio.currentTime = 0;

    const plazaAudio = document.getElementById('plaza-audio');
    plazaAudio.play();
});

// Control de la barra de sonido
const audio = document.getElementById('carta-audio');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const seekBar = document.getElementById('seek-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');

// Play/Pause toggle
playBtn.addEventListener('click', () => {
    audio.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline';
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
    playBtn.style.display = 'inline';
    pauseBtn.style.display = 'none';
});

// Actualizar la barra de progreso y los tiempos del audio
audio.addEventListener('timeupdate', () => {
    seekBar.max = Math.floor(audio.duration);
    seekBar.value = Math.floor(audio.currentTime);

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    totalTimeEl.textContent = `${durationMinutes}:${durationSeconds}`;
});

// Control manual del seek bar
seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
});
