/**
 * Created by msudalaiyandi.
 */

'use strict';

var _ = require('underscore');

module.exports = {

    create: function (req, res, next) {
        var model = {
            viewName: 'customer/register'
        };
        _.extend(req.model, model);

        next();
    }
};