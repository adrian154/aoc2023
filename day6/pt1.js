const [times, distances] = require("fs").readFileSync("input.txt", "ascii").split("\n").map(line => line.trim().split(/\s+/).slice(1).map(Number))

let accum = 1;
for(let i = 0; i < times.length; i++) {
    let ways = 0;
    for(let len = 0; len < times[i]; len++) {
        if((times[i] - len) * len > distances[i]) {
            ways++;
        }
    }
    accum *= ways;
}

console.log(accum);