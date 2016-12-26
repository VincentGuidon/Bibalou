var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Promotion = require('../models/Promotions.js');
var Market = require('../models/Markets.js');
var Product = require('../models/Products.js');

router.delete('/', function (req, res, next) {
    Promotion.findByIdAndRemove(req.query.id, function (err, promo) {
        if (err) {
            res.send({success: false, message: 'Internal error', errcode: 7});
        }
        else {
            res.send({sucees: true});
        }
    });
});

router.put('/product', function (req, res, next) {
    var update = req.body;
//  delete update.token;
    console.log(req.query.id);
    Product.findByIdAndUpdate(req.query.id, {promotion: update.promotion}, function (err) {
        if (err) {
            res.send({success: false, message: 'Internal error', errcode: 7});
        }
        else {
            res.send({success: true});
        }
    });
});

router.get('/byId', function (req, res, next) {
    Promotion.findById(req.query.id, function (err, promo) {
        var ret = {};
        if (err) {
            res.send({success: false, message: 'Internal error', errcode: 7});
        }
        else {
            ret.success = true;
            ret.promotions = promo;
            res.send(ret);
        }
    });
});

router.get('/byName', function (req, res, next) {
    Promotion.find({name: req.query.name}, function (err, promo) {
        var ret = {};
        if (err) {
            res.send({success: false, message: 'Internal error', errcode: 7});
        }
        else {
            ret.success = true;
            ret.promotions = promo;
            res.send(ret);
        }
    });
});

router.get('/byMarket', function (req, res, next) {
    Promotion.findOne({marketPlace: req.query.marketPlace}, function (err, promo) {
        var ret = {};
        if (err) {
            res.send({success: false, message: 'Internal error', errcode: 7});
        }
        else {
            ret.success = true;
            ret.promotions = promo;
            res.send(ret);
        }
    });
});

router.put('/', function (req, res, next) {
    var update = req.body;
    delete update.token;

    Promotion.findByIdAndUpdate(req.body._id, update, function (err) {
        if (err) {
            res.send({success: false, message: 'Internal error', errcode: 7});
        }
        else {
            res.send({success: true});
        }
    });
});

router.post('/', function (req, res, next) {
    if (req.body._id) {
        res.send({success: false, message: 'The promotion already exist', errcode: 5});
        return;
    }
    var marketName = req.body.marketPlace;
    var promo = new Promotion({
        name: req.body.name,
        description: req.body.description,
        percent: req.body.percent,
        brut: req.body.brut,
        marketPlace: marketName
    });
    promo.save(function (err, newPromo) {
        if (err) {
            res.send({success: false, message: 'Internal error', errcode: 7});
        }
        else {
            Market.findOneAndUpdate({name: marketName}, {$push: {promotions: newPromo.id}}, function (err) {
                if (err) {
                    res.send({success: false, message: 'Internal error', errcode: 7})
                }
                else {
                    res.send({success: true});
                }
            });
        }
    });
});

module.exports = router;
