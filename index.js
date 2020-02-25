const playerCollection = require('./playerCollection');

let collection = new playerCollection();

//Pass deck array if want to give deck cards
collection.startGame();

const player = collection.determineWinner();

console.log(collection.players);

if(player != -1){
	console.log("Winner Player ->", player);
}else{
	console.log("It's a tie between players");
}