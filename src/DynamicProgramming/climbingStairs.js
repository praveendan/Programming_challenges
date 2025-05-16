// https://www.geeksforgeeks.org/count-ways-reach-nth-stair/

const NUMBER_OF_STAIRS = 4;

// Naive approach
function countWays(n) {
  if (n === 2) return 2;
  if (n === 1) return 1;
  if (n < 1) return 0;

  // Base cases: If there are 0 or 1 stairs,
  // there is only one way to reach the top.
  // if (n === 0 || n === 1) return 1;

  return countWays(n - 1) + countWays(n - 2);
}

console.log(
  `Naive method for ${NUMBER_OF_STAIRS} stairs: ${countWays(NUMBER_OF_STAIRS)}`
);

// Top down approach (Memoisation)
function memoizedCountWaysHelper(n, arr) {
  if (n === 2) return 2;
  if (n === 1) return 1;
  if (n < 1) return 0;

  if (arr[n] !== -1) return arr[n];

  arr[n] =
    memoizedCountWaysHelper(n - 1, arr) + memoizedCountWaysHelper(n - 2, arr);

  return arr[n];
}

function memoizedCountWays(n) {
  const arr = new Array(n + 1).fill(-1);

  return memoizedCountWaysHelper(n, arr);
}

console.log(
  `Memoisation method for ${NUMBER_OF_STAIRS} stairs: ${memoizedCountWays(
    NUMBER_OF_STAIRS
  )}`
);

// bottom up approach (Tabulation)
function tabulatedCountWays(n) {
  const memoized = new Array(n + 1);

  memoized[1] = 1;
  memoized[2] = 2;

  for (let i = 3; i < memoized.length; i++) {
    memoized[i] = memoized[i - 1] + memoized[i - 2];
  }

  return memoized.pop();
}
console.log(
  `Tabulation method for ${NUMBER_OF_STAIRS} stairs: ${tabulatedCountWays(
    NUMBER_OF_STAIRS
  )}`
);
