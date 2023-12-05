const map = require("fs").readFileSync("input.txt", "ascii").split("\n").slice(0);

const gears = {};

for(let row = 0; row < map.length; row++) {
    const matches = map[row].matchAll(/\d+/g);
    for(const match of matches) {
        for(let y = row - 1; y <= row + 1; y++) {
            for(let x = match.index - 1; x <= match.index + match[0].length; x++) {
                if(x >= 0 && y >= 0 && x < map[row].length && y < map.length) {
                    if(map[y][x] == "*") {
                        const key = y + "," + x;
                        if(gears[key])
                            gears[key].push(Number(match[0]));
                        else 
                            gears[key] = [Number(match[0])];
                    }
                }
            }    
        }
    }       
}

console.log(Object.values(gears).filter(arr => arr.length == 2).reduce((a, c) => a + c[0] * c[1], 0));