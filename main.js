const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = '$';

var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

var deck = new Array();

//will push objects containing players and hands, 
//with player 0 always being Luigi, with a max of 5 players(again including Luigi)
var activeGames = {};

for (var i = 0; i < suits.length; i++) {
	for (var x = 0; x < values.length; x++) {
		var card = { Value: values[x], Suit: suits[i] };
		deck.push(card);
	}
};

function handCheck() {

}

function shuffle(array) {
	for (let i = 0; i < 10; i++) {
		array.sort(() => Math.random() - 0.5);
	}
}


function play(game) {//deals cards and checks player hands, hopefully doesn't just clog up instantly and can handle multiple games...
	for (player in game.Players) {
		game.Players[player].hand = [];
		game.Players[player].hand.push(game.deck[game.deckPos]);
		game.deckPos++;
		game.Players[player].hand.push(game.deck[game.deckPos]);
		game.deckPos++;
		console.log(game.Players[player].hand);
		game.Players[player].send(JSON.stringify(game.Players[player].hand));
	}
}


client.once('ready', () => {
	console.log('Luigi Time!');
});

client.on("message", message => {
	if (!message.content.startsWith(prefix) || message.author.bot) { return;}
	if (message.channel.name == "bot-testing") {
		console.log(`${message.author}: ${message.content}`);
		if (message.content.toLowerCase().slice(prefix.length) === `hello luigi`) {
			message.channel.send(`Hello ${message.author}`);
		}
		if (message.content.toLowerCase().slice(prefix.length) === `blackjack`) {
			activeGames[message.author.username] = {'Players': [message.author], 'deckPos': 0, 'active': false };
			message.channel.send(`Welcome to the table ${message.author.username}, invite your friends or start playing by yourself with $blackjack start`);
			console.log(activeGames);
		}
		if (message.content.toLowerCase().slice(prefix.length).startsWith(`blackjack join `)) {
			let name = message.content.slice(16);
			if (activeGames.hasOwnProperty(name)) {
				if (activeGames[name].Players.length >= 4) {
					message.channel.send(`Sorry, that table's already full ${message.author.username}`)
				} else if (activeGames[name].active == true) {
					message.channel.send(`You snooze you lose my friend, this game is already running!`)
				} else {
					activeGames[name].Players.push(message.author);
					message.channel.send(`Welcome to the table ${message.author.username}, I'll be starting the game soon`)
				}
			}
			console.log(activeGames);
		}
		if (message.content.toLocaleLowerCase().slice(prefix.length) === 'blackjack start') {
			if (activeGames.hasOwnProperty(message.author.username)) {
				activeGames[message.author.username].active = true;
				activeGames[message.author.username].deck = JSON.parse(JSON.stringify(deck));
				shuffle(activeGames[message.author.username].deck);
				console.log(activeGames[message.author.username]);
				play(activeGames[message.author.username]);
			} else {
				message.channel.send(`Sorry ${message.author.username} but you have to pick a table with "$blackjack", or join someone elses table with "$blackjack join" first!`);
			}
		}
	}
});



//Replace with new bot token
client.login('ODM5OTMxNjk1MzU2NzA2ODI3.YJQ1WQ.K6xTPMa8RaozIC9jIdGEhuvO3zQ');