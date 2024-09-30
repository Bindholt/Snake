import Grid from "./grid.js";
import Queue from "./queue.js";
import * as view from "./view.js";
window.addEventListener("load", init);

let ROWS = 15;
let COLS = 15;
let score = 0;
const inputBuffer = new Queue(["right"]);
let grid;
let player;
let gameOver = false;

function init() {
    view.init();
    createGrid();
    setInitialPlayer();
    setPlayerInGrid();
    placeFood();
    view.updateView(grid, score);
    tick();

    window.grid = grid;
}

function createGrid() {
    grid = new Grid(ROWS, COLS);
    view.renderGrid(grid);
}

function setInitialPlayer() {
    const startingPosition = [{row:5, col:5}, {row:5, col:6}, {row:5, col:7}];
    player = new Queue(startingPosition);
}

function setPlayerInGrid() {
    let current = player.getHead();
    while(!!current) {
        grid.set(current.data.row, current.data.col, 1);
        current = current.next;
    }
}

function tick() {
    movePlayer();
    if(gameOver) {
        view.gameOver(score);
        return;
    } 
    view.updateView(grid, score);
    setTimeout(tick, getSpeed());
}

function getSpeed() {
    
    if(score < 1) return 400;
    if(score < 5) return 350;
    if(score < 10) return 300;
    if(score < 20) return 250;     
}

function changeDirection(direction) {
    if(isValidDirection(direction)) {
        inputBuffer.add(direction);
    } 
}

function movePlayer() {
    let frontOfSnake = {...player.getTail().data};
    let backOfSnake = {...player.getHead().data};

    if(inputBuffer.size() > 1) inputBuffer.removeHead();
    
    switch (inputBuffer.getHead().data) {
        case "up":
            frontOfSnake.row--;
            break;
        case "down":
            frontOfSnake.row++;
            break;
        case "left":
            frontOfSnake.col--;
            break;
        case "right":
            frontOfSnake.col++;
            break;
    }
        
    if(isCollision(frontOfSnake)) {
        gameOver = true;
        return;
    }

    player.add(frontOfSnake);
    if(grid.get(frontOfSnake.row, frontOfSnake.col) === 2) {
        score++;
        placeFood();
        grid.set(frontOfSnake.row, frontOfSnake.col, 1);
    } else {
        player.removeHead();
        grid.set(backOfSnake.row, backOfSnake.col, 0);
    }   

    grid.set(frontOfSnake.row, frontOfSnake.col, 1);
}

function isValidDirection(direction) {
    const previousDirection = inputBuffer.getTail().data;
    if(direction === "up" && previousDirection === "down") return false;
    if(direction === "down" && previousDirection === "up") return false;
    if(direction === "left" && previousDirection === "right") return false;
    if(direction === "right" && previousDirection === "left") return false;
    if(direction === previousDirection) return false;
    return true;
}

function isCollision(front) {
    if(front.row < 0 || front.row >= ROWS || front.col < 0 || front.col >= COLS) return true;
    const back = player.getHead().data;
    const frontCell = grid.cell(front.row, front.col);
    const backCell = grid.cell(back.row, back.col);
    if(frontCell.value === 1 && !(frontCell.row == backCell.row && frontCell.col == backCell.col)) return true;
    return false;
}

function placeFood() {
    let emptyNodes = arrayOfEmptyNodes();
    const randomIndex = Math.floor(Math.random() * emptyNodes.length);
    const randomCell = emptyNodes[randomIndex];
    grid.set(randomCell.row, randomCell.col, 2);
}

function arrayOfEmptyNodes() {
    let emptyNodes = [];
    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLS; c++) {
            if(grid.get(r,c) === 0) {
                emptyNodes.push({row:r, col:c});
            }
        }
    }
    return emptyNodes;
}

function restart() {
    gameOver = false;
    score = 0;
    createGrid();
    setInitialPlayer();
    setPlayerInGrid();
    placeFood();
    view.updateView(grid, score);
    tick();
}


export {changeDirection, restart};