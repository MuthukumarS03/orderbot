'use strict';

var _ = require('underscore'),
    request = require('request'),
    orderBotModel = require('../models/orderbot-model');

module.exports = {
    handleView: function (req, res, next) {
        var model = {
            viewName: 'index',
            name: 'Order Bot'
        };
        _.extend(req.model, model);

        next();
    },

    initiateOrder: function (req, res, next) {

        console.log('req.body :  ' + JSON.stringify(req.body));

        orderBotModel.initiateOrder(req, res, function (err, result) {

            //Do something with the order status.
            console.log('Order result : ' + JSON.stringify(result));
            req.model = result;
            next();
        });
    },

    getCSRFToken: function (req, res, next) {
        res.json({
            csrf_token: res.locals._csrf
        });
    },

    testPost: function(req, res) {
        request.post({
            url: 'http://localhost:8002/orderbot/order/create',
            formData: {
                mac_id: 'MAC-ID'
            }
        }, function (err, result, body) {
            console.log('result : ' + result.statusCode);
            console.log('body : ' + body);
            res.send('request test completed');

        });

        //request.get('http://localhost:8002/orderbot/csrf_token', function (err, result, body) {
        //
        //    console.log('result : ' + result.statusCode);
        //    console.log('body : ' + body);
        //    res.send('request-get test completed');
        //
        //});

    }
};
