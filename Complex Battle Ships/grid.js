//Global varibles
//Player Hit, Miss, Sink
let hit = 0;
let miss = 0;
let sink = 0;
//Use to see if computer ship sinks
let ship1hit = 0;
let ship2hit = 0;
let ship3hit = 0;
//Used for loop, to calculate the length of ship
let numCoor = 0;
//Use to restrict location so that the ship doesn't go off the grid and/or ships aren't right next to each other
let cpuRowMax = 7;
let cpuColMin = 0;
let cpuColMax = 2;
//Computer hit, miss, sinks
let cpuHit = 0;
let cpuMiss = 0;
let computerSink = 0;
//Use to see if player ship sinks
let cpuShip1Sink = 0;
let cpuShip2Sink = 0;
let cpuShip3Sink = 0;
//Use to calculate the length of the player ship
let playerNumCoor = 0;
//Use to restrict location so that the ship doesn't go off the grid and/or ships aren't right next to each other
let rowMin = 0;
let rowMax = 7;
let colMin = 0;
let colMax = 2;



function createGridArray() {
    //Create and return a grid array
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

}


function createDivGrid(grid, containerid, id) {

    for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
            //Create a div for each element in 2d grid 
            let divEl = document.createElement("div");
            divEl.classList.add("sea");
            divEl.id = id + "cell" + row + col;

            //add Data values for row and col
            divEl.dataset.row = row;
            divEl.dataset.col = col;

            //Add an event listener to each divEl
            divEl.addEventListener("click", cellClicked)
            //Add div to container
            document.getElementById(containerid).append(divEl);
            
            grid[row][col] = 0;
        }

    }

}






//Generate the locations of ships


function generateRandomNum() {
    //Loop to create the ships
    for (let n = 0; n < 3; n++) {
        //Generate random location on grid
        let locationRow = Math.randomInt(0, cpuRowMax);
        let locationCol = Math.randomInt(cpuColMin, cpuColMax);
        //Change the restrictions on each ship
        cpuRowMax = cpuRowMax - 1;
        cpuColMin = cpuColMax + 2;
        cpuColMax = cpuColMax + 2;
        //Change shipId along with loop
        let shipId = Number(1 + n);
        //Assign ship Id
        cpuGrid[locationRow][locationCol] = shipId;
        //Change the number of coordinates
        let numCoor = Number(3 + n);
        //Draw each coordinate
        for (let i = 1; i < numCoor; i++) {
            let loc2 = locationRow + i;
            cpuGrid[loc2][locationCol] = shipId;
        }
    }
}

function cellClicked() {

    //Define row and column
    let row = event.target.dataset.row;
    let col = event.target.dataset.col;

    //Check if clicked cell is a hit or a miss, and which ship it belongs to 
    //Ship 1
    if (cpuGrid[row][col] == 1) {
        event.target.classList.remove("sea")
        event.target.classList.add("hitship")
        hit++;
        document.getElementById("numHit").innerHTML = hit;
        //Change it to -1 if hit so it being clicked will not count towards sinking
        cpuGrid[row][col] = -1;
        ship1hit++;
        //Call upon shipSink function to see if it's a sink
        shipSink(ship1hit, 3, 1)
    } else if (cpuGrid[row][col] == 2) { //Ship2
        event.target.classList.remove("sea")
        event.target.classList.add("hitship")
        hit++;
        document.getElementById("numHit").innerHTML = hit;
        cpuGrid[row][col] = -1;
        ship2hit++;
        shipSink(ship2hit, 4, 2)
    } else if (cpuGrid[row][col] == 3) { //Ship 3
        event.target.classList.remove("sea")
        event.target.classList.add("hitship")
        hit++;
        document.getElementById("numHit").innerHTML = hit;
        cpuGrid[row][col] = -1;
        ship3hit++;
        shipSink(ship3hit, 5, 3)
    } else if (cpuGrid[row][col] == 0) { //Miss
        event.target.classList.remove("sea")
        event.target.classList.add("missedship");
        miss++;
        document.getElementById("numMiss").innerHTML = miss;
        cpuGrid[row][col] = -2;
    }
    //Check if player has one through number of sinks
    //If player as 3 sinks, they won the game
    if (sink == 3) {
        document.getElementById("displayWin").innerHTML = "YOU WON";
    }
    //Computer guesses player location every time the player clicks
    let guessCol = Math.randomInt(0, 10);
    let guessRow = Math.randomInt(0, 10);
    //Check if it was a hit, and which ship they hit
    //Ship 1
    if (playerGrid[guessRow][guessCol] == 1) {
        cpuHit++;
        document.getElementById("cpuHit").innerHTML = cpuHit;
        document.getElementById("pcell" + guessRow + guessCol).classList.remove("placeShip");
        document.getElementById("pcell" + guessRow + guessCol).classList.add("hitship")
        playerGrid[guessRow][guessCol] = -1;
        cpuShip1Sink++;
        //Call upon the computerShipSink function to see if it's a sink
        computerShipSink(cpuShip1Sink, 3, 1)
    } else if (playerGrid[guessRow][guessCol] == 2) { //Ship 2
        cpuHit++;
        document.getElementById("cpuHit").innerHTML = cpuHit;
        document.getElementById("pcell" + guessRow + guessCol).classList.remove("placeShip");
        document.getElementById("pcell" + guessRow + guessCol).classList.add("hitship")
        playerGrid[guessRow][guessCol] = -1;
        cpuShip2Sink++;
        computerShipSink(cpuShip2Sink, 4, 2)
    } else if (playerGrid[guessRow][guessCol] == 3) { //Ship 3
        cpuHit++;
        document.getElementById("cpuHit").innerHTML = cpuHit;
        document.getElementById("pcell" + guessRow + guessCol).classList.remove("placeShip");
        document.getElementById("pcell" + guessRow + guessCol).classList.add("hitship")
        playerGrid[guessRow][guessCol] = -1;
        cpuShip3Sink++;
        computerShipSink(cpuShip3Sink, 5, 3)
    } else if (playerGrid[guessRow][guessCol] == 0) { //Miss
        cpuMiss++;
        document.getElementById("cpuMiss").innerHTML = cpuMiss;
        playerGrid[guessRow][guessCol] = -2;
        document.getElementById("pcell" + guessRow + guessCol).classList.remove("sea");
        document.getElementById("pcell" + guessRow + guessCol).classList.add("missedship")
    }
    //See number of hits, if computer has 3 hits, it won the game
    if (computerSink == 3) {
        document.getElementById("displayWin").innerHTML = "COMPUTER WON";
    }

}


function shipSink(shipNumHit, shipLength, shipNum) {
    //Check if ship length is equal to ship hits, if it is then its a hit
    if (shipNumHit == shipLength) {
        sink++;
        document.getElementById("numSink").innerHTML = sink;
        document.getElementById("displaySink").innerHTML += " Player SUNK SHIP " + shipNum;
    }

}

function computerShipSink(numberShipHit, numberShipLength, numberShip) {
    if (numberShipHit == numberShipLength) {
        computerSink++;
        document.getElementById("cpuSink").innerHTML = computerSink;
        document.getElementById("displayComputerSink").innerHTML += " Computer SUNK SHIP" + numberShip;
    }
}

function createPlayerGridArray() {
    //Create and return a grid array

    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

}

function placeShipRandomly() {
    //Loop through  amount of times for number of ships
    for (let n = 0; n < 3; n++) {
        //Randomly generate location
        let locationPlayerRow = Math.randomInt(rowMin, rowMax);
        let locationPlayerCol = Math.randomInt(colMin, colMax);
        //Set limits so ships aren't too close together or off the board
        rowMax = rowMax - 1;
        colMin = colMax + 2;
        colMax = colMax + 2;
        let playerShipId = Number(1 + n);
        playerGrid[locationPlayerRow][locationPlayerCol] = playerShipId;
        let playerNumCoor = Number(3 + n);
        //Add class list to show where ships are
        document.getElementById("pcell" + locationPlayerRow+ locationPlayerCol).classList.remove("sea")
        document.getElementById("pcell" + locationPlayerRow + locationPlayerCol).classList.add("placeShip")
        //Loop through to place each coordinate
        for (let i = 1; i < playerNumCoor; i++) {
            let locRow2 = locationPlayerRow + i;
            playerGrid[locRow2][locationPlayerCol] = playerShipId;
            document.getElementById("pcell" + locRow2 + locationPlayerCol).classList.remove("sea")
            document.getElementById("pcell" + locRow2 + locationPlayerCol).classList.add("placeShip");

        }
    }
}