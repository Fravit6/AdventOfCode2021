//import {Cartella} from './Cartella.js';
//require('Cartella.js');


var fs = require('fs');
fs.readFile('input.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);
	var soluzione = 0;


	var estratti = lines[0].split(",").map(Number);


	class Cartella {

		constructor() {
			this.righe = [];
			this.colonne = [];
			return this;
		}

		addRiga(riga) {
			this.righe.push(riga);
		}


		// Traspongo le righe per ottenere le colonne
		ottieniColonneDaRighe(){
			var newArray = [];
			for(var i = 0; i < this.righe.length; i++){
				newArray.push([]);
			};

			for(var i = 0; i < this.righe.length; i++){
				for(var j = 0; j < 5; j++){
					newArray[j].push(this.righe[i][j]);
				};
			};

			this.colonne = newArray;
		}

		// Rimuovo dalle righe e dalle colonne un numero
		segnaNumero(numero) {
			this.righe = this.righe.map(function (riga) {
				return riga.filter(item => item!=numero);
			});
			this.colonne = this.colonne.map(function (colonna) {
				return colonna.filter(item => item!=numero);
			});
		}

		// Controllo se ci sono righe o colonne vuote
		controllaVincita() {
			var vincita = false;
			this.righe.forEach(riga => {
				if (riga.length == 0) vincita = true;
			});
			if (vincita) return true;

			this.colonne.forEach(colonna => {
				if (colonna.length == 0) vincita = true;
			});
			return vincita;
		}

		// Calcolo la somma di tutti i numeri rimasti in cartella
		calcolaNumeriRimasti() {
			var somma = 0;
			this.righe.forEach(riga => {
				somma += riga.reduce((accu, val) => accu + val, 0);
			});
			return somma;
		}
	}


	var tabellone = [];


	for (let index = 1; index<lines.length; index++) {

		// Se non ci sono numeri nella riga
		if((!lines[index] || lines[index].length === 0 )) {

			// Chiudo la cartella precedente ottenendo le colonne
			var ultimaCartella = tabellone[tabellone.length-1];
			if(ultimaCartella)
				ultimaCartella.ottieniColonneDaRighe();

			// Creo una nuova cartella per le prossime righe
			tabellone.push(new Cartella());
			continue;

		// Se ci sono numeri devo inserirli nella cartella
		} else {

			var cartella = tabellone[tabellone.length-1];
			var riga = lines[index].split(" ").map(Number);
			cartella.addRiga(riga);
			tabellone[tabellone.length-1] = cartella;
		}
		
	}

	// L'ultima cartella la converto dopo
	var ultimaCartella = tabellone[tabellone.length-1];
		if(ultimaCartella)
			ultimaCartella.ottieniColonneDaRighe();



	console.log("Ho convertito "+tabellone.length+" tabelle");
	console.log("Ora cominciano le estrazioni");


	/* var vincita = false;
	estratti.map(function(num) {

		if (!vincita) {
			tabellone.map(function (cartella) {
				cartella.segnaNumero(num);
				if (cartella.controllaVincita()) {
					console.log("Abbiamo un vincitore");
					vincita = true;
					var numRimasti = cartella.calcolaNumeriRimasti();
					console.log("numRimasti: "+numRimasti);

					console.log("Soluzione: "+numRimasti*num);
					return;
				}
			});
		}
		
	}); */

	console.log("---------- PARTE 2 -----------");


	var cartellaRimossa = new Cartella();
	estratti.map(function(num, index) {

		tabellone.map(function (cartella, indiceCartella) {
			cartella.segnaNumero(num);
			// Se la cartella ha vinto la contressagno con la vincita
			if (cartella.controllaVincita()) {
				// Rimuovo dal tabellone la cartella che ha appena vinto
				cartellaRimossa = tabellone.splice(indiceCartella,1)[0];				
			}
		});

		if (tabellone.length == 0) {
			console.log("FINE");
			console.log("Ultimo numero estratto: "+num);
			console.log("Ultima cartella vincente: ");
			console.log(cartellaRimossa);
			var numRimasti = cartellaRimossa.calcolaNumeriRimasti();
			console.log("Soluzione: "+numRimasti*num);
			muori();
		}


		tabellone.map(function (cartella, indiceCartella) {

			cartella.segnaNumero(num);
			// Se la cartella ha vinto la contressagno con la vincita
			if (cartella.controllaVincita()) {
				// Rimuovo dal tabellone la cartella che ha appena vinto
				cartellaRimossa = tabellone.splice(indiceCartella,1)[0];
			}
		});


		
	});
	

});