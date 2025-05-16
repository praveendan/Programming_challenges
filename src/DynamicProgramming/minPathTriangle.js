// https://www.geeksforgeeks.org/minimum-sum-path-triangle/

const findMinPath = (triangle, y, x) => {
  if (y === triangle.length) {
    return 0;
  }

  return (
    triangle[y][x] +
    Math.min(
      findMinPath(triangle, y + 1, x),
      findMinPath(triangle, y + 1, x + 1)
    )
  );
};

const findMinPathRunner = (triangle) => {
  return findMinPath(triangle, 0, 0);
};

console.log(findMinPathRunner([[2], [3, 9], [1, 6, 7]]));
