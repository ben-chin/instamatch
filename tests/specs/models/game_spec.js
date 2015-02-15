/* Game Test Suite ------------------------------------------------------------
 *     Testing behaviour of the Game model
 * ------------------------------------------------------------------------- */

describe('Game Model Spec', function () {

	var feed, tagsList;

	beforeAll(function () {
		// Configure fixtures path
		jasmine.getJSONFixtures().fixturesPath = 'tests/specs/fixtures';

	});

	beforeEach(function () {
		feed = new app.FeedCollection();
		tagsList = new app.TagCollection();
	});


	describe('Simple Game Feed tests', function () {
		var game, simpleResponse, ajaxOptsSpy;
		
		beforeEach(function () {
			simpleResponse = getJSONFixture('simplegamefeed.json');

			ajaxOptsSpy = jasmine.createSpy('ajaxOptsSpy');
			spyOn($, 'ajax').and.callFake(function (options) {
				ajaxOptsSpy(options);
	         	options.success(simpleResponse);
	      	});

			game = new app.GameModel({
				tags: tagsList,
				feed: feed
			});
		
		});

		// Tear down for each test
		afterEach(function () {

		});

		/* Test cases ------------------------------------------------ */

		// Make sure AJAX request in fetch is going to the right place
		it('should call the correct API endpoint', function () {
			var opts = ajaxOptsSpy.calls.mostRecent().args[0];
			expect(opts.url).toBe('/api/v1/game/feed/');
			expect(opts.type).toBe('GET');
		});

		// Check game facts on initialization
		it('should set the correct game facts on receiving response', function () {
			spyOn(game, 'setGameFacts')
				.and.callThrough();

			game.setGameFacts();

			expect(game.setGameFacts).toHaveBeenCalled();
			expect(game.get('lives')).toEqual(3);
			expect(game.get('num_matches')).toEqual(0);
			expect(game.get('matches')).toEqual({});
		});

		// Tags and feed should be same length
		it('should populate the same number of feeds as tags', function () {
			expect(game.get('tags').length).toEqual(2);
			expect(game.get('feed').length).toEqual(2);
			expect(game.get('tags').length).toEqual(game.get('feed').length);
		});

		
		describe('Matching logic tests', function () {
			
			beforeEach(function () {
				game.setGameFacts();
			});
			
			// Trigger match - num_matches should increase by 1
			it('should increment the number of matches by 1 on a match', function () {
				var numMatches = game.get('num_matches');

				game.get('feed').trigger('match');

				expect(numMatches + 1).toEqual(game.get('num_matches'));
			});

			// Trigger match - matches should now have new key
			it('should add a new key to matches on a match', function () {
				expect(game.get('matches')).toEqual({});

				game.get('feed').trigger('match', 'exampletag');

				expect(_.size(game.get('matches'))).toEqual(1);
				expect(game.get('matches')).toEqual(jasmine.objectContaining({
					'exampletag': true
				}));
			});

			// Trigger mismatch - lives should decrease by 1
			it('should decrement number of lives by 1 on a mismatch', function () {
				var numLives = game.get('lives');

				game.get('feed').trigger('mismatch');

				expect(numLives - 1).toEqual(game.get('lives'));
				expect(game.get('lives') >= 0).toBeTruthy();
			});
			
		});
		
		describe('Game results logic', function () {
			var endGameSpy;

			beforeEach(function () {
				game.setGameFacts();
				endGameSpy = jasmine.createSpy('endGame');
				game.on('endGame', endGameSpy);
			});

			// Game is won when matches for all items are found
			it('should fire endGame event with winner = true, on all matches', function () {
				_.each(game.get('feed'), function () {
					game.get('feed').trigger('match');
				});

				expect(endGameSpy).toHaveBeenCalledWith(true);
			});

			// Game is lost when as many mismatches as lives occur
			it('should fire endGame event with winner = false, on too many mismatches', function () {
				_.times(game.get('lives'), function () {
					game.get('feed').trigger('mismatch');
				});

				expect(endGameSpy).toHaveBeenCalledWith(false);
			});

		});

	});

});