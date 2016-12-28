var express = require('express');
var router = express.Router();
var async = require("async");

var Order = require('../models/Order.js');
var Payments = require('../models/Payments.js');
var randomToken = require('../scripts/randomToken.js');

function createFullOrder(res, order) {
    var ret = {};

    if (order.payment) {
        var tmp = Payments.findPaymentById(order.payment);

        var newOrder = {};
        newOrder.payment = tmp;
        newOrder._id = order._id;
        newOrder.buyer = order.buyer;
        newOrder.__v = order.__v;
        newOrder.products = order.products;
        newOrder.date = order.date;
        newOrder.total = order.total;
        ret.success = true;
        ret.order = newOrder;
        res.send(ret);
    }
    else {
        ret.success = true;
        ret.order = order;
        res.send(ret);
    }
}

function createFullOrders(res, orderList) {
    var ret = {};
    var i = 0;
    var max = orderList.length;
    async.eachSeries(orderList, function (orders, callback) {
        if (orders.payment) {
            var tmp = Payments.findPaymentById(orders.payment);
            orderList[i] = {};
            orderList[i].payment = tmp;
            orderList[i]._id = orders._id;
            orderList[i].buyer = orders.buyer;
            orderList[i].__v = orders.__v;
            orderList[i].products = orders.products;
            orderList[i].date = orders.date;
            orderList[i].total = orders.total;
            i = i + 1;
            if (i == max) {
                ret.success = true;
                ret.orders = orderList;
                res.send(ret);
            }
        }
        else {
            i = i + 1;
            if (i == max) {
                ret.success = true;
                ret.orders = orderList;
                res.send(ret);
            }
        }
        callback(); // Alternatively: callback(new Error());
    });
}
/*
 router.get('/byMarket', function(req, res, next) {
 Order.find({ market : req.query.marketId }, function(err, orderList)
 {
 if (err)
 {
 res.send({success : false, message : 'No market with that ID',errcode : 9});
 }
 else {
 createFullOrders(res, orderList);
 }
 });
 });*/

router.get('/byId', function (req, res, next) {

    Order.findById(req.query.id, function (err, order) {
        if (err) {
            res.send({success: false, message: 'No order with that ID', errcode: 10});
        }
        else {
            createFullOrder(res, order);
        }
    });
});

router.get('/byUser', function (req, res, next) {
    Order.find({buyer: req.query.userId}, function (err, orderList) {
        if (err) {
            res.send({success: false, message: 'No order with that user ID', errcode: 10});
        }
        else {
            createFullOrders(res, orderList);
        }
    });
});

router.post('/', function (req, res, next) {

    var newOrder = new Order({
        products: req.body.products,
        payment: req.body.payment,
        buyer: req.body.buyer,
        total: req.body.total,
        date: new Date()
    });
    newOrder.save(function (err) {
        if (err) {
            res.send({success: false, fail: err});
        }
        else {
            res.send({success: true});
        }
    });

});

module.exports = router;
