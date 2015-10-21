/**
 * Created by msudalaiyandi.
 */

'use strict';

define([
    'jquery',
    'underscore',
    'BaseView',
    'braintree',
    'model/customer',
    'backboneValidation'
], function($, _, BaseView, Braintree, customerModel) {

    var RegisterView = BaseView.extend({

        el: '#register',

        events: {
            'click #submit': 'submit',
            'focusout #firstName': 'validateErrorField',
            'focusout #lastName': 'validateErrorField',
            'focusout #email': 'validateErrorField',
            'focusout #street': 'validateErrorField',
            'focusout #city': 'validateErrorField',
            'focusout #zipcode': 'validateErrorField',
            'focusout #phone': 'validateErrorField',
            'focusout #ccNo': 'validateErrorField',
            'focusout #cvv': 'validateErrorField',
            'focusout #nameOnCard': 'validateErrorField',
            'focusout #deviceMac': 'validateErrorField',
            'focusout #itemId': 'validateErrorField'

        },

        initialize: function () {
            this.clientToken = this.$el.data('clientToken');
            this.model= customerModel;

        },

        validateErrorField: function (event) {
            var currentTarget = this.$(event.currentTarget);
            if(currentTarget.val().length !== 0) {
                currentTarget.removeClass('hasError');
            }

        },

        getPaymentMethodNonce: function (callback) {
            var client = new Braintree.api.Client({clientToken: this.clientToken});
            client.tokenizeCard({
                number: this.model.get('ccNo'),
                expirationDate: this.model.get('ccExpMonth') +  '/' + this.model.get('ccExpYear').substring(this.model.get('ccExpYear').length-2)
            }, function (err, nonce) {
                callback(nonce);
            });
        },

        loadModel: function () {
            this.model.set({
                firstName: this.$('#firstName').val(),
                lastName: this.$('#lastName').val(),
                email: this.$('#email').val(),
                street: this.$('#street').val(),
                city: this.$('#city').val(),
                state: this.$('#state').val(),
                zipcode: this.$('#zipcode').val(),
                phone: this.$('#phone').val(),
                ccNo: this.$('#ccNo').val(),
                ccExpMonth: this.$('#ccExpMonth').val(),
                ccExpYear: this.$('#ccExpYear').val(),
                cvv: this.$('#cvv').val(),
                nameOnCard: this.$('#nameOnCard').val(),
                deviceMac: this.$('#deviceMac').val(),
                itemId: this.$('#itemId').val()
            });
        },

        onSubmitError: function (model, response, message) {
            this.$('#feedback').addClass('show errorMsg').removeClass('hide').text(message);
        },

        onSubmitSuccess: function () {
            this.$('#feedback').addClass('show successMsg').removeClass('hide').text('Registration Successful.');
        },

        submit: function () {

            // Remove feedback message if any.
            this.$('#feedback').addClass('hide').removeClass('show').text('');

            // load form values to model.
            this.loadModel();

            // Validate Form values
            var validationError = this.model.validate();
            if(validationError) {

                //Show error on Validation error.
                _.each(_.keys(validationError), function(errorField) {
                    this.$('#'+errorField).addClass('hasError');
                }.bind(this));
                this.$('#feedback').addClass('show errorMsg').removeClass('hide').text('Please enter all required values.');
                return;
            }

            // listen to response of form submission.
            this.listenToOnce(this.model, 'error', this.onSubmitError);
            this.listenToOnce(this.model, 'sync', this.onSubmitSuccess);

            this.getPaymentMethodNonce(function (nonce) {
                this.model.set('paymentMethodNonce',nonce);

                // On successful validation submit the form values.
                this.model.save();
                console.log('model.save called..!!!! ');
            }.bind(this));
        },

        afterRoute: function () {

            // Bind validation.
            Backbone.Validation.bind(this);

        },

        serialize: function () {
            return customerModel.toJSON();
        }

    });
    return RegisterView;
});