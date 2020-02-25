const utility = require("./utility");
const priority = utility.priority;
const sequence = utility.sequence;
// const priority = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];

function trailCheck(playerA, playerB){
	if(playerA.areAllCardsSame() || playerB.areAllCardsSame()){
		if(playerA.areAllCardsSame() && playerB.areAllCardsSame()){
			return priority.indexOf(playerB.getFirstCard()) - priority.indexOf(playerA.getFirstCard());
			// return priority[playerA.getFirstCard()] > priority[playerB.getFirstCard()] ? -1 : 1;
		}
		return playerA.areAllCardsSame() ? -1 : 1;
	}
	return 0;
}

function compareSequence(playerA, playerB){
	if(playerA.areInSequence() || playerB.areInSequence()){
		if(playerA.areInSequence() && playerB.areInSequence()){
			return priority.indexOf(playerB.getFirstCard()) - priority.indexOf(playerA.getFirstCard());
		}
		return playerA.areInSequence() ? -1 : 1;
	}
	return 0;
}

function comparePairsOfCard(playerA, playerB){
	if(playerA.getPairCard() || playerB.getPairCard()){
		if(playerA.getPairCard() && playerB.getPairCard()){
			return priority.indexOf(playerB.getPairCard()) - priority.indexOf(playerA.getPairCard());
		}
		return playerA.getPairCard() ? -1 : 1;
	}
	return 0;
}

function compareTopCard(playerA, playerB){
	const pACard = utility.sequence.indexOf(playerA.getTopCard());
	const pBCard = utility.sequence.indexOf(playerB.getTopCard());
	if(pACard > pBCard){
		return -1;
	}
	if(pACard < pBCard){
		return 1;
	}
	return 0;
}

function compareLastCard(playerA, playerB){
	const pACard = utility.sequence.indexOf(playerA.getLastCard());
	const pBCard = utility.sequence.indexOf(playerB.getLastCard());
	if(pACard > pBCard){
		return -1;
	}
	if(pACard < pBCard){
		return 1;
	}
	return 0;
}

function comparator(playerA, playerB){
	let value = trailCheck(playerA, playerB);
	if(value == 0){
		value = compareSequence(playerA, playerB);
		if(value == 0){
			value = comparePairsOfCard(playerA, playerB);
			if(value == 0){
				value = compareTopCard(playerA, playerB);
			}
		}
	}
	return value;
}

exports.comparator = comparator;
exports.compareLastCard = compareLastCard;