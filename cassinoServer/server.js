const cors = require("cors"); // Import the cors middleware
const express = require("express");
const app = express();
const port = 5000;
app.use(cors()); // Enable CORS for all routes
var bodyParser = require('body-parser')

//app.use(express.json());


const multer = require("multer");
// for application/x-ww-form-urlencoded
app. use(express. urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use (multer() . none()); // requires the "multer" module




let deck = [];
let onTable = [];
let userCards = [];
let dealerCards = [];
let userHand = [];

//status for game
gameStats = {
    visability : false,
    userWin : false,
    dealerWin : false,
    userAce : false,
    dealerAce : false,
    playerSum : 0,
    isPlayerWinning : true,
    isLosing : false,
    userStay : false,
    dealerTotalSum : 0,
    dealerHiddenSum: 0,
    isPlayerWinning : true,
    endGameMsg : ""
};

//we start out by getting the deck and shuffling the deck
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

//this will check for an ace
//need to add the ace functionalaity
function isLoss(sum){
    if(sum > 21){
        return true;
    }
    else {
        return false;
    }
}

//this method checks to see if the player is beating the dealer
//if so then we send back true
function isWinning(pSum,dSum){
    if(pSum > dSum && pSum < 22){
        return true;//player is winning
    }
    else if(dSum < 22 && pSum <= dSum){
        return false;//player is losing
    }
}
//this method takes the dealer cards and updates dealerTotalSum and DealerHidden
function getDealerSum(){
    gameStats.dealerTotalSum = 0;
    gameStats.dealerHiddenSum = 0;
    for(i = 0 ; i < dealerCards.length; i++){
        gameStats.dealerTotalSum += parseInt(checkSum(dealerCards[i]));
    }
    gameStats.dealerHiddenSum = parseInt(checkSum((dealerCards[1])));


}
//this method takes the user cards and values and updates the playerSum
function getUserSum(){
    gameStats.playerSum = 0;
    for(i = 0; i < userCards.length ; i++){
        gameStats.playerSum += parseInt(checkSum(userCards[i]));
        console.log(userCards[i]);
    }
    if(gameStats.playerSum > 21){
        gameStats.isLosing = true;
    }
}
//this function takes the card and splits it (8-C) and takes the 8 and returns it
//if its a (K,Q,J) we set the value to 10, A is 11
function checkSum(card){
    
    let value = card.split("-");
    if(isNaN(value[0])){
        if(value[0] === "A"){
            value[0] = 11;
            return value;
        }
        else{
            value[0] = 10;
        }
    }
    return value[0];
}
//server is going to do all of the work.

//Start the game by the server dealing our 2 cards to the playe and 2 cards to dealser

//this method will send the current json object that has the game stats
app.get("/gameStats",(req,res)=>{
    res.type("json");
    res.send(gameStats);
});

//this will tell the dealer page what it should look like at this point
app.get("/dealerPage",(req,res) =>{
    onTable[0] = "/cassinoServer/cards/"+dealerCards[0]+".png";
    onTable[1] = "/cassinoServer/cards/"+dealerCards[1]+".png";    
    res.type("json");
    res.send(onTable);
});

//this will update the user page with what it should look like 
app.get("/userPage",(req,res)=>{
    userHand[0] = "/cassinoServer/cards/"+userCards[0]+".png";
    userHand[1] = "/cassinoServer/cards/"+userCards[1]+".png";
    res.type("json");
    res.send(userHand);
});

//this is the start, we are shuffling the deck and calling for 2 cards per player,
//including the dealer. We will then get the sum for both and check to see
//if anyone is winning
app.get("/start",(req,res) =>{
    deck = shuffleDeck();
    userCards[0] = deck.pop();
    userCards[1] = deck.pop();
    dealerCards[0] = deck.pop();
    dealerCards[1] = deck.pop();

    gameStats.playerSum = 0;
    gameStats.dealerTotalSum = 0;
    gameStats.dealerHiddenSum = 0;
    getDealerSum();
    getUserSum();
    isPlayerWinning = isWinning(gameStats.playerSum,gameStats.dealerTotalSum);
    //if the player sum == 21
    if(gameStats.playerSum == 21){
        //if the dealer has 21 also
        if(gameStats.dealerTotalSum == 21){
            //dealer wins
            gameStats.dealerWin = true;
        }

        //if the player itself has 21, player wins
        gameStats.userWin = true;
    }
    //if the dealer has 21 alone the dealer wins
    else if(gameStats.dealerTotalSum == 21){
        gameStats.dealerWin = true;
    }
    //if nobody has 21
    else{
        //if the player has more than the dealer, tell them
        if(gameStats.playerSum > gameStats.dealerTotalSum){
            gameStats.isPlayerWinning = true;
            gameStats.isLosing = false;
        }
        //if not the dealer is winning 
        else{
            gameStats.isPlayerWinning = false;
            gameStats.isLosing = false;
        }
    }
   res.sendStatus(200);
});

app.get("/clear",(req,res)=>{
    gameStats = {
        visability : false,
        userWin : false,
        dealerWin : false,
        playerSum : 0,
        isPlayerWinning : true,
        isLosing : false,
        userStay : false,
        dealerTotalSum : 0,
        dealerHiddenSum: 0,
        isPlayerWinning : true,
    };
    res.sendStatus(200);
})
//method to give the user another card
app.get("/userHit",(req,res)=>{
    let card = deck.pop();
    userCards.push(card);
    userHand.push("/cassinoServer/cards/"+card+".png");
    getDealerSum();
    getUserSum();
    isPlayerWinning = isWinning(gameStats.playerSum,gameStats.dealerTotalSum);
    res.type("json");
    res.json(userHand);

});
app.get("/stay",(req,res)=>{
    userStay = true;

})

app.get("/shuffle",(req,res)=>{
    shuffleDeck();
    console.log("Shuffled");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    shuffleDeck();
});






