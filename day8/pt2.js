const lines = require("fs").readFileSync("input.txt", "ascii").split("\n");

const directions = lines[0].trim().split("");
const network = Object.fromEntries(lines.slice(2).map(line => line.split(" = ")).map(parts => [parts[0], parts[1].slice(1, 9).split(", ")]));

const gcd = (a, b) => b == 0 ? a : gcd(b, a % b);

console.log(Object.keys(network).filter(k => k[2] == "A").map(k => {
    let steps = 0;
    do {
        k = network[k][directions[steps % directions.length] == "L" ? 0 : 1];
        steps++;
    } while(k[2] != "Z");
    return steps;
}).reduce((a, c) => a * c / gcd(a, c), 1));