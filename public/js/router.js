define([
	'jquery',
	'underscore',
	'backbone',
	'nougat',
	'constants',
	'view/global',
    'routes/customer'
], function ($, _, Backbone, nougat, constants, GlobalPageView, CustomerRoute) {

	'use strict';

	return Backbone.Router.extend({

		/* Detect if the browser supports HTML5 push state */
		hasPushState: window.history && 'pushState' in window.history,

		/**
		 * Register all the interesting URIs that will fire off generic or specific functionality
		 */
		routes: {
			'customer(/*subroute)': 'invokeCustomer'
			/* No generic route to avoid downloading/initializing JS files that do not exist */
		},

		/**
		 * Important setup to start using the router.
		 */
		initialize: function() {

			// Get current fragment or current path for route for non pushState browsers
			var hash = window.location.hash,
				fragment = (hash && hash.length === 0) ? hash : window.location.pathname.substr(constants.ROOT.length);

			// set the default templates path depending on the value from json contract
			//alert('Context : ' + JSON.stringify($(document.body).data()));
			nougat.setContext($(document.body).data());

			this.globalPageView = new GlobalPageView();

			Backbone.history.start({
				silent: true, // Add hashUrl before executing the route for IE
				pushState: this.hasPushState, // Use HTML5 Push State if it's supported
				root: constants.ROOT // Initial path for app
			});

			// Load the initial route, using pushstate if supported, hashUrl if not
			if (this.hasPushState) {
				Backbone.history.loadUrl(Backbone.history.getFragment());
			} else {
				var rootLength = Backbone.history.options.root.length;
				// Get current fragment or current path for route for non pushState browsers
				fragment = window.location.hash || window.location.pathname.substr(rootLength);

				// Clear the history for IE for refreshing the page
				Backbone.history.fragment = null;
				$(window).scrollTop();

				Backbone.history.navigate(fragment, { trigger: true, replace: true });
			}
		},

        invokeCustomer: function () {
            if (!this.CustomerRoute) {
                this.CustomerRoute = new CustomerRoute('customer', {createTrailingSlashRoutes: true});
			}
		}
	});

});
