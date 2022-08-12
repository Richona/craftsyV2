/* requerimos fs y path */
const fs = require('fs');
const path = require('path');

/* Leemos el json y lo convertimos a objeto literal */
const loadProducts = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'),'utf-8'))
}

/* Convertimos el objeto a Json y lo escribimos en products.json */
const storeProducts = (products) => {
    fs.writeFileSync(path.join(__dirname,'products.json'), JSON.stringify(products, null, 3),'utf8')
}

/* Leemos el json y lo convertimos a objeto literal */
const loadBrands = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'brands.json'),'utf-8'))
}

/* Exportamos los metodos */
module.exports = {
    loadProducts,
    loadBrands,
    storeProducts
}