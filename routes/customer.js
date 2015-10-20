/**
 * Created by msudalaiyandi.
 */

'use strict';

var customerController = require('../controllers/customer'),
    responses = require('../lib/responses');

module.exports =  function(router) {

    router.get('/register', customerController.handleView, responses.renderHTMLandJSON);

    router.post('/create', customerController.create, responses.renderJSON);

    router.get('/*', function (req, res) {
        var requestURI = req.app.kraken.get('requestURI');
        res.redirect(requestURI+ '/customer/register');
    });
};