//from the server we must recieve the first starting cards and continue to search to 
//see if the server has updated based off the users turn

//We will start by continuously searching for if the start btn was hit from the user
//once the start btn is clicked, we will change a variable in the server that will
//change an if conditional on the dealer side, this will then display the 2 cards
//one hidden, and will display the sum of the turn. This will then shut off the 
//interval from the start and will start another interval that will determine 
//when the dealers turn will start. Once the game is ended we will make sure
//that we are starting the game over and starting the interval up again to search.

let startInterval = setInterval(setStart,1000);
let cardsOut = [];
let hiddenCard;

//this start interval will begin now scanning the server for the dealer page updates

async function setStart(){
    await fetch("http://localhost:5000/dealerPage")
    .then(statusCheck)
    .then(resp => resp.json())
    .then(processStart)
}
function processStart(responseData){
    cardsOut = responseData;
    console.log(cardsOut);
}