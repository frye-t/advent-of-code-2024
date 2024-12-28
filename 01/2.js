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

const count = right.reduce((acc, num) => {
    acc[num] = (acc [num] || 0) + 1;
    return acc;
}, {});

const result = left.reduce((acc, num) => {
    return acc + (num * (count[num] || 0));
}, 0);

console.log(result);
