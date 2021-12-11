console.clear();
var fs = require('fs');

console.log("------------------------------------------");


const matrice = [];
var lampeggi = 0;


function carica(x, y) {

	// Se sono fuori dalla matrice
	if (x < 0 || y < 0 || x > 9 || y > 9 ) return;

	// Se ha appena lampeggiato non faccio nulla
	if (matrice[x][y] == "lamp") {
		return;
	} else {
		matrice[x][y] = (matrice[x][y] + 1) % 10;
		if (matrice[x][y] == 0) lampeggia(x, y);
    }
	
}


function lampeggia(x, y) {
	lampeggi++;

	// Imposto un placeholder
	matrice[x][y] = "lamp";

	// Devo caricare tutte le caselle adiacenti
	carica(x-1, y-1);
	carica(x, y-1);
	carica(x+1, y-1);

	carica(x-1, y);
	carica(x+1, y);
	
	carica(x-1, y+1);
	carica(x, y+1);
	carica(x+1, y+1);
}


fs.readFile('input.txt', 'utf8', function(err, data) {
//fs.readFile('demo.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);

	// Converto l'input in una matrice di interi
	lines.forEach(linea => {
		matrice.push(Array.from(linea).map(Number));
	});

	console.table(matrice);

	var oldLampeggi = 0, newLampeggi = 0;

	for (let passaggi = 1; ; passaggi++) {

		// Salvo l'attuale numero di lampeggi
		oldLampeggi = lampeggi;


		for (let iy = 0; iy < matrice.length; iy++) {
			for (let ix = 0; ix < matrice[0].length; ix++) {
				carica(ix, iy);
			}
		}

		for (let iy = 0; iy < matrice.length; iy++) {
			for (let ix = 0; ix < matrice[0].length; ix++) {
				if (matrice[ix][iy] == "lamp") matrice[ix][iy] = 0;
			}
		}


		if (passaggi == 100) {
			console.table(matrice);
			console.log("Soluzione1: " + lampeggi);
        }


		// Dopo tutto il passaggio controllo quanti hanno lampeggiato
		newLampeggi = lampeggi - oldLampeggi;
		// Se hanno lampeggiato tutti
		if (newLampeggi == matrice.length*matrice[0].length) {
			console.table(matrice);
     		console.log("Soluzione2: " + passaggi);
			break;
		}
	
	}


});