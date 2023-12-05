const digits = "0123456789".split("");
const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const findFirst = (arr, choices) => choices.map(choice => [choice, arr.indexOf(choice)]).filter(p => p[1] >= 0).sort((a, b) => a[1] - b[1])[0] || [null, Infinity];
const findLast = (arr, choices) => choices.map(choice => [choice, arr.lastIndexOf(choice)]).sort((a, b) => b[1] - a[1])[0] || [null, -Infinity];

const first = line => {
    const di = findFirst(line, digits);
    const wi = findFirst(line, words);
    return di[1] < wi[1] ? di[0] : words.indexOf(wi[0]) + 1;
};

const last = line => {
    const di = findLast(line, digits);
    const wi = findLast(line, words);
    return di[1] > wi[1] ? di[0] : words.indexOf(wi[0]) + 1;
};

console.log(require("fs").readFileSync("input.txt", "ascii")
    .split("\n")
    .map(s => first(s)*10+last(s)*1)
    .reduce((a,c) => a + c, 0));