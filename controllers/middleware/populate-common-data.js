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

        //Generate Braintree clientToken and save it in req.model
        middlewareUtils.generateBTClientToken(req, next);
    };
};