// https://www.geeksforgeeks.org/minimum-cost-to-reach-the-top-of-the-floor-by-climbing-stairs/

const TEST_ARRS = [
  [1, 2, 1, 1, 18, 1],
  [16, 19, 10, 12, 18],
  [2, 5, 3, 1, 7, 3, 4],
];

const runner = (callback) => {
  TEST_ARRS.forEach((arr) => callback(arr));
};

function minimumCostNaive(n, cost) {
  if (n === 0) return 0;
  if (n === 1) return 0;

  let top = Math.min(
    minimumCostNaive(n - 1, cost) + cost[n - 1],
    minimumCostNaive(n - 2, cost) + cost[n - 2]
  );

  return top;
}

const driverFunc = (arr) => {
  let n = arr.length;
  console.log(minimumCostNaive(n, arr));
};

// console.log("Naive");
// runner(driverFunc);

// Top down approach (Memoisation)
const memoizedMinimumCost = (n, cost, memoized) => {
  if (n === 0) return 0;
  if (n === 1) return 0;

  if (memoized[n] !== -1) return memoized[n];

  memoized[n] = Math.min(
    memoizedMinimumCost(n - 1, cost, memoized) + cost[n - 1],
    memoizedMinimumCost(n - 2, cost, memoized) + cost[n - 2]
  );

  return memoized[n];
};

const memoizedDriver = (arr) => {
  let n = arr.length;
  let memorizedVals = new Array(n + 1).fill(-1);
  console.log(memoizedMinimumCost(n, arr, memorizedVals));
};

console.log("Memoized");
runner(memoizedDriver);

//Bottom up approach (Tabulation)
const tabulatedMinimumCost = () => {};

/*
const TEST_ARRS = [
  [1, 2, 1, 1, 18, 1],
  [16, 19, 10, 12, 18],
  [2, 5, 3, 1, 7, 3, 4],
];  
*/

const tabulatedDriver = () => {
  let step0 = 0;
  let step1 = 0;
};
