//from the server we must recieve the first starting cards and continue to search to 
//see if the server has updated based off the users turn

//We will start by continuously searching for if the start btn was hit from the user
//once the start btn is clicked, we will change a variable in the server that will
//change an if conditional on the dealer side, this will then display the 2 cards
//one hidden, and will display the sum of the turn. This will then shut off the 
//interval from the start and will start another interval that will determine 
//when the dealers turn will start. Once the game is ended we will make sure
//that we are starting the game over and starting the interval up again to search.
let cardsOut = [];
let imgArr = [];
let hiddenCard = "/cassinoServer/BackOfCard.jpg"
let table = document.getElementById("table");
let updateTimer;
let start = setTimeout(setStart, 1000); // Adjust the timeout duration as needed
//this start interval will begin now scanning the server for the dealer page updates

async function setStart() {
    let data;
    try {
        while (!data || data.some(card => card === '/cassinoServer/cards/undefined.png')) {
            console.log("trying");
            const response = await fetch("http://localhost:5000/dealerPage");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            data = await response.json();
            await new Promise(resolve => setTimeout(resolve, 1000)); // Add a delay before next fetch
        }

        // Process the data
        processStart(data);

        // Clear the interval
        clearTimeout(start);
        updateTimer = setInterval(updateData,1000);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        // You may handle the error as per your application's requirements
    }
}
async function updateData(){
    let input;
    try{
        while (input == undefined) {
            console.log("Trying to update");
            const responseInput = await fetch("http://localhost:5000/check");
            if (!responseInput.ok) {
                throw new Error('Failed to fetch data');
            }
            input = await responseInput.text();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        processData(input);
        
        clearInterval(updateTimer);
    }        
    catch(error){
        console.error("error fetching data ",error.message);
    }
}

function processData(data){
    inputData = data;
    console.log(inputData);
    imgArr[0] = temp;
    table.append(inputData);
}



function processStart(responseData){
    cardsOut = responseData;
    imgArr[0] = createCard(hiddenCard);
    temp = createCard(cardsOut[0]);
    imgArr[1] = createCard(cardsOut[1]);
    table.append(imgArr[0],imgArr[1]);
    
    console.log(cardsOut);
}
async function statusCheck(res){
    if(!res.ok){
        throw new Error("Failed to fetch dealer cards");
    }
    return res;
}
function createCard(card){
    let img = document.createElement("img");
    img.src = card;
    return img;
}