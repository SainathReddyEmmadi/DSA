/**
 * 496. Next Greater Element I
 * https://leetcode.com/problems/next-greater-element-i/
 *
 * Difficulty: Easy
 * Topics: Array, Hash Table, Stack, Monotonic Stack
 *
 * The next greater element of some element x in an array is the first greater element
 * to the right of x in the same array. You are given two distinct 0-indexed integer
 * arrays nums1 and nums2, where nums1 is a subset of nums2.
 *
 * For each element in nums1, find the next greater element in nums2.
 *
 * Example 1:
 * Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
 * Output: [-1,3,-1]
 * Explanation:
 * - For 4: No greater element in nums2, so -1
 * - For 1: Next greater is 3
 * - For 2: No greater element to the right, so -1
 */

/**
 * APPROACH 1: Monotonic Stack + HashMap (Optimal)
 *
 * Use monotonic decreasing stack to find next greater elements in nums2,
 * then use HashMap to lookup results for nums1 elements.
 *
 * Time: O(n + m) where n = nums2.length, m = nums1.length
 * Space: O(n) for stack and map
 */
function nextGreaterElement(nums1, nums2) {
  const nextGreaterMap = new Map();
  const stack = [];

  // Build next greater element map for nums2
  for (const num of nums2) {
    // While stack has elements and current num is greater
    while (stack.length > 0 && stack[stack.length - 1] < num) {
      const smaller = stack.pop();
      nextGreaterMap.set(smaller, num);
    }
    stack.push(num);
  }

  // Build result for nums1
  return nums1.map((num) => nextGreaterMap.get(num) || -1);
}

/**
 * APPROACH 2: Brute Force
 *
 * For each element in nums1, find it in nums2 and then search for next greater
 *
 * Time: O(m * n) where m = nums1.length, n = nums2.length
 * Space: O(1) excluding result array
 */
function nextGreaterElementBruteForce(nums1, nums2) {
  const result = [];

  for (const target of nums1) {
    let found = false;
    let nextGreater = -1;

    // Find target in nums2
    for (let i = 0; i < nums2.length; i++) {
      if (nums2[i] === target) {
        found = true;
      } else if (found && nums2[i] > target) {
        nextGreater = nums2[i];
        break;
      }
    }

    result.push(nextGreater);
  }

  return result;
}

/**
 * APPROACH 3: HashMap + Linear Search
 *
 * Create index map for nums2, then for each nums1 element,
 * search from its position in nums2
 *
 * Time: O(m * n) worst case
 * Space: O(n) for index map
 */
function nextGreaterElementWithMap(nums1, nums2) {
  // Create position map for nums2
  const positionMap = new Map();
  for (let i = 0; i < nums2.length; i++) {
    positionMap.set(nums2[i], i);
  }

  const result = [];

  for (const num of nums1) {
    const startIndex = positionMap.get(num);
    let nextGreater = -1;

    // Search for next greater element from startIndex
    for (let i = startIndex + 1; i < nums2.length; i++) {
      if (nums2[i] > num) {
        nextGreater = nums2[i];
        break;
      }
    }

    result.push(nextGreater);
  }

  return result;
}

// Test cases
function testNextGreaterElement() {
  console.log("=== Testing Next Greater Element I ===");

  const testCases = [
    {
      nums1: [4, 1, 2],
      nums2: [1, 3, 4, 2],
      expected: [-1, 3, -1],
      description: "Standard case with mixed results"
    },
    {
      nums1: [2, 4],
      nums2: [1, 2, 3, 4],
      expected: [3, -1],
      description: "Some elements have next greater"
    },
    {
      nums1: [1, 2, 3],
      nums2: [3, 2, 1],
      expected: [-1, -1, -1],
      description: "Decreasing array - no next greater"
    },
    {
      nums1: [1, 2, 3],
      nums2: [1, 2, 3, 4, 5],
      expected: [2, 3, 4],
      description: "Increasing array - all have next greater"
    },
    {
      nums1: [5],
      nums2: [1, 3, 5, 2, 4],
      expected: [-1],
      description: "Single element with no next greater"
    },
    {
      nums1: [2],
      nums2: [2, 1, 3],
      expected: [3],
      description: "Single element with next greater"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);
    console.log(`nums1: [${test.nums1.join(", ")}]`);
    console.log(`nums2: [${test.nums2.join(", ")}]`);

    const result1 = nextGreaterElement(test.nums1, test.nums2);
    const result2 = nextGreaterElementBruteForce(test.nums1, test.nums2);
    const result3 = nextGreaterElementWithMap(test.nums1, test.nums2);

    console.log(`Monotonic Stack: [${result1.join(", ")}]`);
    console.log(`Brute Force: [${result2.join(", ")}]`);
    console.log(`HashMap Search: [${result3.join(", ")}]`);
    console.log(`Expected: [${test.expected.join(", ")}]`);

    const pass =
      JSON.stringify(result1) === JSON.stringify(test.expected) &&
      JSON.stringify(result2) === JSON.stringify(test.expected) &&
      JSON.stringify(result3) === JSON.stringify(test.expected);
    console.log(`✓ Pass: ${pass}`);
  });
}

// Uncomment to run tests
// testNextGreaterElement();

/**
 * KEY INSIGHTS:
 *
 * 1. Monotonic Stack Pattern:
 *    - Maintain decreasing stack (or increasing for next smaller)
 *    - When we find larger element, pop all smaller elements
 *    - Those popped elements found their "next greater"
 *
 * 2. Stack Behavior:
 *    - Elements in stack are waiting for their next greater element
 *    - When we find it, we can resolve multiple elements at once
 *    - Elements remaining in stack have no next greater element
 *
 * 3. Two-Step Process:
 *    - First: Build next greater map for all elements in nums2
 *    - Second: Query the map for elements in nums1
 *
 * 4. Edge Cases:
 *    - Elements at the end have no next greater
 *    - Single element arrays
 *    - All increasing or decreasing sequences
 *
 * 5. Related Problems:
 *    - Next Greater Element II (503) - circular array
 *    - Next Greater Element III (556) - number manipulation
 *    - Daily Temperatures (739) - similar pattern
 *    - Largest Rectangle in Histogram (84) - monotonic stack
 */

module.exports = {
  nextGreaterElement,
  nextGreaterElementBruteForce,
  nextGreaterElementWithMap
};
