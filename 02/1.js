const fs = require ('fs');

const findDistance = (num1, num2) => Math.abs(num1 - num2);

const input = fs.readFileSync('input.txt', 'utf-8');

const lines = input.split('\n').map(line => line.trim());

const MIN = 1;
const MAX = 3;

let safeCount = 0;

const isSafe = (nums) => {
    let decreasing = nums[0] > nums[1];
    for (let i = 0; i < nums.length - 1; i++) {
        const distance = findDistance(nums[i], nums[i + 1]);
        const activelyDecreasing = nums[i] > nums[i+1];
        if (distance > MAX || distance < MIN || activelyDecreasing != decreasing) {
            return false;
        }
    }
    return true;
}

lines.forEach(line => {
    const nums = line.split(' ').map(Number);
    if (isSafe(nums)) {
        safeCount++;
    }
});

console.log(safeCount);
