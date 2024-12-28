const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');
const rows = input.split('\n').map(line => line.trim()).slice(0, -1);

const findNodesWithNoIncomingEdges = (graph) => {
    const noIncoming = new Set(Object.keys(graph));

    for (const [_, values] of Object.entries(graph)) {
        for (const value of values) {
            noIncoming.delete(value);
        }
    }

    return Array.from(noIncoming)
}

const topologicalSort = (graph) => {
    const sorted = [];
    const noIncoming = findNodesWithNoIncomingEdges(graph);
    const noIncomingQueue = [...noIncoming];

    const graphCopy = { ...graph };

    while (noIncomingQueue.length > 0) {
        const node = noIncomingQueue.shift();
        sorted.push(node);

        if (graphCopy[node]) {
            const neighbors = graphCopy[node];
            delete graphCopy[node];

            for (const neighbor of neighbors) {
                const hasIncomingEdges = Object.values(graphCopy).some(
                    (targets) => targets.includes(neighbor)
                );

                if (!hasIncomingEdges) {
                    noIncomingQueue.push(neighbor);
                }
            }
        }
    }

    const hasEdgesLeft = Object.keys(graphCopy).some(
        (key) => graphCopy[key].length > 0
    );
    if (hasEdgesLeft) {
        console.log("!!!!!graph contains a cycle and cannot be topologically sorted!!!!");
    } else {
        return sorted;
    }
}

const isUpdateCorrect = (sorted, update) => {
    if (sorted === update) return true;
    if (sorted == null || update == null) return false;
    if (sorted.length !== update.length) return false;

    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i] !== update[i]) return false;
    }

    return true;
}

let post = false;
const ordering = [];
const updates = [];

for (const row of rows) {
    if (row === '') {
        post = true;
        continue;
    }
    post ? updates.push(row) : ordering.push(row);
}

const orderingGraph = {};
ordering.forEach(order => {
    const [from, to] = order.split('|');
    if (!orderingGraph[from]) {
        orderingGraph[from] = [];
    }
    orderingGraph[from].push(to);
});

let totalMiddleSum = 0;

updates.forEach(update => {
    const pages = update.split(',');

    const filteredGraph = {};
    pages.forEach(page => {
        if (orderingGraph[page]) {
            filteredGraph[page] = orderingGraph[page].filter(neighbor => pages.includes(neighbor)).sort();
        }
    });

    const sorted = topologicalSort(filteredGraph);
    const isCorrect = isUpdateCorrect(sorted, pages);
    
    if (!isCorrect) {
        const middleIndex = Math.floor(pages.length / 2);
        totalMiddleSum += +sorted[middleIndex];
    }
});

console.log(totalMiddleSum);
