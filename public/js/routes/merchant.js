/**
 * Created by msudalaiyandi.
 */

define([
    'jquery',
    'underscore',
    'routes/helper'
], function ($, _, SubRouteHelper) {

    'use strict';

    return SubRouteHelper.extend({

        routes: {
            '': 'showRegister',
            'register': 'showRegister'
        },

        loadView: function (type, args) {
            var name;

            // Default to 'index'
            type = type || 'register';

            if (!this.merchantView) {
                name = 'merchant/register';

                this.showView({
                    name: name,
                    args: args,
                    afterRender: false,
                    callback: $.proxy(function(view) {
                        this.merchantView = view;
                        this.loadView(type, args);
                    }, this)
                });
                return;
            }

            this.showView({
                name: 'merchant/' + type,
                args: args,
                afterRender: false,
                callback: $.proxy(function(view) {
                    if (view) {
                        this.view = view;
                        this.view.options = args;
                    }
                    // Ensure moneyView (master view) goes first.
                    //if (this.panels.indexOf(type) > -1 && this.view.afterRoute && this.moneyView !== this.view) {
                    //	this.moneyView.afterRoute(type);
                    //} else {
                    this.view.afterRoute(type);
                    //}
                }, this)
            });
        },

        showRegister: function () {
            this.loadView('register');
        },

        noop: $.noop
    });

});
