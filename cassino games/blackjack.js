
let deck;
function buildDeck(){
    let value = ["A", "1", "2", "3", "4", "5", "6", "7", "8","9","10","J","Q","K"];
    let suit = ["C","S","H","D"];
    deck = [];

    for( i = 0; i < suit.length; i++){
        for(j = 0; j < value.length; j++){
            deck.push(value[j] +"-" +suit[i]);
        }
    }
}
function shuffleDeck(){
    for(i = 0 ; i < deck.length;i++){
        //need to store the current card and get a random card
        let j = Math.floor(Math.random()*deck.length);//0-1 * deck length
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

window.onload = function(){
    buildDeck();
    shuffleDeck();
}

let shuffleBtn = document.getElementById("shuffle");
shuffleBtn.addEventListener("click",shuffleDeck);