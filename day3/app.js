
var fs = require('fs');
fs.readFile('input.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);

	/* lines = [
		"00100",
		"11110",
		"10110",
		"10111",
		"10101",
		"01111",
		"00111",
		"11100",
		"10000",
		"11001",
		"00010",
		"01010"
	]; */


	var soluzione = 0;

	var pos = [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	];
	
	for (let index = 0; index<lines.length; index++) {

		//console.log(lines[index][0]);

		for (let indice = 0; indice<lines[index].length; indice++) {

			if (lines[index][indice] == 0) {
				pos[indice][0]++;
			} else {
				pos[indice][1]++;
			}

		}

		//break;

	}
	console.log(pos);


	var gamma = "", epsilon = "";
	for (let i = 0; i < pos.length; i++) {

		if (pos[i][0] > pos[i][1]){
			gamma = gamma+"0";
			epsilon = epsilon+"1";
		} else {
			gamma = gamma+"1";
			epsilon = epsilon+"0";
		} 
			
		
	}
	var newGamma = parseInt(gamma, 2);
	var newEpsilon = parseInt(epsilon, 2);
	
	console.log("Soluzione: "+newGamma*newEpsilon);
	console.log("Soluzione: 1131506")

	console.log("---------- PARTE 2 -----------");

	var pos = [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	];
	var prefix_oxygen = "", prefix_CO2 = "";

	// Scorro orizzontalmente
	for (let esterno = 0; esterno < 12; esterno++) {

		//console.log("Passaggio #"+esterno+" - linee rimaste: "+lines.length);

		// Scorro verticalmente
		for (let index = 0; index<lines.length; index++) {
			if (lines[index][esterno] == 0) {
				pos[esterno][0]++;
			} else {
				pos[esterno][1]++;
			}
		}
		//console.log(pos);


		if (pos[esterno][0] > pos[esterno][1]) {
			prefix_oxygen = prefix_oxygen+"0";
			prefix_CO2 = prefix_CO2+"1";
		} else {
			prefix_oxygen = prefix_oxygen+"1";
			prefix_CO2 = prefix_CO2+"0";
		}
		//console.log("prefix_oxygen: "+prefix_oxygen);
		//console.log("prefix_CO2: "+prefix_CO2);



		//lines = lines.filter(x => x.startsWith(prefix_oxygen));
		lines = lines.filter(x => x.startsWith(prefix_CO2));
		
		if (lines.length < 2) {
			//prefix_oxygen = lines;
			prefix_CO2 = lines;
			break;
		}
	}

	//var oxygen = parseInt(prefix_oxygen, 2);
	var oxygen = 4089;
	var CO2 = parseInt(prefix_CO2, 2);
	//var CO2 = 1923;

	console.log("oxygen: "+oxygen);
	console.log("CO2: "+CO2);


	console.log("Soluzione: "+oxygen*CO2);

});