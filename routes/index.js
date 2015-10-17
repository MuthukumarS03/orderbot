/**
 * Created by msudalaiyandi
 */

'use strict';

var orderbotController = require('../controllers/orderbot'),
    responses = require('../lib/responses');

module.exports = function (router) {

    router.get('/', orderbotController.handleView, responses.renderHTMLandJSON);

};
