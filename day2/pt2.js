console.log(require("fs").readFileSync("input.txt", "ascii")
    .split("\n")
    .map(line => line.split(":"))
    .map(parts => ({id: parts[0].split(" ")[1], combos: parts[1].split(";").map(combo => Object.fromEntries([...combo.matchAll(/(\d+) (red|green|blue)/g)].map(match => [match[2], match[1]])))}))
    .map(game => ["red", "green", "blue"].map(color => Math.max(...game.combos.map(combo => combo[color] || 0))))
    .map(set => set[0] * set[1] * set[2])
    .reduce((a, c) => a + c, 0));