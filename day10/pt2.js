const cells = require("fs").readFileSync("input.txt", "ascii").split("\n").map(line => line.trim().split(""));

let y = cells.findIndex(line => line.includes("S")), x = cells[y].indexOf("S")
let dir = "S";

path=[]

do {
    path.push([x,y])
    switch(cells[y][x]) {
        case "S": y++; break;
        case "|": y += {"N": -1, "S": 1}[dir]; break;
        case "-": x += {"E": 1, "W": -1}[dir]; break;
        case "L":
            if(dir == "S") {
                x++; dir = "E";
            } else {
                y--; dir = "N";
            }
            break;
        case "J":
            if(dir == "E") {
                y--; dir = "N";
            } else {
                x--; dir = "W";
            }
            break;
        case "7":
            if(dir == "E") {
                y++; dir = "S";
            } else {
                x--; dir = "W";
            }
            break;
        case "F":
            if(dir == "N") {
                x++; dir = "E";
            } else {
                y++; dir = "S";
            }
            break;      
    }
} while(cells[y][x] != "S");

// need to close the paths
path.push(path[0]);

// expand the map to 2X scale, so we can express the pipes as solid cells
const width = cells[0].length * 2 + 1;
const height = cells.length * 2 + 1;
const map = new Array(width).fill().map(() => new Array(height).fill(0));

let lastPos = path[0];
for(const pos of path) {
    let x = lastPos[0]*2+1, y = lastPos[1]*2+1;
    let endX = pos[0]*2+1, endY = pos[1]*2+1;
    do {
        map[x][y] = 1;
        x += Math.sign(pos[0] - lastPos[0]);
        y += Math.sign(pos[1] - lastPos[1]);
    } while(x != endX || y != endY);
    lastPos = pos;
}

// flood-fill to determine which cells are exterior to path
const queue = [[0,0]]
while(queue.length > 0) {
    const [x, y] = queue.shift();
    for(const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        if(map[x + dx]?.[y + dy] === 0) {
            map[x + dx][y + dy] = 1;
            queue.push([x + dx, y + dy]);
        }
    }
}

// count # of interior cells; we could just keep count during the flood fill but i am lazy and also quite ill 
let count = 0;
for(let y = 0; y < cells.length; y++) {
    for(let x = 0; x < cells[y].length; x++) {
        if(map[x*2+1][y*2+1] == 0) count++;
    }
}