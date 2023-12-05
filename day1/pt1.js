console.log(require("fs").readFileSync("input.txt", "ascii")
    .split("\n")
    .map(s => s.split("").map(Number).filter(Boolean))
    .map(nums => nums[0]*10 + nums[nums.length - 1])
    .reduce((a,c) => a + c, 0));