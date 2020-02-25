const CardDeck = require('./cardDeck');
const Player = require('./player');
const rules = require('./rules');

class PlayerCollection {
	unsortedPlayers = [];
	players = [];
	playerCount = 1;
	cardDeck = {};
	cardSet = 3;
	maxPlayers = 4;

	addPlayer(){
		this.players.push(new Player(this.playerCount));
		this.unsortedPlayers = [...this.players];
		this.playerCount++;
	}

	startGame(deck){
		this.cardDeck = new CardDeck();
		this.cardDeck.shuffle(deck);
		for(let i=0; i<this.maxPlayers; i++){
			this.addPlayer();
		}
		this.distributeCards();
	}

	determineWinner(){
		this.players.sort(rules.comparator);
		const status = this.checkIfSomeWinner();
		if(!status){
			this.drawCardsAndDetermineWinner();
		}
		if(this.checkIfSomeWinner()){
			//send winner player id
			return this.players[0].id;
		}
		//if no winner is there
		return -1;
	}

	distributeCards(){
		this.players.forEach(player => {
			for(let i=0; i<this.cardSet; i++){
				player.setCard(this.cardDeck.takeOut());
			}
		});
	}

	checkIfSomeWinner(){
		let someWinner = false;
		for(let i=0, len=this.unsortedPlayers.length; i<len; i++){
			if(this.unsortedPlayers[i].id !== this.players[i].id){
				someWinner = true;
			}
		}
		return someWinner;
	}

	assignEachPlayerCardFromDeck(){
		this.players.forEach(player => {
			player.setCard(this.cardDeck.takeOut());
		});
	}

	checkWinnerByLastCard(){
		this.players.sort(rules.compareLastCard);
		return this.checkIfSomeWinner();
	}

	drawCardsAndDetermineWinner(){
		if(this.cardDeck.deck.length > 3){
			this.assignEachPlayerCardFromDeck();
			const status = this.checkWinnerByLastCard();
			if(!status){
				return this.drawCardsAndDetermineWinner();
			}
			return status;
		}
		return false;
	}
}
module.exports = PlayerCollection;