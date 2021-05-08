const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = '$';

var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

var deck = new Array();

//will push objects containing players and hands, 
//with player 0 always being Luigi, with a max of 5 players(again including Luigi)
var activeGames = [];

for (var i = 0; i < suits.length; i++) {
	for (var x = 0; x < values.length; x++) {
		var card = { Value: values[x], Suit: suits[i] };
		deck.push(card);
	}
};

function handCheck() {

}





client.once('ready', () => {
	console.log('Luigi Time!');
});

client.on("message", message => {
	if (!message.content.startsWith(prefix) || message.author.bot) { return;}
	if (message.channel.name == "bot-testing") {
		console.log(`${message.author}: ${message.content}`);
		if (message.content.toLowerCase().slice(prefix.length) === `hello luigi`) {
			message.channel.send(`Hello ${message.author}`)
		}
		if (message.content.toLowerCase().slice(prefix.length) === `blackjack`) {
			activeGames.push({ 'Players': [message.author], 'deckPos': 0 });
			console.log(activeGames);
		}
		if (message.content.toLowerCase().slice(prefix.length).startsWith(`blackjack join `)) {

		}
	}
});



//Replace with new bot token
client.login('Replace with new bot token');