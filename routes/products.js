var express = require('express');
var router = express.Router();

const Product = require('../models/index').Product;
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.findAll().then(function(products){
    res.render('products/index', {products: products});
  })
  // res.render('index', { title: 'Express' });
});

// router.get('/:id',function(req,res){
//   const id = req.params.id;
//
//   Question.findById(id).then(function(question){
//     res.render('questions/show', {question: question})
//   })
//
// })

module.exports = router;
