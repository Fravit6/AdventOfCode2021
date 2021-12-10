console.clear();
var fs = require('fs');


fs.readFile('input.txt', 'utf8', function(err, data) {
//fs.readFile('demo.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);

	var valori = lines[0].split(",").map(Number).sort( (a, b) => a - b);
	//console.log(valori);



	var mediana = valori[valori.length/2 - 1];
	console.log("Mediana: " + mediana);

	var spostamenti = valori.reduce( (acc, val) => {
		return acc + Math.abs(val - mediana);
	}, 0);

	console.log("Soluzione 1: " + spostamenti);


	var media = Math.trunc(valori.reduce((sum, val) => sum + val, 0)  / valori.length);
	console.log("Media: " + media);


	var diff = 0, totDiff = 0;
	var spostamenti2 = valori.reduce( (acc, val) => {
		diff = Math.abs(val - media);
		totDiff = (diff * (diff+1)) / 2;
		return acc += totDiff;
	}, 0);

	console.log("Soluzione 2: " + spostamenti2);

});