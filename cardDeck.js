class CardDeck {
	cards = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
	deck = [];
	
	constructor(){
		this.deck = [...this.cards, ...this.cards, ...this.cards, ...this.cards];
	}

	shuffle(deck){
		if(!deck){
			this.deck.forEach((card, index, deck) => {
				const randomIndex = Math.floor(Math.random()*52);
				const randomCard = deck[randomIndex];
				deck[randomIndex] = card;
				deck[index] = randomCard;
			});
		}else{
			this.deck = deck;
		}
	}

	checkIfFair(){
		const h = {};
		this.deck.forEach(e => {
			h[e] = h[e] ? h[e] + 1 :1
		});
	}

	takeOut(){
		return this.deck.pop();
	}
}

module.exports = CardDeck;