console.log(require("fs").readFileSync("input.txt", "ascii").split("\n")
    .map(line => line.split(' | '))
    .map(parts => [parts[0].slice(parts[0].indexOf(':') + 2), parts[1]].map(lst => lst.trim().split(/\s+/g).map(Number)))
    .map(card => card[1].filter(n => card[0].includes(n)).length)
    .reduce((a, c, cardIdx) => a.map((count, i) => (i - cardIdx <= c && i - cardIdx > 0) ? count + a[cardIdx]: count), new Array(189).fill(1))
    .reduce((a,c) => a+c, 0));