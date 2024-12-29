const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');
const rows = input.split('\n').map(line => line.trim()).slice(0, -1);


const canSolve = (target, nums) => {
    const dp = new Map();

    const backtrack = (index, current) => {
        if (index === nums.length) {
            return current === target;
        }

        const key = `${index}:${current}`;
        if (dp.has(key)) {
            return dp.get(key);
        }

        if (backtrack(index + 1, current + nums[index])) {
            dp.set(key, true);
            return true;
        }

        if (backtrack(index + 1, current * nums[index])) {
            dp.set(key, true);
            return true;
        }

        dp.set(key, false);
        return false;
    }
    
    return backtrack(1, nums[0]);
};

let calibrationResult = 0;
rows.forEach(r => {
    const splitRow = r.split(':');
    
    const target = parseInt(splitRow[0], 10);
    const nums = splitRow[1].trim().split(' ').map(Number);

    if (canSolve(target, nums)) {
        calibrationResult +=target;
    }
});

console.log(calibrationResult);