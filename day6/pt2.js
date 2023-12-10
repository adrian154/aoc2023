const [time, distance] = require("fs").readFileSync("input.txt", "ascii").split("\n").map(line => Number(line.replace(/\s+/g, "").split(":")[1]))

let ways = 0;
for(let len = 0; len < time; len++) {
    if((time - len) * len > distance) {
        ways++;
    }
}
console.log(ways);