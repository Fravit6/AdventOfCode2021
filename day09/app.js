console.clear();
var fs = require('fs');

console.log("------------------------------------------");

const matrice = [];
const bassi = [];
const bacini = [];

function checkBasso(i, j) {

	const val = (matrice[i][j]);

	if (val == 0) return true;
	if (val == 9) return false;

	
	if (j-1 >= 0)
		if (val > matrice[i][j-1]) 
			return false;
	if (i+1 < matrice.length)
		if (val > matrice[i+1][j]) 
			return false;
	if (i-1 >= 0)
		if (val > matrice[i-1][j]) 
			return false;
	if (j+1 < matrice[0].length)
		if (val > matrice[i][j+1]) 
			return false;

	return true;
}



function trovaBacino(i, j, pila) {

	var lastBacino = bacini.pop();

	// Elemento Attuale
	if (matrice[i][j] != 9 && matrice[i][j] != '*') {
		lastBacino++;
		matrice[i][j] = '*';
	} else return;


	// Sopra
	if (i-1 >= 0)
		if (matrice[i-1][j] != 9 && matrice[i-1][j] != '*')
			if (!pila.some(a => [i-1, j].every((v, i) => v === a[i])))
				pila.push([i-1, j]);
	// Sinistra
	if (j-1 >= 0)
		if (matrice[i][j-1] != 9 && matrice[i][j-1] != '*')
			if (!pila.some(a => [i, j-1].every((v, i) => v === a[i])))
				pila.push([i, j-1]);
	// Sotto
	if (i+1 < matrice.length)
		if (matrice[i+1][j] != 9 && matrice[i+1][j] != '*')
			if (!pila.some(a => [i+1, j].every((v, i) => v === a[i])))
				pila.push([i+1, j]);
	// Destra
	if (j+1 < matrice[0].length)
		if (matrice[i][j+1] != 9 && matrice[i][j+1] != '*')
			if (!pila.some(a => [i, j+1].every((v, i) => v === a[i])))
				pila.push([i, j+1]);

	bacini.push(lastBacino);

	// Per ogni elemento della pila richiamo la funzione
	var el;
	while (el = pila.pop()) 
		trovaBacino(el[0], el[1], pila);

}


fs.readFile('input.txt', 'utf8', function(err, data) {
//fs.readFile('demo.txt', 'utf8', function(err, data) {
//fs.readFile('luca.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);
	// Converto l'input in una matrice di interi
	lines.forEach(linea => {
		matrice.push(Array.from(linea).map(Number));
	});

	//console.table(matrice);

	for (let i = 0; i < matrice.length; i++) {
		for (let j = 0; j < matrice[0].length; j++) {
			if (checkBasso(i, j)) {
				bassi.push(matrice[i][j]);
			}
		}
	}

	//console.log(bassi);
	let somma = bassi.reduce((sum, val) => sum + val, 0) + bassi.length;
	console.log("Soluzione: "+somma);


	console.log("---------- PARTE 2 ----------");

	
	for (let i = 0; i < matrice.length; i++) {
		for (let j = 0; j < matrice[0].length; j++) {
			if (matrice[i][j] != 9 && matrice[i][j] != '*') {
				// Inserisco un nuovo bacino
				bacini.push(0);
				// Inizio l'algoritmo
				trovaBacino(i, j, []);
			}
		}
	}


	//console.log(bacini);
	//console.table(matrice);


	// Ordino i bacini per grandezza
	var ordinati = bacini.sort(function (a, b) {  return b-a;  });
	//console.log(ordinati);

	var soluzione2 = ordinati[0] * ordinati[1] * ordinati[2];
    console.log("Soluzione2: " + soluzione2);

});