const utility = require("./utility");

class Player{
	id = -1;
	cards = [];
	constructor(id){
		this.id = id;
	}

	setCard(card){
		this.cards.push(card);
	}

	areAllCardsSame(){
		return this.cards.reduce((cardA, cardB) => {
			return cardA == cardB ? cardA && cardB : false;
		});
	}

	getFirstCard(){
		return this.cards[0];
	}

	getLastCard(){
		return this.cards[this.cards.length-1];
	}

	areInSequence(){
		let areInSequence = false;
		const indexes = this.cards.map(e => utility.sequence.indexOf(e));
		const cards = [...this.cards];
		cards.sort(function(a, b){
			return utility.sequence.indexOf(a) - utility.sequence.indexOf(b);
		});

		for(let i=0, len=cards.length-1; i<len; i++){
			if(utility.sequence.indexOf(cards[i+1]) - utility.sequence.indexOf(cards[i]) !== 1){
				return areInSequence;
			}
		}
		areInSequence = true;
		return areInSequence;
	}

	getPairCard(){
		const container = [];
		let pairCard = false;
		this.cards.forEach(e => {
			if(container.indexOf(e) > -1){
				pairCard = e;
			}
			container.push(e);
		});
		return pairCard;
	}


	getTopCard(){
		return this.cards.reduce((a, b) => {
			return utility.sequence.indexOf(a) > utility.sequence.indexOf(b) ? a : b;
		});
	}
}

module.exports = Player;