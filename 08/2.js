const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const rows = input.split('\n').map(line => line.trim()).slice(0, -1);
const grid = rows.map(row => row.split(''));

const generateCoordinateMap = (grid) => {
    const coordMap = new Map();
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const char = grid[row][col];
            if (char !== '.') {
                if (!coordMap.has(char)) {
                    coordMap.set(char, []);
                }
                coordMap.get(char).push([row, col]);
            }

        }
    }
    return coordMap;
}

const generateCoordinateCombinations = (coordMap) => {
    const coordCombos = new Map();
    for (const key of coordMap.keys()) {
        const coords = coordMap.get(key);

        coordCombos.set(key, []);
        for (let i = 0; i < coords.length - 1; i++) {
            for (let j = i + 1; j < coords.length; j++) {
                coordCombos.get(key).push([coords[i], coords[j]]);
            }
        }
    }

    return coordCombos;
}

const isInBounds = (grid, node) => node[0] >= 0 && node[0] < grid.length && node[1] >= 0 && node[1] < grid[0].length;

const calculateAntinodeCoordinates = (coordCombos, grid) => {
    const antinodeCoords = new Set();

    for (const [_, coords] of antennaMap.entries()) {
        coords.forEach(([row, col]) => {
            antinodeCoords.add(`${row},${col}`);
        });
    }

    for (const key of coordCombos.keys()) {
        const coords = coordCombos.get(key);

        for (const coordPair of coords) {
            const dRow = coordPair[0][0] - coordPair[1][0];
            const dCol = coordPair[0][1] - coordPair[1][1];

            let currNode = coordPair[0]
            let antiNode = [currNode[0] + dRow, currNode[1] + dCol];
            while (isInBounds(grid, antiNode)) {
                antinodeCoords.add(`${antiNode[0]},${antiNode[1]}`)
                currNode = antiNode;
                antiNode = [currNode[0] + dRow, currNode[1] + dCol];
            }

            currNode = coordPair[1]
            antiNode = [currNode[0] - dRow, currNode[1] - dCol];
            while (isInBounds(grid, antiNode)) {
                antinodeCoords.add(`${antiNode[0]},${antiNode[1]}`)
                currNode = antiNode;
                antiNode = [currNode[0] - dRow, currNode[1] - dCol];;
            }
        }
    }

    return antinodeCoords;
}

const antennaMap = generateCoordinateMap(grid);
const coordCombos = generateCoordinateCombinations(antennaMap);
const antinodeCoords = calculateAntinodeCoordinates(coordCombos, grid);

console.log(antinodeCoords.size)