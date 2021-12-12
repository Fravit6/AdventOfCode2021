const SMALL = 0;
const BIG = 1;

class Tree {
	constructor(value) {
		this.value = value;
		this.tipo = value == value.toUpperCase() ? BIG : SMALL;
		this.children = [];
		this.parent = [];
	}

	add(value) {
		const child = new Tree(value);
		child.parent.push(this);

		this.children.push(child);
	}

	findFirst(value) {

		if (this.value == value) return this;

		var trovato = false;
		var output = new Tree();

		this.children.some(node => {
			if (output = node.findFirst(value)) {
				trovato = true;
				return output;
			}
		});

		if (trovato)
			return output;

		return undefined;
	}



	addToAll(childValue, parentValue) {
		if (this.value == parentValue) this.add(childValue);

		this.children.map((node) => {
			node.addToAll(childValue, parentValue);
		});
	}




	print() {
		console.log(this);

		this.children.map(child => child.print());
	}
}


export {Tree};
