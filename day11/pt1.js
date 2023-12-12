const input = require("fs").readFileSync("input.txt", "ascii").split("\n").map(s => s.trim());

const galaxies = [];

const row2y = new Array(input.length);
let cur = 0;
for(let i = 0; i < input.length; i++) {
    row2y[i] = cur;
    if(input[i] == ".".repeat(input[i].length)) {
        cur += 2;
    } else {
        cur++;
    }
}

const col2x = new Array(input[0].length);
cur = 0;
for(let i = 0; i < input[0].length; i++) {
    col2x[i] = cur;
    let empty = true;
    for(let j = 0; j < input.length; j++) {
        if(input[j][i] != ".") {
            empty = false;
            galaxies.push([i, j]);
        }
    }
    if(empty) {
        cur += 2;
    } else {
        cur++;
    }
}

for(const galaxy of galaxies) {
    galaxy[0] = col2x[galaxy[0]];
    galaxy[1] = row2y[galaxy[1]];
}

sum = 0;
for(let i = 0; i < galaxies.length - 1; i++) {
    const cur = galaxies[i];
    for(let j = i + 1; j < galaxies.length; j++) {
        sum += Math.abs(galaxies[j][0] - cur[0]) + Math.abs(galaxies[j][1] - cur[1]);
    }
}

console.log(sum);