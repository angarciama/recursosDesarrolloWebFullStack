const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//Funcion auxiliar, es una regular expression que toma un string y le pone cierto formato
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Se renderiza en la vista products y como segundo parametro le agrego el objeto que contenga la informacion que se requiere
		res.render('products',{
			products,
			toThousand
		})
		
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id;
		let product = products.find(p => p.id == id);

		res.render('detail',{
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {

		let image = req.file ? req.file.filename : 'default-image.png';
		let newProduct = {
			// Traer el id del ultimo producto
			id: products[products.length - 1].id + 1,
			// Split operator: se pasa el objeto que llega por la request
			...req.body,
			//image: 'default-image.png' sin multer hay que pasar ese parametro
			image: image
		};
		// Sigue agregar el array de productos, con push se agregan los productos que estaban mas el nuevo
		products.push(newProduct)
		//Para guardar el JSON
		fs.writeFileSync(productsFilePath, JSON.stringify(products, 'null', ' '));
	
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id;
		//Para saber cual producto editar
		let productToEdit = products.find(product => product.id == id); 
	
		res.render('product-edit-form', {productToEdit })
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id);

		let image = req.file ? req.file.filename : productToEdit.image;

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: image
		};
		//.map para recorrer todos los productos
		let newProducts = products.map(product => {
			// product.id == productToEdit.id ? product = {...productToEdit} : product;
			if (product.id == productToEdit.id) {
				return product = {...productToEdit}
			}
			return product;
		});
		//Para guardar el JSON
		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = req.params.id;
		// .filter para que me devuelva todos los productos menos el que queremos borrar
		let finalProducts = products.filter(product => product.id != id);

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
	}
};

module.exports = controller;