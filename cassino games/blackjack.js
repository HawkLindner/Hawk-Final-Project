
let deck;
let  userSum = 0;
let dealerSum= 0;
let checkAce = 0;
let userAce = false;
let dealerAce = false;
let userWin = false;
let dealerIn = false;
let userBust = false;
let dealerBust = false;
let canHit = true;
let onTable = [];
let cardCount = 1;
let delt;
let stay = true;   //stay starts at true
let dealerCheck = true;
let playerHand = document.getElementById("pCards");
let dealerHand = document.getElementById("dCards");
let winText = document.getElementById("winnerText");
let userScore = document.getElementById("userScore");
let dealerScore = document.getElementById("dealerScore");


function buildDeck(){
    let value = ["A", "2", "3", "4", "5", "6", "7", "8","9","10","J","Q","K"];     //builds the number cards, Ace, 1-10, Jack, Queen, King
    let suit = ["C","S","H","D"];                                                  //suits of cards in the deck. Each card gets 4
    deck = [];                                                                     //creates an empty deck array
    for( i = 0; i < suit.length; i++){                                             //sets the array with the value, a dash and a suit
        for(j = 0; j < value.length; j++){
            deck.push(value[j] +"-" +suit[i]);
        }
    }
}
function shuffleDeck(){
    buildDeck();
    for(i = 0 ; i < deck.length;i++){
        //need to store the current card and get a random card
        let j = Math.floor(Math.random()*deck.length);//0-1 * deck length
        //this switches 2 random cards in the deck
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}
function clearTable(){
    //reset buttons
    startBtn.disabled = false;
    shuffleBtn.disabled = false;
    hitBtn.disabled = true;
    clearBtn.disabled = true;
    stayBtn.disabled = true;
    cardCount = 1;
    delt = document.createElement("img");
    winText.innerText = "";
    userScore.innerText = "";
    dealerScore.innerText = "";
    userSum = 0;
    dealerSum = 0;

    //remove the children of the LI
    while(dealerHand.firstChild){
        dealerHand.removeChild(dealerHand.firstChild);
    }
    while(playerHand.firstChild){
        playerHand.removeChild(playerHand.firstChild);
    }
    
    //call a shuffle deck
    shuffleDeck();
}

function hit(){
    
    onTable[cardCount] = document.createElement("img");
    onTable[cardCount].id = deck.pop();
    onTable[cardCount].src = "/cards/"+onTable[cardCount].id+".png";
    checkAce = checkValue(onTable[cardCount]);
    if(checkAce === 11){
        userAce = true;
    }
    onTable[cardCount].value = checkAce;
    userSum = parseInt(userSum) + parseInt(onTable[cardCount].value); 
    playerHand.append(onTable[cardCount]);
    userScore.innerText = "";
    userScore.append("Amount "  + userSum);
    //call a check score function
    if(userSum > 21){
        check();
    }
    cardCount++;
}

//creating the game

//dealers first card needs a value, and needs to be set to hidden.
//then the player gets one card that is showing
//then the dealer gets one card showing
//then the player gets one card showing
function startGame(){
    //on start of the game 
    startBtn.disabled = true;   //disable start btn
    shuffleBtn.disabled = true; //disable shuffle btn
    clearBtn.disabled = false;  //enable clear btn
    hitBtn.disabled = false;    //enable hit btn   
    stayBtn.disabled = false;   //disable stay btn
    stay = true;               //set stay to true


    //creating the card that is flipped over in the dealers hand onTable[1]
    onTable[cardCount] = document.createElement("img"); //creates the img tag in html
    onTable[cardCount].src = "BackOfCard.jpg";          //sets the img of the card to the back of a card
    onTable[cardCount].id = deck.pop();                 //stores first element in deck to onTable[1];
    checkAce = checkValue(onTable[cardCount]);          //checks the method check value to see if it is an ace. if so then dealer ace == true, else value is stored
    if(checkAce === 11){
        dealerAce = true;
    }
    onTable[cardCount].value = checkAce;                //set value for onTable[1] to whatever check ace returned
    dealerSum = parseInt(onTable[cardCount].value);               //set the first part of dealer sum to what onTable[1] value is
    dealerHand.append(onTable[cardCount]);              //append the card to the LI element
    cardCount++;                                        //incroment through card count for next card
    
    //card one for user hand, onTable[2]
    onTable[cardCount] = document.createElement("img"); //creates a img element for the card to the user
    onTable[cardCount].id = deck.pop();                 //pops the top card off decks and stores it as the id for onTable[2].id
    onTable[cardCount].src = "/cards/"+onTable[cardCount].id+".png";  //stores the src for the img as the card from the folder
    checkAce = checkValue(onTable[cardCount]);          //check ace function as used previously
    if(checkAce === 11){
        userAce = true;
    }
    onTable[cardCount].value = checkAce;                //set valuie for onTable[2] to check ace value
    userSum = parseInt(onTable[cardCount].value);       //set the user sum to the value
    playerHand.append(onTable[cardCount]);              //append this to playerhand as an child element
    cardCount++;                                        //increase card count to 3
    

    //dealer card 2, onTable[3]
    onTable[cardCount] = document.createElement("img"); //creates img tag
    onTable[cardCount].id = deck.pop();                 //pops off the top card and stores
    onTable[cardCount].src = "/cards/"+onTable[cardCount].id+".png";  //sets img png for screen
    checkAce = checkValue(onTable[cardCount]);          //check ace function as used previously
    if(checkAce === 11){
        dealerAce = true;
    }       
    onTable[cardCount].value = checkAce;                //set the value of onTable[cardCound] to checkAce
    dealerSum = parseInt(dealerSum) + parseInt(onTable[cardCount].value);   //add to dealerSum
    dealerHand.append(onTable[cardCount]);              //append the card to the LI html element
    cardCount++;                                        //incroment
    

    //creates card 3, on table[4]
    onTable[cardCount] = document.createElement("img");     //create an img tag
    onTable[cardCount].id = deck.pop();                     //store the id of CardCount[4] as
    onTable[cardCount].src = "/cards/"+onTable[cardCount].id+".png";  //set the src of the img on onTable[4]
    checkAce = checkValue(onTable[cardCount]);              //check ace as earlier
    if(checkAce === 11){
        userAce = true;
    }
    onTable[cardCount].value = checkAce;                    //sets the value of onTable[4] to check ace
    userSum = parseInt(userSum) + parseInt(onTable[cardCount].value);   //d
    playerHand.append(onTable[cardCount]);
    cardCount++;

    dealerSum = 1*onTable[1].value + 1*onTable[3].value;
    userSum = 1*onTable[2].value + 1*onTable[4].value;
    
    userScore.append("Amount " + userSum);
    dealerScore.append("Amount " + (dealerSum - onTable[1].value) + " + ???");
    if(userSum == 21 || dealerSum == 21){
        userScore.innerText = "";
        dealerScore.innerText = "";
        userScore.append("Amoutn " + userSum);
        dealerScore.append("Amount " + dealerSum);
        if(dealerSum == 21){
            onTable[1].src = "/cards/"+onTable[1].id+".png";
            if(userSum == 21){
                winText.append("Match is a tie");
            }
            else{
                winText.append("House wins... BlackJack");
            }
        }
        else if(userSum == 21) {
            onTable[1].src = "/cards/"+onTable[1].id+".png";
            winText.append("You win!");
        }
    }else if(userScore == 22){
        userSum = parseInt(userScore) - 10;
        userText.innerText = "";
        userText.append("Amount " + userSum);
    }


} 

//For next log on we need to finish up with setting up clear, hit and the score tracking
function checkValue(card){
    let value = card.id.split("-"); //splits the card into an arr of [J, C] or [6, D]
    if(isNaN(value[0])){            //if NaN, then its a K, J, Q, or Ace
        if(value[0] === 'A'){       //if value is A, then return 11 and that will set ace check to true
            return card.value = 11;
        }
        else{return card.value = 10}    //if its not the ace then we will return a 10 since all of them have the same value
    }
    else{
        return card.value = value[0];   //if its NaN, just return the value of the number
    }
}


function dealerAuto(){
    //resetting vars and buttons
    hitBtn.disabled = true;
    stayBtn.disabled = true;
    stay = false;
    //shows the hidden card to the user
    onTable[1].src = "/cards/"+onTable[1].id+ ".png";
    //creates new img
    while(dealerSum < 17){
        onTable[cardCount] = document.createElement("img");
        onTable[cardCount].id = deck.pop();
        onTable[cardCount].src = "/cards/"+onTable[cardCount].id+".png";
        checkAce = checkValue(onTable[cardCount]);
        if(checkAce === 11){
            dealerAce = true;
        }
        onTable[cardCount].value = checkAce;
        dealerSum = parseInt(dealerSum) + parseInt(onTable[cardCount].value);
        dealerHand.append(onTable[cardCount]);
        //gotta check dealer hand
        cardCount++;
    }
    dealerScore.innerText = "";
    dealerScore.append("Amount " + dealerSum);
    check();
      
}

//to calculate the winner we need to first check to see if anyone has 21 off the start. We also need a variable
//to determine if the match is over or not. If the match is over we need to disable the hit button. If we dont have
//a win we just continue with waht we have so far. Here we check to see if the user has 21, if the user does not have 21 then 
//we go to the dealer Auto and play the dealer auto until the dealer has atleast 17 

function check(){
    //for user bust
    console.log(userSum);
    console.log(dealerSum);
    if(stay == true){
        if(userSum > 21){
            if(userAce == true){
                userSum = parseInt(userSum) - 10;
                userAce = false;
                userScore.innerText = "";
                userScore.append("Amount " + userSum);
                return ;
            }
            else{
                onTable[1].src = "/cards/"+onTable[1].id+".png";
                winText.append("House wins...You busted fool");
                hitBtn.disabled = true;
                stayBtn.disabled = true;
                return;
            }
        
        }
    }
    else{
        if(dealerSum > 21){
            if(dealerAce == true){
                dealerSum = parseInt(dealerSum)- parseInt(10);
                dealerAce = false;
                return 
            }
            else{
                winText.append("User wins! House bust!");
                return;
            }
        }
        else if(dealerSum == 21){
            winText.append("House wins... Blackjack");
            return ;
        }
        //user sum is greater than dealer sum 
        else if(userSum > dealerSum && dealerSum <= 21 && dealerSum >= 17)
        {
            winText.append("User Wins! " + userSum + " is more than " + dealerSum);
            return;
        }
        //dealer sum is greater than users
        else if(dealerSum > userSum && dealerSum <= 21  && dealerSum >= 17){
            winText.append("House Wins, " + dealerSum + " is more than " + userSum);
            return ;
        }
        //draw
        else if(userSum == dealerSum){
            winText.append("Draw, money back");
            return ;
        }
    }
}

window.onload = function(){
    shuffleDeck();
    startBtn.disabled = false;
    hitBtn.disabled = true;
    clearBtn.disabled = true;
    stayBtn.disabled = true;
    shuffleBtn.disabled = false;
}

//Buttons that we use throughout the JavaScript program

let shuffleBtn = document.getElementById("shuffle");
shuffleBtn.addEventListener("click",shuffleDeck);

let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click",clearTable);

let hitBtn = document.getElementById("hit");
hitBtn.addEventListener("click",hit);

let startBtn = document.getElementById("start");
startBtn.addEventListener("click",startGame);

let stayBtn = document.getElementById("stay");
stayBtn.addEventListener("click",dealerAuto);