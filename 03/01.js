const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

const matches = [...input.matchAll(regex)];

const result = matches.reduce((sum, match) => {
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    return sum + (num1 * num2);
}, 0);

console.log(result);