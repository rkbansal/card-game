const assert = require('assert');
const playerCollection = require('./playerCollection');

function assertPlayers(expected, actual){
	console.log(expected, actual);
	if(expected.length !== actual.length){
		return false;
	}
	for(let i=0, len = expected.length; i<len; i++){
		if(expected[i] != actual[i]){
			return false
		}
	}
	return true;
}

describe("Testing game end to end", function(){
	it("Test Case 1 : A trail (three cards of the same number) is the highest possible combination.", function(){
		let collection = new playerCollection();
		collection.startGame([
		"J","J","J",	//this set will be given to the 4th player, id: 4
		"K","K","K", 	//this set will be given to the 3rd player, id: 3
		"2","2","2",	//this set will be given to the 2nd player, id: 2
		"A","K","Q",	//this set will be given to the 1st player, id: 1
		]);
		
		const player = collection.determineWinner();
		assert.equal(3, player);
	});

	it("Test Case 2 : The next highest is a sequence (numbers in order, e.g., 4,5,6. A is considered to have a value of 1).", function(){
		let collection = new playerCollection();
		collection.startGame([
		"2","3","4",	//this set will be given to the 4th player, id: 4
		"J","J","A",	//this set will be given to the 3rd player, id: 3
		"J","Q","K",	//this set will be given to the 2nd player, id: 2
		"A","K","Q",	//this set will be given to the 1st player, id: 1
		]);
		
		const player = collection.determineWinner();
		assert.equal(2, player);
	});

	it("Test Case 3 : The next highest is a pair of cards (e.g.: two Kings or two 10s)", function(){
		let collection = new playerCollection();
		collection.startGame([
		"A","3","4",	//this set will be given to the 4th player, id: 4
		"J","J","A",	//this set will be given to the 3rd player, id: 3
		"5","Q","K",	//this set will be given to the 2nd player, id: 2
		"A","K","Q",	//this set will be given to the 1st player, id: 1
		]);
		
		const player = collection.determineWinner();
		assert.equal(3, player);
	});


	it("Test Case 4 : If all else fails, the top card (by number value wins)", function(){
		let collection = new playerCollection();
		collection.startGame([
		"J","K","A",	//this set will be given to the 4th player, id: 4
		"5","Q","K",	//this set will be given to the 3rd player, id: 3
		"2","K","Q",	//this set will be given to the 2nd player, id: 2
		"A","3","4",	//this set will be given to the 1st player, id: 1
		]);
		
		const player = collection.determineWinner();
		assert.equal(2, player);
	});

	it("Test Case 5 : If the top card has the same value, each of the tied players draws a single card from the deck until a winner is found. Only the newly drawn cards are compared to decide a tie. The top card wins a tie.", function(){
		let collection = new playerCollection();
		collection.startGame([
		"7","8","9",
		"4","5","6",	//6 will assign to player1, 5 will assign to player2 like wise 4 -> player3, 9 -> player4
		"A","2","3",	//this set will be given to the 4th player, id: 4
		"A","2","3",	//this set will be given to the 3rd player, id: 3
		"A","2","3",	//this set will be given to the 2nd player, id: 2
		"A","2","3",	//this set will be given to the 1st player, id: 1
		]);
		
		const player = collection.determineWinner();
		assert.equal(4, player);
	});

	it("Test Case 6 : No one wins, it's a tie", function(){
		let collection = new playerCollection();
		collection.startGame([
			"A","2","3",	//this set will be given to the 4th player, id: 4
			"A","2","3",	//this set will be given to the 3rd player, id: 3
			"A","2","3",	//this set will be given to the 2nd player, id: 2
			"A","2","3",	//this set will be given to the 1st player, id: 1
		]);
		
		const player = collection.determineWinner();
		assert.equal(-1, player);
	});
});