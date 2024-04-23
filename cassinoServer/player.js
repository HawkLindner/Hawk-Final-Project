//first we need to create the json object that our userState will hold
let user = {};

//now we will call on start which will and get the user json
const startBtn = document.getElementById("start");
startBtn.addEventListener("click",async()=>{
    try{
    const start = await fetch("http://localhost:3000/start");
    user = await start.json();
    printCards();
    console.log(user);
    }
    catch{"ERROR"}
})

//now that we are getting the data sent over, we need to display these img in our
//page
let shown = document.getElementById("Pcards");
async function printCards(){
    let score = document.getElementById("Pscore");
    for(i = 0 ; i < user.userImg.length ; i++){
        let img = document.createElement("img");
        const imageUrl = user.userImg[i];
        const trimmedUrl = imageUrl.substring(imageUrl.indexOf("/cassinoServer"));
        //below is for mac
        //const trimmedUrl = imageUrl.substring(imageUrl.indexOf("/cards"));
        img.src = trimmedUrl;
        console.log(img);
        shown.append(img);
    }
    score.innerText = "";
    score.innerText = "Score : " + user.userSum;
    if(user.userSum < 10){
        hit.className = "btn btn-success";
    }
    else if(user.userSum < 15){
        hit.className = "btn btn-warning";
    }
    else{
        hit.className = "btn btn-danger";
    }

}
const hitBtn = document.getElementById("hit");
hitBtn.addEventListener("click",async ()=>{
    console.log("in");
    try{
        const hitData = await fetch("http://localhost:3000/hit")
        user = await hitData.json()
        console.log(user);
        removeCards();
        printCards();
        checkBust();

    }catch{"ERROR"}
})
async function removeCards() {
    while (shown.firstChild) {
        shown.removeChild(shown.firstChild);
    }
}

async function checkBust(){
    if(user.userSum > 21){
        hitBtn.disabled = true;
    }
}

//now I will be working on the stay feature
const stayBtn = document.getElementById("stay");
stayBtn.addEventListener("click",()=>{
    console.log("in the stay function");
    try {
        const stay = fetch("http://localhost:3000/stay");
    } catch {
        
    }
})

//now i will add the clear btn
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener('click',()=>{
    console.log("Clear hit");
    try{
        const clear = fetch("http://localhost:3000/stay");
    }catch{}
})




























// let onTable = [];
// let user = {};
// let stay = false;
// let table = document.getElementById("Pcards");
// let score = document.getElementById("Pscore");

// let start = document.getElementById("start");
// start.addEventListener("click",async() =>{
//     start.disabled=true;
//     shuffle.disabled = true;
//     hit.disabled = false;
//     hit.className = "";
//     stay.disabled = false;

//     //here we are going to send that we want to start the game, this will tell
//     //the server to deal us 2 cards and to deal the dealer 2 cards
//     //server will then calculate sums, and variables of the game
//     // await fetch("http://localhost:5000/start")
//     // .then(statusCheck)
//     // .catch(handleError); 
//     // //now we are gonna start getting some of the variables back and then we can
//     // //do what the server wants, if certian variables are called from the server
//     // //here we will emulate if the game is over, of if the user can hit or stand
//     // const gameStatsResponse = await fetch("http://localhost:5000/gameStats");
//     // const gameStatsData = await gameStatsResponse.json();
//     // updateData(gameStatsData); // Pass game stats data to updateData

//     // //here we can add our if statements to go to 2 different types of games. one will
//     // //be an end game screen or will allow the user to continue hitting or stay


//     fetch("http://localhost:5000/start")
//     .then(data => data.json())
//     .then(processData)
//     .catch(handleError);
//     console.log(user);

//     if(user.isLosing == true){
//         endGame();
//     }

    
// });
// let clear = document.getElementById("clear");
// clear.addEventListener("click", async() =>{
//     const reset = await fetch("http://localhost:5000/clear");
//     onTable = [];
//     user = {};
//     while(table.firstChild){
//         table.removeChild(table.firstChild);
//     }
//     score.innerText = "";
//     start.disabled = false;
//     shuffle.disabled = false;
   

//     console.log(user);
// })
// //shuffle method
// let shuffle = document.getElementById("shuffle");
// shuffle.addEventListener("click",() =>{
//     fetch("http://localhost:5000/shuffle")
//     .then(console.log("Shuffled"))
// });

// //hit method, needs to be worked on
// let hit = document.getElementById("hit");
// hit.addEventListener("click", async () => {
//     try {
//         const response = await fetch("http://localhost:5000/userHit");
//         if (!response.ok) {
//             throw new Error("Failed to fetch data");
//         }
//         const responseData = await response.text();
//         addCard(responseData);
//         const gameStatsResponse = await fetch("http://localhost:5000/gameStats");
//         const gameStatsData = await gameStatsResponse.json();
//         updateData(gameStatsData); // Pass game stats data to updateData
//         console.log(user);
//     } catch (error) {
//         console.error(error);
//     }
//     if(user.isLosing == true){
//         fetch("http://localhost:5000/stay");
//         hit.disabled = true;
//         hit.className = "";
//         stay.disabled = true;

//     }
// });

// let stayBtn = document.getElementById("stay");
// stayBtn.addEventListener("click",()=>{
//     fetch("http://localhost:5000/stay");
//         stay.disabled = true;
//         hit.disabled = true;
//         hit.className = "";
        

//         console.log("Stay");
// })


// //function for fetch
// async function statusCheck(res){
//     if(!res.ok){
//         throw new Error("Failed to fetch dealer cards");
//     }
//     return res;
// }
// //function for fetch
// async function handleError(){
//     return "Something went wrong";
// }
// //function for fetch
// //this one sets the 2 cards on the table
// //can aslo put score in here
// function processData(responseData){
//     user = responseData;
//         onTable[0] = createCard(user[0]);
//         onTable[1] = createCard(user[1]);
//         table.append(onTable[0],onTable[1]);
// }
// //this will be for the data recieved in and will determine how our page looks
// function updateData(data){
//     //this here updates the dealer side with the starting game info
//     user = data;
//     score.innerText = "";
//     score.append(user.playerSum);

//     

// //creates the cards for hit
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
