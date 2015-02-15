var app = app || {};


$(function () {
	
	var feed = new app.FeedCollection();
	var tagsList = new app.TagCollection();
	var game = new app.GameModel({
		tags: tagsList,
		feed: feed
	});

	// Instantiate Tag and Picture views 
	new app.TagListView({collection: tagsList});
	new app.FeedView({collection: feed});

	// Instantiate main game view (kicking off the game)
	new app.GameView({model: game});
	new app.GameStatsView({model: game});

});