/**
 * Created by msudalaiyandi.
 */

'use strict';

define([
    'jquery',
    'underscore',
    'BaseView',
    'model/customer',
    'backboneValidation'
], function($, _, BaseView, customerModel) {

    var RegisterView = BaseView.extend({

        el: '#register',

        model: customerModel,

        events: {
            'click #submit': 'submit',
            'focusout #firstName': 'validateErrorField',
            'focusout #lastName': 'validateErrorField',
            'focusout #email': 'validateErrorField',
            'focusout #address': 'validateErrorField',
            'focusout #phone': 'validateErrorField',
            'focusout #ccNo': 'validateErrorField',
            'focusout #cvv': 'validateErrorField',
            'focusout #nameOnCard': 'validateErrorField',
            'focusout #deviceMac': 'validateErrorField',
            'focusout #itemId': 'validateErrorField'

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
                firstName: this.$('#firstName').val(),
                lastName: this.$('#lastName').val(),
                email: this.$('#email').val(),
                address: this.$('#address').val(),
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
            console.log('submit success..!!! ')
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
            alert('inside serialize');

            return customerModel.toJSON();

        }

    });
    return RegisterView;
});