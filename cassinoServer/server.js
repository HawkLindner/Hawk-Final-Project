const cors = require("cors"); // Import the cors middleware
const express = require("express");
const app = express();
const port = 5000;
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

//we start out by getting the deck and shuffling the deck
let deck;
let userCards;
let sum;
let ace;
let dealerSum;
shuffleDeck();
console.log(deck);  

app.post("/checkScore",(req,res)=>{
    console.log(req.body.sum + " Body");
    let {sum, ace} = req.body;
    console.log("Sum " + req.body.sum);
    console.log("Ace " + req.body.ace);
    res.type("text");
    res.sendStatus(200);
});
//this is called when the user hits shuffle
app.get("/deck",(req,res) =>{
    res.type("json");
    deck = shuffleDeck();
    res.send(200);
});
app.get("/start",(req,res) =>{
     userCards = {
        "card1" : deck.pop(),
        "card2" : deck.pop()
    }
    res.type("json");
    res.send(userCards);
});

app.get("/clear",(req,res) =>{
    delete userCards;
    delete dealerCards;
    res.type("text");
    res.sendStatus(200);
});
function check(){
    
}
function dealer(){
    dealerCards = {
        "card1" : deck.pop(),
        "card2" : deck.pop()
    }

}


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



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});