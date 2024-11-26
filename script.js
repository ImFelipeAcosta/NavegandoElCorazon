// Variable global para almacenar el nombre de la locación actual
let currentLocacionNombre = null;

// Variables globales para manejar los audios
const plazaAudio = document.getElementById('plaza-audio');
const cartaAudio = document.getElementById('carta-audio');
const mapaAudio = new Audio('Mapa.mp3'); // Audio de fondo para el mapa principal
const mapa2Audio = new Audio('Mapa2.mp3'); // Audio de fondo para el mapa 2
const mapa3Audio = mapa2Audio; // Audio de fondo compartido para el mapa 2 y el mapa 3
const mapa4Audio = new Audio('Mapa4.mp3'); // Audio de fondo para el mapa 4
const mapa5Audio = new Audio('Mapa5.mp3'); // Audio de fondo para el mapa 5

// Variables para manejar el estado de reproducción de los audios
let wasMapaPlaying = false;
let wasPlazaAudioPlaying = false;
let wasMapa2Playing = false;
let wasMapa4Playing = false;
let wasMapa5Playing = false;
let currentIndex = 0; // Índice para el carrusel de imágenes

// Funciones para pausar y reanudar audios
function pauseMapaAudio() {
  wasMapaPlaying = !mapaAudio.paused;
  mapaAudio.pause();
}

function resumeMapaAudio() {
  if (wasMapaPlaying) {
    mapaAudio.play();
  }
}

function pauseMapa2Audio() {
  wasMapa2Playing = !mapa2Audio.paused;
  mapa2Audio.pause();
}
function resumeMapa2Audio() {
  if (wasMapa2Playing) {
    mapa2Audio.play();
  }
}

function pauseMapa3Audio() {
  wasMapa3Playing = !mapa3Audio.paused;
  mapa3Audio.pause();
}

function resumeMapa3Audio() {
  if (wasMapa3Playing) {
    mapa3Audio.play();
  }
}

function pauseMapa4Audio() {
  wasMapa4Playing = !mapa4Audio.paused;
  mapa4Audio.pause();
}

function resumeMapa4Audio() {
  if (wasMapa4Playing) {
    mapa4Audio.play();
  }
}

function pauseMapa5Audio() {
  wasMapa5Playing = !mapa5Audio.paused;
  mapa5Audio.pause();
}

function resumeMapa5Audio() {
  if (wasMapa5Playing) {
    mapa5Audio.play();
  }
}

function pausePlazaAudio() {
  wasPlazaAudioPlaying = !plazaAudio.paused;
  plazaAudio.pause();
}

function resumePlazaAudio() {
  if (wasPlazaAudioPlaying) {
    plazaAudio.play();
  }
}
function pauseCartaAudioAndResumePlaza() {
  cartaAudio.pause();
  cartaAudio.currentTime = 0;
  resumePlazaAudio();
}

// Asegúrate de ocultar el contenedor al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('content-plaza').style.display = 'none';
  document.getElementById('continuar-btn').style.display = 'none';
  document.getElementById('regresar-btn').style.display = 'none';
  document.getElementById('carta-container').style.display = 'none';

  // Reproduce el audio del mapa principal
  mapaAudio.loop = true;
  mapaAudio.play();
});

// Funcionalidad para cargar las locaciones desde el archivo JSON
fetch('locaciones.json')
  .then(response => response.json())
  .then(data => {
    const locacionesContainer = document.getElementById('locaciones-container');
    let locacionesPrimeroMapa = [];
    let locacionesSegundoMapa = [];
    let locacionesTercerMapa = [];
    let locacionesMapa4 = []; // Para almacenar las locaciones de Mapa 4
    let locacionesMapa5 = []; // Para almacenar las locaciones de Mapa 5

    data.locaciones.forEach(locacion => {
      const locacionWrapper = document.createElement('div');
      locacionWrapper.style.position = 'absolute';
      locacionWrapper.style.left = locacion.coordenadas.x + 'px';
      locacionWrapper.style.top = locacion.coordenadas.y + 'px';
      const locacionIcon = document.createElement('img');
      locacionIcon.src = locacion.imagen;
      locacionIcon.classList.add('locacion-icon');
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = locacion.nombre;

      locacionWrapper.appendChild(locacionIcon);
      locacionWrapper.appendChild(tooltip);
      locacionesContainer.appendChild(locacionWrapper);

      if (locacion.mapa === 1) {
        locacionesPrimeroMapa.push(locacionWrapper);
      } else if (locacion.mapa === 2) {
        locacionesSegundoMapa.push(locacionWrapper);
        locacionWrapper.style.display = 'none';
      } else if (locacion.mapa === 3) {
        locacionesTercerMapa.push(locacionWrapper);
        locacionWrapper.style.display = 'none';
      } else if (locacion.mapa === 4) {
        locacionesMapa4.push(locacionWrapper);
        locacionWrapper.style.display = 'none';
      } else if (locacion.mapa === 5) {
        locacionesMapa5.push(locacionWrapper);
        locacionWrapper.style.display = 'none'; // Ocultar inicialmente
      }
      // Ajuste específico para "HACIENDA" que debe evitar mostrar el botón de continuar
      if (locacion.nombre === "HACIENDA") {
        locacionIcon.addEventListener('click', function () {
          pauseMapaAudio();
          pauseMapa2Audio();
          pauseMapa3Audio();
          pauseMapa5Audio();
          document.body.style.backgroundImage = "url('Mapa4.jpeg')";
          locacionesPrimeroMapa.forEach(loc => loc.style.display = 'none');
          locacionesSegundoMapa.forEach(loc => loc.style.display = 'none');
          locacionesTercerMapa.forEach(loc => loc.style.display = 'none');
          locacionesMapa4.forEach(loc => loc.style.display = 'block');

          // Ocultar el botón "Continuar" en Hacienda
          document.getElementById('continuar-btn').style.display = 'none';
          document.getElementById('regresar-btn').style.display = 'block'; // Mostrar solo el botón "Regresar"

          mapa4Audio.loop = true;
          mapa4Audio.play();
          wasMapa4Playing = true;
        });
      } else if (locacion.nombre === "RÍO MAGDALENA") {
        locacionIcon.addEventListener('click', function () {
          pauseMapaAudio();
          pauseMapa2Audio();
          pauseMapa3Audio();
          pauseMapa4Audio();
          document.body.style.backgroundImage = "url('Mapa5.png')";
          locacionesPrimeroMapa.forEach(loc => loc.style.display = 'none');
          locacionesSegundoMapa.forEach(loc => loc.style.display = 'none');
          locacionesTercerMapa.forEach(loc => loc.style.display = 'none');
          locacionesMapa4.forEach(loc => loc.style.display = 'none');
          locacionesMapa5.forEach(loc => loc.style.display = 'block');

          // Ocultar el botón "Continuar" en Río Magdalena
          document.getElementById('continuar-btn').style.display = 'none';
          document.getElementById('regresar-btn').style.display = 'block'; // Mostrar solo el botón "Regresar"

          mapa5Audio.loop = true;
          mapa5Audio.play();
          wasMapa5Playing = true;
        });
      } else {
        locacionIcon.addEventListener('click', function () {
          toggleNavigationButtons(false); // Ocultar los botones "Continuar" y "Regresar"

          if (locacion.mapa === 1) {
            pauseMapaAudio();
            document.body.style.backgroundImage = "url('Mapa2.jpg')";
            locacionesPrimeroMapa.forEach(loc => loc.style.display = 'none');
            locacionesSegundoMapa.forEach(loc => loc.style.display = 'block');

            document.getElementById('regresar-btn').style.display = 'block';
            document.getElementById('continuar-btn').style.display = 'block'; // Mostrar continuar en Mapa 1
            mapa2Audio.loop = true;
            mapa2Audio.play();
            wasMapa2Playing = true;
          } else {
            currentLocacionNombre = locacion.nombre;
            document.getElementById('content-plaza').style.display = 'flex';
            document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            document.getElementById('plaza-text').textContent = locacion.contenido.texto;
            document.getElementById('gabriel2').src = locacion.contenido.imagen;
            plazaAudio.src = locacion.contenido.audio;

            if (locacion.mapa === 2) {
              pauseMapa2Audio();
            } else if (locacion.mapa === 3) {
              pauseMapa3Audio();
            } else if (locacion.mapa === 4) {
              pauseMapa4Audio();
            } else if (locacion.mapa === 5) {
              pauseMapa5Audio();
            }

            plazaAudio.play();
          }
        });
      }
      locacionIcon.addEventListener('mouseover', function () {
        tooltip.style.visibility = 'visible';
      });

      locacionIcon.addEventListener('mouseout', function () {
        tooltip.style.visibility = 'hidden';
      });
    });

    // Funcionalidad del botón continuar en el Mapa 2
    document.getElementById('continuar-btn').addEventListener('click', function () {
      pauseMapa2Audio();
      document.body.style.backgroundImage = "url('Mapa3.jpeg')";
      locacionesSegundoMapa.forEach(loc => loc.style.display = 'none');
      locacionesTercerMapa.forEach(loc => loc.style.display = 'block');

      document.getElementById('regresar-btn').style.display = 'block';
      document.getElementById('continuar-btn').style.display = 'none'; // Ocultar continuar en Mapa 2

      mapa3Audio.loop = true;
      mapa3Audio.play();
      wasMapa3Playing = true;
    });

    // Funcionalidad del botón regresar
    document.getElementById('regresar-btn').addEventListener('click', function () {
      if (document.body.style.backgroundImage.includes('Mapa5.png')) {
        document.body.style.backgroundImage = "url('Mapa.jpg')"; // Regresar al mapa principal desde Río Magdalena
        locacionesMapa5.forEach(loc => loc.style.display = 'none');
        locacionesPrimeroMapa.forEach(loc => loc.style.display = 'block');

        document.getElementById('regresar-btn').style.display = 'none';
        document.getElementById('continuar-btn').style.display = 'none';

        pauseMapa5Audio();
        resumeMapaAudio();
      } else if (document.body.style.backgroundImage.includes('Mapa4.jpeg')) {
        document.body.style.backgroundImage = "url('Mapa.jpg')"; // Regresar al mapa principal desde Hacienda
        locacionesMapa4.forEach(loc => loc.style.display = 'none');
        locacionesPrimeroMapa.forEach(loc => loc.style.display = 'block');

        document.getElementById('regresar-btn').style.display = 'none';
        document.getElementById('continuar-btn').style.display = 'none';

        pauseMapa4Audio();
        resumeMapaAudio();
      } else if (document.body.style.backgroundImage.includes('Mapa3.jpeg')) {
        document.body.style.backgroundImage = "url('Mapa2.jpg')";
        locacionesSegundoMapa.forEach(loc => loc.style.display = 'block');
        locacionesTercerMapa.forEach(loc => loc.style.display = 'none');

        document.getElementById('continuar-btn').style.display = 'block';
        document.getElementById('regresar-btn').style.display = 'block';

        pauseMapa3Audio();
        resumeMapa2Audio();
      } else {
        document.body.style.backgroundImage = "url('Mapa.jpg')";
        locacionesPrimeroMapa.forEach(loc => loc.style.display = 'block');
        locacionesSegundoMapa.forEach(loc => loc.style.display = 'none');

        document.getElementById('regresar-btn').style.display = 'none';
        document.getElementById('continuar-btn').style.display = 'none';

        pauseMapa2Audio();
        resumeMapaAudio();
      }
    });
  });
// Ocultar el contenido inicial y mostrar el primer contenedor
document.getElementById('continue-btn').addEventListener('click', function () {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('gabriel').style.display = 'none';
  document.querySelector('.text-box').style.display = 'none';
  document.getElementById('continue-btn').style.display = 'none';
  document.querySelector('.main-container').style.display = 'none';
  resumeMapaAudio(); // Reanudar el audio del mapa principal
});

// Funcionalidad del botón cerrar
document.getElementById('cerrar-btn').addEventListener('click', function () {
  document.getElementById('content-plaza').style.display = 'none';
  document.getElementById('overlay').style.backgroundColor = 'transparent';
  pausePlazaAudio();
  plazaAudio.currentTime = 0;

  if (document.body.style.backgroundImage.includes('Mapa2.jpg')) {
    resumeMapa2Audio();
  } else if (document.body.style.backgroundImage.includes('Mapa3.jpeg')) {
    resumeMapa3Audio();
  } else if (document.body.style.backgroundImage.includes('Mapa4.jpeg')) {
    resumeMapa4Audio();
  } else if (document.body.style.backgroundImage.includes('Mapa5.png')) {
    resumeMapa5Audio();
  } else {
    resumeMapaAudio();
  }
  toggleNavigationButtons(true); // Mostrar los botones al cerrar la locación
});

// Funcionalidad del botón ver carta
document.getElementById('ver-carta-btn').addEventListener('click', function () {
  if (!currentLocacionNombre) {
    console.error("No se ha seleccionado ninguna locación para mostrar la carta.");
    return;
  }

  fetch('locaciones.json')
    .then(response => response.json())
    .then(data => {
      const locacionData = data.locaciones.find(loc => loc.nombre === currentLocacionNombre);
      if (!locacionData || !locacionData.contenido.carta) {
        console.error("No se encontró la carta correspondiente para esta locación.");
        return;
      }

      const cartaContent = locacionData.contenido.carta;
      document.getElementById('carta-texto').textContent = cartaContent.texto;
      const carruselContainer = document.getElementById('carrusel-imagenes');
      carruselContainer.innerHTML = '';

      cartaContent.imagenes.forEach((imagenSrc, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = imagenSrc;
        imgElement.alt = `Imagen ${index + 1} de la carta`;
        imgElement.classList.add('carrusel-imagen');
        if (index === 0) {
          imgElement.classList.add('visible');
        }
        carruselContainer.appendChild(imgElement);
      });

      currentIndex = 0;
      updateCarrusel();

      document.getElementById('content-plaza').style.display = 'none';
      document.getElementById('carta-container').style.display = 'flex';

      cartaAudio.src = cartaContent.audio;
      cartaAudio.load();

      cartaAudio.addEventListener('play', function () {
        pausePlazaAudio();
        pauseMapa5Audio(); // Pausa el audio del Mapa 5 si corresponde
      });

      cartaAudio.addEventListener('pause', function () {
        resumePlazaAudio();
        if (document.body.style.backgroundImage.includes('Mapa5.png')) {
          resumeMapa5Audio();
        }
      });

      cartaAudio.addEventListener('ended', function () {
        resumePlazaAudio();
        if (document.body.style.backgroundImage.includes('Mapa5.png')) {
          resumeMapa5Audio();
        }
      });
    })
    .catch(error => {
      console.error("Error al cargar las locaciones:", error);
    });
});
// Funcionalidad del botón cerrar carta
document.getElementById('cerrar-carta-btn').addEventListener('click', function () {
  document.getElementById('carta-container').style.display = 'none'; // Ocultar la carta
  pauseCartaAudioAndResumePlaza();

  if (document.body.style.backgroundImage.includes('Mapa2.jpg')) {
    resumeMapa2Audio();
  } else if (document.body.style.backgroundImage.includes('Mapa3.jpeg')) {
    resumeMapa3Audio();
  } else if (document.body.style.backgroundImage.includes('Mapa4.jpeg')) {
    resumeMapa4Audio();
  } else if (document.body.style.backgroundImage.includes('Mapa5.png')) {
    resumeMapa5Audio();
  } else {
    resumeMapaAudio();
  }
  toggleNavigationButtons(true); // Mostrar los botones al cerrar la carta
});

// Funcionalidad del botón volver a la plaza
document.getElementById('back-to-plaza-btn').addEventListener('click', function () {
  document.getElementById('carta-container').style.display = 'none';
  document.getElementById('content-plaza').style.display = 'flex';
  pauseCartaAudioAndResumePlaza();
});

// Funcionalidad de los botones del carrusel
document.getElementById('next-btn').addEventListener('click', function () {
  changeImage(1);
});

document.getElementById('prev-btn').addEventListener('click', function () {
  changeImage(-1);
});

function changeImage(direction) {
  const images = document.querySelectorAll('.carrusel-imagen');
  images[currentIndex].classList.remove('visible');
  currentIndex = (currentIndex + direction + images.length) % images.length;
  images[currentIndex].classList.add('visible');
}

function updateCarrusel() {
  const images = document.querySelectorAll('.carrusel-imagen');
  images.forEach((img, index) => {
    img.classList.toggle('visible', index === currentIndex);
  });
}

// Controles de audio personalizados
const playPauseBtn = document.getElementById('play-pause-btn');
const backwardBtn = document.getElementById('backward-btn');
const forwardBtn = document.getElementById('forward-btn');
const progressBar = document.getElementById('progress-bar');
const audioTime = document.getElementById('audio-time');
const volumeBtn = document.getElementById('volume-btn');
const volumeSlider = document.getElementById('volume-slider');

playPauseBtn.addEventListener('click', function () {
  if (cartaAudio.paused) {
    cartaAudio.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    cartaAudio.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

cartaAudio.addEventListener('timeupdate', function () {
  const currentTime = cartaAudio.currentTime;
  const duration = cartaAudio.duration;
  progressBar.value = (currentTime / duration) * 100;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!isNaN(duration)) {
    audioTime.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  }
});
cartaAudio.addEventListener('loadedmetadata', function () {
  if (cartaAudio.duration) {
    const duration = cartaAudio.duration;
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    };

    audioTime.textContent = `00:00 / ${formatTime(duration)}`;
  }
});

progressBar.addEventListener('input', function () {
  cartaAudio.currentTime = (progressBar.value / 100) * cartaAudio.duration;
});

backwardBtn.addEventListener('click', function () {
  cartaAudio.currentTime = Math.max(0, cartaAudio.currentTime - 10);
});

forwardBtn.addEventListener('click', function () {
  cartaAudio.currentTime = Math.min(cartaAudio.duration, cartaAudio.currentTime + 10);
});

let volumeSliderVisible = false;

volumeBtn.addEventListener('click', function () {
  volumeSliderVisible = !volumeSliderVisible;
  volumeSlider.style.display = volumeSliderVisible ? 'block' : 'none';
});

document.addEventListener('click', function (event) {
  if (!volumeBtn.contains(event.target) && !volumeSlider.contains(event.target)) {
    volumeSlider.style.display = 'none';
    volumeSliderVisible = false;
  }
});

volumeSlider.addEventListener('input', function () {
  cartaAudio.volume = volumeSlider.value / 100;
});

// Ocultar botones de navegación al seleccionar una locación
document.querySelectorAll('.locacion-icon').forEach(icon => {
  icon.addEventListener('click', function () {
    toggleNavigationButtons(false); // Ocultar botones "Continuar" y "Regresar"

    // Mostrar el contenido de la locación
    const contentPlaza = document.getElementById('content-plaza');
    contentPlaza.style.display = 'flex';
  });
});

// Mostrar botones de navegación al cerrar locaciones o cartas
document.querySelectorAll('.cerrar-btn').forEach(button => {
  button.addEventListener('click', function () {
    const contentPlaza = document.getElementById('content-plaza');
    contentPlaza.style.display = 'none'; // Ocultar el contenedor de la locación

    // Mostrar botones si no hay carta abierta
    if (!isViewingCarta) {
      toggleNavigationButtons(true);
    }
  });
});

// Función para manejar la visibilidad de los botones de navegación
function toggleNavigationButtons(show) {
  const regresarBtn = document.getElementById('regresar-btn');
  const continuarBtn = document.getElementById('continuar-btn');

  if (document.body.style.backgroundImage.includes('Mapa.jpg') || document.body.style.backgroundImage.includes('Mapa2.jpg')) {
    regresarBtn.style.display = show ? 'block' : 'none';
    continuarBtn.style.display = show && document.body.style.backgroundImage.includes('Mapa2.jpg') ? 'block' : 'none';
  } else {
    regresarBtn.style.display = show ? 'block' : 'none';
    continuarBtn.style.display = 'none';
  }
}
// Estado para controlar si se está viendo una carta
let isViewingCarta = false;

// Ocultar botones al abrir una locación y mostrar su contenedor
document.querySelectorAll('.locacion-icon').forEach(icon => {
  icon.addEventListener('click', function () {
    toggleNavigationButtons(false); // Ocultar botones inmediatamente
    isViewingCarta = false; // Asegurar que no estamos viendo una carta
    const contentPlaza = document.getElementById('content-plaza');
    contentPlaza.style.display = 'flex'; // Mostrar el contenedor de la locación
  });
});

// Mantener botones ocultos al abrir una carta
document.getElementById('ver-carta-btn').addEventListener('click', function () {
  toggleNavigationButtons(false); // Mantener los botones ocultos
  isViewingCarta = true; // Ahora estamos viendo una carta
  document.getElementById('carta-container').style.display = 'flex';
});

// Mostrar botones al cerrar locación si no se está viendo una carta
document.querySelectorAll('.cerrar-btn').forEach(button => {
  button.addEventListener('click', function () {
    const contentPlaza = document.getElementById('content-plaza');
    contentPlaza.style.display = 'none'; // Ocultar el contenedor de la locación
    if (!isViewingCarta) {
      toggleNavigationButtons(true); // Mostrar los botones si no hay carta abierta
    }
  });
});

// Mostrar botones al cerrar una carta
document.getElementById('cerrar-carta-btn').addEventListener('click', function () {
  document.getElementById('carta-container').style.display = 'none'; // Ocultar la carta
  toggleNavigationButtons(true); // Mostrar los botones
});

// Animación de cambio de imágenes en el carrusel
function changeImage(direction) {
  const images = document.querySelectorAll('.carrusel-imagen');
  const currentIndex = Array.from(images).findIndex(img => img.classList.contains('visible'));

  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + direction + images.length) % images.length;

  // Animación de salida para la imagen actual
  images[currentIndex].classList.remove('visible');
  images[currentIndex].style.animation = direction > 0 ? 'slideOutLeft 0.5s ease' : 'slideOutRight 0.5s ease';

  // Animación de entrada para la nueva imagen
  setTimeout(() => {
    images[currentIndex].style.animation = '';
    images[nextIndex].classList.add('visible');
    images[nextIndex].style.animation = direction > 0 ? 'slideInRight 0.5s ease' : 'slideInLeft 0.5s ease';
  }, 500);
}

// Función para asegurar que botones estén ocultos correctamente en la página principal
function resetMainPageButtons() {
  document.getElementById('regresar-btn').style.display = 'none';
  document.getElementById('continuar-btn').style.display = 'none';
}

// Llamada a la función en cada inicio para asegurar el estado inicial
document.addEventListener('DOMContentLoaded', resetMainPageButtons);
// Lógica para el Mapa 5
function handleMapa5Navigation() {
  document.body.style.backgroundImage = "url('Mapa5.png')"; // Cambiar el fondo al Mapa 5
  locacionesMapa4.forEach(loc => loc.style.display = 'none'); // Ocultar las locaciones del mapa 4
  locacionesMapa5.forEach(loc => loc.style.display = 'block'); // Mostrar locaciones del mapa 5

  document.getElementById('continuar-btn').style.display = 'none'; // Ocultar botón continuar
  document.getElementById('regresar-btn').style.display = 'block'; // Mostrar botón regresar

  pauseMapa4Audio();
  mapa5Audio.loop = true;
  mapa5Audio.play();
  wasMapa5Playing = true;
}

// Lógica para regresar del Mapa 5
function handleReturnFromMapa5() {
  document.body.style.backgroundImage = "url('Mapa.jpg')"; // Cambiar el fondo al mapa principal
  locacionesMapa5.forEach(loc => loc.style.display = 'none'); // Ocultar locaciones del mapa 5
  locacionesPrimeroMapa.forEach(loc => loc.style.display = 'block'); // Mostrar locaciones del mapa principal

  document.getElementById('continuar-btn').style.display = 'none'; // Ocultar continuar
  document.getElementById('regresar-btn').style.display = 'none'; // Ocultar regresar

  pauseMapa5Audio();
  resumeMapaAudio();
}

// Animación de Fade-In al cargar locaciones
document.querySelectorAll('.locacion-icon').forEach(icon => {
  icon.classList.add('fade-in');
});

// Listener para transiciones suaves al cambiar de mapa
document.addEventListener('DOMContentLoaded', function () {
  document.body.style.transition = 'background-image 0.5s ease';
});

// Ajuste para asegurar la correcta visibilidad del botón en "Ciudad Bolívar"
function ensureCorrectButtons() {
  if (document.body.style.backgroundImage.includes('Mapa.jpg')) {
    document.getElementById('continuar-btn').style.display = 'block';
  } else {
    document.getElementById('continuar-btn').style.display = 'none';
  }
}

// Asegurar los botones correctos en cada carga de la página
document.addEventListener('DOMContentLoaded', ensureCorrectButtons);
// Función para ocultar el audio del mapa principal al cambiar a otros mapas
function handleMapaTransition(newMapa, locacionesToShow, locacionesToHide, pauseAudioFunction, playAudioFunction) {
  document.body.style.backgroundImage = `url('${newMapa}')`; // Cambiar el fondo al nuevo mapa
  locacionesToHide.forEach(loc => loc.style.display = 'none'); // Ocultar locaciones previas
  locacionesToShow.forEach(loc => loc.style.display = 'block'); // Mostrar locaciones nuevas

  pauseAudioFunction();
  playAudioFunction();
}

// Inicializar la página asegurando que el audio del mapa principal comience
document.addEventListener('DOMContentLoaded', function () {
  mapaAudio.loop = true;
  mapaAudio.play();
});

// Función para ajustar los controles de audio y navegación en cada cambio de locación
function adjustControlsOnLocationChange(mapName, locacionesToHide, locacionesToShow, pauseAudioFunction, playAudioFunction) {
  pauseAudioFunction();
  document.body.style.backgroundImage = `url('${mapName}')`;

  locacionesToHide.forEach(loc => loc.style.display = 'none');
  locacionesToShow.forEach(loc => loc.style.display = 'block');

  playAudioFunction();
}

// Evento global para evitar errores de controles desincronizados
window.addEventListener('unload', function () {
  pauseMapaAudio();
  pauseMapa2Audio();
  pauseMapa3Audio();
  pauseMapa4Audio();
  pauseMapa5Audio();
});
