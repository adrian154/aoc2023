const lookup = (map, inRange) => {

    // determine which ranges overlap with target range
    const ranges = map.filter(range => {
        const end = range.srcStart + range.len;
        return !(range.srcStart < inRange[0] && end < inRange[0] || range.srcStart >= inRange[1] && end >= inRange[1]);
    }).map(r => Object.assign({}, r));

    if(ranges.length == 0) {
        return [inRange];
    }

    // handle start/end ranges
    if(ranges[0].srcStart < inRange[0]) {
        const end = ranges[0].srcStart + ranges[0].len;
        ranges[0].dstStart += inRange[0] - ranges[0].srcStart;
        ranges[0].srcStart = inRange[0];
        ranges[0].len = end - inRange[0];
    } else if(ranges[0].srcStart > inRange[0]) {
        ranges.unshift({srcStart: inRange[0], dstStart: inRange[0], len: ranges[0].srcStart - inRange[0]});
    }

    const lastRange = ranges.at(-1),
          end = lastRange.srcStart + lastRange.len;
    if(end > inRange[1]) {
        lastRange.len = inRange[1] - lastRange.srcStart;
    } else if(end < inRange[1]) {
        ranges.push({srcStart: end, dstStart: end, len: inRange[1] - end});
    }

    // fill in unmapped ranges between mapped ranges
    for(let i = 0; i < ranges.length - 1; i++) {
        const first = ranges[i], second = ranges[i + 1];
        const start = first.srcStart + first.len;
        if(second.srcStart - start > 0) {
            ranges.push({srcStart: start, dstStart: start, len: second.srcStart - start});
        }
    }

    return ranges.map(range => [range.dstStart, range.dstStart + range.len]);

};

const parts = require("fs").readFileSync("input.txt", "ascii").split("\n\n");
const seeds = parts[0].replace("seeds: ", "").split(" ").map(Number);
const maps = parts.slice(1).map(str => str.split('\n').slice(1).map(range => range.split(' ').map(Number)).map(parts => ({dstStart: parts[0], srcStart: parts[1], len: parts[2]})).sort((a, b) => a.srcStart - b.srcStart));

all = []
for(let i = 0; i < seeds.length - 1; i += 2) {
    all.push(maps.reduce((a, c) => a.flatMap(range => lookup(c, range)), [[seeds[i], seeds[i] + seeds[i + 1]]]));
}

console.log(all.flat().sort((a, b) => a[0] - b[0])[0][0])