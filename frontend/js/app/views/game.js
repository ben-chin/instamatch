var app = app || {};

app.GameView = Backbone.View.extend({

	el: '#content',

	messageTemplate: _.template($('#message-template').html()),
	
	events: {
		'click #reset-game': 'resetGame'
	},

	initialize: function () {
		this.addLoading();
		
		this.listenTo(this.model, 'sync', this.removeLoading);
		this.listenTo(this.model, 'sync', this.populateMobileTags);
		this.listenTo(this.model, 'endGame', this.endGame);
	},

	// Make loading indicator visible
	addLoading: function () {
		this.$('.main')
			.prepend(
				'<div class="loading-indicator">'	+
					'<span>Loading...</span>'		+
			 	'</div>'
			)
			.find('.loading-indicator').hide().fadeIn('slow');
	},

	removeLoading: function () {
		this.$('.loading-indicator').fadeOut('slow').remove();
	},

	// Called when game has ended - disables interactions
	// and takes appropriate action based on winner or loser
	endGame: function (isWinner) {
		// Deactivate interactions
		this.$('.tag-holder').droppable('option', 'disabled', true);
		this.$('.tag').draggable('option', 'disabled', true);

		if (isWinner) {
			this.renderWinner();
		} else {
			this.renderLoser();
		}
	},

	resetGame: function () {
		this.model.fetch();
		this.addLoading();

		// Remove message
		var $overlay = this.$('.overlay');
		$overlay
			.addClass('fadeOut')
			// Only remove after animation complete
			.one(
				'webkitAnimationEnd oanimationend msAnimationEnd animationend',
		    	function () {
		    		$overlay.remove();
		    	});
	},

	renderWinner: function () {
		var message = {
			heading: 'Nice one!',
			subheading: '#swag #goodgame',
			resetText: 'Play again'
		};

		// Fade in message
		this.$('.main')
			.prepend(this.messageTemplate(message))
			.find('.overlay').hide().fadeIn('slow');
	},

	renderLoser: function () {
		// Show answers
		this.model.get('feed').trigger('reveal', this.model.get('tags').models);
		var message = {
			heading: 'Unlucky!',
			subheading: '#betterlucknexttime',
			resetText: 'Try again'
		};

		// Allow user to glimpse answers before reset
		setTimeout(function () {
			this.$('.main')
				.prepend(this.messageTemplate(message))
				.find('.overlay').hide().fadeIn('slow');
		}.bind(this), 2500);
	},

	populateMobileTags: function () {
		this.model.get('feed')
			.trigger('populateMobileTags', this.model.get('tags').models);
	}

});

