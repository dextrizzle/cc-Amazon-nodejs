var express = require('express');
var router = express.Router();
const reviews = require('./reviews');

const Product = require('../models/index').Product;
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.findAll().then(function(products){
    res.render('products/index', {products: products});
  })
  // res.render('index', { title: 'Express' });
});

router.get("/new", function(req,res){
  const product = Product.build();
  res.render('products/new', {product: product});
})

router.post('/',function(req,res,next){
  const {title, description, price} = req.body;
  Product
    .create({title: title, description: description, price: price})
    .then(function(product){
      const id = product.dataValues.id;
      res.redirect(`/products/${id}`);
    })
    .catch(function(err){
      next(err);
    })
})

router.delete('/:id', function(req, res){
  const id = req.params.id;
  Product
    .findById(id)
    .then(function(product){
      return product.destroy()
    })
    .then(function(){
      res.redirect('/products')
    });
})

router.get('/:id/edit',function(req,res){
  const id = req.params.id;

  Product
    .findById(id)
    .then(function(product){
      res.render('products/edit', {product:product})
    })
})

router.patch('/:id',function(req,res,next){
  const id = req.params.id;

  Product
    .findById(id)
    .then(function(product){
      return product.update(
        {title:req.body.title, description:req.body.description, price:req.body.price}
      );
    })
    .then(function(product){
      res.redirect(`/products/${id}`);
    })
    .catch(function(err){ next(err) })
})

router.get('/:id',function(req,res){
  const id = req.params.id;

  Product
    .findById(id)
    .then(function(product){
      return Promise.all([
        product,
        product.getReviews({order: [['createdAt','DESC']]})
      ])
    })
    .then(function([product, reviews]){
      res.render('products/show', {product:product, reviews:reviews})
    })

})
router.use('/:productId/reviews', reviews);

module.exports = router;
