const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/;
const doRegex = /do\(\)/;
const dontRegex = /don't\(\)/;

const instructionRegex = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g;

const instructions = [];
let match;

while ((match = instructionRegex.exec(input)) !== null) {
    instructions.push(match[0]);
}

let enabled = true;
let sum = 0;
instructions.forEach(instruction => {
    if (doRegex.test(instruction)) {
        enabled = true;
    } else if (dontRegex.test(instruction)) {
        enabled = false;
    } else {
        const match = mulRegex.exec(instruction);
        if (match && enabled) {
            const num1 = parseInt(match[1], 10);
            const num2 = parseInt(match[2], 10);
            sum += num1 * num2;
        }
    }
});

console.log(sum);