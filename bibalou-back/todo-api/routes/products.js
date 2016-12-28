var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require("async");

var Product = require('../models/Products.js');
var Market = require('../models/Markets.js');
var Promotion = require('../models/Promotions.js');

function getFullProduct(res, product) {
    var ret = {};
    if (product.promotion) {
        Promotion.findById(product.promotion, function (err, promo) {
            if (err)
                res.send({success: false, message: 'Internal Error', errcode: 0});
            product.promotion = promo;
            ret.success = true;
            ret.product = product;
            res.send(ret);
        });
    }
    else {
        ret.success = true;
        ret.product = product;
        res.send(ret);
    }
}

function getFullProducts(res, allProducts) {
    var ret = {};
    var i = 0;
    var max = allProducts.length;
    async.eachSeries(allProducts, function (product, callback) {
        if (product.promotion) {
            Promotion.findById(product.promotion, function (err, promo) {
                if (err)
                    res.send({success: false, message: 'Internal Error', errcode: 0});
                product.promotion = promo;
                i = i + 1;
                if (i == max) {
                    ret.success = true;
                    ret.products = allProducts;
                    res.send(ret);
                }
            });
        }
        else {
            i = i + 1;
            if (i == max) {
                ret.success = true;
                ret.products = allProducts;
                res.send(ret);
            }
        }
        callback(); // Alternatively: callback(new Error());
    });
}

router.delete('/', function (req, res, next) {
    Product.findByIdAndRemove(req.query.id, function (err) {
        if (err) {
            res.send({success: false, message: 'Internal error', errcode: 7});
        }
        else {
            res.send({success: true});
        }
    });
});

router.put('/', function (req, res, next) {
    Product.findByIdAndUpdate(req.body._id, req.body, function (err) {
        if (err) {
            res.send({success: false, message: 'No product with that name', errcode: 4});
        }
        else {
            res.send({success: true});
        }
    });
});

router.get('/', function (req, res, next) {
    Product.find(function (err, allProducts) {
        if (err) {
            res.send({success: false, message: 'Internal Error', errcode: 0});
        }
        else {
            getFullProducts(res, allProducts);
        }
    });
});


router.get('/byId', function (req, res, next) {
    Product.findById(req.query.id, function (err, product) {
        if (err) {
            res.send({success: false, message: 'No product find', errcode: 6});
        }
        else {
            getFullProduct(res, product);
        }
    });
});

router.get('/byName', function (req, res, next) {
    Product.find({name: req.query.name}, function (err, products) {
        if (err) {
            res.send({success: false, message: 'No product with that name', errcode: 6});
        }
        else {
            getFullProducts(res, products);
        }
    });
});

router.get('/byMarketName', function (req, res, next) {
    Product.find({marketPlace: req.query.marketName}, function (err, products) {
        if (err) {
            res.send({success: false, message: 'No marketPlace with that ID', errcode: 5});
        }
        else {
            var ret = {};
            ret.success = true;
            ret.products = products
            res.send(ret);
        }
    });
//  console.log(req.query);
})

router.post('/', function (req, res, next) {

    if (req.body._id) {
        res.send({success: false, message: 'The product already exist', errcode: 5});
        return;
    }
    var marketPlaceName = req.body.marketPlace;
    var nProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,

        stock: req.body.stock,
        available: req.body.available,
        image: req.body.image,
        type: req.body.type,
        marketPlace: marketPlaceName
    });

    nProduct.save(function (err, newProduct) {
        if (err) {
            res.send({success: false});
        }
        Market.findOne({name: marketPlaceName}, function (err, market) {
            if (err) {
                res.send({success: false, message: 'No marketPlace with that ID', errcode: 5});
            }
            else {
                market.productList.push(newProduct.id);
                Market.findOneAndUpdate({name: marketPlaceName}, market, function (err) {
                    if (err) {
                        res.send({success: false, message: 'Couldn\'t save the product', errcode: 5});
                    }
                    else {
                        res.send({success: true});
                    }
                });
            }
        });
        console.log('Product saved successfully!');
    });
});

module.exports = router;
