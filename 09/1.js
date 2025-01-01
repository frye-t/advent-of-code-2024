const fs = require('fs');

// Read the input
const input = fs.readFileSync('input.txt', 'utf-8').trim();

const expandBlocks = (diskMap) => {
    let blockId = 0;
    const expandedMap = [];

    for (let i = 0; i < diskMap.length; i++) {
        const count = parseInt(diskMap[i], 10); 
        if (i % 2 === 0) {
            expandedMap.push(...Array(count).fill(blockId));
            blockId++;
        } else {
            expandedMap.push(...Array(count).fill('.')); 
        }
    }

    return expandedMap;
};

const blocks = expandBlocks(input);

let left = 0;
let right = blocks.length - 1;

while (left < right) {
    while (left < blocks.length && blocks[left] !== '.') {
        left++;
    }

    while (right >= 0 && blocks[right] === '.') {
        right--;
    }

    if (left < right) {
        [blocks[left], blocks[right]] = [blocks[right], blocks[left]];
        left++;
        right--;
    }
}


const result = blocks.reduce((acc, el, i) => {
    if (el === '.') {
        return acc; 
    } else {
        const value = el * i; 
        return acc + value;
    }
}, 0);

console.log("Final blocks checksum:", result);
