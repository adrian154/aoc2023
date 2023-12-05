console.log(require("fs").readFileSync("input.txt", "ascii")
    .split("\n")
    .map(line => line.split(":"))
    .map(parts => ({id: parts[0].split(" ")[1], combos: parts[1].split(";").map(combo => Object.fromEntries([...combo.matchAll(/(\d+) (red|green|blue)/g)].map(match => [match[2], match[1]])))}))
    .filter(game => game.combos.map(combo => (combo.red||0) <= 12 && (combo.green||0) <= 13 && (combo.blue||0) <= 14).reduce((a, c) => a && c, true))
    .reduce((a, c) => Number(c.id) + a, 0));