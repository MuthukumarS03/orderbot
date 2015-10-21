/**
 * Created by msudalaiyandi
 */
'use strict';

var middlewareUtils = require('./middleware-utils');
module.exports = function () {

    return function (req, res, next) {

        //Initialize req.model
        req.model = req.model || {};

        //Add Context path to the model
        req.model.contextPath = req.app.kraken.get('requestURI');

        //populate template base path
        req.model.templateBasePath = req.app.kraken.get('requestURI') + '/templates/US/en/%s.js';


        var url = req.originalUrl;

        // No need to generate Braintree token for Order flow.
        if(url && (url.indexOf('/customer/register')!==-1 || url.indexOf('/merchant/register')!==-1)) {
            //Generate Braintree clientToken and save it in req.model
            middlewareUtils.generateBTClientToken(req, next);
        } else {
            next();
        }
    };
};