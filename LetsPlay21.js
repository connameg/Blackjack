//Lets Play 21 (aka Blackjack)!

/*---------------------
DECK GENERATOR FUNCTION
---------------------*/

var deck = [];         //52 cards total (MAIN deck)
var myDeck = [];       //player deck
var botDeck = [];      //computer deck

function generateCards() {
var suites = ["spade", "club", "heart", "diamond"];
var face = ["King", "Queen", "Jack", "Ace"];       //these cards have special names
//generate numerical cards
for (var j = 0; j < suites.length; j++) {          //for each suite
  for (var i = 2; i < 11; i++) {                   //generate card values 2-10 
    deck.push(                                     //and push into the deck
     {"name": i, "value": i, "suite": suites[j]}
    );
  }
}
//generate special cards
for (var k = 0; k < suites.length; k++) {          //for each suite
  for (var l = 0; l < face.length; l++) {
    if (face[l] === "Ace") {                       //if ace, set value to array
      deck.push(
        {"name": face[l], "value": [1, 11], "suite": suites[k]}
        );
    } else {
      deck.push(
        {"name": face[l], "value": 10, "suite": suites[k]}
      );
    }
  }
}
}
generateCards();    console.log(deck.length);      //function call & verify deck size