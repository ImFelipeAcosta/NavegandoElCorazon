// Variable global para almacenar el nombre de la locación actual
let currentLocacionNombre = null;

// Función para cargar las locaciones desde el archivo JSON
fetch('locaciones.json')
  .then(response => response.json())
  .then(data => {
    const locacionesContainer = document.getElementById('locaciones-container');
    let locacionesPrimeroMapa = [];  // Almacena las locaciones del primer mapa
    let locacionesSegundoMapa = [];  // Almacena las locaciones del segundo mapa
    const plazaAudio = document.getElementById('plaza-audio');

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

      // Añadir el contenedor de la locación al DOM
      locacionesContainer.appendChild(locacionWrapper);

      // Almacenar locaciones según el mapa al que pertenecen
      if (locacion.mapa === 1) {
        locacionesPrimeroMapa.push(locacionWrapper);
      } else if (locacion.mapa === 2) {
        locacionesSegundoMapa.push(locacionWrapper);
        locacionWrapper.style.display = 'none';  // Ocultar locaciones del segundo mapa inicialmente
      }

      // Evento para cambiar a Mapa2.jpg cuando se haga clic en una locación del primer mapa
      if (locacion.mapa === 1) {
        locacionIcon.addEventListener('click', function() {
          // Cambiar fondo a Mapa2.jpg
          document.body.style.backgroundImage = "url('Mapa2.jpg')";

          // Ocultar las locaciones del primer mapa
          locacionesPrimeroMapa.forEach(locacion => locacion.style.display = 'none');

          // Mostrar las locaciones del segundo mapa
          locacionesSegundoMapa.forEach(locacion => locacion.style.display = 'block');
        });
      }

      // Mostrar el contenido dinámico al hacer clic en las locaciones del segundo mapa
      if (locacion.mapa === 2) {
        locacionIcon.addEventListener('click', function() {
          const locacionContent = locacion.contenido;

          // Actualizar la variable global con el nombre de la locación actual
          currentLocacionNombre = locacion.nombre;

          document.getElementById('content-plaza').style.display = 'flex';
          document.getElementById('overlay').style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Aplica opacidad
          document.getElementById('plaza-text').textContent = locacionContent.texto;
          document.getElementById('gabriel2').src = locacionContent.imagen;

          // Reproducir el audio de la locación
          plazaAudio.src = locacionContent.audio; // Asignar el audio desde el JSON
          plazaAudio.play(); // Iniciar la reproducción del audio
        });
      }

      // Mostrar tooltip al pasar el mouse sobre las locaciones
      locacionIcon.addEventListener('mouseover', function() {
        tooltip.style.visibility = 'visible';
      });

      // Ocultar tooltip cuando se quita el mouse
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
  document.querySelector('.main-container').style.display = 'none'; // Oculta el contenedor principal
});

// Evento para cerrar el contenido de la locación
document.getElementById('cerrar-btn').addEventListener('click', function() {
  document.getElementById('content-plaza').style.display = 'none';
  document.getElementById('overlay').style.backgroundColor = 'transparent'; // Quitar opacidad al cerrar
  const plazaAudio = document.getElementById('plaza-audio');
  plazaAudio.pause(); // Detener el audio cuando se cierre el contenido
  plazaAudio.currentTime = 0; // Reiniciar el audio para que empiece desde el inicio la próxima vez

  // Reiniciar la variable de la locación actual
  currentLocacionNombre = null;
});

// Evento para mostrar la carta
document.getElementById('ver-carta-btn').addEventListener('click', function () {
  fetch('locaciones.json')
    .then(response => response.json())
    .then(data => {
      // Obtener la locación actual
      const locacionData = data.locaciones.find(loc => loc.nombre === currentLocacionNombre);

      if (!locacionData) return;

      const cartaContent = locacionData.contenido.carta;

      // Actualizar los elementos del nuevo contenedor con los datos de la carta
      document.getElementById('carta-texto').textContent = cartaContent.texto;
      document.getElementById('carta-imagen').src = cartaContent.imagen;
      document.getElementById('carta-audio').src = cartaContent.audio;

      // Ocultar el contenedor actual y mostrar el nuevo contenedor
      document.getElementById('content-plaza').style.display = 'none';
      document.getElementById('carta-container').style.display = 'flex';

      // Pausar el audio de la locación
      const plazaAudio = document.getElementById('plaza-audio');
      plazaAudio.pause();
      plazaAudio.currentTime = 0;

      // **No reproducir el audio de la carta automáticamente**
      // const cartaAudio = document.getElementById('carta-audio');
      // cartaAudio.play();
    });
});

// Evento para volver al contenedor anterior desde la carta
document.getElementById('volver-btn').addEventListener('click', function () {
  document.getElementById('carta-container').style.display = 'none';  // Ocultar carta
  document.getElementById('content-plaza').style.display = 'flex';  // Mostrar la locación nuevamente

  // Pausar el audio de la carta
  const cartaAudio = document.getElementById('carta-audio');
  cartaAudio.pause();
  cartaAudio.currentTime = 0;

  // Reanudar el audio de la locación
  const plazaAudio = document.getElementById('plaza-audio');
  plazaAudio.play();
});

// Evento para cerrar el contenedor de la carta y volver al mapa
document.getElementById('cerrar-carta-btn').addEventListener('click', function () {
  document.getElementById('carta-container').style.display = 'none';  // Ocultar carta

  // Pausar el audio de la carta
  const cartaAudio = document.getElementById('carta-audio');
  cartaAudio.pause();
  cartaAudio.currentTime = 0;

  // Ocultar el overlay y regresar al mapa
  document.getElementById('overlay').style.backgroundColor = 'transparent';

  // Ocultar el contenido de la locación
  document.getElementById('content-plaza').style.display = 'none';

  // Reiniciar la variable de la locación actual
  currentLocacionNombre = null;
});
