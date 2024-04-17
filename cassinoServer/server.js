const cors = require("cors"); // Import the cors middleware
const express = require("express");
const app = express();
const port = 5000;
app.use(cors()); // Enable CORS for all routes
var bodyParser = require('body-parser')

// app.use(express.json());


const multer = require("multer");
// for application/x-ww-form-urlencoded
app. use(express. urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use (multer() . none()); // requires the "multer" module

//we start out by getting the deck and shuffling the deck
let deck;
// let userCards;
// let sum;
// let ace;
// let dealerSum;

function shuffleDeck(){
    deck = buildDeck();
    for(i = 0 ; i < deck.length;i++){
        //need to store the current card and get a random card
        let j = Math.floor(Math.random()*deck.length);//0-1 * deck length
        //this switches 2 random cards in the deck
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}
function buildDeck(){
    let value = ["A", "2", "3", "4", "5", "6", "7", "8","9","10","J","Q","K"];     //builds the number cards, Ace, 1-10, Jack, Queen, King
    let suit = ["C","S","H","D"];                                                  //suits of cards in the deck. Each card gets 4
    deck = [];                                                                     //creates an empty deck array
    for( i = 0; i < suit.length; i++){                                             //sets the array with the value, a dash and a suit
        for(j = 0; j < value.length; j++){
            deck.push(value[j] +"-" +suit[i]);
        }
    }
    return deck;
}


//server is going to do all of the work.

//Start the game by the server dealing our 2 cards to the playe and 2 cards to dealser
let userCards;
let dealerCards;
app.get("/start",(req,res) =>{
    deck = shuffleDeck();
    userCards = {
       card1 : deck.pop(),
       card2 : deck.pop()
   }
    dealerCards = {
    card1 : deck.pop(),
    card2 : deck.pop()
   }
   
   res.send(200);
});

let dealer;
let dealerSum;
app.get("/dealerPage",(req,res) =>{
        dealer = {
            card1 : {
                src : "/cassinoServer/cards/"+dealerCards.card1+".png",
                id: dealerCards.card1,
                visability : false,
            },
            card2 : {
                src : "/cassinoServer/cards/"+dealerCards.card2+".png",
                id : dealerCards.card2,
                visability : true,
            },
            dealerSum : dealerSum
        };
        res.type("json");
        res.send(dealer);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});






