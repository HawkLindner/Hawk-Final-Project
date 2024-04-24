// const sock = new WebSocket("ws://localhost:3000"); // Corrected WebSocket URL

// //variables
// let dealer = {};
// let shown = document.getElementById("Dcards");

// sock.addEventListener('open', () => {
//     sock.send("Connected");
// });

// sock.addEventListener('message', (event) => {
//     dealer = JSON.parse(event.data); // Parse the received JSON data
//     console.log(dealer);
//     if(dealer.clear == true){
//         reload();
//         console.log("we here");
//     }
//     else{
//         startGame();
//     }
// });

// sock.addEventListener('close', () => {
//     console.log('Disconnected from WebSocket');
// });

// function startGame(){
//     console.log(dealer);
//     printCards();

// }

// function printCards(){
//     removeCards();
//     let score = document.getElementById("score");
    
//     console.log(dealer.dealerImg);
    
//     for(i = 0 ; i < dealer.dealerImg.length ; i++){
//         let img = document.createElement("img");
//         const imageUrl = dealer.dealerImg[i];
//         //const trimmedUrl = imageUrl.substring(imageUrl.indexOf("/cassinoServer"));
//         //below is for mac
//         const trimmedUrl = imageUrl.substring(imageUrl.indexOf("/cards"));
//         img.src = trimmedUrl;
//         shown.append(img);
//     }
//     score.innerText = "";
//     score.innerText = "Score : " + dealer.dealerSum;

//     //still need to calculate hidden sum
// }
// function removeCards() {
//     while (shown.firstChild) {
//         shown.removeChild(shown.firstChild);
//     }
// }

// function reload(){
//     removeCards();
//     score.innerText = "";
//     reloadPageOnce();
// }

// let isReloaded = false;

// function reloadPageOnce() {
//     console.log("Reload");
//     if (!isReloaded) {
//         // Reload the page
//         window.location.reload();
//         // Set the flag to true to indicate that the page has been reloaded
//         isReloaded = true;
//     }
// }
const sock = new WebSocket("ws://localhost:3000"); // Corrected WebSocket URL

// Define score in the global scope
let score;

//variables
let dealer = {};
let shown = document.getElementById("Dcards");

sock.addEventListener('open', () => {
    sock.send("Connected");
});

sock.addEventListener('message', (event) => {
    dealer = JSON.parse(event.data); // Parse the received JSON data
    console.log(dealer);
    if(dealer.clear == true){
        reload();
        console.log("we here");
    }
    else{
        startGame();
    }
});

sock.addEventListener('close', () => {
    console.log('Disconnected from WebSocket');
});

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

function reload(){
    removeCards();
    score.innerText = "";
    reloadPageOnce();
}

let isReloaded = false;

function reloadPageOnce() {
    console.log("Reload");
    if (!isReloaded) {
        // Reload the page
        window.location.reload();
        // Set the flag to true to indicate that the page has been reloaded
        isReloaded = true;
    }
}
