console.clear();
var fs = require('fs');


fs.readFile('input.txt', 'utf8', function(err, data) {
//fs.readFile('demo.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);


	var afterPipe = "";
	var digit;
	var soluzione = 0;
	lines.forEach((linea) => {
		afterPipe = linea.substring(linea.indexOf(" | ") + 3);
		digit = afterPipe.split(" ");
		soluzione += digit.reduce((acc, val) => {
			if (val.length == 2 || val.length == 3 || val.length == 4 || val.length == 7)
				return acc+1;
			else 
				return acc;
		}, 0);

	});

	console.log("Soluzione 1: "+soluzione);
	console.log("--------- Parte 2 ---------");

	soluzione = 0;
	lines.forEach((linea) => {
		//var linea = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf";
		var input = linea.substring(0, linea.indexOf(" | ")).split(" ");
		var inputString = linea.substring(0, linea.indexOf(" | "));
		var output = linea.substring(linea.indexOf(" | ") + 3).split(" ");

		var alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
		// Le stringhe che compongono i numeri
		var numeri = [];

		// Char di ogni linea del numero
		var signals = {
			'top': '',
			'top-sx': '',
			'top-dx': '',
			'centro': '',
			'bottom-sx': '',
			'bottom-dx': '',
			'bottom': '',
		};

		// Inserisco nei numeri le stringhe a lunghezza univoca
		numeri[1] = input.filter( (ele) => (ele.length === 2) ).toString();
		numeri[4] = input.filter( (ele) => (ele.length === 4) ).toString();
		numeri[7] = input.filter( (ele) => (ele.length === 3) ).toString();
		numeri[8] = input.filter( (ele) => (ele.length === 7) ).toString();
		//console.log(numeri);

		// Trovo i signal univoci
		var charOcc = 0;
		alfabeto.forEach(char => {
			charOcc = (inputString.match(new RegExp(char, "g")) || []).length;
			if (charOcc == 4) signals["bottom-sx"] = char;
			else if (charOcc == 6) signals["top-sx"] = char;
			else if (charOcc == 9) signals["bottom-dx"] = char;
		});


		// Ora devo scovare i signal mancanti

		// Trovo top-dx:
		// il numero 1 è composto solo da: top-dx e bottom-dx (che ho già)
		signals["top-dx"] = numeri[1].replace(new RegExp(signals["bottom-dx"]), "");

		// Trovo top:
		// il numero 7 è composto da: top, top-dx e bottom-dx
		signals["top"] = numeri[7]
		.replace(new RegExp(signals["top-dx"]), "")
		.replace(new RegExp(signals["bottom-dx"]), "");

		// Trovo centro:
		// Il numero 4 è composto da: top-dx, top-sx, centro e bottom-dx
		signals["centro"] = numeri[4]
		.replace(new RegExp(signals["top-dx"]), "")
		.replace(new RegExp(signals["top-sx"]), "")
		.replace(new RegExp(signals["bottom-dx"]), "");

		// Trovo bottom:
		// è l'ultima rimasta
		alfabeto.forEach(char => {
			if (char !== signals["top"] && 
				char !== signals["top-sx"] && 
				char !== signals["top-dx"] && 
				char !== signals["centro"] && 
				char !== signals["bottom-sx"] && 
				char !== signals["bottom-dx"])
				signals["bottom"] = char;
		});
		//console.log(signals);

		// Ora che ho ottenuto tutti i segnal devo trovare i numeri in input con occorrenze in comune

		// Scorro tutte le stringhe di input
		var buono = true, i = 0;
		var signalNecessari = ["top", "top-sx", "top-dx", "centro", "bottom-sx", "bottom-dx", "bottom"];
		input.map( stringa => {
			// Se ha 5 o 6 char vuol dire che devo ancora trovarlo
			if (stringa.length == 6) {

				// Trovo il numero 0:
				signalNecessari = ["top", "top-sx", "top-dx", "bottom-sx", "bottom-dx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeri[0] = stringa; return;}

				// Trovo il numero 6:
				signalNecessari = ["top", "top-sx", "centro", "bottom-sx", "bottom-dx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeri[6] = stringa; return;}

				// Trovo il numero 9:
				signalNecessari = ["top", "top-sx", "top-dx", "centro", "bottom-dx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeri[9] = stringa; return;}

				
			} else if (stringa.length == 5) {
				// Trovo il numero 2:
				signalNecessari = ["top", "top-dx", "centro", "bottom-sx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeri[2] = stringa; return;}

				// Trovo il numero 3:
				signalNecessari = ["top", "top-dx", "centro", "bottom-dx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeri[3] = stringa; return;}

				// Trovo il numero 5:
				signalNecessari = ["top", "top-sx", "centro", "bottom-dx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeri[5] = stringa; return;}
			}

		});
		//console.log(numeri);




		// Ora ho convertito tutti i numeri, converto l'output 
		var numeroFinale = "";
		var buono = true, i = 0;
		var signalNecessari = ["top", "top-sx", "top-dx", "centro", "bottom-sx", "bottom-dx", "bottom"];
		output.map( stringa => {


			if (stringa.length == 2) {
				// Trovo il numero 1:
				numeroFinale += 1;
				return;
			}
			if (stringa.length == 4) {
				// Trovo il numero 4:
				numeroFinale += 4;
				return;
			}
			if (stringa.length == 3) {
				// Trovo il numero 7:
				numeroFinale += 7;
				return;
			}
			if (stringa.length == 7) {
				// Trovo il numero 8:
				numeroFinale += 8;
				return;
			}


			// Se ha 5 o 6 char vuol dire che devo ancora trovarlo
			if (stringa.length == 6) {

				// Trovo il numero 0:
				signalNecessari = ["top", "top-sx", "top-dx", "bottom-sx", "bottom-dx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeroFinale += 0; return;}

				// Trovo il numero 6:
				signalNecessari = ["top", "top-sx", "centro", "bottom-sx", "bottom-dx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeroFinale += 6; return;}

				// Trovo il numero 9:
				signalNecessari = ["top", "top-sx", "top-dx", "centro", "bottom-dx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeroFinale += 9; return;}

				
			} else if (stringa.length == 5) {
				// Trovo il numero 2:
				signalNecessari = ["top", "top-dx", "centro", "bottom-sx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeroFinale += 2; return;}

				// Trovo il numero 3:
				signalNecessari = ["top", "top-dx", "centro", "bottom-dx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeroFinale += 3; return;}

				// Trovo il numero 5:
				signalNecessari = ["top", "top-sx", "centro", "bottom-dx", "bottom"];
				buono = true;
				for (i = 0; i < signalNecessari.length; i++) 
					if (!stringa.includes(signals[signalNecessari[i]])) buono = false;
				if (buono) {numeroFinale += 5; return;}
			}
			
		});
		numeroFinale = parseInt(numeroFinale);
		//console.log(numeroFinale);

		soluzione += numeroFinale;
	});

	console.log("Soluzione 2: "+soluzione);


});