/**
 * Created by msudalaiyandi
 */
'use strict';

module.exports = function () {

    return function (req, res, next) {

        //Initialize req.model
        req.model = req.model || {};

        next();
    };
};