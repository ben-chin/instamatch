var app = app || {};

app.FeedView = Backbone.View.extend({

	el: '#feed',

	initialize: function () {
		this.listenTo(this.collection, 'reset', this.resetView);
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reveal', this.reveal);
	},

	// Adds a new pic view for each feed item in collection
	addOne: function (picModel) {
		var view = new app.PicView({ model: picModel });
		this.$el.append(view.render().el);
	},

	resetView: function () {
		this.$el.empty();
	},

	reveal: function (tagList) {
		this.collection.each(function (picModel) {
			// Search picture tags for matched tags 
			var matched = _.find(
				picModel.get('tags'), 
				function (tag) { 
					var l = _.map(tagList, function (t) {
						return t.attributes.name;
					});
					return _.contains(l, tag); 
				});

			picModel.trigger('revealTag', matched);
		});
	}

});