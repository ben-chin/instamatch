var app = app || {};

app.TagView = Backbone.View.extend({

	tagName: 'li',
	className: 'tag',

	template: _.template($('#tag-template').html()),

	initialize: function () {
		this.listenTo(this.model, 'change', this.render);

		this.$el.draggable({
			revert: 'invalid',
			snap: '.tag-holder',
			snapMode: 'inner',
			snapTolerance: 50
		});
	},

	render: function () {
		this.$el.html(this.template(this.model.attributes));
		this.$el.data('tagName', this.model.get('name'));
		return this;
	}

});