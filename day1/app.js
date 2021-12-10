if (process.argv.length < 3) {
	console.log('Usage: node ' + process.argv[1] + ' FILENAME');
	process.exit(1);
}



var fs = require('fs'), 
filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);



	var counter = 0;
	var finestra_attuale= 0, finestra_precedente = 0;
	for (let index = 0; index<lines.length; index++) {

		if (index > lines.length-3) break;

		finestra_attuale = parseInt(lines[index]) + parseInt(lines[index+1]) + parseInt(lines[index+2]);

		if (finestra_precedente != 0) {
			if (finestra_attuale > finestra_precedente) counter++;
		}

		finestra_precedente = finestra_attuale;
	}
	console.log(counter);
});

