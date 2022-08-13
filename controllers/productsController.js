const {loadProducts, loadBrands, storeProducts} = require('../data/db_Module');/* requerimos objetos literales de productos y marcas, y la funcion de guardar en json   */

module.exports = {
    add : (req,res) => {
        const brands = loadBrands();/* Leemos marcas */
        return res.render('productAdd',{/* Renderizamos y con sort ordenamos alfabeticamente las marcas */
            brands: brands.sort()
        })
    },
    store : (req,res) => {
        const products = loadProducts(); /* Leemos productos */
        const {name,price,discount} = req.body;/* Destructuring de datos mandados por usuario */
        const id = products[products.length - 1].id; /* Sacamos el ultimo id */

        const newProduct = {/* Funcion constructuro de objetos */
            id : id + 1,
            ...req.body,/* ingresamos todo los datos del usuario con spread */
            name: name.trim(),/* Sacamos espacios antes y final con trim */
            price : +price,
            discount : +discount,
            image : "img-phone-01.jpg"
        }

        const productsNew = [...products,newProduct];/* Creamos nuevo producto y lo agregamos juntos con los demas  */

        storeProducts(productsNew)/* Escribimos los productos en el json */

        return res.redirect('/')/* redirigimos al home */

    },
    edit : (req,res) => {
        const products = loadProducts();/* cargamos productos */
        const brands = loadBrands();/* cargamos marcas */
        const product = products.find(product => product.id === +req.params.id);/* Buscamos un id de producto igual al id pasado por parametro */

        return res.render('productEdit',{/* Renderizamos y mandamos marcas y el producto encontrado */
            brands,
            product
        })
    },
    update : (req,res) => {

        const products = loadProducts();/* cargamos productos */
        const {id} = req.params;/* Sacamos id del parametro */
        const {name,price,discount,brand, category, section} = req.body;/* Destructuring de los datos del usuario */

        const productsModify = products.map(product => {/* recorremos el array para modificarlo */
            if (product.id === +id ){/* Si el id pasado por params es igual al id de un producto entra */
                return {
                    ...product,/* ingresamos todo los datos del usuario con spread */
                    name : name.trim(),/* Sacamos espacios antes y final con trim */
                    price : +price,
                    discount : +discount,
                    brand,
                    category,
                    section 
                }
            }
            return product
        })

        storeProducts(productsModify)/* Escribimos los productos en el json */
        return res.redirect('/products/detail/' + req.params.id)/* Redirigimos a producto modificado */

       
    },
    detail : (req,res) => {
        
        const products = loadProducts();/* cargamos productos */
        const product = products.find(product => product.id === +req.params.id);/* Buscamos un id de producto igual al id pasado por parametro */

        return res.render('productDetail', {/* Renderizamos y mandamos el producto buscado */
            product
        })
    },
    filter : (req,res) => {

        const products = loadProducts();/* cargamos productos */
        const productsFilter = products.filter(product => product.section === req.query.section)/* Buscamos una section de producto igual al section pasado por parametro */
        return res.render('products', {/* Renderizamos y mandamos los productos buscados */
            products : productsFilter
        })
    },
    search : (req,res) => {

        const products = loadProducts();/* cargamos productos */
        const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))/* Buscamos un titulo de producto igual al keywords pasado por parametro */
        return res.render('products', {/* Renderizamos y mandamos los productos encontrados y el valor del keywords */
            products : result,
            keywords : req.query.keywords
        })
    },
    remove : (req,res) => {
        const products = loadProducts();/* cargamos productos */

        const productsModify = products.filter(product => product.id !== +req.params.id ) /* Eliminamos el producto, dejando el id de producto igual al id pasado por parametro, fuera */
        storeProducts(productsModify);/* Mandamos a escribir el nuevo arrays de productos */
        
        return res.redirect('/')/* regirigimos al home */

    }
}