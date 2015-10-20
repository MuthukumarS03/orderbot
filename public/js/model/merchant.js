/**
 * Created by msudalaiyandi.
 */

'use strict';
define([
    'backbone'
], function (Backbone) {

    var MerchantModel = Backbone.Model.extend({

        validation: {
            businessName: {
                required: true
            },
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            email: {
                pattern: 'email',
                required: true
            },
            street: {
                required: true
            },
            city: {
                required: true
            },
            state: {
                required: true
            },
            zipcode: {
                pattern: 'digits',
                required: true
            },
            phone: {
                pattern: 'digits',
                required: true
            },
            dob: {
                pattern: '^\\d{1,2}\/\\d{1,2}\/\\d{4}$',
                required: true
            },
            ssn: {
                pattern: 'digits',
                required: true
            },
            taxId: {
                pattern: 'digits',
                required: true
            },
            bankName: {
                required: true
            },
            bankAcctNo: {
                pattern: 'digits',
                required: true
            },
            bankRoutingNo: {
                pattern: 'digits',
                required: true
            }

        },

        url: function() {
            return Backbone.history.options.root + 'merchant/create';
        },

        parse: function (response) {
            return response.data;
        }

    });

    return new MerchantModel();

});