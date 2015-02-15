var app = app || {};

app.PicView = Backbone.View.extend({

	tagName: 'li',
	className: 'col-sm-3 col-xs-6',

	template: _.template($('#pic-template').html()),

	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'revealTag', this.revealTag);
	},

	render: function () {
		this.$el
			.hide()
			.html(this.template(this.model.attributes))
			.fadeIn('slow');
		
		this.$('.tag-holder').droppable({
			accept: '.tag',
			tolerance: 'intersect',
			activeClass: 'drop-active',
			hoverClass: 'drop-hover',
			drop: function (e, ui) {
				$(e.target).droppable('option', 'accept', ui.draggable);
				var match = this.isMatchFound(ui.draggable.data('tagName'));

				if (match) {
					this.model.trigger('match', ui.draggable.text());
					$(e.target).siblings('img').addClass('matched');
					ui.draggable.draggable('option', 'disabled', true);
					ui.draggable.removeClass('mismatched').addClass('matched');
				} else {
					this.model.trigger('mismatch');
					ui.draggable.addClass('mismatched');

					// Brief pause to show mismatch and then revert tag
					setTimeout(function () {
						$(e.target).droppable('option', 'accept', '.tag');
						ui.draggable.animate({ left: 0, top: 0});
						ui.draggable.css('width', '');
						ui.draggable.removeClass('mismatched');
					}, 500);
				}
			}.bind(this),
			over: function (e, ui) {
				ui.draggable.data('origWidth', ui.draggable.css('width'));
				ui.draggable.css('width', $(this).css('width'));
				ui.draggable.addClass('tag-over');
			},
			out: function (e, ui) {
				$(this).droppable('option', 'accept', '.tag');
				ui.draggable.css('width', '');
				ui.draggable.removeClass('tag-over mismatched');
			}
		});

		return this;
	},

	// End of game - show all
	revealTag: function (tag) {
		this.$('.tag-holder span').addClass('revealed').text('#' + tag);
	},

	isMatchFound: function (potentialTag) {
		return _.contains(this.model.get('tags'), potentialTag);
	}

});