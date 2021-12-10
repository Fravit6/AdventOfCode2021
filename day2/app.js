if (process.argv.length < 3) {
	console.log('Usage: node ' + process.argv[1] + ' FILENAME');
	process.exit(1);
}



var fs = require('fs'), 
filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);



	//var soluzione = 0;
	var oriz= 0, mira = 0, prof = 0;
	for (let index = 0; index<lines.length; index++) {

		var num = parseInt(lines[index].match(/(\d+)/));
		var comando = lines[index].replace(/[^A-Za-z]/g, '');


		if (comando == "forward") {
			oriz += num;
			prof += mira * num;
			continue;
		}
		if (comando == "up") {
			mira -= num;
			continue;
		}
		if (comando == "down") {
			mira += num;
			continue;
		}


		break;

	}
	console.log("Soluzione: "+oriz*prof);
});

