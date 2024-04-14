
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
    let userCards = document.getElementById("pCards")
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
    buildDeck();
    shuffleDeck();
    console.log("Clear");
}
function hit(){
    onTable[cardCount] = document.createElement("img");
    //to hit we want to add cards to user hand
    onTable[cardCount].id = deck.pop();
    onTable[cardCount].src = "/cassino games/cards/"+onTable[cardCount].id+".png";
    checkAce = checkValue(onTable[cardCount]);
    if(checkAce === 11){
        userAce = true;
    }
    onTable[cardCount].value = checkAce;
    userSum = parseInt(userSum) + parseInt(onTable[cardCount].value); 
    playerHand.append(onTable[cardCount]);

    if(checkWin() == false){
        hitBtn.disabled = true;
    }
    console.log(userSum);
    cardCount++;
    console.log("Hit");
    
}
function checkWin(){
    if(userSum == 21){
        //user Wins
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


window.onload = function(){
    shuffleDeck();
}

let shuffleBtn = document.getElementById("shuffle");
shuffleBtn.addEventListener("click",shuffleDeck);

let clear = document.getElementById("clear");
clear.addEventListener("click",clearTable);

let hitBtn = document.getElementById("hit");
hitBtn.addEventListener("click",hit);

let start = document.getElementById("start");
start.addEventListener("click",startGame);













//after this we add the sum for the player and ask to hit or stand. If number is greater than 21, they lose
//if the user stays we needs to reveal dealer card and add values
//if dealer value is < 17, dealer must hit. If dealer is > 17 they must stand. If the total is 16 or under, they must take a card. The dealer must continue to take cards until the total is 17 or more, at which point the dealer must stand.

//at the end compare the 2 scores and show who won the hand.

//if stay btn is called then we will call the dealer function