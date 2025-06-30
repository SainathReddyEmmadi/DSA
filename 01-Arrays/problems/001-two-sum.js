/**
 * LeetCode 1: Two Sum
 * Difficulty: Easy
 *
 * Problem:
 * Given an array of integers nums and an integer target, return indices of the two numbers
 * such that they add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may not use
 * the same element twice.
 *
 * You can return the answer in any order.
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
 */

// Approach 1: Brute Force
// Time: O(n²), Space: O(1)
function twoSum1(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return []; // No solution found
}

// Approach 2: Hash Map (Optimal)
// Time: O(n), Space: O(n)
function twoSum2(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return []; // No solution found
}

// Approach 3: Two Pointers (Only works for sorted arrays)
// Time: O(n log n) due to sorting, Space: O(n) for storing original indices
function twoSum3(nums, target) {
  // Create array with values and original indices
  const indexed = nums.map((num, index) => ({ value: num, index }));

  // Sort by value
  indexed.sort((a, b) => a.value - b.value);

  let left = 0;
  let right = indexed.length - 1;

  while (left < right) {
    const sum = indexed[left].value + indexed[right].value;

    if (sum === target) {
      return [indexed[left].index, indexed[right].index].sort((a, b) => a - b);
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return []; // No solution found
}

// Approach 4: Using Set (Alternative hash-based solution)
// Time: O(n), Space: O(n)
function twoSum4(nums, target) {
  const seen = new Set();
  const indices = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [indices.get(complement), i];
    }

    seen.add(nums[i]);
    indices.set(nums[i], i);
  }

  return []; // No solution found
}

// Approach 5: Functional Programming Style
// Time: O(n²), Space: O(1) excluding result
function twoSum5(nums, target) {
  return nums.reduce((result, num, i) => {
    if (result.length > 0) return result;

    const complementIndex = nums.findIndex(
      (n, j) => j > i && n + num === target
    );

    return complementIndex !== -1 ? [i, complementIndex] : result;
  }, []);
}

// Helper function to find all pairs that sum to target (extension)
function twoSumAllPairs(nums, target) {
  const pairs = [];
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      // Get all indices where complement appears
      const complementIndices = map.get(complement);
      for (const compIndex of complementIndices) {
        pairs.push([compIndex, i]);
      }
    }

    // Store current number with its index
    if (!map.has(nums[i])) {
      map.set(nums[i], []);
    }
    map.get(nums[i]).push(i);
  }

  return pairs;
}

// Helper function to check if solution exists
function hasTwoSum(nums, target) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(target - num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}

// Test cases
function runTests() {
  const testCases = [
    {
      nums: [2, 7, 11, 15],
      target: 9,
      expected: [0, 1],
      description: "Basic case - first two elements"
    },
    {
      nums: [3, 2, 4],
      target: 6,
      expected: [1, 2],
      description: "Middle elements"
    },
    {
      nums: [3, 3],
      target: 6,
      expected: [0, 1],
      description: "Duplicate numbers"
    },
    {
      nums: [1, 2, 3, 4, 5],
      target: 8,
      expected: [2, 4],
      description: "Multiple valid pairs possible"
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
      description: "Zero sum"
    },
    {
      nums: [1, 2],
      target: 3,
      expected: [0, 1],
      description: "Minimum length array"
    }
  ];

  const approaches = [
    { name: "Brute Force", func: twoSum1 },
    { name: "Hash Map", func: twoSum2 },
    { name: "Two Pointers", func: twoSum3 },
    { name: "Using Set", func: twoSum4 },
    { name: "Functional Style", func: twoSum5 }
  ];

  console.log("=== Two Sum Tests ===\n");

  approaches.forEach((approach) => {
    console.log(`Testing ${approach.name} approach:`);

    testCases.forEach((test, index) => {
      const result = approach.func([...test.nums], test.target);

      // Check if result is correct (order might be different)
      const isCorrect =
        result.length === 2 &&
        test.nums[result[0]] + test.nums[result[1]] === test.target &&
        result[0] !== result[1];

      const status = isCorrect ? "✅ PASS" : "❌ FAIL";
      console.log(`  Test ${index + 1}: ${status}`);
      console.log(
        `    Input: nums = [${test.nums.join(", ")}], target = ${test.target}`
      );
      console.log(`    Expected sum: ${test.target}`);
      console.log(`    Got indices: [${result.join(", ")}]`);
      console.log(
        `    Values: [${result.map((i) => test.nums[i]).join(", ")}]`
      );
      console.log(
        `    Sum: ${
          result.length === 2
            ? test.nums[result[0]] + test.nums[result[1]]
            : "N/A"
        }`
      );
      console.log(`    Description: ${test.description}\n`);
    });

    console.log("---\n");
  });
}

// Performance comparison
function performanceTest() {
  console.log("=== Performance Comparison ===\n");

  // Generate test data of different sizes
  const testSizes = [100, 1000, 5000];

  testSizes.forEach((size) => {
    console.log(`Testing with array size: ${size}`);

    // Generate random array
    const nums = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 1000)
    );
    const target = nums[0] + nums[1]; // Ensure there's always a solution

    const approaches = [
      { name: "Brute Force O(n²)", func: twoSum1 },
      { name: "Hash Map O(n)", func: twoSum2 },
      { name: "Two Pointers O(n log n)", func: twoSum3 },
      { name: "Using Set O(n)", func: twoSum4 }
    ];

    approaches.forEach((approach) => {
      const start = performance.now();
      const result = approach.func([...nums], target);
      const end = performance.now();

      console.log(`  ${approach.name}: ${(end - start).toFixed(2)}ms`);
    });

    console.log();
  });
}

// Advanced variations
function advancedExamples() {
  console.log("=== Advanced Examples ===\n");

  // Example 1: Find all pairs
  console.log("1. Find all pairs that sum to target:");
  const nums1 = [1, 2, 3, 2, 4, 1];
  const target1 = 3;
  const allPairs = twoSumAllPairs(nums1, target1);
  console.log(`Numbers: [${nums1.join(", ")}]`);
  console.log(`Target: ${target1}`);
  console.log(`All pairs: ${JSON.stringify(allPairs)}`);
  console.log();

  // Example 2: Check if solution exists
  console.log("2. Check if two sum solution exists:");
  const testArrays = [
    { nums: [1, 2, 3, 4], target: 7, exists: true },
    { nums: [1, 2, 3, 4], target: 10, exists: false },
    { nums: [5, 5], target: 10, exists: true }
  ];

  testArrays.forEach(({ nums, target, exists }) => {
    const result = hasTwoSum(nums, target);
    const status = result === exists ? "✅" : "❌";
    console.log(
      `  ${status} [${nums.join(", ")}], target=${target} → ${result}`
    );
  });
  console.log();

  // Example 3: Real-world application
  console.log("3. Real-world application - Shopping cart:");
  const prices = [10, 25, 30, 45, 50, 15, 20];
  const budget = 40;

  console.log(`Item prices: $[${prices.join(", ")}]`);
  console.log(`Budget: $${budget}`);

  const affordableItems = twoSum2(prices, budget);
  if (affordableItems.length === 2) {
    console.log(
      `You can buy items at indices ${affordableItems[0]} and ${affordableItems[1]}`
    );
    console.log(
      `Prices: $${prices[affordableItems[0]]} + $${
        prices[affordableItems[1]]
      } = $${budget}`
    );
  } else {
    console.log("No combination of two items fits your budget");
  }
  console.log();

  // Example 4: Temperature differences
  console.log("4. Temperature analysis:");
  const temperatures = [20, 25, 18, 30, 22, 28];
  const desiredDifference = 10;

  console.log(`Temperatures: [${temperatures.join("°C, ")}°C]`);
  console.log(`Looking for two days with ${desiredDifference}°C difference:`);

  // Modified two sum to find difference instead of sum
  const tempIndices = temperatures.reduce((result, temp, i) => {
    if (result.length > 0) return result;

    const complementIndex = temperatures.findIndex(
      (t, j) => j > i && Math.abs(t - temp) === desiredDifference
    );

    return complementIndex !== -1 ? [i, complementIndex] : result;
  }, []);

  if (tempIndices.length === 2) {
    console.log(
      `Days ${tempIndices[0]} and ${tempIndices[1]}: ${
        temperatures[tempIndices[0]]
      }°C and ${temperatures[tempIndices[1]]}°C`
    );
  } else {
    console.log("No two days have exactly that temperature difference");
  }
}

// Key insights and patterns
console.log(`
=== Two Sum - Key Insights ===

1. Pattern Recognition:
   - This is a classic "find pair" problem
   - Can be extended to three sum, four sum, etc.
   - Foundation for many other array problems

2. Approach Analysis:
   a) Brute Force (O(n²)):
      - Simple nested loops
      - Good for small arrays or when space is limited

   b) Hash Map (O(n)):
      - Optimal time complexity
      - Trade space for time
      - Most commonly used in interviews

   c) Two Pointers (O(n log n)):
      - Requires sorted array
      - Good when array is already sorted
      - In-place if modification allowed

3. Common Variations:
   - Two Sum II (sorted array)
   - Two Sum III (design data structure)
   - Two Sum closest to target
   - Two Sum with duplicates
   - K-Sum problems

4. Interview Tips:
   - Always ask about duplicates
   - Clarify if array is sorted
   - Discuss time/space trade-offs
   - Consider edge cases (empty array, no solution)

5. Real Applications:
   - Shopping cart optimization
   - Pair trading in finance
   - Chemistry compound matching
   - Resource allocation problems

Time Complexity: O(n) with hash map
Space Complexity: O(n) for hash map storage
`);

// Run all tests and examples
if (require.main === module) {
  runTests();
  performanceTest();
  advancedExamples();
}

module.exports = {
  twoSum1,
  twoSum2,
  twoSum3,
  twoSum4,
  twoSum5,
  twoSumAllPairs,
  hasTwoSum
};
