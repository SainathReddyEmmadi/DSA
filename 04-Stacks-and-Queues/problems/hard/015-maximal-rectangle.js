/**
 * 85. Maximal Rectangle
 * https://leetcode.com/problems/maximal-rectangle/
 *
 * Difficulty: Hard
 * Topics: Array, Dynamic Programming, Stack, Matrix, Monotonic Stack
 *
 * Given a binary matrix filled with 0's and 1's, find the largest rectangle
 * containing only 1's and return its area.
 *
 * Example:
 * Input: matrix = [
 *   ["1","0","1","0","0"],
 *   ["1","0","1","1","1"],
 *   ["1","1","1","1","1"],
 *   ["1","0","0","1","0"]
 * ]
 * Output: 6
 * Explanation: The maximal rectangle is shown with area 6.
 */

/**
 * APPROACH 1: Using Largest Rectangle in Histogram (Optimal)
 *
 * Convert each row into a histogram where heights represent consecutive 1's.
 * Apply largest rectangle in histogram algorithm for each row.
 *
 * Time: O(m * n) where m = rows, n = cols
 * Space: O(n) for heights array
 */
function maximalRectangle(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  const heights = new Array(cols).fill(0);
  let maxArea = 0;

  for (let i = 0; i < rows; i++) {
    // Update heights for current row
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === "1") {
        heights[j]++;
      } else {
        heights[j] = 0;
      }
    }

    // Find largest rectangle in current histogram
    const area = largestRectangleInHistogram(heights);
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
}

/**
 * Helper function: Largest Rectangle in Histogram using Monotonic Stack
 */
function largestRectangleInHistogram(heights) {
  const stack = [];
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    const currentHeight = i === heights.length ? 0 : heights[i];

    while (
      stack.length > 0 &&
      heights[stack[stack.length - 1]] > currentHeight
    ) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }

    stack.push(i);
  }

  return maxArea;
}

/**
 * APPROACH 2: Dynamic Programming with Heights, Left, Right Arrays
 *
 * For each row, maintain:
 * - heights[j]: consecutive 1's ending at current row
 * - left[j]: leftmost index where height[j] can extend
 * - right[j]: rightmost index where height[j] can extend
 *
 * Time: O(m * n)
 * Space: O(n)
 */
function maximalRectangleDP(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;

  const heights = new Array(cols).fill(0);
  const left = new Array(cols).fill(0);
  const right = new Array(cols).fill(cols);
  let maxArea = 0;

  for (let i = 0; i < rows; i++) {
    // Update heights
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === "1") {
        heights[j]++;
      } else {
        heights[j] = 0;
      }
    }

    // Update left boundaries
    let currentLeft = 0;
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === "1") {
        left[j] = Math.max(left[j], currentLeft);
      } else {
        left[j] = 0;
        currentLeft = j + 1;
      }
    }

    // Update right boundaries
    let currentRight = cols;
    for (let j = cols - 1; j >= 0; j--) {
      if (matrix[i][j] === "1") {
        right[j] = Math.min(right[j], currentRight);
      } else {
        right[j] = cols;
        currentRight = j;
      }
    }

    // Calculate max area for current row
    for (let j = 0; j < cols; j++) {
      const area = heights[j] * (right[j] - left[j]);
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea;
}

/**
 * APPROACH 3: Brute Force (for understanding)
 *
 * For each cell, try all possible rectangles starting from that cell.
 *
 * Time: O(m² * n²)
 * Space: O(1)
 */
function maximalRectangleBruteForce(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxArea = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === "1") {
        // Try all rectangles starting at (i, j)
        let minWidth = cols;

        for (let k = i; k < rows && matrix[k][j] === "1"; k++) {
          // Find width for row k
          let width = 0;
          for (let l = j; l < cols && matrix[k][l] === "1"; l++) {
            width++;
          }

          minWidth = Math.min(minWidth, width);
          const height = k - i + 1;
          const area = height * minWidth;
          maxArea = Math.max(maxArea, area);
        }
      }
    }
  }

  return maxArea;
}

// Test cases
function testMaximalRectangle() {
  console.log("=== Testing Maximal Rectangle ===");

  const testCases = [
    {
      input: [
        ["1", "0", "1", "0", "0"],
        ["1", "0", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "0", "0", "1", "0"]
      ],
      expected: 6,
      description: "Standard case with optimal rectangle"
    },
    {
      input: [["0"]],
      expected: 0,
      description: "Single zero"
    },
    {
      input: [["1"]],
      expected: 1,
      description: "Single one"
    },
    {
      input: [
        ["1", "1", "1"],
        ["1", "1", "1"],
        ["1", "1", "1"]
      ],
      expected: 9,
      description: "All ones - entire matrix"
    },
    {
      input: [
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"]
      ],
      expected: 0,
      description: "All zeros"
    },
    {
      input: [
        ["1", "0", "1"],
        ["1", "1", "1"],
        ["0", "1", "0"]
      ],
      expected: 3,
      description: "Mixed case with horizontal rectangle"
    },
    {
      input: [["1"], ["1"], ["1"], ["1"]],
      expected: 4,
      description: "Vertical rectangle"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);
    console.log("Input matrix:");
    test.input.forEach((row) => console.log(`  [${row.join(", ")}]`));

    const result1 = maximalRectangle(test.input);
    const result2 = maximalRectangleDP(test.input);
    const result3 = maximalRectangleBruteForce(test.input);

    console.log(`Histogram Method: ${result1}`);
    console.log(`DP Method: ${result2}`);
    console.log(`Brute Force: ${result3}`);
    console.log(`Expected: ${test.expected}`);
    console.log(
      `✓ Pass: ${
        result1 === test.expected &&
        result2 === test.expected &&
        result3 === test.expected
      }`
    );
  });
}

// Uncomment to run tests
// testMaximalRectangle();

/**
 * KEY INSIGHTS:
 *
 * 1. Problem Transformation:
 *    - Convert 2D problem to multiple 1D histogram problems
 *    - Each row becomes a histogram with heights = consecutive 1's
 *    - Apply "Largest Rectangle in Histogram" for each row
 *
 * 2. Histogram Approach:
 *    - Build histogram row by row
 *    - Height[j] = consecutive 1's ending at current row, column j
 *    - If matrix[i][j] = '0', reset height[j] = 0
 *
 * 3. DP Approach Details:
 *    - heights[j]: number of consecutive 1's ending at (i,j)
 *    - left[j]: leftmost column where current height can extend
 *    - right[j]: rightmost column where current height can extend
 *    - Area = heights[j] * (right[j] - left[j])
 *
 * 4. Optimization:
 *    - Histogram approach is more intuitive and efficient
 *    - Reuse existing histogram algorithm
 *    - Single pass through matrix with O(n) work per row
 *
 * 5. Edge Cases:
 *    - Empty matrix or single cell
 *    - All zeros (no rectangle)
 *    - All ones (entire matrix)
 *    - Single row or single column
 *
 * 6. Related Problems:
 *    - Largest Rectangle in Histogram (84) - core algorithm
 *    - Maximal Square (221) - similar but squares only
 *    - Count Submatrices With All Ones (1504)
 */

module.exports = {
  maximalRectangle,
  maximalRectangleDP,
  maximalRectangleBruteForce,
  largestRectangleInHistogram
};
