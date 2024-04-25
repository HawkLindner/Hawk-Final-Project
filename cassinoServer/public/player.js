//first we need to create the json object that our userState will hold
let user = {};
let inGameDiv = document.getElementById("duringGame");
let afterGameDiv = document.getElementById("afterGame");
inGameDiv.style.visibility = "hidden";
afterGameDiv.style.visibility = "visible";
//now we will call on start which will and get the user json
const startBtn = document.getElementById("start");
startBtn.addEventListener("click",async()=>{
    try{
    const start = await fetch("http://localhost:3000/start")
    //const start = await fetch("/start");
    user = await start.json();
    printCards();
    console.log(user);
    }
    catch{"ERROR"}
    inGameDiv.style.visibility = "visible";
    afterGameDiv.style.visibility = "hidden";

});

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
        hitBtn.style =  "background-color : green";
    }
    else if(user.userSum < 15){
        hitBtn.style =  "background-color : yellow";
    }
    else{
        hitBtn.style =  "background-color : red";
    }

};
const hitBtn = document.getElementById("hit");
hitBtn.addEventListener("click",async ()=>{
    console.log("in");
    try{
        const hitData = await fetch("http://localhost:3000/hit");
        //const hitData = await fetch("/hit")
        user = await hitData.json()
        console.log(user);
        removeCards();
        printCards();
        checkBust();

    }catch{"ERROR"}
});
async function removeCards() {
    while (shown.firstChild) {
        shown.removeChild(shown.firstChild);
    }
};

async function checkBust(){
    if(user.userSum > 21){
        inGameDiv.style.visibility = "hidden";
        afterGameDiv.style.visibility = "visible";
        startBtn.disabled = true;
        clearBtn.disabled = false;

    }
};

//now I will be working on the stay feature
const stayBtn = document.getElementById("stay");
stayBtn.addEventListener("click",()=>{
    console.log("in the stay function");
    try {
        fetch("http://localhost:3000/stay");
        //fetch("/stay");
    } catch {
        
    }
    inGameDiv.style.visibility = "hidden";
    afterGameDiv.style.visibility = "visible";
    startBtn.disabled = true;
});

//now i will add the clear btn
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener('click',()=>{
    console.log("Clear hit");
    try{
        //fetch("http://localhost:3000/clear");
        fetch("/clear");
    }catch{}
    removeCards();
    Pscore.innerText = "";
    afterGameDiv.style.visibility = "visible"
    inGameDiv.style.visibility = "hidden";
    startBtn.disabled = false;
    clearBtn.disabled = true;
});