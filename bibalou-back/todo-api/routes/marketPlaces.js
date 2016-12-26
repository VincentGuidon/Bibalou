var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');

var Market = require('../models/Markets.js');
var Product = require('../models/Products.js');
var Promotion = require('../models/Promotions.js');

var randomToken = require('../scripts/randomToken.js');

router.put('/addNews', function (req, res, next) {
    var val = req.body.value;
    Market.findByIdAndUpdate(req.body.idMarket, {$push: {news: val}}, function (err, market) {
        if (err) {
            res.send({success: false, message: 'Internal error', errcode: 7})
        }
        else {
            res.send({success: true});
        }
    });
});
/*
router.put('/editNews', function (req, res, next) {
    var val = req.body.value;
    console.log(val);
    Market.findById(req.body.idMarket, function (err, market) {
        if (err) {
            ret.success = false;
            ret.message = "Market Place unknow";
            ret.errcode = 4;
            res.send(ret);
        }
        else if (market.length == 0) {
            ret.success = false;
            ret.message = "No MarketPlace found";
            ret.errcode = 4;
            res.send(ret);
        }
        else {
            ret.success = true;

            for (var i = 0; i < market[0].news.length; ++i) {
                if (market[0].news[i].id == val.id) {
                    market[0].news[i] = val;
                    Market.findByIdAndUpdate(market[0]._id, market[0]);
                    break;
                }
            }
            res.send(ret);
        }
    });
});

router.put('/removeNews', function (req, res, next) {
    Market.findById(req.body.idMarket, function (err, market) {
        if (err) {
            ret.success = false;
            ret.message = "Market Place unknow";
            ret.errcode = 4;
            res.send(ret);
        }
        else if (market.length == 0) {
            ret.success = false;
            ret.message = "No MarketPlace found";
            ret.errcode = 4;
            res.send(ret);
        }
        else {
            ret.success = true;

            for (var i = 0; i < market[0].news.length; ++i) {
                if (market[0].news[i].id == req.body.idNews) {
                    market[0].news.splice(i, 1);
                    Market.findByIdAndUpdate(market[0]._id, market[0]);
                    break;
                }
            }
            res.send(ret);
        }
    });
});*/

/*
 router.delete('/:name', function(req, res, next) {
 Market.findOneAndRemove(req.params.name, function(err, promo)
 {
 if (err)
 {
 res.send({success : false, message : 'Internal error',errcode : 7});
 }
 else
 {
 res.send({sucees : true});
 }
 });
 });*/

router.put('/', function (req, res, next) {
    console.log(req.body)
    Market.findByIdAndUpdate(req.body._id, req.body, function (err) {
        if (err) {
            res.send({success: false, message: 'No marketPlace with that name', errcode: 4});
        }
        else {
            res.send({success: true});
        }
    });
});

function getAllMarket(ret, res, market) {
    Product.find({_id: {$in: market[0].productList}}, function (err, products) {
        if (err) {
            res.send({success: false, message: 'No marketPlace with that name', errcode: 4});
        }
        else {
            ret.marketPlace.productList = products;
            Promotion.find({_id: {$in: market[0].promotions}}, function (err, promo) {
                if (err) {
                    res.send({success: false, message: 'No marketPlace with that name', errcode: 4});
                }
                else {
                    ret.marketPlace.promotions = promo;
                    res.send(ret);
                }
            });
        }
    })
}

router.get('/', function (req, res, next) {
    var ret = {};

    Market.find(function (err, marketPlaces) {
        if (err) {
            ret.success = false;
            ret.message = "No marketPlace available";
            ret.errcode = 4;
            res.send(ret);
        }
        else {
            ret.success = true;
            ret.marketPlaces = marketPlaces;
            res.send(ret);
        }
    });
});

router.get('/byName', function (req, res, next) {

    var ret = {};

    Market.find({name: req.query.name}, function (err, market) {
        if (err) {
            ret.success = false;
            ret.message = "Market Place unknow";
            ret.errcode = 4;
            res.send(ret);
        }
        else if (market.length == 0) {
            ret.success = false;
            ret.message = "No MarketPlace found";
            ret.errcode = 4;
            res.send(ret);
        }
        else {
            ret.success = true;
            ret.marketPlace = market[0];
//market, ret, res
            getAllMarket(ret, res, market);
        }
    });
});

router.get('/byId', function (req, res, next) {

    var ret = {};
    Market.findById(req.query.id, function (err, market) {
        if (err) {
            ret.success = false;
            ret.message = "Market Place unknow";
            ret.errcode = 4;
            res.send(ret);
        }
        else if (market.length == 0) {
            ret.success = false;
            ret.message = "No MarketPlace found";
            ret.errcode = 4;
            res.send(ret);
        }
        else {
            ret.success = true;
            ret.market = market;
            getAllMarket(ret, res, market);
        }
    });
});

router.get('/byId/news', function (req, res, next) {

    var ret = {};
    Market.findById(req.query.id, function (err, market) {
        if (err) {
            ret.success = false;
            ret.message = "Market Place unknow";
            ret.errcode = 4;
            res.send(ret);
        }
        else if (market.length == 0) {
            ret.success = false;
            ret.message = "No MarketPlace found";
            ret.errcode = 4;
            res.send(ret);
        }
        else {
            ret.success = true;
            ret.news = market.news;
            res.send(ret);
        }
    });
});

router.get('/byOwner', function (req, res, next) {

    var ret = {};
    Market.find({owner: req.query.owner}, function (err, market) {
        if (err) {
            ret.success = false;
            ret.message = "Market Place unknow";
            ret.errcode = 4;
            res.send(ret);
        }
        else if (market.length == 0) {
            ret.success = false;
            ret.message = "No MarketPlace found";
            ret.errcode = 4;
            res.send(ret);
        }
        else {
            ret.success = true;
            ret.marketPlace = market[0];
            getAllMarket(ret, res, market);
        }
    });
});
//ajouter marketplace dans le user
router.post('/', function (req, res, next) {

    if (req.body._id) {
        res.send({success: false, message: 'The marketPlace already exist', errcode: 5});
        return;
    }
    var ret = {};
    //var user = randomToken.findUserConnected(req.body.token);

    var newMarket = new Market({
        name: req.body.name,
        description: req.body.description,
        productList: [],
        owner: req.body.owner,
        order: [],
        image: req.body.image
    });

    newMarket.save(function (err, market) {
        if (err) {
            ret.success = false;
            ret.message = "Market already created";
            ret.errcode = 3;
            console.log('Market already exist!');
        }
        else {
            ret.success = true;
            console.log('MarketPlace saved successfully!');
        }
        res.send(ret);
    });
});

module.exports = router;
