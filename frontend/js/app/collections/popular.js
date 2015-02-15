var app = app || {};

app.PopularCollection = Backbone.Collection.extend({

	model: app.MediaModel,

	url: '/api/v1/popular',

	// Make sure we have at least one hashtag
	parse: function (response) {
		return _.filter(response, function (media) {
			return media.tags.length > 0;
		});
	}

});