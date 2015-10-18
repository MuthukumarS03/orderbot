define([
	'backbone',
], function (Backbone, nougat, constants, SettingsRoute, GlobalPageView) {

	'use strict';

	return Backbone.View.extend({

	el: 'body',
	events: {
		'click a[data-push-replace]': 'pushStateAnchors',
		'click .popup': 'popup',
		'click .print-btn': 'initiatePrint'
	},

	initialize: function () {
		// listen to if the mainContents should be hidden
		this.listenTo(Backbone, 'shouldHideContents', this.shouldHideContents);
	},

	/**
	 * Toggles the hiding of the main #contents since the #overpanel is outside of it
	 * @param hide
	 */
	shouldHideContents: function (hide) {
		this.$('.mainContents').toggleClass('hide', hide);
	},

	/**
	 *	When clicking anchors with that [data-push-replace] attribute, we want to use Backbone's navigate
	 * @param event		click event
	 */
	pushStateAnchors: function(event) {
		event.preventDefault();
		var currentTarget = event.currentTarget,
			href = currentTarget.getAttribute('href'),
			isReplace = currentTarget.getAttribute('data-push-replace');

		// Coerce strings to booleans because backbone does truthy tests on 'isReplace'.
		isReplace = (isReplace === 'true') ? true : false;

		href = href.replace(Backbone.history.options.root, ''); // remove root
		Backbone.history.navigate(href, {trigger: true, replace: isReplace});

		// trigger pushed state event
		// @arg this.$(currentTarget) the target that pushed the route change
		Backbone.trigger('pushedState', this.$(currentTarget));

		return false;
	},

	/**
	 * Opens window in a new popup.
	 *
	 * @param event
	 */
	popup: function(event) {
		event.preventDefault();
		var currentTarget = event.currentTarget,
			href = currentTarget.getAttribute('href'),
			width = currentTarget.getAttribute('data-width') || '640',
			height = currentTarget.getAttribute('data-height') || '400',
			windowOptions = 'width=' + width + ', height=' + height;

		window.open(href, 'popup', windowOptions);

		return false;
	},

	/**
	 * Invoke the standard OS print dialog
	 *
	 * @param event
	 */
	initiatePrint: function (event) {
		event.preventDefault();

		window.print();
	}
	});
});
