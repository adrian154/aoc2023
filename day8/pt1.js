const lines = require("fs").readFileSync("input.txt", "ascii").split("\n");

const directions = lines[0].trim().split("");
const network = Object.fromEntries(lines.slice(2).map(line => line.split(" = ")).map(parts => [parts[0], parts[1].slice(1, 9).split(", ")]));

let steps = 0;
let cur = "AAA";

do {
    cur = network[cur][directions[steps % directions.length] == "L" ? 0 : 1];
    steps++;
} while(cur != "ZZZ");

console.log(steps);