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

        let result = false;

        result ||= backtrack(index + 1, current + nums[index]);
        result ||= backtrack(index + 1, current * nums[index]);

        const concatenated = parseInt(current.toString() + nums[index].toString());
        result ||= backtrack(index + 1, concatenated);

        dp.set(key, result);
        return result;
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