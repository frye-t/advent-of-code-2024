const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const rows = input.split('\n').map(line => line.trim()).slice(0, -1);
const grid = rows.map(row => row.split(''));

const MAS = 'MAS';
let count = 0;

const search = (grid, row, col, dirs) => {
    const checkBounds = (r, c) => r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;

    const positions = {
        upLeft: [row + dirs.upLeft[0], col + dirs.upLeft[1]],
        upRight: [row + dirs.upRight[0], col + dirs.upRight[1]],
        downLeft: [row + dirs.downLeft[0], col + dirs.downLeft[1]],
        downRight: [row + dirs.downRight[0], col + dirs.downRight[1]]
    };

    for (const [r, c] of Object.values(positions)) {
        if (!checkBounds(r, c)) return false;
    }

    const chars = {
        upLeft: grid[positions.upLeft[0]][positions.upLeft[1]],
        upRight: grid[positions.upRight[0]][positions.upRight[1]],
        downLeft: grid[positions.downLeft[0]][positions.downLeft[1]],
        downRight: grid[positions.downRight[0]][positions.downRight[1]]
    };

    const diagonal1 =
        (chars.upLeft === 'M' && chars.downRight === 'S') ||
        (chars.upLeft === 'S' && chars.downRight === 'M');
    const diagonal2 =
        (chars.upRight === 'M' && chars.downLeft === 'S') ||
        (chars.upRight === 'S' && chars.downLeft === 'M');

    return diagonal1 && diagonal2;
}


const dirs = {
    upLeft: [-1, -1],
    upRight: [-1, 1],
    downLeft: [1, -1],
    downRight: [1, 1]
}

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] == 'A') {
            if (search(grid, row, col, dirs)) {
                count++;
            }
        }
    }
}

console.log(count);