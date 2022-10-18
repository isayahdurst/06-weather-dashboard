"use strict";

/* const getAverage = function (array) {
  let total = 0;
  array.forEach(function (value) {
    total += value;
  });
  return total / array.length;
};

console.log(getAverage([1, 1, 1, 1, 1, 1])); */

const testArray = [1, 2, 3, 4, 5];

const getAverage = (array) =>
  array.reduce((sum, value) => sum + value, 0) / array.length;

console.log(`Average is: ${getAverage(testArray)}`);

