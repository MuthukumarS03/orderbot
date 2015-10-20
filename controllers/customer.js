/**
 * Created by msudalaiyandi.
 */

'use strict';

var _ = require('underscore'),
    customerModel = require('../models/customer-model');

module.exports = {

    handleView: function (req, res, next) {


        var model = {
            viewName: 'customer/register',
            items: customerModel.getItems()
        };
        _.extend(req.model, model);

        next();
    },

    create: function (req, res, next) {

        console.log('Customer details : ' + JSON.stringify(req.body));


        // For error response set the message as below.
        //req.model.error={
        //    message: 'Registration failed'
        //};

        next();
    }
};