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

catalan seq: 1,1,2,5,14
*/

// naive method
const naiveCatRunner = (n) => {
  let ans = 0;
  const findNaiveCatHelper = (left, right) => {
    // If no more left and right parentheses are
    // remaining, a valid combination is found
    if (left === 0 && right === 0) {
      // ans.count++;
      // return ans.count;
      ans++;
      return ans;
    }

    // If more right parentheses than
    // left, return (invalid
    // state)
    if (left > right) {
      return 0;
    }

    // Try adding a left parenthesis if available
    if (left > 0) {
      findNaiveCatHelper(left - 1, right);
    }

    // Try adding a right parenthesis if available
    if (right > 0) {
      findNaiveCatHelper(left, right - 1);
    }

    return ans;
  };

  const findNaiveCat = (n) => {
    // If n is odd, no valid arrangements possible
    // If n is odd, no valid arrangements possible
    if (n % 2 === 1) return 0;
    ans = findNaiveCatHelper(n / 2, n / 2);
  };

  findNaiveCat(n);

  return ans;
};

function memorizedCatalan(n) {
  let catalan = new Array(n + 1).fill(0);

  catalan[0] = catalan[1] = 1;
  for (let i = 2; i <= n; i++) {
    catalan[i] = 0;
    for (let j = 0; j < i; j++) {
      catalan[i] += catalan[j] * catalan[i - j - 1];
    }
  }

  return catalan[n];
}

const testArr = [2, 4, 6, 8, 10];
// console.log("native");
// for (const i of testArr) {
//   console.log(naiveCatRunner(i / 2));
// }

console.log("memorized");

for (const i of testArr) {
  console.log(memorizedCatalan(i / 2));
}
