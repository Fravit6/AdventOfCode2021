console.clear();
var fs = require('fs');

console.log("------------------------------------------");


var matrice = [];
var newMatrice = [];
const fold = [];


fs.readFile('input.txt', 'utf8', function(err, data) {
//fs.readFile('demo.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);

	// Converto l'input
	lines.forEach(linea => {

		if (linea == '')
			return;
		
		if (linea.indexOf('fold') !== -1) {
			let verso = linea.substr(0, linea.indexOf("="));
			let numero = parseInt(linea.match(/\d+/)[0]);
			fold.push([verso[verso.length - 1], numero]);
		} else {
			let coordinate = linea.split(",");
			matrice.push([parseInt(coordinate[0]), parseInt(coordinate[1])]);
		}

	});
	console.log(fold);
	console.log("Punti iniziali: " + matrice.length);
	//console.log(matrice);
	



	// Per ogni piegamento
	fold.forEach(f => {
		
		matrice.forEach(coor => {

			let oldX = coor[0];
			let oldY = coor[1];
			let newX = 0, newY = 0;
			
			// Se il piegamento è verso l'alto
			if (f[0] == 'y' && oldY > f[1]) {
				newY = f[1] - (oldY - f[1]);
				newMatrice.push([oldX, newY]);

			// Se il piegamento è verso sinistra
			} else if (f[0] == 'x' && oldX > f[1]) {
				newX = f[1] - (oldX - f[1]);
				newMatrice.push([newX, oldY]);

			// Se il punto è nella parte non piegata
			} else {
				newMatrice.push([oldX, oldY]);
			}


		});

		newMatrice = [...new Set(newMatrice.map(JSON.stringify))].map(JSON.parse);
		console.log("Punti rimasti: " + newMatrice.length);
		//console.log(newMatrice);

		matrice = newMatrice;
		newMatrice = [];


	});


	console.log(matrice);
	console.log("Punti rimasti: " + matrice.length);


	var size = 40;
	var cartina = new Array(size).fill(0).map(() => new Array(7).fill(1));


	matrice.map(punto => {
		cartina[punto[0]][punto[1]] = "$";
	});
	
	console.table(cartina);
	


});