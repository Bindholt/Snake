
import * as controller from "./controller.js";
function init() {
    console.log("view init");
    attachEventListeners();
}

function attachEventListeners() {
    document.addEventListener("keydown", keyDown);
    document.querySelector("#restart").addEventListener("click", restartView);
}

function keyDown(e){
    let direction;

    switch(e.key) {
    case "w":
    case "ArrowUp":
        direction = "up"
        break;
    case "a":
    case "ArrowLeft":
        direction = "left"
        break;
    case "s":
    case "ArrowDown":
        direction = "down"
        break;
    case "d":
    case "ArrowRight":
        direction = "right"
        break;
    }
    if (direction) controller.changeDirection(direction);
}

function renderGrid(grid) {
    const rows = grid.rows();
    const cols = grid.cols();
    const gridContainer = document.querySelector("#grid");
    gridContainer.innerHTML = "";
    gridContainer.style.setProperty("--grid-rows", rows);
    gridContainer.style.setProperty("--grid-cols", cols);

    for (let r = 0; r < rows; r++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}

function updateView(grid, score) {
    const gridContainer = document.querySelector("#grid");
    const rows = grid.rows();
    const cols = grid.cols();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = grid.cell(r,c).value;
            const cellDiv = gridContainer.children[r].children[c];
            cellDiv.classList = ""
            if (cell === 1) {
                cellDiv.classList.add("snake");
            } else if (cell === 2) {
                cellDiv.classList.add("food");
            }
        }
    }

    const scoreContainer = document.querySelector("#score");
    scoreContainer.innerHTML = `Score: ${score}`;
}

function gameOver(score) {
    document.querySelector("#final-score").innerHTML = score;
    document.querySelector("#game-over").classList.add("show");
    
}

function restartView() {
    console.log("restart");
    document.querySelector("#game-over").classList.remove("show");

    controller.restart();
}

export {init, renderGrid, updateView, gameOver};
