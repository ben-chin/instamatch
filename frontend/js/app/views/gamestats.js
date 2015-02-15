var app = app || {};

app.GameStatsView = Backbone.View.extend({

	el: '#game-stats',

	template: _.template($('#stats-template').html()),

	initialize: function () {
		this.listenTo(this.model, 'initialized', this.setUp);
	},

	setUp: function () {
		this.listenTo(this.model, 'change:lives', this.refreshLives);
		this.listenTo(this.model, 'change:num_matches', this.refreshPoints);
		this.render();
	},

	render: function () {
		this.$el.html(this.template(this.model.attributes));
	},

	refreshLives: function () {
		var $stat = this.$('.lives .value');
		$stat
			.addClass('changed')
			// Remove the flash animation class only when animation finished
			.one(
				'webkitAnimationEnd oanimationend msAnimationEnd animationend',
			    function () {
			    	$stat.removeClass('changed');
					this.render();
			  	}.bind(this));
	},

	refreshPoints: function () {
		var $stat = this.$('.points .value');
		$stat
			.addClass('changed')
			// Remove the flash animation class only when animation finished
			.one(
				'webkitAnimationEnd oanimationend msAnimationEnd animationend',
			    function () {
			    	$stat.removeClass('changed');
					this.render();
			  	}.bind(this));
	}


});