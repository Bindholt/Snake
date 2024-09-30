export default class Grid {
    grid = [];
    rowNum;
    colNum;

    constructor(rowNum, colNum) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.grid = [];
        for (let i = 0; i < this.rowNum; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.colNum; j++) {
                this.grid[i][j] = 0;
            }
        }
    }

    set(row, col, value) {
        this.grid[row][col] = value;
    }

    get(row, col) {
        return this.grid[row][col];
    }

    cell(row, col) {
        return {row, col, value: this.get(row, col)};
    }

    indexFor(row, col) {
        if (row < 0 || row >= this.rowNum || col < 0 || col >= this.colNum) {
            return -1;
        }
        return row * this.colNum + col;
    }

    rowColFor(i) {
        let row = Math.floor(i / this.colNum);
        let col = i % this.rowNum;

        return {row, col};
    }

    neighbours(row,col) {
        return [
            this.north(row,col),
            this.east(row,col),
            this.south(row,col),
            this.west(row,col),
            this.northEast(row,col),
            this.northWest(row,col),
            this.southEast(row,col),
            this.southWest(row,col)
        ];
    }

    neighbourValues(row,col) {
        return this.neighbours(row,col).map(cell => cell.value);
    }

    north(row,col){
        const nRow = (row - 1 + this.rowNum) % this.rowNum;
        const nCol = col;
        return this.cell(nRow, nCol);
    }

    east(row, col) {
        const eRow = row;
        const eCol = (col + 1) % this.colNum;
        return this.cell(eRow, eCol);
    }

    south(row, col) {
        const sRow = (row + 1) % this.rowNum;
        const sCol = col;
        return this.cell(sRow, sCol);
    }

    west(row, col) {
        const wRow = row;
        const wCol = (col - 1 + this.colNum) % this.colNum;
        return this.cell(wRow, wCol);
    }

    northEast(row,col){
        const NERow = (row - 1 + this.rowNum) % this.rowNum;
        const NECol = (col + 1) % this.colNum;
        return this.cell(NERow,NECol);
    }

    northWest(row,col){
        const NWRow = (row - 1 + this.rowNum) % this.rowNum;
        const NWCol = (col - 1 + this.colNum) % this.colNum;
        return this.cell(NWRow,NWCol);
    }

    southEast(row, col) {
        const SERow = (row + 1) % this.rowNum;
        const SECol = (col + 1) % this.colNum;
        return this.cell(SERow, SECol);
    }

    southWest(row, col) {
        const SWRow = (row + 1) % this.rowNum;
        const SWCol = (col - 1 + this.colNum) % this.colNum;
        return this.cell(SWRow, SWCol);
    }

    nextInRow(row, col) {
        return this.east(row, col);
    }

    nextInCol(row, col) {
        return this.south(row, col);
    }

    rows() {
        return this.rowNum;
    }

    cols() {
        return this.colNum;
    }

    size() {
        return this.rowNum * this.colNum;
    }

    fill(value) {
        for (let i = 0; i < this.rowNum; i++) {
            for (let j = 0; j < this.colNum; j++) {
                this.grid[i][j] = value;
            }
        }
    }

    dump() {
        console.table(this.grid);
    }

    clear() {
        this.fill(0);
    }
}