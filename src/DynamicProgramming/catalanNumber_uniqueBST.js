// https://www.geeksforgeeks.org/program-nth-catalan-number/
// https://en.wikipedia.org/wiki/Catalan_number
// catalan seq: 1,1,2,5,14,42,132

const VAL = 5;

const factorial = (n) => {
  if (n === 1) return 1;

  return n * factorial(n - 1);
};

// console.log(`fac of ${VAL} is :  ${factorial(VAL)}`);

const catalan = (n) => {
  const denom = factorial(2 * n);
  const div = factorial(n + 1) * factorial(n);
  return denom / div;
};

// using sum thing
const naiveCatalan = (n) => {
  if (n < 2) return 1;

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += naiveCatalan(i) * naiveCatalan(n - i - 1);
  }

  return sum;
};

// Bottom Up (tabulated)
// answer from the site
function memoizedCatalan(n) {
  // Table to store results of subproblems
  let catalan = new Array(n + 1).fill(0);

  // Initialize first two values in the table
  catalan[0] = catalan[1] = 1;

  // Fill entries in catalan[] using the recursive formula
  for (let i = 2; i <= n; i++) {
    catalan[i] = 0;
    for (let j = 0; j < i; j++) {
      catalan[i] += catalan[j] * catalan[i - j - 1];
    }
  }

  // Return the last entry
  return catalan[n];
}

const N = 3;
let start = performance.now();
console.log("naive :", naiveCatalan(N));
let end = performance.now();
console.log(`Naive Execution time: ${end - start} ms`);

start = performance.now();
console.log("memo " + memoizedCatalan(N));
end = performance.now();
console.log(`Memo Execution time: ${end - start} ms`);

//-------------------Other Catalans------------------//
// https://www.geeksforgeeks.org/find-number-valid-parentheses-expressions-given-length/
/*
for each n (n is even)
2 -> 1
4 -> 2
6 -> 5
8 -> 14

This is similar to finding the N/2nd catalan
i.e:
2 ~ 1 -> 1
4 ~ 2 -> 2
6 ~ 3 -> 5
8 ~ 4 -> 14

*/

//https://www.geeksforgeeks.org/number-of-ways-a-convex-polygon-of-n2-sides-can-split-into-triangles-by-connecting-vertices/
/*
for each n
3 -> 1
4 -> 2
5 -> 5
6 -> 14

this is similar to finding n-2 Catalan
3 ~ 1 -> 1
4 ~ 2 -> 2
5 ~ 3 -> 5
6 ~ 4 -> 14
*/
