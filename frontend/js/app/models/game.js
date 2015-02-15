var app = app || {};

app.GameModel = Backbone.Model.extend({

	url: '/api/v1/game/feed/',

	initialize: function () {
		this.fetch();
		this.on('sync', this.setGameFacts, this);

		this.listenTo(this.get('feed'), 'mismatch', this.onMismatch);
		this.listenTo(this.get('feed'), 'match', this.onMatch);
	},

	parse: function (response) {
		var tagCollection = this.get('tags');
		var feedCollection = this.get('feed');

		// Make sure collections are now empty
		tagCollection.reset();
		feedCollection.reset();

		// Randomise!
		var randomTags = _.shuffle(response.tags);

		tagCollection.add(randomTags);
		feedCollection.add(response.images);
	},

	// Initialize game state
	setGameFacts: function () {
		this.set('gameWon', false);
		this.set('matches', {});
		this.set('num_matches', 0);
		this.set('num_items', this.get('feed').length);
		
		// Lives depends on how many items come through
		if (this.get('num_items') <= 9) {
			this.set('lives', 3);
		} else {
			this.set('lives', 5);
		}

		this.trigger('initialized');
	},

	// Update game state on incorrect guess
	onMismatch: function () {
		this.set('lives', this.get('lives') - 1);
		
		if (this.isGameLost()) {
			this.trigger('endGame', false);
		}
	},

	// Update game state on correct guess
	onMatch: function (tag) {
		var matches = this.get('matches');
		matches[tag] = true;
		this.set('num_matches', this.get('num_matches') + 1);

		if (this.isGameWon()) {
			this.trigger('endGame', true);
		}
		
	},

	isGameWon: function () {
		return this.get('num_matches') == this.get('num_items');
	},

	isGameLost: function () {
		return this.get('lives') <= 0;
	}

});