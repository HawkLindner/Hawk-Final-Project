const cors = require("cors"); // Import the cors middleware
const express = require("express");
const app = express();
const port = 5000;
app.use(cors()); // Enable CORS for all routes
var bodyParser = require('body-parser')

const multer = require("multer");
// for application/x-ww-form-urlencoded
app. use(express. urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use (multer() . none()); // requires the "multer" module

const WebSocket = require('ws');
const http = require('http');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
// wss.on('connection', function connection(ws) {
//     console.log('WebSocket client connected');

//     // Handle incoming messages from WebSocket clients
//     ws.on('message', function incoming(message) {
//         console.log('received: %s', message);
//         // Broadcast the message to all clients
//         wss.clients.forEach(function each(client) {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });
//     });
//     ws.on('start',(data)=>{
//         wss.emit()
//     })
// });
// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    shuffleDeck();
});





let deck = [];              //deck of cards 
let onTable = [];           //the dealers cards on table and their src for html
let userCards = [];         //these are the cards in the user hand (9-C)
let userHand = [];          //these are the src sent to the user html
let dealerCards = [];       //these are the cards in the dealer hand(8-D)
let userAce = false;        //this tells the server if the user has drawn an ace    
let dealerAce = false;      //this tells the server if the dealer has drawn an ace

//status for game
dealerPage = {
    dealerTotalSum : 0,
    dealerHiddenSum : 0,
    onTable : onTable,
    start :false
}

function setDealerStart(){
    onTable[0] = "/cards/"+dealerCards[0]+".png";
    onTable[1] = "/cards/"+dealerCards[1]+".png";
}
app.get("/dealerPage" ,(req,res)=>{
    res.type("json");
    res.send(dealerPage);
})
gameStats = {
    visability : false,     //decides if the dealer has their 1 card revealed 
    playerSum : 0,          //this is the players sum between cards
    isPlayerWinning : true, //checks to see if the user total is larger. if so,true
    isLosing : false,       //checks to see if someone has bust
    userStay : false,       //checks to see if the user has stayed
    dealerTotalSum : 0,     //the real total for the dealer
    dealerHiddenSum: 0,     //the hidden total so the player doesn't know the real sum
    endGameMsg : "",        //the endgame message that will be sent
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
        let val = checkSum(dealerCards[i]);
        if(val == 11){
            dealerAce = true;
        }
        gameStats.dealerTotalSum += parseInt(val);
    }
    gameStats.dealerHiddenSum = parseInt(checkSum((dealerCards[1])));

    if(gameStats.dealerTotalSum > 21 && dealerAce == true){
        gameStats.dealerTotalSum = gameStats.dealerTotalSum -  10;
    }


}
//this method takes the user cards and values and updates the playerSum
function getUserSum(){
    gameStats.playerSum = 0;
    for(i = 0; i < userCards.length ; i++){
        let val = checkSum(userCards[i]);
        if(val == 11){
            userAce = true;
        }
        gameStats.playerSum += parseInt(val);
    }
    if(gameStats.playerSum > 21 && userAce == true){
        gameStats.playerSum = gameStat.playerSum - 10;
    }
    else if(gameStats.playerSum > 21){
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
// app.get("/dealerPage",(req,res) =>{
//     onTable[0] = "/cards/"+dealerCards[0]+".png";
//     onTable[1] = "/cards/"+dealerCards[1]+".png";    
//     res.type("json");
//     res.send(onTable);
// });

//this will update the user page with what it should look like 
app.get("/userPage",(req,res)=>{
    userHand[0] = "/cards/"+userCards[0]+".png";
    userHand[1] = "/cards/"+userCards[1]+".png";
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
    dealerCards[0]  = deck.pop();
    dealerCards[1] = deck.pop();

    gameStats.playerSum = 0;
    gameStats.dealerTotalSum = 0;
    gameStats.dealerHiddenSum = 0;
    gameStarted = true;
    setDealerStart();
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
   setInterval(dealerTurn, 1000)
   res.sendStatus(200);
});

//clears all variables to the default, ready to restart the gaem
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
    userCards = [];
    userAce = false; // Reset userAce flag
    dealerAce = false; // Reset dealerAce flag
    dealerStart = false;
    res.sendStatus(200);
})

//method to give the user another card
app.get("/userHit",(req,res)=>{
    let card = deck.pop();
    userCards.push(card);
    userHand.push("/cards/"+card+".png");
    // getDealerSum();
    getUserSum();
    isPlayerWinning = isWinning(gameStats.playerSum,gameStats.dealerTotalSum);
    res.type("json");
    res.json(userHand);

});

//lets the server know when the users turn is up
app.get("/stay",(req,res)=>{
    gameStats.userStay = true;
    console.log("Stay");
    dealerTurn();

})

//option for the user to shuffle the deck
app.get("/shuffle",(req,res)=>{
    shuffleDeck();
});


//to handle the dealer side we want to run this whenever the user selects to stay
//when the user decides to stay the dealer is required to get cards until the total sum is greater than 17.
//once 17 is reached the dealer is forced to stop and this ends the dealers turn,sums are compaired and then a final
//winner can be decieded

function dealerTurn(){
    if(gameStats.userStay == true){
        while(gameStats.dealerTotalSum < 17){
            let card = deck.pop();
            dealerCards.push(card);
            onTable.push("/cards/"+card+".png");
            getDealerSum()
            gameStats.isPlayerWinning = isWinning(gameStats.playerSum,gameStats.dealerTotalSum);
            console.log(gameStats.dealerTotalSum + " dealers sum");
            console.log(gameStats.isPlayerWinning + " is player Winning");
            console.log(dealerCards + " dealer Hand");
            console.log(onTable + " cards on table");

        }
    }
}


let gameStarted = false;
function checkGameStarted(req, res, next) {
    if (!gameStarted) {
        return res.status(400).send('Game has not started yet');
    }
    next();
}
