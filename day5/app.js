console.clear();
var fs = require('fs');
//const { clearScreenDown } = require('readline');

fs.readFile('input.txt', 'utf8', function(err, data) {
//fs.readFile('demo.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);

	var mappa = Array(1000).fill(null).map(() => Array(1000).fill(0));
	//var mappa = Array(10).fill(null).map(() => Array(10).fill(0));

	var coordinate = [], s = 0;
	for (let index = 0; index<lines.length; index++) {

		coordinate = lines[index].replace(/,| -> /g,'-').split("-").map(Number);

		// Se la linea è orizzontale
		if (coordinate[1] == coordinate[3]) {
			// Qua ho 2 casi:
			// 1. La prima più piccola (es: 0,9 -> 5,9)
			// 2. La prima più grande (es: 9,4 -> 3,4)

			// Prendo il caso 2 e lo "converto" in caso 1
			if (coordinate[0] > coordinate[2]) {
				coordinate.push(coordinate.shift());
				coordinate.push(coordinate.shift());
			}

			for (s = 0; s <= coordinate[2]-coordinate[0]; s++) 
				mappa[coordinate[1]][coordinate[0]+s] += 1;


		// Se la linea è verticale
		} else if (coordinate[0] == coordinate[2]) {
			
			// Qua ho 2 casi:
			// 1. La seconda più piccola (es: 7,0 -> 7,4)
			// 2. La seconda più grande (es: 2,2 -> 2,1)

			// Prendo il caso 2 e lo "converto" in caso 1
			if (coordinate[1] > coordinate[3]) {
				coordinate.push(coordinate.shift());
				coordinate.push(coordinate.shift());
			}

			for (s = 0; s <= coordinate[3]-coordinate[1]; s++)
				mappa[coordinate[1]+s][coordinate[0]] += 1;

		// Se la linea è obliqua
		} else {
			
			// Qua ho 4 casi:
			// 1. Le prime due coordinate sono entrambe più piccole (es: 0,0 -> 8,8)
			// 2. Le prime due coordinate sono entrambe più grandi (es: 6,4 -> 2,0)
			// 3. Le prima più piccola, la seconda più grande (es: 5,5 -> 8,2)
			// 4. Le prima più grande, la seconda più piccola (es: 8,0 -> 0,8)

			// Prendo il caso 2 e lo "converto" in caso 1
			// Prendo il caso 4 e lo "converto" in caso 3
			if (coordinate[0] > coordinate[2]) {
				coordinate.push(coordinate.shift());
				coordinate.push(coordinate.shift());
			}

			// Caso 1:
			if (coordinate[1] < coordinate[3]) 
				for (s = 0; s <= coordinate[2]-coordinate[0]; s++) 
					mappa[coordinate[1]+s][coordinate[0]+s] += 1;
			// Caso 3:
			else 
				for (s = 0; s <= coordinate[1]-coordinate[3]; s++) 
					mappa[coordinate[1]-s][coordinate[0]+s] += 1;

		}

	}

	//console.table(mappa);	
	// Calcolo il punteggio finale
	var soluzione = mappa.flat().reduce((acc, current) => (current >= 2 ? acc+1 : acc), 0);

	console.log("Soluzione: "+soluzione);


});