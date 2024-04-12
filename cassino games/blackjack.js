
let deck;
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
    }
    console.log(deck);
}
let onTable = [];
let cardCount = 0;
let delt;
function dealCards(){
    let card = deck.pop();
    let dealerHand = document.getElementById("dealer-cards");
    onTable[cardCount] = document.createElement("img");
    onTable[cardCount].value = deck.pop();
    onTable[cardCount].src = "/cards/"+onTable[cardCount].value+".png";
    onTable[cardCount].id = "card"
    dealerHand.append(onTable[cardCount]);
    //console.log(checkValue(onTable[cardCount]));
   // console.log(onTable);
    console.log(onTable[cardCount].value);
    cardCount++;
   // console.log(cardCount);

}
function clearTable(){
    let test = document.getElementById("card");
    onTable.forEach(card => {
        onTable.pop();
    });
    cardCount = 0;
    delt = document.createElement("img");
}

window.onload = function(){
    buildDeck();
    shuffleDeck();
}


// function checkValue(card){
//     let value = card.split("-");
//     if(value[0] = NaN){
//         if(value === 'A'){
//             return 11;
//         }
//         else{return 10;}
//     }
//     else{
//         return value[0];
//     }
// }

let shuffleBtn = document.getElementById("shuffle");
shuffleBtn.addEventListener("click",shuffleDeck);

let dealcard = document.getElementById("deal");
dealcard.addEventListener("click",dealCards);

let clear = document.getElementById("clear");
clear.addEventListener("click",clearTable);