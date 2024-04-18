
let onTable = [];
let dealer = [];
let gameStat = {};

//this is where we will start the dealer side
startBtn = document.getElementById("start");
startBtn.addEventListener("click",async ()=>{
    startBtn.disabled = true;
    await fetch("http://localhost:5000/start")//starts the game
    .then(statusCheck)
    .catch(handleError);
    const gameStatsResponse = await fetch("http://localhost:5000/gameStats");
    const gameStatsData = await gameStatsResponse.json();
    updateData(gameStatsData); // Pass game stats data to updateData
    await fetch("http://localhost:5000/dealerPage")
    .then(statusCheck)
    .then(resp => resp.json())
    .then(processData)
    .catch(handleError)
    setInterval(checkStay, 3000);
});
let table = document.getElementById("table");
let scoreOutput = document.getElementById("score");
    //json.parse()
async function statusCheck(res){
    if(!res.ok){
        throw new Error("Failed to fetch dealer cards");
    }
    return res;
}
async function handleError(){
    return "Something went wrong";
}
function processData(responseData){
    dealer = responseData;
    console.log(dealer[0]);
        onTable[0] = createCard(dealer[0]);
        onTable[1] = createCard(dealer[1]);
        console.log(onTable);
        table.append(onTable[0],onTable[1]);
}
function updateData(data){
    //this here updates the dealer side with the starting game info
    gameStat = data;
    console.log(gameStat);
    stay = gameStat.userStay;   //checking stay state
    hiddenSum = gameStat.dealerHiddenSum;   //checking hidden sum
    scoreOutput.append(gameStat.dealerHiddenSum);
}

function createCard(card){
    let img = document.createElement("img");
    img.src = card;
    return img;
}

//test

//set up timer 
function stayChecker(data){
if(data == true)
{   

    return true;
}
return false;
}
async function checkStay(){
try{
    let response = await fetch("http://localhost:5000/checkStay")
    stay = await response.text();
    
}catch(error){}
}
// To stop the interval after some time:
// Stop after 10 seconds
async function updateDealer(){
await fetch("http://localhost:5000/dealerUpdate")
.then(statusCheck)
.then(resp => resp.json())
.then(updateData)
.catch(handleError)
}