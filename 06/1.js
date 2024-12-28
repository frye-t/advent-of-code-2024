const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const rows = input.split('\n').map(line => line.trim()).slice(0, -1);
const grid = rows.map(row => row.split(''));

const findStartingPosition = (grid) => {
    let r = -1;
    let c = -1;
    for (const [index, row] of grid.entries()) {
        c = row.indexOf('^')
        if (c >= 0) {
            r = index;
            break;
        }
    }
    return [r, c]
}

const facing = {
    '^': '>',
    '>': 'v',
    'v': '<',
    '<': '^'
};

const vector = {
    '^': [-1,0],
    '>': [0,1],
    'v': [1,0],
    '<': [0,-1],
};

const OBJECT = '#';

const isInBounds = (r, c) => r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
const isObject = (r, c) => grid[r][c] == OBJECT;

const traverseAndMark = (grid, row, col, face) => {
    while (true) {
        const [dR, dC] = vector[face];
        const nextRow = row + dR;
        const nextCol = col + dC;

        grid[row][col] = 'X';

        if (!isInBounds(nextRow, nextCol)) {
            break;
        }

        if (isObject(nextRow, nextCol)) {
            face = facing[face];
        } else {
            row = nextRow;
            col = nextCol;
        }
    }
}

const countCharacter = (grid, char) => {
    return grid.flat().filter(c => c === char).length;
}

const startingPosition = findStartingPosition(grid);
traverseAndMark(grid, startingPosition[0], startingPosition[1], '^');

console.log(countCharacter(grid, 'X'))