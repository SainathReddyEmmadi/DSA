/**
 * 503. Next Greater Element II
 * https://leetcode.com/problems/next-greater-element-ii/
 *
 * Difficulty: Medium
 * Topics: Array, Stack, Monotonic Stack
 *
 * Given a circular integer array nums, return the next greater number for every element.
 * The next greater number is the first greater number to its right in the array.
 * Since the array is circular, the next greater number could also appear to the left.
 *
 * Example 1:
 * Input: nums = [1,2,1]
 * Output: [2,-1,2]
 * Explanation:
 * - For 1 at index 0: next greater is 2
 * - For 2 at index 1: no greater element, so -1
 * - For 1 at index 2: next greater is 2 (circular)
 */

/**
 * APPROACH 1: Monotonic Stack with Circular Array (Optimal)
 *
 * Process array twice to handle circular nature.
 * Use indices in stack to track positions.
 *
 * Time: O(n) - each element pushed/popped at most once
 * Space: O(n) - stack and result array
 */
function nextGreaterElements(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = []; // Store indices

  // Process array twice to handle circular nature
  for (let i = 0; i < 2 * n; i++) {
    const currentIndex = i % n;
    const currentValue = nums[currentIndex];

    // Pop elements smaller than current
    while (stack.length > 0 && nums[stack[stack.length - 1]] < currentValue) {
      const index = stack.pop();
      result[index] = currentValue;
    }

    // Only push indices in first pass to avoid duplicates
    if (i < n) {
      stack.push(currentIndex);
    }
  }

  return result;
}

/**
 * APPROACH 2: Brute Force with Circular Logic
 *
 * For each element, search in circular manner for next greater
 *
 * Time: O(n²)
 * Space: O(1) excluding result
 */
function nextGreaterElementsBruteForce(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);

  for (let i = 0; i < n; i++) {
    // Search in circular manner
    for (let j = 1; j < n; j++) {
      const nextIndex = (i + j) % n;
      if (nums[nextIndex] > nums[i]) {
        result[i] = nums[nextIndex];
        break;
      }
    }
  }

  return result;
}

/**
 * APPROACH 3: Stack with Manual Circular Handling
 *
 * First pass: normal next greater element
 * Second pass: handle remaining elements with circular logic
 *
 * Time: O(n)
 * Space: O(n)
 */
function nextGreaterElementsManual(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];

  // First pass: left to right
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      const index = stack.pop();
      result[index] = nums[i];
    }
    stack.push(i);
  }

  // Second pass: circular part (only first half of array)
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      const index = stack.pop();
      result[index] = nums[i];
    }
  }

  return result;
}

// Test cases
function testNextGreaterElementsII() {
  console.log("=== Testing Next Greater Element II ===");

  const testCases = [
    {
      input: [1, 2, 1],
      expected: [2, -1, 2],
      description: "Basic circular case"
    },
    {
      input: [1, 2, 3, 4, 3],
      expected: [2, 3, 4, -1, 4],
      description: "Mixed case with circular dependency"
    },
    {
      input: [5, 4, 3, 2, 1],
      expected: [-1, 5, 5, 5, 5],
      description: "Decreasing array - all circular"
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: [2, 3, 4, 5, -1],
      description: "Increasing array - last has no greater"
    },
    {
      input: [3, 3, 3, 3],
      expected: [-1, -1, -1, -1],
      description: "All equal elements"
    },
    {
      input: [1],
      expected: [-1],
      description: "Single element"
    },
    {
      input: [2, 1, 3],
      expected: [3, 3, -1],
      description: "Simple case with wrap-around"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}]`);

    const result1 = nextGreaterElements(test.input);
    const result2 = nextGreaterElementsBruteForce(test.input);
    const result3 = nextGreaterElementsManual(test.input);

    console.log(`Circular Stack: [${result1.join(", ")}]`);
    console.log(`Brute Force: [${result2.join(", ")}]`);
    console.log(`Manual Circular: [${result3.join(", ")}]`);
    console.log(`Expected: [${test.expected.join(", ")}]`);

    const pass =
      JSON.stringify(result1) === JSON.stringify(test.expected) &&
      JSON.stringify(result2) === JSON.stringify(test.expected) &&
      JSON.stringify(result3) === JSON.stringify(test.expected);
    console.log(`✓ Pass: ${pass}`);
  });
}

// Uncomment to run tests
// testNextGreaterElementsII();

/**
 * KEY INSIGHTS:
 *
 * 1. Circular Array Simulation:
 *    - Process array twice: indices 0 to 2n-1
 *    - Use modulo operator: i % n to get actual index
 *    - Only push indices in first pass to avoid duplicates
 *
 * 2. Monotonic Stack for Circular:
 *    - Same pattern as regular next greater element
 *    - Key difference: array is processed twice
 *    - Elements can find their greater element in "second round"
 *
 * 3. Why Process Twice:
 *    - First pass: handles normal left-to-right cases
 *    - Second pass: handles circular dependencies
 *    - After two passes, all possible greater elements are found
 *
 * 4. Stack Management:
 *    - Store indices, not values (to update result array)
 *    - Stack contains indices waiting for next greater element
 *    - When found, pop and update result
 *
 * 5. Edge Cases:
 *    - Single element: no greater element
 *    - All equal: no greater elements
 *    - Strictly increasing: last element has no greater
 *    - Strictly decreasing: all depend on first element
 *
 * 6. Related Problems:
 *    - Next Greater Element I (496)
 *    - Daily Temperatures (739)
 *    - Largest Rectangle in Histogram (84)
 *    - Trapping Rain Water (42)
 */

module.exports = {
  nextGreaterElements,
  nextGreaterElementsBruteForce,
  nextGreaterElementsManual
};
