const type = hand => ["11111", "1112", "122", "113", "23", "14", "5"].indexOf(Array.from(new Set(hand)).map(card => hand.filter(c => c == card).length).sort((a, b) => a - b).join(""));

console.log(require("fs").readFileSync("input.txt", "ascii")
    .split("\n")
    .map(line => line.split(" "))
    .map(parts => ({
        hand: parts[0].split("").map(card => "23456789TJQKA".indexOf(card)),
        bid: Number(parts[1])
    }))
    .sort(({hand: hand1}, {hand: hand2}) => (type(hand1) - type(hand2)) || hand1.reduce((a, c, i) => a || c - hand2[i], 0))
    .reduce((a, c, i) => a + c.bid * (i + 1), 0));