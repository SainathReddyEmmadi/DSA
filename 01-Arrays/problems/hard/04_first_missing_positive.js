/**
 * First Missing Positive (LeetCode 41)
 * Difficulty: Hard
 *
 * Given an unsorted integer array nums, return the smallest missing positive integer.
 * You must implement an algorithm that runs in O(n) time and uses constant extra space.
 *
 * Pattern: Cyclic Sort / In-place hashing
 *
 * Examples:
 * Input: nums = [1,2,0]
 * Output: 3
 *
 * Input: nums = [3,4,-1,1]
 * Output: 2
 *
 * Input: nums = [7,8,9,11,12]
 * Output: 1
 */

/**
 * Approach 1: Cyclic Sort (Optimal)
 * Time: O(n), Space: O(1)
 *
 * The key insight is that for an array of length n, the first missing positive
 * must be in the range [1, n+1]. We can use the array itself as a hash table
 * by placing each number in its correct position.
 */
function firstMissingPositive(nums) {
  const n = nums.length;

  // Place each number in its correct position
  // Number x should be at index x-1
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      // Swap nums[i] with nums[nums[i] - 1]
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }

  // Find the first missing positive
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // If all positions are filled correctly, return n+1
  return n + 1;
}

/**
 * Approach 2: Marking with Sign (Alternative O(1) space)
 * Time: O(n), Space: O(1)
 *
 * First, mark all non-positive numbers and numbers > n as n+1.
 * Then use the sign of nums[abs(nums[i])-1] to mark presence of number abs(nums[i]).
 */
function firstMissingPositiveMarking(nums) {
  const n = nums.length;

  // Replace all non-positive numbers and numbers > n with n+1
  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0 || nums[i] > n) {
      nums[i] = n + 1;
    }
  }

  // Use the sign of index to mark presence
  for (let i = 0; i < n; i++) {
    const num = Math.abs(nums[i]);
    if (num <= n) {
      nums[num - 1] = -Math.abs(nums[num - 1]);
    }
  }

  // Find the first positive number
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }

  return n + 1;
}

/**
 * Approach 3: Using Set (Not optimal - O(n) space)
 * Time: O(n), Space: O(n)
 *
 * Simple approach using extra space for learning purposes.
 */
function firstMissingPositiveSet(nums) {
  const numSet = new Set();
  let maxNum = 0;

  // Add all positive numbers to set and find max
  for (const num of nums) {
    if (num > 0) {
      numSet.add(num);
      maxNum = Math.max(maxNum, num);
    }
  }

  // Find first missing positive
  for (let i = 1; i <= maxNum + 1; i++) {
    if (!numSet.has(i)) {
      return i;
    }
  }

  return 1;
}

// Test cases
function runTests() {
  console.log("Testing First Missing Positive:");

  const testCases = [
    {
      input: [1, 2, 0],
      expected: 3,
      description: "Missing 3"
    },
    {
      input: [3, 4, -1, 1],
      expected: 2,
      description: "Missing 2"
    },
    {
      input: [7, 8, 9, 11, 12],
      expected: 1,
      description: "Missing 1"
    },
    {
      input: [1],
      expected: 2,
      description: "Single element"
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: 6,
      description: "Consecutive sequence"
    },
    {
      input: [-1, -2, -3],
      expected: 1,
      description: "All negative"
    },
    {
      input: [0],
      expected: 1,
      description: "Single zero"
    },
    {
      input: [2, 3, 4],
      expected: 1,
      description: "Missing first"
    }
  ];

  testCases.forEach((test, index) => {
    const input1 = [...test.input];
    const input2 = [...test.input];
    const input3 = [...test.input];

    const result1 = firstMissingPositive(input1);
    const result2 = firstMissingPositiveMarking(input2);
    const result3 = firstMissingPositiveSet(input3);

    console.log(`Test ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}]`);
    console.log(`Expected: ${test.expected}`);
    console.log(
      `Cyclic Sort: ${result1} ${result1 === test.expected ? "✓" : "✗"}`
    );
    console.log(`Marking: ${result2} ${result2 === test.expected ? "✓" : "✗"}`);
    console.log(`Set: ${result3} ${result3 === test.expected ? "✓" : "✗"}`);
    console.log("---");
  });
}

// Performance test
function performanceTest() {
  console.log("\nPerformance Test:");

  const sizes = [1000, 10000, 100000];

  sizes.forEach((size) => {
    // Create test array with random positive numbers
    const arr1 = Array.from(
      { length: size },
      (_, i) => Math.floor(Math.random() * size * 2) + 1
    );
    const arr2 = [...arr1];
    const arr3 = [...arr1];

    console.log(`\nArray size: ${size}`);

    // Test Cyclic Sort
    let start = performance.now();
    firstMissingPositive(arr1);
    let end = performance.now();
    console.log(`Cyclic Sort: ${(end - start).toFixed(2)}ms`);

    // Test Marking
    start = performance.now();
    firstMissingPositiveMarking(arr2);
    end = performance.now();
    console.log(`Marking: ${(end - start).toFixed(2)}ms`);

    // Test Set (only for smaller arrays to avoid memory issues)
    if (size <= 10000) {
      start = performance.now();
      firstMissingPositiveSet(arr3);
      end = performance.now();
      console.log(`Set: ${(end - start).toFixed(2)}ms`);
    }
  });
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
First Missing Positive - Algorithm Explanation:

The key insight is that for an array of length n, the first missing positive integer
must be in the range [1, n+1]. This allows us to use the array itself as a hash table.

Cyclic Sort Approach:
1. For each element, try to place it in its correct position
   - Number x should be at index x-1
   - Only swap if the number is in valid range [1, n] and not already in correct position
2. After rearranging, scan the array to find the first position where nums[i] ≠ i+1
3. That position + 1 is our answer, or n+1 if all positions are correct

Marking Approach:
1. Replace all invalid numbers (≤0 or >n) with n+1
2. Use the sign of nums[abs(nums[i])-1] to mark presence of number abs(nums[i])
3. Scan for the first positive number to find the missing positive

Time Complexity: O(n) for both approaches
Space Complexity: O(1) for both approaches

Pattern: This problem demonstrates the "cyclic sort" pattern, which is useful when
you need to find missing or duplicate numbers in arrays containing numbers in a specific range.
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  firstMissingPositive,
  firstMissingPositiveMarking,
  firstMissingPositiveSet
};
