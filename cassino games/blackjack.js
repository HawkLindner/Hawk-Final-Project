
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
let stay = false;
let win = false; //false if house wins
let playerHand = document.getElementById("pCards");
let dealerHand = document.getElementById("dCards");
let winText = document.getElementById("winnerText");
function buildDeck(){
    let value = ["A", "2", "3", "4", "5", "6", "7", "8","9","10","J","Q","K"];
    let suit = ["C","S","H","D"];
    deck = [];

    for( i = 0; i < suit.length; i++){
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
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
        console.log("shuffle");
    }
    //(deck);
}
function clearTable(){
    let dealerCards = document.getElementById("dCards");
    let userCards = document.getElementById("pCards");
    stay = false;
    while(dealerCards.firstChild){
        dealerCards.removeChild(dealerCards.firstChild);
    }
    while(userCards.firstChild){
        userCards.removeChild(userCards.firstChild);
    }
    
    cardCount = 1;
    //console.log("in");
    delt = document.createElement("img");
    winText.innerText = "";
    userSum = 0;
    dealerSum = 0;
    startBtn.disabled = false;
    shuffleBtn.disabled = false;
    hitBtn.disabled = true;
    clearBtn.disabled = true;
    stayBtn.disabled = false;
    buildDeck();
    shuffleDeck();
    console.log("Clear");
}
function hit(){
    onTable[cardCount] = document.createElement("img");
    onTable[cardCount].id = deck.pop();
    onTable[cardCount].src = "/cassino games/cards/"+onTable[cardCount].id+".png";
    checkAce = checkValue(onTable[cardCount]);
    if(checkAce === 11){
        userAce = true;
    }
    onTable[cardCount].value = checkAce;
    userSum = parseInt(userSum) + parseInt(onTable[cardCount].value); 
    playerHand.append(onTable[cardCount]);

    rdCount++;
    
}
function checkWin(){
    if(userSum == 21){
        onTable[1].src = "/cassino games/cards/"+onTable[1].id+".png";
        winText.append("You win!");
        
    }
    else if(dealerSum > userSum && dealerSum <22){
        //dealerwins
    }
}
//creating the game

//dealers first card needs a value, and needs to be set to hidden.
//then the player gets one card that is showing
//then the dealer gets one card showing
//then the player gets one card showing
function startGame(){
    startBtn.disabled = true;
    shuffleBtn.disabled = true;
    clearBtn.disabled = false;
    hitBtn.disabled = false;
    stayBtn.disabled = false;
    stay = false;
    onTable[cardCount] = document.createElement("img");
    onTable[cardCount].src = "BackOfCard.jpg";
    onTable[cardCount].id = deck.pop();
    checkAce = checkValue(onTable[cardCount]);
    if(checkAce === 11){
        dealerAce = true;
    }
    dealerSum = onTable[cardCount].value;
    console.log(onTable[cardCount].id);
    dealerHand.append(onTable[cardCount]);
    cardCount++;
    

    onTable[cardCount] = document.createElement("img");
    onTable[cardCount].id = deck.pop();
    onTable[cardCount].src = "/cassino games/cards/"+onTable[cardCount].id+".png";
    checkAce = checkValue(onTable[cardCount]);
    if(checkAce === 11){
        userAce = true;
    }
    onTable[cardCount].value = checkAce;
    playerHand.append(onTable[cardCount]);
    cardCount++;

    onTable[cardCount] = document.createElement("img");
    onTable[cardCount].id = deck.pop();
    onTable[cardCount].src = "/cassino games/cards/"+onTable[cardCount].id+".png";
    checkAce = checkValue(onTable[cardCount]);
    if(checkAce === 11){
        dealerAce = true;
    }
    onTable[cardCount].value = checkAce;
    dealerSum = dealerSum + onTable[cardCount].value;
    dealerHand.append(onTable[cardCount]);
    cardCount++;

    onTable[cardCount] = document.createElement("img");
    onTable[cardCount].id = deck.pop();
    onTable[cardCount].src = "/cassino games/cards/"+onTable[cardCount].id+".png";
    checkAce = checkValue(onTable[cardCount]);
    if(checkAce === 11){
        userAce = true;
    }
    onTable[cardCount].value = checkAce;
    playerHand.append(onTable[cardCount]);
    cardCount++;

    dealerSum = 1*onTable[1].value + 1*onTable[3].value;
    userSum = 1*onTable[2].value + 1*onTable[4].value;
    
    console.log(userSum);
    if(dealerSum == 21){
        onTable[1].src = "/cassino games/cards/"+onTable[1].id+".png";
        if(userSum == 21){
            winText.append("Match is a tie");
        }
        else{
            winText.append("House wins... BlackJack");
        }
    }
    else if(userSum == 21) {
        onTable[1].src = "/cassino games/cards/"+onTable[1].id+".png";
        winText.append("You win!");
    }
    //console.log(cardCount);

}
//For next log on we need to finish up with setting up clear, hit and the score tracking
function checkValue(card){
    console.log(card);
    let value = card.id.split("-");
    console.log(value);
    if(isNaN(value[0])){
        if(value[0] === 'A'){
            return card.value = 11;
        }
        else{return card.value = 10}
    }
    else{
        return card.value = value[0];
    }
}
function handSum(sum, ace){
    if(sum > 21){
        if(ace == true){
            return -10;
        }  
    }
}
function checkBust(value){
    if (value > 21 ){
        return true;
    }
}
let dealerCheck = true;
function dealerAuto(){
    hitBtn.disabled = true;
    stayBtn.disabled = true;
    stay = true;
    onTable[1].src = "/cassino games/cards/"+onTable[1].id+ ".png";
    while(dealerCheck == true){
        onTable[cardCount] = document.createElement("img");
        onTable[cardCount].id = deck.pop();
        onTable[cardCount].src = "/cassino games/cards/"+onTable[cardCount].id+".png";
        checkAce = checkValue(onTable[cardCount]);
        if(checkAce === 11){
            dealerAce = true;
        }
        console.log("ace Check " + checkAce);
        onTable[cardCount].value = checkAce;
        dealerSum = parseInt(dealerSum) + parseInt(onTable[cardCount].value);
        dealerHand.append(onTable[cardCount]);
        cardCount++;
        dealerCheck = check();
        }
}


//to calculate the winner we need to first check to see if anyone has 21 off the start. We also need a variable
//to determine if the match is over or not. If the match is over we need to disable the hit button. If we dont have
//a win we just continue with waht we have so far. Here we check to see if the user has 21, if the user does not have 21 then 
//we go to the dealer Auto and play the dealer auto until the dealer has atleast 17 

function check(){
    console.log(userSum);
    console.log(dealerSum + " Dealer");
    console.log(stay);
    //for user bust
    if(userSum > 21 && stay == true){
        if(userAce == true){
            userSum = parseInt(userSum) - 10;
            userAce = false;
            return true;
        }
        onTable[1].src = "/cassino games/cards/"+onTable[1].id+".png";
        winText.append("House wins...You busted fool");
        gameOn = false;
        return false;
    }
    else if(userSum > dealerSum && dealerSum < 21 && stay== false )
    {
        winText.append("User Wins! " + userSum + " is more than " + dealerSum);
        return false;
    }


    //for dealer
    else if(dealerSum > 22 && stay == true){
        winText.append("User wins! House bust!");
        return false;
    }
    else if(userSum == dealerSum && stay == true){
        winText.append("Draw, money back");
        return false;
    }
    else if(dealerSum == 21 && stay == true){
        winText.append("House wins... Blackjack");
        return false;
    }
    else if(dealerSum > userSum && dealerSum < 22 && stay == true){
        winText.append("House Wins, " + dealerSum + " is more than " + userSum);
        return false;
    }
    else if(dealerSum < 17 && dealerSum < 22 && stay == true){
        return true;
    }
    // else if(dealerSum > userSum && dealerSum < 22){
    //     winText.append("")
    // }







    
   
    // if(stay == true && dealerSum > 21){
    //     if(dealerAce == true){
    //         dealerSum = parseInt(dealerSum) - 10;
    //         dealerAce = false;
    //         console.log(dealerSum);
    //         console.log(2);
    //         return true;
            
    //     }
    //     else{
    //         winTextText.append("test test")
    //         console.log(3);
    //         return false;
    //     }
    // }
    // else if(dealerSum < 17 && dealerSum < 22  && stay == true){
    //     winText.append("House wins... " + {dealerSum} + "is more than " + {userSum});
    //     console.log(4);
    //     return false;
    // }
}

window.onload = function(){
    shuffleDeck();
    startBtn.disabled = false;
    hitBtn.disabled = true;
    clearBtn.disabled = true;
    stayBtn.disabled = true;
    shuffleBtn.disabled = false;
}

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











//after this we add the sum for the player and ask to hit or stand. If number is greater than 21, they lose
//if the user stays we needs to reveal dealer card and add values
//if dealer value is < 17, dealer must hit. If dealer is > 17 they must stand. If the total is 16 or under, they must take a card. The dealer must continue to take cards until the total is 17 or more, at which point the dealer must stand.

//at the end compare the 2 scores and show who won the hand.

//if stay btn is called then we will call the dealer function