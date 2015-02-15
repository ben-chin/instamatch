var app = app || {};

app.TagListView = Backbone.View.extend({

	el: '.tags-list',

	initialize: function () {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.resetView);
	},

	addOne: function (tagModel) {
		var view = new app.TagView({ model: tagModel });
		this.$el.append(view.render().el);
	},

	addAll: function () {
		this.$el.html();
		this.collection.each(this.addOne, this);
	},
	
	resetView: function () {
		this.$el.empty();
	},

});