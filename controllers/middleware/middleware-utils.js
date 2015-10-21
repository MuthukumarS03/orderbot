/**
 * Created by msudalaiyandi.
 */

'use strict';
var braintree = require('braintree');

module.exports = {

    generateBTClientToken: function (req, next) {
        var gateway = braintree.connect({
            environment: braintree.Environment.Sandbox,
            merchantId: 'xzy2672yq6ct227c',
            publicKey: '42hvjkd7gt3gk6q9',
            privateKey: '812157ed805e2b9360dcb568a80d36ee'
        });
        gateway.clientToken.generate({}, function (err, res) {
            req.model.clientToken = res.clientToken;
            next();
        });
    }
};

