/**
 * 84. Largest Rectangle in Histogram
 * https://leetcode.com/problems/largest-rectangle-in-histogram/
 *
 * Difficulty: Hard
 * Topics: Array, Stack, Monotonic Stack
 *
 * Given an array of integers heights representing the histogram's bar heights
 * where the width of each bar is 1, return the area of the largest rectangle
 * in the histogram.
 *
 * Example 1:
 * Input: heights = [2,1,5,6,2,3]
 * Output: 10
 * Explanation: The largest rectangle is between indices 2 and 3 with height 5.
 *
 * Example 2:
 * Input: heights = [2,4]
 * Output: 4
 */

/**
 * APPROACH 1: Monotonic Stack (Optimal)
 *
 * Key Insight: For each bar, we want to find:
 * 1. Left boundary: first bar to the left that's shorter
 * 2. Right boundary: first bar to the right that's shorter
 *
 * We can use a monotonic increasing stack to efficiently find these boundaries.
 * When we encounter a bar shorter than the stack top, we know we've found the
 * right boundary for the bar at stack top.
 *
 * Time: O(n) - each element pushed/popped once
 * Space: O(n) - stack space
 */
function largestRectangleArea(heights) {
  const stack = []; // Store indices
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    // Use 0 as sentinel value for last iteration
    const currentHeight = i === heights.length ? 0 : heights[i];

    // Process bars that are taller than current bar
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
 * APPROACH 2: Divide and Conquer
 *
 * Find the minimum height bar, use it as height for the entire array.
 * Then recursively solve for left and right subarrays.
 *
 * Time: O(n log n) average, O(n²) worst case
 * Space: O(log n) average, O(n) worst case
 */
function largestRectangleAreaDivideConquer(heights) {
  return divideConquer(heights, 0, heights.length - 1);
}

function divideConquer(heights, left, right) {
  if (left > right) return 0;
  if (left === right) return heights[left];

  // Find minimum height index
  let minIndex = left;
  for (let i = left + 1; i <= right; i++) {
    if (heights[i] < heights[minIndex]) {
      minIndex = i;
    }
  }

  // Area using minimum height
  const areaWithMin = heights[minIndex] * (right - left + 1);

  // Recursively solve left and right parts
  const leftArea = divideConquer(heights, left, minIndex - 1);
  const rightArea = divideConquer(heights, minIndex + 1, right);

  return Math.max(areaWithMin, leftArea, rightArea);
}

/**
 * APPROACH 3: Brute Force (for understanding)
 *
 * For each bar, expand left and right to find maximum width
 *
 * Time: O(n²)
 * Space: O(1)
 */
function largestRectangleAreaBruteForce(heights) {
  let maxArea = 0;

  for (let i = 0; i < heights.length; i++) {
    let minHeight = heights[i];

    for (let j = i; j < heights.length; j++) {
      minHeight = Math.min(minHeight, heights[j]);
      const area = minHeight * (j - i + 1);
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea;
}

// Test cases
function testLargestRectangle() {
  console.log("=== Testing Largest Rectangle in Histogram ===");

  const testCases = [
    {
      input: [2, 1, 5, 6, 2, 3],
      expected: 10,
      description: "Standard case with peak in middle"
    },
    {
      input: [2, 4],
      expected: 4,
      description: "Simple two bars"
    },
    {
      input: [1],
      expected: 1,
      description: "Single bar"
    },
    {
      input: [5, 4, 3, 2, 1],
      expected: 9,
      description: "Decreasing heights"
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: 9,
      description: "Increasing heights"
    },
    {
      input: [3, 3, 3, 3],
      expected: 12,
      description: "All equal heights"
    },
    {
      input: [0, 2, 0],
      expected: 2,
      description: "Heights with zeros"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}]`);

    const result1 = largestRectangleArea(test.input);
    const result2 = largestRectangleAreaDivideConquer(test.input);
    const result3 = largestRectangleAreaBruteForce(test.input);

    console.log(`Monotonic Stack: ${result1}`);
    console.log(`Divide & Conquer: ${result2}`);
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
// testLargestRectangle();

/**
 * KEY INSIGHTS:
 *
 * 1. Monotonic Stack Pattern:
 *    - Keep stack in increasing order
 *    - When we find a smaller element, it's the right boundary
 *    - The element below in stack (or beginning) is the left boundary
 *
 * 2. Width Calculation:
 *    - If stack is empty: width = current_index
 *    - If stack not empty: width = current_index - stack_top - 1
 *
 * 3. Sentinel Value:
 *    - Add 0 at the end to process all remaining bars in stack
 *
 * 4. Common Mistakes:
 *    - Forgetting to handle the last elements in stack
 *    - Incorrect width calculation
 *    - Not using indices in stack (using values instead)
 *
 * 5. Similar Problems:
 *    - Maximal Rectangle (85)
 *    - Remove K Digits (402)
 *    - Next Greater Element series
 */

module.exports = {
  largestRectangleArea,
  largestRectangleAreaDivideConquer,
  largestRectangleAreaBruteForce
};
