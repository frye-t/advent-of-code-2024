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

const isInBounds = (g, r, c) => r >= 0 && r < g.length && c >= 0 && c < g[0].length;
const isObject = (g, r, c) => g[r][c] == OBJECT;

/**
 * Store the position/facing as state, if we ever have the same state twice, it's a loop
 */
const containsLoop = (grid, row, col, face) => {
    const states = new Set();
    while (true) {
        const [dR, dC] = vector[face];
        const nextRow = row + dR;
        const nextCol = col + dC;

        const state = `${row},${col},${face}`;
        if (states.has(state)) { return true; }

        states.add(state);
        
        if (!isInBounds(grid, nextRow, nextCol)) {
            return false;
        }

        if (isObject(grid, nextRow, nextCol)) {
            face = facing[face];
        } else {
            row = nextRow;
            col = nextCol;
        }
    }
}

const startingPosition = findStartingPosition(grid);

let loopSum = 0;
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === '.') {
            grid[i][j] = '#'; 
            if (containsLoop(grid, startingPosition[0], startingPosition[1], '^')) { loopSum++ }
            grid[i][j] = '.' 
        }
    }
}

console.log(loopSum);

