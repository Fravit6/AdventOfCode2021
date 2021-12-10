console.clear();
var fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, data) {
//fs.readFile('demo.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);

	var pesci = lines[0].split(",").map(Number);
	// Conta quanti   0  1  2  3  4  5  6  7  8
	var countPesci = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	var partorienti = 0;

	for (const num of pesci) 
		countPesci[num] = countPesci[num] ? countPesci[num] + 1 : 1;
	

	for (let giorni = 1; giorni <= 256; giorni++) {
		partorienti = countPesci.shift();
		countPesci[6] += partorienti;
		countPesci[8] = partorienti;
	}

	var soluzione = countPesci.reduce((partial_sum, a) => partial_sum + a, 0);
	console.log("Soluzione: "+soluzione);

});