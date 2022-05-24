const registerRoutes = require('../utils/registerRoutes');
const debugCfg = require('debug');
const db = require('../db/db');
const withLatency = require('../utils/withLatency');

const debug = debugCfg('POD6:controller');

function sortByRelevant(productA, productB) {
  return (productB.rating * 10) - (productA.rating * 10);
}
function sortByPriceAsc(productA, productB) {
  return parseFloat(productA.price) - parseFloat(productB.price)
}
function sortByPriceDesc(productA, productB) {
  return parseFloat(productB.price) - parseFloat(productA.price)
}
let sortMethods = {
  'relevant': sortByRelevant,
  'priceAsc': sortByPriceAsc,
  'priceDesc': sortByPriceDesc
}

function sortBy(products, by) {
  return products.sort(sortMethods[by]);
}
function filterBy(products, filter) {
  if (!filter) return products;
  return products.filter(product => product.isBasic);
}

module.exports = registerRoutes(router => {
  router.get('/products', (req, res) => {
    debug("[GET] /products");
    let { page = 0, filter = undefined, sort = 'relevant' } = req.query;
    let allProducts = db.getValue('products');
    let sorted = sortBy(allProducts, sort);
    let filtered = filterBy(sorted, filter);

    let startIndex = page * 5;
    let endIndex = startIndex + 5
    let window = filtered.slice(startIndex, endIndex);

    withLatency(() => {
      res.json({
        page: page,
        total: allProducts.length,
        items: window
      });
    })
  });
});
