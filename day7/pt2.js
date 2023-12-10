const type = hand => Math.max(...[0,1,2,3,4,5,6,7,8,9,10,11,12].map(substitute => ["11111", "1112", "122", "113", "23", "14", "5"].indexOf(Array.from(new Set(hand.map(card => card == 0 ? substitute : card))).map(card => hand.filter(c => c == 0 ? substitute == card : c == card).length).sort((a, b) => a - b).join(""))));

console.log(require("fs").readFileSync("input.txt", "ascii")
    .split("\n")
    .map(line => line.split(" "))
    .map(parts => ({
        hand: parts[0].split("").map(card => "J23456789TQKA".indexOf(card)),
        bid: Number(parts[1])
    }))
    .sort(({hand: hand1}, {hand: hand2}) => (type(hand1) - type(hand2)) || hand1.reduce((a, c, i) => a || c - hand2[i], 0))
    .reduce((a, c, i) => a + c.bid * (i + 1), 0));