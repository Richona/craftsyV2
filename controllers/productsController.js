/* Requerimos los productos en formato objeto */
const products = require('../data/db_Module').loadProducts();
/* Requerimos las marcas en formato objeto */
const brands = require('../data/db_Module').loadBrands();
/* Requerimos la funcion de escribir en products.json */
const {storeProducts} = require('../data/db_Module')

module.exports = {
    add : (req,res) => {
        /* Renderizamos vista y mandamos marcas ordenadas con sort */
        return res.render('productAdd',{
            brands: brands.sort()
        })
    },
    store : (req,res) => {
        /* extraemos los datos del pedido */
        const {name,price,discount} = req.body;
        /* Sacamos el ultimo id */
        const id = products[products.length - 1].id;

        const newProduct = {
            id : id + 1,
            ...req.body,/* Agregamos todos los datos del pedido */
            name: name.trim(),/* Trim quita espacios antes y despues */
            price : +price,
            discount : +discount,
            image : "img-phone-01.jpg"
        }

        /* Mandamos el nuevo producto a escribirse en products.json */
        const productsNew = [...products,newProduct];
        storeProducts(productsNew)

        /* Redirigimos al home */
        return res.redirect('/')

    },
    detail : (req,res) => {
        const product = products.find(product => product.id === +req.params.id);/* Buscamos si el id pasado por pedido es igual a algun id de producto */

        /* Renderizamos vista y mandamos el producto encontrado */
        return res.render('productDetail', {
            product
        })
    },
    filter : (req,res) => {
        const productsFilter = products.filter(product => product.section === req.query.section)/* Buscamos si la seccion mandada por pedido es igual a la seccion de los productos */
        /* Renderizamos vista y mandamos los productos encontrados. */
        return res.render('products', {
            products : productsFilter
        })
    },
    search : (req,res) => {
        const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))/* Buscamos si lo pedido por el usuario tiene similitud a algun nombre de producto */
        /* Renderizamos vista, mandamos el resultado, y si no encuentra, mostramos su busqueda no fue encontrado con su pedido keywords */
        return res.render('products', {
            products : result,
            keywords : req.query.keywords
        })
    }
}