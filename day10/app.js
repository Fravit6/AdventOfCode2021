console.clear();
var fs = require('fs');

console.log("------------------------------------------");

fs.readFile('input.txt', 'utf8', function(err, data) {
//fs.readFile('demo.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);



	var stack = [], scores = [];
	var i = 0, soluzione = 0, soluzione2 = 0, last = '', error = false;


	lines.forEach((line) => {

		stack = [];
		soluzione2 = 0;
		error = false;


		esterno:
		for (i = 0; i < line.length; i++) {

			char = line[i];

			switch (char) {
				// Se trovo un'apertura inserisco nello stack
				case "<":
				case "{":
				case "[":
				case "(":
					stack.push(char)
				break;

				// Se trovo una chiusura
				case ">":
					last = stack.pop();
					if (last != '<' ) {
						soluzione += 25137;
						error = true;
						break esterno;
					}
				break;
				case "}":
					last = stack.pop();
					if (last != '{' ) {
						soluzione += 1197;
						error = true;
						break esterno;
					}
				break;
				case "]":
					last = stack.pop();
					if (last != '[' ) {
						soluzione += 57;
						error = true;
						break esterno;
					}
				break;
				case ")":
					last = stack.pop();
					if (last != '(' ) {
						soluzione += 3;
						error = true;
						break esterno;
					}
				break;
				default:
				break esterno;
			}
			
		};


		if (stack.length > 0 && !error) {
			while (stack.length) {
				last = stack.pop();

				soluzione2 *= 5;
				if (last == '(' ) soluzione2 += 1;
				if (last == '[' ) soluzione2 += 2;
				if (last == '{' ) soluzione2 += 3;
				if (last == '<' ) soluzione2 += 4;
			}

			scores.push(soluzione2);
		}

	});

	console.log("Soluzione1: "+soluzione);

	scores = scores.sort(function (a, b) {return a - b;});
	console.log("Soluzione2: " + scores[Math.trunc(scores.length / 2)]);


});