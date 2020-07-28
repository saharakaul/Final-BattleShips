//Grid-Maze designer

//create an array to represent a grid
//Global Constants
const NUM_ROWS = 10;
const NUM_COLS = 10;



//Create divs to model the grid array
let cpuGrid = createGridArray();
let playerGrid = createPlayerGridArray();
createDivGrid(cpuGrid, "cpu-container", "c");
createDivGrid(playerGrid, "player-container", "p");



document.getElementById("startGame").addEventListener("click", generateRandomNum);

//document.getElementById("placeShipFor").addEventListener("click", placeShipRandomly)

