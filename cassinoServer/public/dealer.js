// const sock = new WebSocket("ws://localhost:3000"); // Corrected WebSocket URL

// Define score in the global scope
let score;

//variables
let dealer = {};
let shown = document.getElementById("Dcards");

function updateState(){

        fetch("/getDealerState")
        .then(res => res.json())
        .then((data) => {
            dealer = data;
            startGame();
        });

}
//setInterval(updateState, 500);

function startGame(){
    console.log(dealer);
    printCards();
}

function printCards(){
    removeCards();
    score = document.getElementById("score"); // Assign to the global score variable

    console.log(dealer.dealerImg);
    
    for(i = 0 ; i < dealer.dealerImg.length ; i++){
        let img = document.createElement("img");
        const imageUrl = dealer.dealerImg[i];
        const trimmedUrl = imageUrl.substring(imageUrl.indexOf("/cassinoServer"));
        //below is for mac
        //const trimmedUrl = imageUrl.substring(imageUrl.indexOf("/cards"));
        img.src = trimmedUrl;
        shown.append(img);
    }
    score.innerText = "";
    score.innerText = "Score : " + dealer.dealerSum;

    //still need to calculate hidden sum
}

function removeCards() {
    while (shown.firstChild) {
        shown.removeChild(shown.firstChild);
    }
}

function reload(){
    removeCards();
    score.innerText = "";
}

let isReloaded = false;

