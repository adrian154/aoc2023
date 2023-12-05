const map = require("fs").readFileSync("input.txt", "ascii").split("\n").slice(0);

let tot = 0;
for(let row = 0; row < map.length; row++) {
    const matches = map[row].matchAll(/\d+/g);
    for(const match of matches) {
        let symbol = false;
        for(let y = row - 1; y <= row + 1; y++) {
            for(let x = match.index - 1; x <= match.index + match[0].length; x++) {
                if(x >= 0 && y >= 0 && x < map[row].length && y < map.length) {
                    if(!"0123456789.".includes(map[y][x])) {
                        symbol = true;
                        break;
                    }
                }
            }    
        }
        if(symbol) {
            console.log(match[0]);
            tot += Number(match[0]);
        }
    }       
}

console.log(tot);