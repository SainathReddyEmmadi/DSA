/**
 * LeetCode 1: Two Sum
 * Difficulty: Easy
 *
 * Problem:
 * Given an array of integers nums and an integer target, return indices of the two numbers
 * such that they add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may not use
 * the same element twice. You can return the answer in any order.
 *
 * Example 1:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 *
 * Example 2:
 * Input: nums = [3,2,4], target = 6
 * Output: [1,2]
 *
 * Example 3:
 * Input: nums = [3,3], target = 6
 * Output: [0,1]
 *
 * Constraints:
 * - 2 <= nums.length <= 10^4
 * - -10^9 <= nums[i] <= 10^9
 * - -10^9 <= target <= 10^9
 * - Only one valid answer exists.
 */

/**
 * Approach 1: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * Strategy:
 * Check every pair of numbers to see if they sum to target
 */
function twoSum1(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return []; // Should never reach here given constraints
}

/**
 * Approach 2: Hash Map - One Pass
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Strategy:
 * Use a hash map to store numbers we've seen and their indices.
 * For each number, check if its complement (target - num) exists in the map.
 */
function twoSum2(nums, target) {
  const numMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }

    numMap.set(nums[i], i);
  }

  return []; // Should never reach here given constraints
}

/**
 * Approach 3: Hash Map - Two Pass
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Strategy:
 * First pass: store all numbers and indices in hash map
 * Second pass: look for complement of each number
 */
function twoSum3(nums, target) {
  const numMap = new Map();

  // First pass: store all numbers and their indices
  for (let i = 0; i < nums.length; i++) {
    numMap.set(nums[i], i);
  }

  // Second pass: look for complement
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (numMap.has(complement) && numMap.get(complement) !== i) {
      return [i, numMap.get(complement)];
    }
  }

  return []; // Should never reach here given constraints
}

// Test cases
function runTests() {
  console.log("Testing Two Sum Solutions...\n");

  const testCases = [
    {
      nums: [2, 7, 11, 15],
      target: 9,
      expected: [0, 1],
      description: "Example 1"
    },
    {
      nums: [3, 2, 4],
      target: 6,
      expected: [1, 2],
      description: "Example 2"
    },
    {
      nums: [3, 3],
      target: 6,
      expected: [0, 1],
      description: "Example 3 - Duplicate numbers"
    },
    {
      nums: [-1, -2, -3, -4, -5],
      target: -8,
      expected: [2, 4],
      description: "Negative numbers"
    },
    {
      nums: [0, 4, 3, 0],
      target: 0,
      expected: [0, 3],
      description: "Zero target"
    }
  ];

  const solutions = [
    { name: "Brute Force", func: twoSum1 },
    { name: "Hash Map One Pass", func: twoSum2 },
    { name: "Hash Map Two Pass", func: twoSum3 }
  ];

  testCases.forEach(({ nums, target, expected, description }) => {
    console.log(`Test Case: ${description}`);
    console.log(`Input: nums = [${nums.join(", ")}], target = ${target}`);
    console.log(`Expected: [${expected.join(", ")}]`);

    solutions.forEach(({ name, func }) => {
      const result = func([...nums], target);
      const isCorrect =
        JSON.stringify(result.sort()) === JSON.stringify(expected.sort());
      console.log(`${name}: [${result.join(", ")}] ${isCorrect ? "✅" : "❌"}`);
    });

    console.log();
  });
}

// Performance comparison
function performanceTest() {
  console.log("Performance Testing...\n");

  const sizes = [100, 1000, 5000];

  sizes.forEach((size) => {
    console.log(`Array size: ${size}`);

    // Create test array
    const nums = Array.from({ length: size }, (_, i) => i);
    const target = size - 3; // Target that will be found near the end

    const solutions = [
      { name: "Brute Force", func: twoSum1 },
      { name: "Hash Map One Pass", func: twoSum2 },
      { name: "Hash Map Two Pass", func: twoSum3 }
    ];

    solutions.forEach(({ name, func }) => {
      const start = performance.now();
      func(nums, target);
      const end = performance.now();
      console.log(`${name}: ${(end - start).toFixed(3)}ms`);
    });

    console.log();
  });
}

// Pattern explanation
function explainPattern() {
  console.log("Two Sum Pattern Analysis:\n");
  console.log("1. HASH MAP PATTERN:");
  console.log("   - Use when you need to find pairs that sum to a target");
  console.log("   - Store complements as you iterate");
  console.log("   - O(n) time vs O(n²) brute force");
  console.log();
  console.log("2. KEY INSIGHTS:");
  console.log("   - For each number x, look for (target - x)");
  console.log("   - Hash map gives O(1) lookup time");
  console.log("   - One pass is sufficient - store as you search");
  console.log();
  console.log("3. VARIATIONS:");
  console.log("   - Two Sum II: sorted array → use two pointers");
  console.log("   - Three Sum: extend with outer loop + two pointers");
  console.log("   - Four Sum: nested loops or hash map combinations");
}

// Export for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    twoSum1,
    twoSum2,
    twoSum3,
    runTests,
    performanceTest,
    explainPattern
  };
}

// Run tests if executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainPattern();
}
