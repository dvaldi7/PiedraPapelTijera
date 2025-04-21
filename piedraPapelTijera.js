// opciones que pueden elegir el jugador y la máquina
const opcionesJuego = ["piedra", "papel", "tijera"];

// Daniel Valdivieso-M. //

// elementos del HTML 
const cajaNombreJugador = document.getElementsByName("nombre")[0];
const cajaNumeroPartidas = document.getElementsByName("partidas")[0];
const botonesPagina = document.getElementsByTagName("button");
const botonJugar = botonesPagina[0];
const zonaOpcionesJugador = document.getElementById("jugador");
const imagenesOpcionesJugador = zonaOpcionesJugador.getElementsByTagName("img");
const botonYa = botonesPagina[1];
const zonaOpcionMaquina = document.getElementById("maquina");
const imagenOpcionMaquina = zonaOpcionMaquina.getElementsByTagName("img")[0];
const textoPartidaActual = document.getElementById("actual");
const textoTotalPartidas = document.getElementById("total");
const listaHistorial = document.getElementById("historial");
const botonReset = botonesPagina[2];

// información del juego
let nombreDelJugador = "";
let numeroDePartidas = 0;
let partidasQueSeHanJugado = 0;
let opcionElegidaPorJugador = null;
let juegoListoParaEmpezar = false;

// poner el fondo rojo si hay un error
function mostrarError(elemento) {
    elemento.classList.add("fondoRojo");
}

// quitar el fondo rojo si ya está bien
function ocultarError(elemento) {
    elemento.classList.remove("fondoRojo");
}

// Función para ver si el nombre del jugador es válido
function elNombreEsBueno(nombre) {
    if (nombre.length > 3 && isNaN(parseInt(nombre.charAt(0)))) {
        return true;
    } else {
        return false;
    }
}

// Función para ver si el número de partidas es válido
function elNumeroDePartidasEsBueno(partidas) {
    if (parseInt(partidas) > 0) {
        return true;
    } else {
        return false;
    }
}


botonJugar.addEventListener('click', () => {
    nombreDelJugador = cajaNombreJugador.value.trim();
    numeroDePartidas = cajaNumeroPartidas.value;
    let nombreValido = elNombreEsBueno(nombreDelJugador);
    let partidasValidas = elNumeroDePartidasEsBueno(numeroDePartidas);

    // Quitamos cualquier error que hubiera antes
    ocultarError(cajaNombreJugador);
    ocultarError(cajaNumeroPartidas);


    if (!nombreValido) {
        mostrarError(cajaNombreJugador);
        juegoListoParaEmpezar = false;
        return;
    }

    // Miramos si el número de partidas no es bueno
    if (!partidasValidas) {
        mostrarError(cajaNumeroPartidas);
        juegoListoParaEmpezar = false;
        return;
    }

    // Si el nombre y las partidas son correctos, empezamos!
    cajaNombreJugador.disabled = true;
    cajaNumeroPartidas.disabled = true;
    textoTotalPartidas.textContent = numeroDePartidas;
    partidasQueSeHanJugado = 0;
    textoPartidaActual.textContent = partidasQueSeHanJugado;
    juegoListoParaEmpezar = true;

    // imágenes de las manos a elegir (piedra, papel o tijera)
    for (let i = 0; i < imagenesOpcionesJugador.length; i++) {
        const imagen = imagenesOpcionesJugador[i];
        if (i < opcionesJuego.length) {
            imagen.src = `img/${opcionesJuego[i]}Jugador.png`;
            imagen.addEventListener('click', () => {
                // Quitamos la selección de todas las imágenes del jugador
                for (let j = 0; j < imagenesOpcionesJugador.length; j++) {
                    imagenesOpcionesJugador[j].classList.remove("seleccionado");
                    imagenesOpcionesJugador[j].classList.add("noSeleccionado");
                }
                // Marcamos como seleccionada la imagen que clicó el jugador
                imagen.classList.remove("noSeleccionado");
                imagen.classList.add("seleccionado");
                opcionElegidaPorJugador = opcionesJuego[i];
            });
        } else {
            imagen.style.display = 'none';
        }
        // la primera opción por defecto al empezar
        if (i === 0 && opcionesJuego.length > 0) {
            imagen.classList.remove("noSeleccionado");
            imagen.classList.add("seleccionado");
            opcionElegidaPorJugador = opcionesJuego[0];
        } else if (i > 0 && opcionesJuego.length > 0) {
            imagen.classList.add("noSeleccionado");
        }
    }
});


botonYa.addEventListener('click', () => {
    if (!juegoListoParaEmpezar) {
        alert("¡Tienes que escribir tu nombre y cuántas partidas quieres jugar!");
        return;
    }

    if (nombreDelJugador && numeroDePartidas > 0 && partidasQueSeHanJugado < numeroDePartidas && opcionElegidaPorJugador) {
        // La máquina elige una opción al azar
        const numeroAleatorio = Math.floor(Math.random() * opcionesJuego.length);
        const opcionElegidaPorMaquina = opcionesJuego[numeroAleatorio];
        imagenOpcionMaquina.src = `img/${opcionElegidaPorMaquina}Ordenador.png`;

        partidasQueSeHanJugado++;
        textoPartidaActual.textContent = partidasQueSeHanJugado;

        let resultadoDeLaPartida = "";
        if (opcionElegidaPorJugador === opcionElegidaPorMaquina) {
            resultadoDeLaPartida = "Empate";
        } else if (
            (opcionesJuego.indexOf(opcionElegidaPorJugador) === 0 && opcionesJuego.indexOf(opcionElegidaPorMaquina) === opcionesJuego.length - 1) ||
            (opcionesJuego.indexOf(opcionElegidaPorJugador) > 0 && opcionesJuego.indexOf(opcionElegidaPorJugador) - 1 === opcionesJuego.indexOf(opcionElegidaPorMaquina))
        ) {
            resultadoDeLaPartida = `Gana ${nombreDelJugador}`;
        } else {
            resultadoDeLaPartida = "Gana la máquina";
        }

        // Poner el resultado en el historial de partidas
        const elementoHistorial = document.createElement('li');
        elementoHistorial.textContent = resultadoDeLaPartida;
        listaHistorial.appendChild(elementoHistorial);

        // desactivar el botón de ya si se han jugado todas las partidas
        if (partidasQueSeHanJugado === parseInt(numeroDePartidas)) {
            botonYa.disabled = true;
        }
    } else if (!nombreDelJugador || numeroDePartidas <= 0) {
        alert(" Escribe tu nombre y cuántas veces quieres jugar.");
    } else if (partidasQueSeHanJugado >= numeroDePartidas) {
        alert("¡No quedan partidas! Please, Insert coin... (y vuelve a darle al botón)");
    } else if (!opcionElegidaPorJugador) {
        alert("¡Elige una opción para jugar!");
    }
});

// RESET
botonReset.addEventListener('click', () => {
    // Añadimos un texto al historial "nueva partida"
    const textoNuevaPartida = document.createElement('li');
    textoNuevaPartida.textContent = "Nueva partida";
    listaHistorial.appendChild(textoNuevaPartida);

    /* Volvemos a activar las cajas de texto
        y reiniciamos al estado inicial*/
    cajaNombreJugador.disabled = false;
    cajaNumeroPartidas.disabled = false;
    cajaNumeroPartidas.value = "0";
    textoTotalPartidas.textContent = "0";
    textoPartidaActual.textContent = "0";
    imagenOpcionMaquina.src = "img/defecto.png";
    nombreDelJugador = "";
    numeroDePartidas = 0;
    partidasQueSeHanJugado = 0;
    opcionElegidaPorJugador = null;
    botonYa.disabled = false;
    juegoListoParaEmpezar = false;

    // Quitamos los "listeners" viejos de las imágenes del jugador
    for (let i = 0; i < imagenesOpcionesJugador.length; i++) {
        const imagen = imagenesOpcionesJugador[i];
        const nuevaImagen = imagen.cloneNode(true);
        imagen.parentNode.replaceChild(nuevaImagen, imagen);
    }

    // Volvemos a poner las imágenes del jugador
    const imagenesDeJugadorAhora = zonaOpcionesJugador.getElementsByTagName("img");
    for (let i = 0; i < imagenesDeJugadorAhora.length; i++) {
        const imagen = imagenesDeJugadorAhora[i];
        if (i < opcionesJuego.length) {
            imagen.src = `img/${opcionesJuego[i]}Jugador.png`;
            imagen.addEventListener('click', () => {
                // Quitamos la selección de todas
                for (let j = 0; j < imagenesDeJugadorAhora.length; j++) {
                    imagenesDeJugadorAhora[j].classList.remove("seleccionado");
                    imagenesDeJugadorAhora[j].classList.add("noSeleccionado");
                }
                // Marcamos la que clickamos
                imagen.classList.remove("noSeleccionado");
                imagen.classList.add("seleccionado");
                opcionElegidaPorJugador = opcionesJuego[i];
            });
            // Seleccionamos la primera por defecto después del reset
            if (i === 0 && opcionesJuego.length > 0) {
                imagen.classList.remove("noSeleccionado");
                imagen.classList.add("seleccionado");
                opcionElegidaPorJugador = opcionesJuego[0];
            } else if (i > 0 && opcionesJuego.length > 0) {
                imagen.classList.add("noSeleccionado");
            }
        } else {
            imagen.style.display = 'none';
        }
    }

    // Volvemos a activar el botón de JUGAR
    botonJugar.addEventListener('click', iniciarJuego);
});

// Ponemos las imágenes del jugador al cargar la página
for (let i = 0; i < imagenesOpcionesJugador.length; i++) {
    const imagen = imagenesOpcionesJugador[i];
    if (i < opcionesJuego.length) {
        imagen.src = `img/${opcionesJuego[i]}Jugador.png`;
        imagen.addEventListener('click', () => {
            // Quitamos la selección de todas
            for (let j = 0; j < imagenesOpcionesJugador.length; j++) {
                imagenesOpcionesJugador[j].classList.remove("seleccionado");
                imagenesOpcionesJugador[j].classList.add("noSeleccionado");
            }
            // Marcamos la que clickamos
            imagen.classList.remove("noSeleccionado");
            imagen.classList.add("seleccionado");
            opcionElegidaPorJugador = opcionesJuego[i];
        });
        // Seleccionamos la primera por defecto al cargar
        if (i === 0 && opcionesJuego.length > 0) {
            imagen.classList.remove("noSeleccionado");
            imagen.classList.add("seleccionado");
            opcionElegidaPorJugador = opcionesJuego[0];
        } else if (i > 0 && opcionesJuego.length > 0) {
            imagen.classList.add("noSeleccionado");
        }
    } else {
        imagen.style.display = 'none';
    }
}

// Función iniciarJuego 
function iniciarJuego() {
    nombreDelJugador = cajaNombreJugador.value.trim();
    numeroDePartidas = cajaNumeroPartidas.value;
    let nombreValido = elNombreEsBueno(nombreDelJugador);
    let partidasValidas = elNumeroDePartidasEsBueno(numeroDePartidas);

    ocultarError(cajaNombreJugador);
    ocultarError(cajaNumeroPartidas);

    if (!nombreValido) {
        mostrarError(cajaNombreJugador);
        juegoListoParaEmpezar = false;
        return;
    }

    if (!partidasValidas) {
        mostrarError(cajaNumeroPartidas);
        juegoListoParaEmpezar = false;
        return;
    }

    cajaNombreJugador.disabled = true;
    cajaNumeroPartidas.disabled = true;
    textoTotalPartidas.textContent = numeroDePartidas;
    partidasQueSeHanJugado = 0;
    textoPartidaActual.textContent = partidasQueSeHanJugado;
    juegoListoParaEmpezar = true;

    for (let i = 0; i < imagenesOpcionesJugador.length; i++) {
        const imagen = imagenesOpcionesJugador[i];
        if (i < opcionesJuego.length) {
            imagen.src = `img/${opcionesJuego[i]}Jugador.png`;
            imagen.addEventListener('click', () => {
                for (let j = 0; j < imagenesOpcionesJugador.length; j++) {
                    imagenesOpcionesJugador[j].classList.remove("seleccionado");
                    imagenesOpcionesJugador[j].classList.add("noSeleccionado");
                }
                imagen.classList.remove("noSeleccionado");
                imagen.classList.add("seleccionado");
                opcionElegidaPorJugador = opcionesJuego[i];
            });
        } else {
            imagen.style.display = 'none';
        }
        if (i === 0 && opcionesJuego.length > 0) {
            imagen.classList.remove("noSeleccionado");
            imagen.classList.add("seleccionado");
            opcionElegidaPorJugador = opcionesJuego[0];
        } else if (i > 0 && opcionesJuego.length > 0) {
            imagen.classList.add("noSeleccionado");
        }
    }
}