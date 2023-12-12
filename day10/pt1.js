const cells = require("fs").readFileSync("input.txt", "ascii").split("\n").map(line => line.split(""));

let y = cells.findIndex(line => line.includes("S")), x = cells[y].indexOf("S")
let steps = 0;
let dir = "S";

do {
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
    steps++;
} while(cells[y][x] != "S");

console.log(steps / 2);