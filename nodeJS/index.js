const random = require("./random");

const filter = require("lodash/filter");

const data = [1,2,3,4,5,6,7,8,9];

const evens = filter(data, x => x%2 === 0);

console.log(evens);

console.log(random(100)); // should print a random number between 0 and 100