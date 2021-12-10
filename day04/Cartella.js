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