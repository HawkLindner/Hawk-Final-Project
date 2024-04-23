//to start off we need to start collecting data while we wait for the server to star
let startTimeout = setTimeout(start, 3000);
let dealer = {};

async function start() {
    let data;
    try {
        while (data == undefined) {
            console.log(data);
            const response = await fetch("http://localhost:3000/getStats");
            if (!response.ok) {
                throw new Error("Failed");
            }
            data = await response.json();
            dealer = data;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        clearTimeout(startTimeout);
    } catch (error) {
        console.error("Error:", error);
    }
    
    console.log("Here");
    printCards();
}

let shown = document.getElementById("Dcards");
async function printCards(){
    let score = document.getElementById("score");
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
async function removeCards(shown) {
    while (shown.firstChild) {
        shown.removeChild(shown.firstChild);
    }
}












































// let onTable = [];
// let dealer = [];
// let gameStat = {};
// let table = document.getElementById("table");
// let scoreOutput = document.getElementById("score");
// let start = false;

// let intervalId = setInterval(startGame(),2000);

// async function startGame(){
//     if(start == false){
//         startBtn.disabled = true;
//         await fetch("http://localhost:5000/start")//starts the game
//         .then(statusCheck)
//         .catch(handleError);
//         const gameStatsResponse = await fetch("http://localhost:5000/gameStats");
//         const gameStatsData = await gameStatsResponse.json();
//         updateData(gameStatsData); // Pass game stats data to updateData
//         await fetch("http://localhost:5000/dealerPage")
//         .then(statusCheck)
//         .then(resp => resp.json())
//         .then(processData)
//         .catch(handleError)
//         setInterval(checkStay, 3000);
        
//     }
// }
// //this is where we will start the dealer side

// //handles the errors
// async function handleError(){
//     return "Something went wrong";
// }
// //this processes the data and creates the cards shown to the user
// function processData(responseData){
//     dealer = responseData;
//     console.log(dealer[0]);
//         onTable[0] = createCard(dealer[0]);
//         onTable[1] = createCard(dealer[1]);
//         console.log(onTable);
//         table.append(onTable[0],onTable[1]);
// }

// //this function updates the dealers game stat
// function updateData(data){
//     //this here updates the dealer side with the starting game info
//     gameStat = data;
//     console.log(gameStat);
//     stay = gameStat.userStay;   //checking stay state
//     hiddenSum = gameStat.dealerHiddenSum;   //checking hidden sum
//     scoreOutput.append(gameStat.dealerHiddenSum);
// }

// //this creates the card for the dealer
// function createCard(card){
//     let img = document.createElement("img");
//     img.src = card;
//     return img;
// }

// //this function checks to see if the user has hit stay
// async function checkStay(){
// try{
//     let response = await fetch("http://localhost:5000/checkStay")
//     stay = await response.text();
    
// }catch(error){}
// }

// // To stop the interval after some time:
// // Stop after 10 seconds
// async function updateDealer(){
// await fetch("http://localhost:5000/dealerUpdate")
// .then(statusCheck)
// .then(resp => resp.json())
// .then(updateData)
// .catch(handleError)
// }

// //function to make sure  we good
// async function statusCheck(res){
//     if(!res.ok){
//         throw new Error("Failed to fetch dealer cards");
//     }
//     return res;
// }

// function createCard(card){
//     let img = document.createElement("img");
//     img.src = card;
//     console.log(img.src);
//     return img;
// }
// //add card to the scren. part of hit
// function addCard(responseData){
//     console.log(responseData);
//     let next = createCard(responseData[responseData.length-1]);
//     onTable.push(next);
//     table.append(onTable[onTable.length -1]);
// }




// //have a timer to pull the dealer stats down from the server. This will then pull down the cards that are on the table. I want to make
// //it so when the dealers turn is over and clear has been selected then the timer will restart listening for when the game is started