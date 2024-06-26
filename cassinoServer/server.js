const cors = require("cors");
const express = require("express");
const http = require("http");
const app = express();   
app.use('/public',express.static('public'));
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

//variables

let dealer = {
    dealerHand : [],
    dealerImg : [],
    dealerAce : false,
    dealerSum : 0,
    winMsg : "",
}
let user = {
    userHand : [],
    userImg : [],
    userAce : false,
    userSum : 0,
}

app.get("/getDealerState",(req,res)=>{
    res.type("json");
    res.send(dealer);
});

//variable to store the deck
let deck = [];

//}
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
let temp;
//now lets fill those with a /strt
app.get("/start",(req,res)=>{
    shuffleDeck();
    dealer.turn = false;
    dealer.dealerHand[0] = deck.pop();
    user.userHand[0] = deck.pop();
    temp = deck.pop();
    user.userHand[1] = deck.pop();
    findSum();
    createCard();
    win();
    res.type("json");
    res.send(user);
    
});
//we need to add a few functions at the start of the game
//  1. We need to find the sum of the cards
function findSum(){
    let value;
    dealer.dealerSum=0;
     user.userSum = 0;
    for(i = 0 ; i < dealer.dealerHand.length ; i++){
        value = dealer.dealerHand[i].split("-");
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


//now lets create the card img to be sent over
function createCard(){
    dealer.dealerImg = [];
    user.userImg = [];
    for(i = 0 ; i < dealer.dealerHand.length ; i++){
        let img = "/public/cards/"+dealer.dealerHand[i]+".png";
        dealer.dealerImg.push(img);
    }
    for(i = 0 ; i < user.userHand.length ; i++){
       let img = "/public/cards/"+user.userHand[i]+".png";
       user.userImg.push(img);
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
    res.type("json");
    res.send(user);
})
function checkBust(){
    if(user.userSum > 21 && user.userAce == false){
        dealerTurn();
        winner();
        
    }
    else if(user.userSum > 21 && user.userAce == true){
        user.userSum -= parseInt(10);
        user.userAce = false;
    }
    else if (dealer.dealerSum > 21 && dealerAce == true){
        dealer.dealerSum -= parseInt(10);
        dealer.dealerAce = false;
    }
}

//this part is where we will determine a stay call. Once a stay call is called,
//it is the dealers turn

app.get("/stay",(req,res)=>{
    dealerTurn();
    res.send();
})

function dealerTurn(){
    dealer.dealerHand.push(temp);
    findSum();
    createCard();
    checkBust();
    console.log(dealer.dealerHand)
        let iter = dealer.dealerHand.length;
        while(dealer.dealerSum < 17){
            // if(dealer.dealerSum > 16){
            //     break;
            // }
            dealer.dealerHand[iter] = deck.pop();
            findSum();
            createCard();
            console.log(dealer.dealerSum)
        }
        winner();
    }
    
app.get("/clear",(req,res)=>{
    dealer = {
        dealerHand : [],
        dealerImg : [],
        dealerAce : false,
        dealerSum : 0,
        winMsg : "",
    }
    console.log("Clear sent");
    user = {
        userHand : [],
        userImg : [],
        userAce : false,
        userSum : 0,
    }
    res.send();
});

function winner(){
    console.log("Dealer " + dealer.dealerSum);
    console.log("user " + user.userSum);
    if(dealer.dealerSum > 21 && user.userSum < 22){
        dealer.winMsg = "User wins, Dealer Bust";
    }
    else if (user.userSum > 21){
        dealer.winMsg = "Dealer wins. Nice bust fool";
    }
    else if(user.userSum < 22 && user.userSum > dealer.dealerSum){
        dealer.winMsg = "You got me this time, nice win";
    }
    else if(user.userSum == dealer.dealerSum){
        dealer.winMsg = "I win ties sucker";
    }
    else if(dealer.dealerHand.length == 2 && dealer.dealerSum == 21){
        dealer.winMsg = "I win... Blackjack";
    }
    else if(dealer.dealerSum > user.userSum && dealer.dealerSum<22){
        dealer.winMsg = "Dealer wins. Skill issue maybe?";
    }
}
