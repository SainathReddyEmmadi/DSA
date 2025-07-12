/**
 * Largest Rectangle in Histogram (LeetCode 84)
 * Difficulty: Hard
 *
 * Given an array of integers heights representing the histogram's bar height where
 * the width of each bar is 1, return the area of the largest rectangle in the histogram.
 *
 * Pattern: Stack (Monotonic Stack)
 *
 * Examples:
 * Input: heights = [2,1,5,6,2,3]
 * Output: 10
 * Explanation: The largest rectangle is formed by bars with heights [5,6] with width 2, area = 5*2 = 10
 *
 * Input: heights = [2,4]
 * Output: 4
 */

/**
 * Approach 1: Monotonic Stack (Optimal)
 * Time: O(n), Space: O(n)
 *
 * Use a stack to keep track of indices of increasing heights.
 * When we encounter a smaller height, we pop from stack and calculate area.
 */
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  let index = 0;

  while (index < heights.length) {
    // If current height is greater than or equal to stack top, push it
    if (
      stack.length === 0 ||
      heights[index] >= heights[stack[stack.length - 1]]
    ) {
      stack.push(index);
      index++;
    } else {
      // Pop the top and calculate area with popped height as smallest
      const topIndex = stack.pop();
      const height = heights[topIndex];
      const width =
        stack.length === 0 ? index : index - stack[stack.length - 1] - 1;
      const area = height * width;
      maxArea = Math.max(maxArea, area);
    }
  }

  // Pop remaining elements and calculate area
  while (stack.length > 0) {
    const topIndex = stack.pop();
    const height = heights[topIndex];
    const width =
      stack.length === 0 ? index : index - stack[stack.length - 1] - 1;
    const area = height * width;
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
}

/**
 * Approach 2: Stack with Sentinel (Cleaner implementation)
 * Time: O(n), Space: O(n)
 *
 * Add a sentinel value (0) at the end to handle remaining elements uniformly.
 */
function largestRectangleAreaSentinel(heights) {
  const stack = [];
  let maxArea = 0;

  // Add sentinel value to handle remaining elements
  heights.push(0);

  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }

  // Remove sentinel
  heights.pop();

  return maxArea;
}

/**
 * Approach 3: Divide and Conquer
 * Time: O(n log n) average, O(n²) worst case, Space: O(log n)
 *
 * Find minimum height in range, calculate area with this height,
 * then recursively solve for left and right subarrays.
 */
function largestRectangleAreaDivideConquer(heights) {
  function helper(left, right) {
    if (left > right) return 0;

    // Find minimum height index in current range
    let minIndex = left;
    for (let i = left; i <= right; i++) {
      if (heights[i] < heights[minIndex]) {
        minIndex = i;
      }
    }

    // Calculate area with minimum height
    const areaWithMin = heights[minIndex] * (right - left + 1);

    // Recursively calculate for left and right parts
    const leftArea = helper(left, minIndex - 1);
    const rightArea = helper(minIndex + 1, right);

    return Math.max(areaWithMin, leftArea, rightArea);
  }

  return helper(0, heights.length - 1);
}

/**
 * Approach 4: Brute Force (For comparison)
 * Time: O(n²), Space: O(1)
 *
 * For each bar, find the maximum rectangle with this bar as the smallest.
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

/**
 * Approach 5: Using Previous and Next Smaller Elements
 * Time: O(n), Space: O(n)
 *
 * Pre-compute previous and next smaller elements for each bar,
 * then calculate maximum area for each bar.
 */
function largestRectangleAreaPrevNext(heights) {
  const n = heights.length;
  const prevSmaller = new Array(n).fill(-1);
  const nextSmaller = new Array(n).fill(n);

  // Find previous smaller element for each bar
  const stack1 = [];
  for (let i = 0; i < n; i++) {
    while (
      stack1.length > 0 &&
      heights[stack1[stack1.length - 1]] >= heights[i]
    ) {
      stack1.pop();
    }
    if (stack1.length > 0) {
      prevSmaller[i] = stack1[stack1.length - 1];
    }
    stack1.push(i);
  }

  // Find next smaller element for each bar
  const stack2 = [];
  for (let i = n - 1; i >= 0; i--) {
    while (
      stack2.length > 0 &&
      heights[stack2[stack2.length - 1]] >= heights[i]
    ) {
      stack2.pop();
    }
    if (stack2.length > 0) {
      nextSmaller[i] = stack2[stack2.length - 1];
    }
    stack2.push(i);
  }

  // Calculate maximum area
  let maxArea = 0;
  for (let i = 0; i < n; i++) {
    const width = nextSmaller[i] - prevSmaller[i] - 1;
    const area = heights[i] * width;
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
}

// Test cases
function runTests() {
  console.log("Testing Largest Rectangle in Histogram:");

  const testCases = [
    {
      input: [2, 1, 5, 6, 2, 3],
      expected: 10,
      description: "Standard case - rectangle formed by heights [5,6]"
    },
    {
      input: [2, 4],
      expected: 4,
      description: "Two bars"
    },
    {
      input: [1],
      expected: 1,
      description: "Single bar"
    },
    {
      input: [0],
      expected: 0,
      description: "Single zero bar"
    },
    {
      input: [2, 2, 2, 2],
      expected: 8,
      description: "All equal heights"
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: 9,
      description: "Increasing heights"
    },
    {
      input: [5, 4, 3, 2, 1],
      expected: 9,
      description: "Decreasing heights"
    },
    {
      input: [0, 0, 0],
      expected: 0,
      description: "All zeros"
    },
    {
      input: [1, 0, 1],
      expected: 1,
      description: "Zero in middle"
    },
    {
      input: [6, 2, 5, 4, 5, 1, 6],
      expected: 12,
      description: "Complex case"
    }
  ];

  testCases.forEach((test, index) => {
    const result1 = largestRectangleArea([...test.input]);
    const result2 = largestRectangleAreaSentinel([...test.input]);
    const result3 = largestRectangleAreaDivideConquer([...test.input]);
    const result4 = largestRectangleAreaBruteForce([...test.input]);
    const result5 = largestRectangleAreaPrevNext([...test.input]);

    console.log(`Test ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}]`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Stack: ${result1} ${result1 === test.expected ? "✓" : "✗"}`);
    console.log(
      `Sentinel: ${result2} ${result2 === test.expected ? "✓" : "✗"}`
    );
    console.log(
      `Divide & Conquer: ${result3} ${result3 === test.expected ? "✓" : "✗"}`
    );
    console.log(
      `Brute Force: ${result4} ${result4 === test.expected ? "✓" : "✗"}`
    );
    console.log(
      `Prev/Next: ${result5} ${result5 === test.expected ? "✓" : "✗"}`
    );
    console.log("---");
  });
}

// Performance test
function performanceTest() {
  console.log("\nPerformance Test:");

  const sizes = [1000, 5000, 10000];

  sizes.forEach((size) => {
    // Create test array with random heights
    const heights = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100) + 1
    );

    console.log(`\nArray size: ${size}`);

    // Test Stack approach
    let start = performance.now();
    largestRectangleArea([...heights]);
    let end = performance.now();
    console.log(`Stack: ${(end - start).toFixed(2)}ms`);

    // Test Sentinel approach
    start = performance.now();
    largestRectangleAreaSentinel([...heights]);
    end = performance.now();
    console.log(`Sentinel: ${(end - start).toFixed(2)}ms`);

    // Test Prev/Next approach
    start = performance.now();
    largestRectangleAreaPrevNext([...heights]);
    end = performance.now();
    console.log(`Prev/Next: ${(end - start).toFixed(2)}ms`);

    // Test Divide & Conquer (only for smaller arrays)
    if (size <= 5000) {
      start = performance.now();
      largestRectangleAreaDivideConquer([...heights]);
      end = performance.now();
      console.log(`Divide & Conquer: ${(end - start).toFixed(2)}ms`);
    }

    // Test Brute Force (only for very small arrays)
    if (size <= 1000) {
      start = performance.now();
      largestRectangleAreaBruteForce([...heights]);
      end = performance.now();
      console.log(`Brute Force: ${(end - start).toFixed(2)}ms`);
    }
  });
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Largest Rectangle in Histogram - Algorithm Explanation:

The key insight is to find, for each bar, the maximum width rectangle that can be formed
with that bar as the minimum height.

Monotonic Stack Approach (Optimal):
1. Maintain a stack of indices with increasing heights
2. When we find a smaller height:
   - Pop from stack and calculate area using popped height as minimum
   - Width = current index - previous stack top - 1
3. Continue until stack is empty or current height ≥ stack top
4. Process remaining elements in stack at the end

Key Observations:
- For each bar, we need to find how far left and right it can extend
- A bar can extend until it meets a shorter bar
- Stack helps us efficiently find the previous/next smaller elements

Sentinel Approach:
- Add a 0 at the end to uniformly handle remaining stack elements
- Cleaner code but same logic

Previous/Next Smaller Elements:
- Pre-compute for each bar: previous and next smaller element indices
- Then calculate area for each bar: height[i] * (next[i] - prev[i] - 1)

Time Complexity: O(n) for stack-based approaches
Space Complexity: O(n) for the stack

Pattern: This demonstrates the "monotonic stack" pattern, useful for problems involving
finding previous/next greater or smaller elements.

Applications:
- Maximum rectangle in binary matrix (extension of this problem)
- Trapping rain water (similar stack usage)
- Daily temperatures, next greater element problems
    `);
}

// Visualization helper
function visualizeHistogram(heights) {
  console.log("\nHistogram Visualization:");
  const maxHeight = Math.max(...heights);

  for (let level = maxHeight; level > 0; level--) {
    let line = "";
    for (let i = 0; i < heights.length; i++) {
      line += heights[i] >= level ? "█ " : "  ";
    }
    console.log(line);
  }

  // Print indices
  let indices = "";
  for (let i = 0; i < heights.length; i++) {
    indices += i + " ";
  }
  console.log(indices);

  // Print heights
  let heightLine = "";
  for (let i = 0; i < heights.length; i++) {
    heightLine += heights[i] + " ";
  }
  console.log(heightLine);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();

  // Example visualization
  console.log("\nExample Visualization:");
  visualizeHistogram([2, 1, 5, 6, 2, 3]);
}

module.exports = {
  largestRectangleArea,
  largestRectangleAreaSentinel,
  largestRectangleAreaDivideConquer,
  largestRectangleAreaBruteForce,
  largestRectangleAreaPrevNext,
  visualizeHistogram
};
