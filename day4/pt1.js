console.log(require("fs").readFileSync("input.txt", "ascii").split("\n")
    .map(line => line.split(' | '))
    .map(parts => [parts[0].slice(10), parts[1]].map(lst => lst.trim().split(/\s+/g).map(Number)))
    .map(card => card[1].filter(n => card[0].includes(n)).length)
    .reduce((a, c) => a + (c > 0 ? 2**(c-1) : 0), 0));