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

/*--------------------
CARD DEALING FUNCTIONS
--------------------*/

function dealCards(player){
//deal cards to player and computer
//rando generator puts 2 cards in each deck
  var random;
  for (var m = 0; m < 2; m++){
    random = Math.floor(Math.random() * (deck.length - 0 + 1)) + 0;   //choose a random card
    player.push(deck[random]);   //add it to the player's deck
    deck.splice(random,1);       //remove that card from the main deck
  }
  console.log(player, " ", player[0], player[1], player[2]);
}

function firstDeal(player1, player2){
  //calls functions to deal cards for both players
  dealCards(player1);  //human
  dealCards(player2);  //computer
}
firstDeal(myDeck, botDeck);

//take another card
function takeAnother(player) {
  var random2;
  random2 = Math.floor(Math.random() * (deck.length - 0 + 1)) + 0;   //choose a random card
  player.push(deck[random2]);   //add it to the player's deck
  deck.splice(random2,1);       //remove that card from the main deck
  return player[player.length-1];   //return the last item
}

/*-------------------
CALCULATION FUNCTIONS
-------------------*/

function total(player) {
//finds total card value of whichever user calls the function
var total = [];
for (var t = 0; t < player.length; t++) {
  total.push(player[t].value);
}
  return total.reduce(function(a,b){
    return a + b;
    });
}

function calculateUserTotal() {
//find the total card value for all cards in the user's deck
//Tell the user what their cards are
console.log("Your cards are: " + myDeck[0].name + " of " + myDeck[0].suite + 
 " and " + myDeck[1].name + " of " + myDeck[1].suite);

//check for aces to set their value;
for (var n = 0; n < myDeck.length; n++){
  if (typeof myDeck[n].value === "object") {        //if you have an ace:
    var card1 = prompt("You have an ace! Do you want its value to be 1 or 11?");
    if (+card1 === 1) {
      myDeck[n].value = 1;
    } else if (+card1 === 11){
      myDeck[n].value = 11;
    } else {                               //if the user doesn't enter 1 or 11
      prompt("That is not valid input! Please choose 1 or 11 only.");
      calculateUserTotal();
    }
  }
}
myTotal = total(myDeck); //calculate the total
return myTotal;
}

function calculateBotTotal(){
var nums = [];
var aces = [];
//find all aces, separate them from other cards
for (var m = 0; m < botDeck.length; m++){
  if (typeof botDeck[m].value === "number"){
    nums.push(botDeck[m].value);
  } else {
    aces.push(botDeck[m].value);
  }
}
//current value of all cards:
nums = nums.reduce(function(a,b){return a + b;});  

//now check for aces & give them a value based on the value of the rest of the deck
for (var p = 0; p < botDeck.length; p++) {
  if (typeof botDeck[p].value === "object") {
    //set the ace to 11 if that won't make it go over
    if (nums < 11) {
      botDeck[p].value = 11;
      nums += botDeck[p].value;
    } else {
      botDeck[p].value = 1;
      nums += botDeck[p].value;
    }
  }
}
return nums;  //return the total
}