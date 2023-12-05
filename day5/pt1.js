const parts = require("fs").readFileSync("input.txt", "ascii").split("\n\n")

const seeds = parts[0].replace("seeds: ", "").split(" ").map(Number)
const maps = parts.slice(1).map(str => str.split('\n').slice(1).map(range => range.split(' ').map(Number)).sort((a, b) => a[1] - b[1]))

const lookup = (map, input) => {
    for(const range of map) {
        if(range[1] < input && input - range[1] < range[2]) {
            return input - range[1] + range[0]; 
        }
    }
    return input;
}

console.log(seeds.map(seed => maps.reduce((a, c) => lookup(c, a), seed)).sort((a, b) => a - b)[0])