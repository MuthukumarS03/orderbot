/**
 * Created by msudalaiyandi.
 */

'use strict';

var customerController = require('../controllers/customer'),
    responses = require('../lib/responses');

module.exports =  function(router) {

    router.get('/', customerController.create, responses.renderHTMLandJSON);
};