/**
 * Created by msudalaiyandi.
 */

'use strict';

define([
    'jquery',
    'underscore',
    'BaseView',
    'model/merchant',
    'backboneValidation'
], function($, _, BaseView, merchantModel) {

    var RegisterView = BaseView.extend({

        el: '#register',

        model: merchantModel,

        events: {
            'click #submit': 'submit',
            'focusout #businessName': 'validateErrorField',
            'focusout #firstName': 'validateErrorField',
            'focusout #lastName': 'validateErrorField',
            'focusout #email': 'validateErrorField',
            'focusout #street': 'validateErrorField',
            'focusout #city': 'validateErrorField',
            'focusout #zipcode': 'validateErrorField',
            'focusout #phone': 'validateErrorField',
            'focusout #dob': 'validateErrorField',
            'focusout #ssn': 'validateErrorField',
            'focusout #taxId': 'validateErrorField',
            'focusout #bankName': 'validateErrorField',
            'focusout #bankAcctNo': 'validateErrorField',
            'focusout #bankRoutingNo': 'validateErrorField'

        },

        initialize: function () {

        },

        validateErrorField: function (event) {
            var currentTarget = this.$(event.currentTarget);
            if(currentTarget.val().length !== 0) {
                currentTarget.removeClass('hasError');
            }

        },

        loadModel: function () {
            this.model.set({
                businessName: this.$('#businessName').val(),
                firstName: this.$('#firstName').val(),
                lastName: this.$('#lastName').val(),
                email: this.$('#email').val(),
                street: this.$('#street').val(),
                city: this.$('#city').val(),
                state: this.$('#state').val(),
                zipcode: this.$('#zipcode').val(),
                phone: this.$('#phone').val(),

                dob: this.$('#dob').val(),
                ssn: this.$('#ssn').val(),
                taxId: this.$('#taxId').val(),
                bankName: this.$('#bankName').val(),
                bankAcctNo: this.$('#bankAcctNo').val(),
                bankRoutingNo: this.$('#bankRoutingNo').val()
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

            // On successful validation submit the form values.
            this.model.save();
            console.log('model.save called..!!!! ');

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