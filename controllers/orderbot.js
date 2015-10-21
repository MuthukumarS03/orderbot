'use strict';

var _ = require('underscore'),
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
    }
};
