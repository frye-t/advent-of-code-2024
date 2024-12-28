const fs = require ('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const rows = input.split('\n').map(line => line.trim()).slice(0, -1);
const grid = rows.map(row => row.split(''));

const XMAS = 'XMAS';
let count = 0;

const search = (grid, row, col, dir) => {
    for (let i = 1; i < XMAS.length; i++) {
        currRow = row + (dir[0] * i);
        currCol = col + (dir[1] * i);

        if (currRow < 0 || currRow >= grid.length || currCol < 0 || currCol >= grid[0].length) {
            return false;
        }

        if (grid[currRow][currCol] !== XMAS[i]) {
            return false;
        }
    }

    return true;
}


const dirs = {
    right: [0, 1],
    left: [0 , -1],
    down: [1, 0],
    up: [-1, 0],
    upLeft: [-1, -1],
    upRight: [-1, 1],
    downLeft: [1, -1],
    downRight: [1, 1]
}

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] == 'X') {
            for (const dir of Object.values(dirs)) {
                if (search(grid, row, col, dir)) {
                    count++;
                }
            }
        } 
    }
}

console.log(count);