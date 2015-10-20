/**
 * Created by msudalaiyandi.
 */
'use strict';
var _ = require('underscore'),
    merchantModel = require('../models/merchant-model');

module.exports = {

    register: function (req, res, next) {
        _.extend(req.model, {
            viewName: 'merchant/register'
        });

        // Load data required for Merchant registration.
        merchantModel.loadData(req);

        next();
    },

    create: function (req, res, next) {

        console.log('Merchant details : ' + JSON.stringify(req.body));


        // For error response set the message as below.
        //req.model.error={
        //    message: 'Registration failed'
        //};

        next();
    }
};