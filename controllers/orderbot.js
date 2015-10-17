'use strict';

var _ = require('underscore');

module.exports = {
    handleView: function (req, res, next) {
        var model = {
            viewName: 'index',
            name: 'Order Bot'
        };
        _.extend(req.model, model);

        next();
    }
};
