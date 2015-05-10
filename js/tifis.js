var tablero;

var teclas = { // Valores por defecto para las flechas del teclado.
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

var fondo = { // JSON: Notación de Objetos en Javascript
	imagenURL: "img/fondo.png",
	imagenOK: false
};

// Notación de Objetos en Javascript: JSON

var tifis = {
	x: 100,
	y: 100,
	frenteURL: "img/diana-frente.png", // Nombre del archivo que declara a Diana de Frente
	frenteOK: false, // Si la imagen ya cargó o no.
	atrasURL: "img/diana-atras.png",
	atrasOK: false,
	izqURL: "img/diana-izq.png",
	izqOK: false,
	derURL: "img/diana-der.png",
	derOK: false,
	velocidad: 50 // Cantidad de pixeles que se va a mover Diana al oprimir las fechas del teclado.
};

var liz = {
	x: 400,
	y: 400,
	imgURL: "img/liz.png",
	imgOK: false
};

function inicio() {
	var canvas = document.getElementById("campo");
	tablero = canvas.getContext("2d");
	console.log(fondo.imagenURL);
	fondo.imagen = new Image(); // Se crea un objeto de tipo Imagen.
	console.log(fondo);
	console.log(fondo.imagen);
	fondo.imagen.src = fondo.imagenURL; // Se agrega la foto fondo.png
	fondo.imagen.onload = confirmarFondo; // Cuando se cargue la imagen dispara la función confirmarFondo()

	tifis.frente = new Image(); // Se crea un objeto de tipo Imagen.
	tifis.frente.src = tifis.frenteURL; // Se agrega la foto diana-frente.png.
	tifis.frente.onload = confirmarFrente; // Cuando se cargue la imagen dispara la función confirmarFrente()

	tifis.atras = new Image();
	tifis.atras.src = tifis.atrasURL;
	tifis.atras.onload = confirmarAtras;

	tifis.izquierda = new Image();
	tifis.izquierda.src = tifis.izqURL;
	tifis.izquierda.onload = confirmarIzquierda;

	tifis.derecha = new Image();
	tifis.derecha.src = tifis.derURL;
	tifis.derecha.onload = confirmarDerecha;

	/*
	var m = document.getElementById("mover");
	m.addEventListener("click", movimiento);
	*/
	
	liz.imagen = new Image();
	liz.imagen.src = liz.imgURL;
	liz.imagen.onload = confirmarLiz;

	console.log("Todos");

	document.addEventListener("keydown", teclado);
}

/*
function dibujar() {
	tablero.drawImage(fondo.imagen, 0, 0); // Dibuja la imagen.
}
*/

function confirmarFondo() {
	fondo.imagenOK = true;
	dibujar();
}

function confirmarFrente() {
	tifis.frenteOK = true;
	dibujar();
}

function confirmarAtras() {
	tifis.atrasOK = true;
	console.log("Dibuja");
	dibujar();
}

function confirmarIzquierda() {
	tifis.izqOK = true;
	dibujar();
}

function confirmarDerecha() {
	tifis.derOK = true;
	dibujar();
}

function confirmarLiz() {
	liz.imgOK = true;
	dibujar(); // Se coloca para que dibuje el fondo, tifis de frente y a liz sin necesidad de oprimir una tecla.
}

function dibujar(direccion) {
	// El orden define la forma en cómo será dibujado cada elemento de forma lineal.
	// Capa 1: Fondo
	if(fondo.imagenOK == true) 
		tablero.drawImage(fondo.imagen, 0, 0); // Dibuja la imagen en la posición (0,0)

	// Capa 2: Tifis
	var tifisOrientada = tifis.frente;

	if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK) {
		if(direccion == teclas.DOWN)
			tifisOrientada = tifis.frente;
		if(direccion == teclas.UP)
			tifisOrientada = tifis.atras;
		if(direccion == teclas.LEFT)
			tifisOrientada = tifis.izquierda;
		if(direccion == teclas.RIGHT)
			tifisOrientada = tifis.derecha;
	}
	tablero.drawImage(tifisOrientada, tifis.x, tifis.y); // Dibuja la imagen.

	// Capa 3: Liz
	if(liz.imgOK) // Como este valor es booleano, no es necesario el == true ya que el if hace la validación.
		tablero.drawImage(liz.imagen, liz.x, liz.y);

	posicion.innerText = "(X, Y): (" + tifis.x + " , " + tifis.y + ")";
}

/*
function movimiento(){
	tifis.x += 10;
	dibujar();
}
*/

function teclado(evento) { // ¿Qué tecla fue la que se oprimió?
	var codigo_tecla = evento.keyCode;
	if(codigo_tecla == teclas.UP) {
		tifis.y -= tifis.velocidad;
		if(tifis.y < 0) // Define el extremo del tablero hacia arriba.
			tifis.y = 0;
		bloquearArr();
	}
		
	if(codigo_tecla == teclas.DOWN) {
		tifis.y += tifis.velocidad;
		if(tifis.y >= 450) // Define el extremo del tablero hacia abajo.
			tifis.y = 450;
		bloquearAbj();
	}
		
	if(codigo_tecla == teclas.RIGHT) {
		tifis.x += tifis.velocidad;
		if(tifis.x >= 450) // Define el extremo del tablero hacia la derecha.
			tifis.x = 450;
		bloquearDer();
	}

	if(codigo_tecla == teclas.LEFT) {
		tifis.x -= tifis.velocidad;
		if(tifis.x < 0) // Define el extremo del tablero hacia la izquierda.
			tifis.x = 0;
		bloquearIzq();
	}

	dibujar(codigo_tecla);
}

function bloquearDer() {
	// Bloquear primer obstaculo al moverse a la derecha.
	if(tifis.x > 150 && tifis.x < 250 && tifis.y < 250) {
		tifis.x = 150;
		tifis.y;
	}
	// Bloquear tercer obstaculo al moverse a la derecha.
	if(tifis.y > 300 && tifis.y < 400) {
		tifis.x = 100;
		tifis.y;
	}
}

function bloquearIzq() {
	// Bloquear primer obstaculo al moverse a la izquierda.
	if(tifis.x > 150 && tifis.x < 250 && tifis.y < 250) {
		tifis.x = 250;
		tifis.y;
	}
	// Bloquear segundo obstaculo al moverse a la izquierda.
	if(tifis.x < 150 && tifis.y > 150 && tifis.y < 250) {
		tifis.x = 150;
		tifis.y;
	}
}

function bloquearArr() {
	// Bloquear primer obstaculo al moverse hacia arriba.
	if(tifis.x > 150 && tifis.x < 250 && tifis.y > 150 && tifis.y < 250) {
		tifis.x;
		tifis.y = 250;
	}
	// Bloquear segundo obstaculo al moverse hacia arriba.
	if(tifis.y > 150 && tifis.y < 250 && tifis.x < 150) {
		tifis.x;
		tifis.y = 250;
	}
	// Bloquear tercer obstaculo al moverse hacia arriba.
	if(tifis.x > 100 && tifis.y > 300 && tifis.y < 400) {
		tifis.x;
		tifis.y = 400;
	}
}

function bloquearAbj() {
	// Bloquear segundo obstaculo al moverse hacia arriba.
	if(tifis.x < 150 && tifis.y > 150 && tifis.y < 250) {
		tifis.x;
		tifis.y = 150;
	}
	// Bloquear tercer obstaculo al moverse hacia abajo.
	if(tifis.x > 100 && tifis.y > 300 && tifis.y < 400) {
		tifis.x;
		tifis.y = 300;
	}
}