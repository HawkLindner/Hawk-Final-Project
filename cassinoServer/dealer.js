const sock = new WebSocket("ws://localhost:3000"); // Corrected WebSocket URL




sock.addEventListener('message', (event) => {
    dealer = JSON.parse(event.data); // Parse the received JSON data
    startGame();
});

sock.addEventListener('open', () => {
    sock.send("Connected");
});

sock.addEventListener('close', () => {
    console.log('Disconnected from WebSocket');
});

let dealer = {};
function startGame(){
    console.log(dealer);
    printCards();

}
let shown = document.getElementById("Dcards");
function printCards(){
    removeCards();
    let score = document.getElementById("score");
    
    console.log(dealer.dealerImg);
    
    for(i = 0 ; i < dealer.dealerImg.length ; i++){
        let img = document.createElement("img");
        const imageUrl = dealer.dealerImg[i];
        //const trimmedUrl = imageUrl.substring(imageUrl.indexOf("/cassinoServer"));
        //below is for mac
        const trimmedUrl = imageUrl.substring(imageUrl.indexOf("/cards"));
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