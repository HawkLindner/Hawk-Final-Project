
// Define score in the global scope
let score;

//variables
let dealer = {};
let shown = document.getElementById("Dcards");

function updateState(){
        //fetch("http://localhost:3000/getDealerState")
        fetch("/getDealerState")
        .then(res => res.json())
        .then((data) => {
            dealer = data;
            console.log(dealer);
            startGame();
        });

}
setInterval(updateState, 2000);

function startGame(){
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
        img.src = trimmedUrl;
        shown.append(img);
    }
    score.innerText = "";
    score.innerText = "Score : " + dealer.dealerSum;
    let winMsg = document.getElementById("endGameMsg");
    winMsg.innerText = "";
    winMsg.innerText = dealer.winMsg;
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

