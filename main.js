const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = '$';

var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

var deck = new Array();

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
	if (message.channel.name == "bot-testing") {
		console.log(`${message.author}: ${message.content}`);
		if (message.content.toLowerCase() === `${prefix}hello luigi`) {
			message.channel.send(`Hello ${message.author}`)
		}
}
});




client.login('ODM5OTMxNjk1MzU2NzA2ODI3.YJQ1WQ.Fsu8RDg8BWfwUn_ls_tSzTLO - L4');