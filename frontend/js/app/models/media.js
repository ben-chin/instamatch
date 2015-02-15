var app = app || {};

app.MediaModel = Backbone.Model.extend({
	defaults: {
		id: null,
		caption: null,
		image: null,
		tags: null
	}
});