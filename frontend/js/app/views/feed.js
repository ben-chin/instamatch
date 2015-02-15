var app = app || {};

app.FeedView = Backbone.View.extend({

	el: '#feed',

	initialize: function () {
		this.listenTo(this.collection, 'reset', this.resetView);
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reveal', this.reveal);
		this.listenTo(this.collection, 'removeTag', this.removeTag);
		this.listenTo(this.collection, 'populateMobileTags',
					  this.renderMobileTags);
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
		var tags = _.map(tagList, function (t) { return t.attributes.name; });
		
		this.collection.each(function (picModel) {
			// Search picture tags for matched tags 
			var matched = _.find(
				picModel.get('tags'), 
				function (tag) { 
					return _.contains(tags, tag); 
				});

			picModel.trigger('revealTag', matched);
		});
	},

	// Gameplay for mobile
	renderMobileTags: function (tagList) {
		var tags = _.map(tagList, function (t) { return t.attributes.name; });

		this.collection.each(function (picModel) {
			picModel.trigger('renderMobileTags', tags);
		});
	},

	removeTag: function (tag, matchedModel) {
		this.collection.each(function (picModel) {
			// Don't remove the matchedModel's tag or it 
			// won't show up!
			if (matchedModel !== picModel) {
				picModel.trigger('removeMobileTag', tag);
			}
		});
	}

});