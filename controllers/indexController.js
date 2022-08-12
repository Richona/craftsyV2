/* Requerimos el modulo de datos */
const {loadProducts} = require('../data/db_Module')

module.exports = {
  index: (req, res) => {
    /* Traemos los productos en formato objeto */
    const products = loadProducts();
    /* Renderizamos la vista mandando los productos */
    return res.render("index",{
      products
    });
  },
  terms : (req,res) => {
    return res.render('terms')
  }
};