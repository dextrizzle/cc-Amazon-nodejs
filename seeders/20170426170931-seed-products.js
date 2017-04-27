'use strict';
const M = require('../models/index');
const Product = M.Product;
const faker = require('faker');

//Array from can create arrays in a variety of different
//ways. using it as follows will create an array with
//100 elements.
const products = Array
  .from({length: 50})
  .map(function(){
    return Product.create({
      title:`${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      description: faker.hacker.phrase(),
      price: 22.50
    })
    .catch(function(error){ console.log('duplicate question!') });
  })

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});

    */
    return Promise.all(products);

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
