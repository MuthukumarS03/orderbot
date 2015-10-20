/**
 * Created by msudalaiyandi.
 */

'use strict';
define([
    'backbone'
], function (Backbone) {

    var CustomerModel = Backbone.Model.extend({

        validation: {
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
            ccNo: {
                pattern: 'digits',
                required: true
            },
            cvv: {
                pattern: 'digits',
                required: true
            },
            nameOnCard: {
                required: true
            },
            deviceMac: {
                required: true
            },
            itemId: {
                required: true
            }

        },

        url: function() {
            return Backbone.history.options.root + 'customer/create';
        },

        parse: function (response) {
            return response.data;
        }

    });

    return new CustomerModel();

});