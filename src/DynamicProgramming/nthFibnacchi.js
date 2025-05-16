// https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/
// https://www.geeksforgeeks.org/tribonacci-numbers/

//naive implementation
function nthFibNaive(n) {
  if (n <= 1) return n;

  return nthFibNaive(n - 1) + nthFibNaive(n - 2);
}

let n = 5;
let result = nthFibNaive(n);
console.log("result: ", result);

// DP approach
function nthFibDp(n, memoized) {
  if (n <= 1) return n;

  if (memoized[n] !== -1) return memoized[n];

  return nthFibDp(n - 1, memoized) + nthFibDp(n - 2, memoized);
}

function nthFibDpRunner(n) {
  const memoized = new Array(n + 1).fill(-1);

  return nthFibDp(n, memoized);
}

let result1 = nthFibDpRunner(n);
console.log("result1: ", result1);

// another DP approach
function nthFibDp1(n) {
  const memoized = new Array(n + 1);

  memoized[0] = 0;
  memoized[1] = 1;

  for (let i = 2; i < memoized.length; i++) {
    memoized[i] = memoized[i - 1] + memoized[i - 2];
  }

  return memoized.pop();
}

let result2 = nthFibDp1(n);
console.log("result2: ", result2);

//print first n tribonacchi numbers
function tribonacci(n) {
  let memo1 = 0;
  let memo2 = 0;
  let memo3 = 1;

  let seq = `${memo1}, ${memo2}, ${memo3}`;

  for (let i = 3; i < n; i++) {
    const val = memo1 + memo2 + memo3;
    seq += ", " + val;

    memo1 = memo2;
    memo2 = memo3;
    memo3 = val;
  }

  console.log(seq);
}
tribonacci(10);
