/**
 * Created by msudalaiyandi
 */
'use strict';

module.exports = function () {

    return function (req, res, next) {

        //Initialize req.model
        req.model = req.model || {};

        //Add Context path to the model
        req.model.contextPath = req.app.kraken.get('requestURI');


        next();
    };
};