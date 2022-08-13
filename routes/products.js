const express = require('express');
const router = express.Router();

const {detail, filter, search, add, store, edit, update, remove} = require('../controllers/productsController');

/* /products */

router
    .get('/add',add)
    .post('/add',store)
    .get('/detail/:id',detail)
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .get('/filter',filter)
    .get('/search',search)
    .delete('/delete/:id',remove)



module.exports = router;