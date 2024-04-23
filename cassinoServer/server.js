const cors = require("cors"); // Import the cors middleware
const express = require("express");
const app = express();
const port = 3000;
app.use(cors()); // Enable CORS for all routes
var bodyParser = require('body-parser')

//const multer = require("multer");
// for application/x-ww-form-urlencoded
app. use(express. urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// // for multipart/form-data (required with FormData)
// app.use (multer() . none()); // requires the "multer" module

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//     shuffleDeck();
// });

const server = http.createServer(app);
const wss = new WebSocket.Server((server));

//websocket connetion event handler
wss.on('connection',(ws)=>{
    console.log("player connected");

    ws.on('message',(message)=>{
        console.log("recieved", message);

        wss.clients.forEach((client =>{
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        }))
    });
    ws.on('close',()=>{
        console.log("client gone");
    })
})
const PORT = process.env.PORT || 3000; // Use port from environment variable or default to 3000
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});
//variable to store the deck
let deck = [];


//lets construct and shuffle deck
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

//now that we have a deck lets create variables for the hands that are on the table
//and account for ace

let dealer = {
    dealerHand : [],
    dealerImg : [],
    dealerAce : false,
    dealerSum : 0,
    win : false,
    winMsg : "Dealer Wins",
}

let user = {
    userHand : [],
    userImg : [],
    userAce : false,
    userSum : 0,
    win : false,
    winMsg : "User Wins",
}
let gameData = {
    dealer : dealer,
    user : user,
    start : false,
    stay : false,
}
//now lets fill those with a /strt

app.get("/start",(req,res)=>{
    eventSource.addEventListener("message",event =>{
        console.log("Starting dealer")
    })
    dealer.dealerHand[0] = deck.pop();
    user.userHand[0] = deck.pop();
    dealer.dealerHand[1] = deck.pop();
    user.userHand[1] = deck.pop();
    findSum();
    createCard();
    win();
    console.log(user);
    console.log(dealer);
    if(user.win == true || dealer.win == true){
        res.redirect("/win");
    }else{
        res.type("json");
        res.send(user);
    }

    
})
//we need to add a few functions at the start of the game
//  1. We need to find the sum of the cards
function findSum(){
    dealer.dealerSum, user.userSum = 0;
    for(i = 0 ; i < dealer.dealerHand.length ; i++){
        let value = dealer.dealerHand[i].split("-");
        if(isNaN(value[0])){
            if(value[0] === 'A'){
                dealer.dealerSum += parseInt(11);
                dealer.dealerAce = true;
            }
            else{
                dealer.dealerSum += parseInt(10);
            }
        }
        else{
            dealer.dealerSum += parseInt(value[0]);
        }
    }
    for(i = 0 ; i < user.userHand.length ; i++){
        let value = user.userHand[i].split("-");
        if(isNaN(value[0])){
            if(value[0] === "A"){
                user.userSum += parseInt(11);
                user.userAce = true;
            }
            else{
                user.userSum += parseInt(10);
            }
        }
        else{
            user.userSum += parseInt(value[0]);
        }
    }
}

//now that we have a valid way to check to see our sums we will write a function to check for 21
function win(){
    if(dealer.dealerSum == 21){
        dealer.win = true;
    }
    else if(user.userSum == 21){
        user.win = true;
    } 
}
//here we are going to redirect them to this page if there is a winner
app.get("/win",(req,res)=>{
    if(dealer.win == true){
        gameData.start = false;
        res.type("text");
        res.send(dealer.winMsg);
    }
    else{
        gameData.
        res.type("text");
        res.send(user.winMsg);
    }
})  

//now lets create the card img to be sent over
function createCard(){
    dealer.dealerImg,user.userImg = [];
    for(i = 0 ; i < dealer.dealerHand.length ; i++){
        let img =  "/cassinoServer/cards/"+dealer.dealerHand[i]+".png";
        //on mac
        //let img = "/cards/"+dealer.dealerHand[i]+".png";
        dealer.dealerImg.push(img);
        console.log(dealer.dealerImg);
    }
    for(i = 0 ; i < user.userHand.length ; i++){
      let img = "/cassinoServer/cards/"+user.userHand[i]+".png";
       user.userImg.push(img);
       console.log(user.userImg);
    }
}

//now that we have the start of the game all set and the user is getting 2 cards
//lets add in the functionallity of the hit feature
app.get("/hit",(req,res)=>{
    let count = user.userHand.length;
    user.userHand[count] = deck.pop();
    findSum();
    createCard();
    checkBust();
    console.log(user)
    res.type("json");
    res.send(user);
})
function checkBust(){
    if(user.userSum > 21 && user.userAce == false){
        dealer.win = true;
        gameData.start = false;
    }
    else if(user.userSum > 21 && user.userAce == true){
        user.userSum -= parseInt(10);
        user.userAce = false;
    }
}

//this part is where we will determine a stay call. Once a stay call is called,
//it is the dealers turn

app.get("/stay",(req,res)=>{
    //we need to make it so that the dealer can now go
    res.send(200,"Ok");
})


//Now we must work on the dealer side
//first we need to display the dealers cards

app.get("/getStats",(req,res)=>{
    if(gameData.start == true){
        res.type("json");
        res.send(dealer);
    }
})


























//const cors = require("cors"); // Import the cors middleware
// const express = require("express");
// const app = express();
// const port = 5000;
// app.use(cors()); // Enable CORS for all routes
// var bodyParser = require('body-parser')

// const multer = require("multer");
// // for application/x-ww-form-urlencoded
// app. use(express. urlencoded({ extended: true })); // built-in middleware
// // for application/json
// app.use(express.json()); // built-in middleware
// // for multipart/form-data (required with FormData)
// app.use (multer() . none()); // requires the "multer" module

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//     shuffleDeck();
// });





// let deck = [];              //deck of cards 
// let onTable = [];           //the dealers cards on table and their src for html
// let userCards = [];         //these are the cards in the user hand (9-C)
// let userHand = [];          //these are the src sent to the user html
// let dealerCards = [];       //these are the cards in the dealer hand(8-D)
// let userAce = false;        //this tells the server if the user has drawn an ace    
// let dealerAce = false;      //this tells the server if the dealer has drawn an ace

// //status for game
// dealerPage = {
//     dealerTotalSum : 0,
//     dealerHiddenSum : 0,
//     onTable : onTable,
//     start :false
// }

// gameStats = {
//     visability : false,     //decides if the dealer has their 1 card revealed 
//     playerSum : 0,          //this is the players sum between cards
//     isPlayerWinning : true, //checks to see if the user total is larger. if so,true
//     isLosing : false,       //checks to see if someone has bust
//     userStay : false,       //checks to see if the user has stayed
//     dealerTotalSum : 0,     //the real total for the dealer
//     dealerHiddenSum: 0,     //the hidden total so the player doesn't know the real sum
//     endGameMsg : "",        //the endgame message that will be sent
// };

// function setDealerStart(){
//     onTable[0] = "/cassinoServer/cards/"+dealerCards[0]+".png";
//     onTable[1] = "/cassinoServer/cards/"+dealerCards[1]+".png";
// }
// // app.get("/dealerPage" ,(req,res)=>{
// //     res.type("json");
// //     res.send(dealerPage);
// // })

// //we start out by getting the deck and shuffling the deck
// function shuffleDeck(){
//     deck = buildDeck();
//     for(i = 0 ; i < deck.length;i++){
//         //need to store the current card and get a random card
//         let j = Math.floor(Math.random()*deck.length);//0-1 * deck length
//         //this switches 2 random cards in the deck
//         let temp = deck[i];
//         deck[i] = deck[j];
//         deck[j] = temp;
//     }
//     return deck;
// }
// function buildDeck(){
//     let value = ["A", "2", "3", "4", "5", "6", "7", "8","9","10","J","Q","K"];     //builds the number cards, Ace, 1-10, Jack, Queen, King
//     let suit = ["C","S","H","D"];                                                  //suits of cards in the deck. Each card gets 4
//     deck = [];                                                                     //creates an empty deck array
//     for( i = 0; i < suit.length; i++){                                             //sets the array with the value, a dash and a suit
//         for(j = 0; j < value.length; j++){
//             deck.push(value[j] +"-" +suit[i]);
//         }
//     }
//     return deck;
// }
// //this method checks to see if the player is beating the dealer
// //if so then we send back true
// function isWinning(pSum,dSum){
//     if(pSum > dSum && pSum < 22){
//         return true;//player is winning
//     }
//     else if(dSum < 22 && pSum <= dSum){
//         return false;//player is losing
//     }
// }
// //this method takes the dealer cards and updates dealerTotalSum and DealerHidden
// function getDealerSum(){
//     gameStats.dealerTotalSum = 0;
//     gameStats.dealerHiddenSum = 0;
//     for(i = 0 ; i < dealerCards.length; i++){
//         let val = checkSum(dealerCards[i]);
//         if(val == 11){
//             dealerAce = true;
//         }
//         gameStats.dealerTotalSum += parseInt(val);
//         console.log(gameStats.dealerTotalSum)
//     }
//     gameStats.dealerHiddenSum = parseInt(checkSum((dealerCards[1])));

//     if(gameStats.dealerTotalSum > 21 && dealerAce == true){
//         gameStats.dealerTotalSum = gameStats.dealerTotalSum -  10;
//     }


// }
// //this method takes the user cards and values and updates the playerSum
// function getUserSum(){
//     gameStats.playerSum = 0;
//     for(i = 0; i < userCards.length ; i++){
//         let val = checkSum(userCards[i]);
//         if(val == 11){
//             userAce = true;
//         }
//         gameStats.playerSum += parseInt(val);
//     }
//     if(gameStats.playerSum > 21 && userAce == true){
//         gameStats.playerSum = gameStat.playerSum - 10;
//     }
//     else if(gameStats.playerSum > 21){
//         gameStats.isLosing = true;
//     }
// }
// //this function takes the card and splits it (8-C) and takes the 8 and returns it
// //if its a (K,Q,J) we set the value to 10, A is 11
// function checkSum(card){
    
//     let value = card.split("-");
//     if(isNaN(value[0])){
//         if(value[0] === "A"){
//             value[0] = 11;
//             return value;
//         }
//         else{
//             value[0] = 10;
//         }
//     }
//     return value[0];
// }
// //server is going to do all of the work.

// //Start the game by the server dealing our 2 cards to the playe and 2 cards to dealser

// //this method will send the current json object that has the game stats
// app.get("/gameStats",(req,res)=>{
//     res.type("json");
//     res.send(gameStats);
// });

// //this will tell the dealer page what it should look like at this point
// app.get("/dealerPage",(req,res) =>{
//     onTable[0] = "/cassinoServer/cards/"+dealerCards[0]+".png";
//     onTable[1] = "/cassinoServer/cards/"+dealerCards[1]+".png";    
//     res.type("json");
//     res.send(onTable);
// });

// //this will update the user page with what it should look like 
// app.get("/userPage",(req,res)=>{
//     userHand[0] = "/cassinoServer/cards/"+userCards[0]+".png";
//     userHand[1] = "/cassinoServer/cards/"+userCards[1]+".png";
//     res.type("json");
//     res.send(userHand);
// });

// //this is the start, we are shuffling the deck and calling for 2 cards per player,
// //including the dealer. We will then get the sum for both and check to see
// //if anyone is winning
// app.get("/start",(req,res) =>{
//     deck = shuffleDeck();
//     userCards[0] = deck.pop();
//     userCards[1] = deck.pop();
//     dealerCards[0]  = deck.pop();
//     dealerCards[1] = deck.pop();

//     gameStats.playerSum = 0;
//     gameStats.dealerTotalSum = 0;
//     gameStats.dealerHiddenSum = 0;
//     gameStarted = true;
//     getDealerSum();
//     getUserSum();
//     isPlayerWinning = isWinning(gameStats.playerSum,gameStats.dealerTotalSum);
//     //if the player sum == 21
//     if(gameStats.playerSum == 21){
//         //if the dealer has 21 also
//         if(gameStats.dealerTotalSum == 21){
//             //dealer wins
//             gameStats.dealerWin = true;
//         }

//         //if the player itself has 21, player wins
//         gameStats.userWin = true;
//     }
//     //if the dealer has 21 alone the dealer wins
//     else if(gameStats.dealerTotalSum == 21){
//         gameStats.dealerWin = true;
//     }
//     //if nobody has 21
//     else{
//         //if the player has more than the dealer, tell them
//         if(gameStats.playerSum > gameStats.dealerTotalSum){
//             gameStats.isPlayerWinning = true;
//             gameStats.isLosing = false;
//         }
//         //if not the dealer is winning 
//         else{
//             gameStats.isPlayerWinning = false;
//             gameStats.isLosing = false;
//         }
//     }
//    //setInterval(dealerTurn, 1000)
//    res.sendStatus(200);
// });

// //clears all variables to the default, ready to restart the gaem
// app.get("/clear",(req,res)=>{
//     gameStats = {
//         visability : false,
//         userWin : false,
//         dealerWin : false,
//         playerSum : 0,
//         isPlayerWinning : true,
//         isLosing : false,
//         userStay : false,
//         dealerTotalSum : 0,
//         dealerHiddenSum: 0,
//         isPlayerWinning : true,
//     };
//     userCards = [];
//     userAce = false; // Reset userAce flag
//     dealerAce = false; // Reset dealerAce flag
//     dealerStart = false;
//     gameStats.userStay = false;
//     res.sendStatus(200);
// })

// //method to give the user another card
// app.get("/userHit",(req,res)=>{
//     let card = deck.pop();
//     userCards.push(card);
//     userHand.push("/cassinoServer/cards/"+card+".png");
//     // getDealerSum();
//     getUserSum();
//     isPlayerWinning = isWinning(gameStats.playerSum,gameStats.dealerTotalSum);
//     res.type("json");
//     res.json(userHand);

// });

// //lets the server know when the users turn is up
// app.get("/stay",(req,res)=>{
//     gameStats.userStay = true;
// })

// //option for the user to shuffle the deck
// app.get("/shuffle",(req,res)=>{
//     shuffleDeck();
// });


// //to handle the dealer side we want to run this whenever the user selects to stay
// //when the user decides to stay the dealer is required to get cards until the total sum is greater than 17.
// //once 17 is reached the dealer is forced to stop and this ends the dealers turn,sums are compaired and then a final
// //winner can be decieded

// function dealerTurn(){
//     console.log("in");
//     if(gameStats.userStay === true){
//         while(gameStats.dealerTotalSum < 17){
//             let card = deck.pop();
//             dealerCards.push(card);
//             onTable.push("/cassinoServer/cards/"+card+".png");
//             getDealerSum()
//             gameStats.isPlayerWinning = isWinning(gameStats.playerSum,gameStats.dealerTotalSum);
//             console.log(gameStats.dealerTotalSum + " dealers sum");
//             console.log(gameStats.isPlayerWinning + " is player Winning");
//             console.log(dealerCards + " dealer Hand");
//             console.log(onTable + " cards on table");

//         }
//         return onTable;
//     }
    
// }

// app.get("/check",(req,res)=>{

//     if(gameStats.userStay === true){
//         onTable = dealerTurn();
//         res.type("");
//         res.send(onTable);
//     }
    
// })
