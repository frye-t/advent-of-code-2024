const fs = require('fs');

// Read the input
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('').map(Number);

const BlockType = {
    FILE: 0,
    FREE: 1
};

class Block {
    // type
    // freeSpace
    // data
    constructor(id, size) {
        if (id % 2 === 0) {
            this.type = BlockType.FILE;
            this.freeSpace = 0;
            this.data = new Array(size).fill(id / 2);
        } else {
            this.type = BlockType.FREE;
            this.freeSpace = size;
            this.data = [];
        }
    }

    // Attempt to add block to this block if free space allows
    // Add it to this block, reduce freespace by amount added
    // Change block type if this block was a free block
    // Adjust add block free space, reset its data, and change type
    // Return boolean value based on operation success
    fill(blockToAdd) {
        if (blockToAdd.data.length <= this.freeSpace) {
            this.data.push(...blockToAdd.data);
            this.freeSpace -= blockToAdd.data.length;
            if (this.type === BlockType.FREE) { this.type = BlockType.FILE }

            blockToAdd.freeSpace = blockToAdd.data.length;
            blockToAdd.data = [];
            blockToAdd.type = BlockType.FREE;
            return true;
        }
        return false;
    }
}

class Disk {
    constructor(diskMap) {
        this.blocks = this.buildDisk(diskMap);
    }

    buildDisk(diskMap) {
        const blocks = [];

        for (let i = 0; i < diskMap.length; i++) {
            blocks.push(new Block(i, diskMap[i]));
        }

        return blocks;
    }

    // Move blocks starting on right working left
    // Attempt to add right block to left block until left and right meet
    defrag() {
        for (let right = this.blocks.length - 1; right > 0; right--) {
            if (this.blocks[right].type === BlockType.FREE) {
                continue;
            }

            const blockToMove = this.blocks[right];
            for (let left = 0; left < right; left++) {
                if (this.blocks[left].fill(this.blocks[right])) {
                    break;
                }
            }
        }
    }

    calculateChecksum() {
        let checksum = 0;
        let globalIndex = 0;

        this.blocks.forEach(block => {
            if (block.type === BlockType.FILE) {
                block.data.forEach(value => {
                    checksum += value * globalIndex;
                    globalIndex++;
                });
            }
            globalIndex += block.freeSpace;
        });

        return checksum;
    }
}

const disk = new Disk(input);
disk.defrag();
console.log("Checksum:", disk.calculateChecksum());
