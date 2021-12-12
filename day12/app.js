console.clear();
//import { Tree } from './Tree.js';
//var fs = require('fs');
//import * as fs from "fs";

console.log("------------------------------------------");

const luca = [
	['start', ['A', 'b']],
	['A', ['b', 'c', 'end']],
	['b', ['A', 'b', 'end']],
	['c', []],
	['d', []],
	['end', []]
];

function trovaEnd(nodo) {
	if (nodo == 'end') return true;

	luca.reduce( (acc, element) => {
		if (element[0] == nodo) {
			console.log("Trovati i figli di " + nodo);
			console.log(element[1]);
		}
	});
}





var cammini = 0;

var nodiStart = luca[0][1];
console.log(nodiStart);


nodiStart.map( nodo => {
	luca.forEach(element => {
		if (element[0] == nodo) {
			console.log("Trovati i figli di " + nodo);
			console.log(element[1]);
		}
	});
});



/* 

var tree = new Tree("start");


//fs.readFile('input.txt', 'utf8', function(err, data) {
fs.readFile('demo.txt', 'utf8', function(err, data) {
	if (err) throw err;


	var lines = data.split(/\r?\n/);

	// Converto l'input in un albero
	lines.forEach(linea => {
		var nodiAttuali = linea.split('-');

		//console.log("Devo trovare: " + nodiAttuali[0] + " Per inserire: "+  nodiAttuali[1]);
		tree.addToAll(nodiAttuali[1], nodiAttuali[0]);
	});

	tree.print();

/* 	
	// Algoritmo di navigazione dell'albero
	const stack = [];
	var cammini = 0;

	stack.push(tree._root);

	// Prelevo un nodo dallo stack
	var nodo = stack.pop();

	// Aggiungo allo stack tutti i children (tranne start) 
	nodo.children.forEach(node => {
		if (node.data != "start")
			stack.push(node);
	});

	console.log(stack);
 





}); */