const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//Funcion auxiliar, es una regular expression que toma un string y le pone cierto formato
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Se crean las variables visited e inSale para luego mostrarlas por separado en el index
const visited = products.filter((producto) => producto.category === 'visited');
const inSale = products.filter((producto) => producto.category === 'in-sale');

const controller = {
	index: (req, res) => {
		// Se renderiza en la vista index y como segundo parametro le agrego el objeto que contenga la informacion que se requiere
		res.render('index', {
			toThousand,
			visited,
			inSale
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
