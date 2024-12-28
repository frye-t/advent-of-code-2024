const fs = require ('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n');

let left = [];
let right = [];

lines.forEach((line, index) => {
    const numbers = line.trim().split(/\s+/).map(Number);

    left.push(numbers[0]);
    right.push(numbers[1]);
});


const leftSorted = left.sort();
const rightSorted = right.sort();

const result = leftSorted.reduce((acc, _, i) => {
    return acc + Math.abs(leftSorted[i] - rightSorted[i]);
}, 0);

console.log(result);