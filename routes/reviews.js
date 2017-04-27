const express = require('express');
const router = express.Router({mergeParams: true});
const Models = require('../models/index');
const Product = Models.Product;
const Review = Models.Review;

router.post('/',function(req,res){
  const productId = req.params.productId;

  Review
    .create({content: req.body.content, ProductId: productId})
    .then(function(){
      res.redirect(`/products/${productId}`)
    })
})

router.delete('/:id', function(req, res){
  const id = req.params.id;
  Review
    .findById(id)
    .then(function(review){
      return review.destroy()
    })
    .then(function(){
      res.redirect(`/products/${req.params.productId}`)
    });
})

module.exports = router;
