/**
 * Created by msudalaiyandi.
 */

'use strict';

var merchantController = require('../controllers/merchant'),
    responses = require('../lib/responses');

module.exports = function (router) {

    router.get('/register', merchantController.register, responses.renderHTMLandJSON);

    router.post('/create', merchantController.create, responses.renderJSON);


    router.get('/*', function (req, res) {
        var requestURI = req.app.kraken.get('requestURI');
        res.redirect(requestURI + '/merchant/register');

    });


};
