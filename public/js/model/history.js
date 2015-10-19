/*
 * This model stores the last 10 pages visited, which we'll pass to CAL
 * Thus when analyzing CAL log, we have clearer context about where user have been
 */
define([
	'backbone'
], function (Backbone) {

	'use strict';

	var HistoryModel = Backbone.Model.extend({

		CONST_MAX_PAGE: 10,

		path: [],

		addPath: function (path) {
			if (this.path.length === this.CONST_MAX_PAGE) {
				this.path.shift();
			}
			this.path.push(path);
		},

		getPath: function () {
			return this.path.join(' > ');
		}
	});

	return new HistoryModel();

});
