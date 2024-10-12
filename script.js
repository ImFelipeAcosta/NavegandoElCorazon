// Variable global para almacenar el nombre de la locación actual
let currentLocacionNombre = null;

// Variables globales para manejar los audios
const plazaAudio = document.getElementById('plaza-audio');
const cartaAudio = document.getElementById('carta-audio');
const mapa2Audio = new Audio('Mapa2.mp3'); // Audio de fondo para el mapa 2

// Variables para manejar el estado de reproducción de los audios
let wasPlazaAudioPlaying = false;
let wasMapa2Playing = false; // El mapa2Audio inicialmente no está sonando

// Función para pausar el audio del mapa2
function pauseMapa2Audio() {
  wasMapa2Playing = !mapa2Audio.paused;
  mapa2Audio.pause();
}

// Función para reanudar el audio del mapa2 si estaba sonando
function resumeMapa2Audio() {
  if (wasMapa2Playing) {
    mapa2Audio.play();
  }
}

// Función para pausar el audio de la locación
function pausePlazaAudio() {
  wasPlazaAudioPlaying = !plazaAudio.paused;
  plazaAudio.pause();
}

// Función para reanudar el audio de la locación si estaba sonando
function resumePlazaAudio() {
  if (wasPlazaAudioPlaying) {
    plazaAudio.play();
  }
}

// Función para pausar el audio de la carta y reanudar la locación
function pauseCartaAudioAndResumePlaza() {
    cartaAudio.pause();
    cartaAudio.currentTime = 0;
    resumePlazaAudio();
}

// Asegúrate de ocultar el contenedor al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('content-plaza').style.display = 'none'; // Ocultar el contenedor al inicio
});

// Función para cargar las locaciones desde el archivo JSON
fetch('locaciones.json')
  .then(response => response.json())
  .then(data => {
    const locacionesContainer = document.getElementById('locaciones-container');
    let locacionesPrimeroMapa = [];  // Almacena las locaciones del primer mapa
    let locacionesSegundoMapa = [];  // Almacena las locaciones del segundo mapa

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
        locacionWrapper.style.display = 'none';  // Inicialmente ocultar locaciones del segundo mapa
      }

      locacionIcon.addEventListener('click', function() {
        if (locacion.mapa === 1) {
          document.body.style.backgroundImage = "url('Mapa2.jpg')";
          locacionesPrimeroMapa.forEach(loc => loc.style.display = 'none');
          locacionesSegundoMapa.forEach(loc => loc.style.display = 'block');
          
          document.getElementById('regresar-btn').style.display = 'block';
          mapa2Audio.loop = true;
          mapa2Audio.play();
          wasMapa2Playing = true;
        } else {
          currentLocacionNombre = locacion.nombre;
          document.getElementById('content-plaza').style.display = 'flex'; // Se muestra el contenedor aquí al hacer clic
          document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          document.getElementById('plaza-text').textContent = locacion.contenido.texto;
          document.getElementById('gabriel2').src = locacion.contenido.imagen;
          plazaAudio.src = locacion.contenido.audio;

          pauseMapa2Audio(); // Pausar el audio del mapa2 al abrir la locación
          plazaAudio.play();
        }
      });

      locacionIcon.addEventListener('mouseover', function() {
        tooltip.style.visibility = 'visible';
      });

      locacionIcon.addEventListener('mouseout', function() {
        tooltip.style.visibility = 'hidden';
      });
    });

    document.getElementById('regresar-btn').addEventListener('click', function() {
      document.body.style.backgroundImage = "url('Mapa.jpg')";
      locacionesPrimeroMapa.forEach(loc => loc.style.display = 'block');
      locacionesSegundoMapa.forEach(loc => loc.style.display = 'none');
      
      document.getElementById('regresar-btn').style.display = 'none';
      pauseMapa2Audio();
      mapa2Audio.currentTime = 0;
    });
  });

// Ocultar el contenido inicial y mostrar el primer contenedor
document.getElementById('continue-btn').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('gabriel').style.display = 'none';
  document.querySelector('.text-box').style.display = 'none';
  document.getElementById('continue-btn').style.display = 'none';
  document.querySelector('.main-container').style.display = 'none';
});

document.getElementById('cerrar-btn').addEventListener('click', function() {
  document.getElementById('content-plaza').style.display = 'none';
  document.getElementById('overlay').style.backgroundColor = 'transparent';
  pausePlazaAudio(); 
  plazaAudio.currentTime = 0;  

  resumeMapa2Audio();
});

document.getElementById('ver-carta-btn').addEventListener('click', function() {
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
      });

      cartaAudio.addEventListener('pause', function () {
          resumePlazaAudio();
      });

      cartaAudio.addEventListener('ended', function () {
          resumePlazaAudio();
      });
    })
    .catch(error => {
      console.error("Error al cargar las locaciones:", error);
    });
});

document.getElementById('cerrar-carta-btn').addEventListener('click', function() {
  document.getElementById('carta-container').style.display = 'none';
  pauseCartaAudioAndResumePlaza();

  pausePlazaAudio();
  resumeMapa2Audio();
});

document.getElementById('back-to-plaza-btn').addEventListener('click', function() {
  document.getElementById('carta-container').style.display = 'none';
  document.getElementById('content-plaza').style.display = 'flex';
  pauseCartaAudioAndResumePlaza();
});

document.getElementById('next-btn').addEventListener('click', function() {
  changeImage(1);
});

document.getElementById('prev-btn').addEventListener('click', function() {
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

document.addEventListener('click', function(event) {
  if (!volumeBtn.contains(event.target) && !volumeSlider.contains(event.target)) {
    volumeSlider.style.display = 'none';
    volumeSliderVisible = false;
  }
});

volumeSlider.addEventListener('input', function () {
    cartaAudio.volume = volumeSlider.value / 100;
});
