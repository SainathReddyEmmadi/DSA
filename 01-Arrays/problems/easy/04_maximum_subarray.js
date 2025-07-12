/**
 * LeetCode 53: Maximum Subarray (Kadane's Algorithm)
 * Difficulty: Easy
 *
 * Problem:
 * Given an integer array nums, find the contiguous subarray (containing at least one number)
 * which has the largest sum and return its sum.
 *
 * A subarray is a contiguous part of an array.
 *
 * Example 1:
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: [4,-1,2,1] has the largest sum = 6.
 *
 * Example 2:
 * Input: nums = [1]
 * Output: 1
 *
 * Example 3:
 * Input: nums = [5,4,-1,7,8]
 * Output: 23
 *
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - -10^4 <= nums[i] <= 10^4
 */

/**
 * Approach 1: Brute Force - All Subarrays
 * Time Complexity: O(n³)
 * Space Complexity: O(1)
 *
 * Strategy:
 * Generate all possible subarrays and find the one with maximum sum
 */
function maxSubArray1(nums) {
  let maxSum = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      let currentSum = 0;
      for (let k = i; k <= j; k++) {
        currentSum += nums[k];
      }
      maxSum = Math.max(maxSum, currentSum);
    }
  }

  return maxSum;
}

/**
 * Approach 2: Brute Force Optimized
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * Strategy:
 * Calculate sum incrementally instead of recalculating each time
 */
function maxSubArray2(nums) {
  let maxSum = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    let currentSum = 0;
    for (let j = i; j < nums.length; j++) {
      currentSum += nums[j];
      maxSum = Math.max(maxSum, currentSum);
    }
  }

  return maxSum;
}

/**
 * Approach 3: Kadane's Algorithm - Classic
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Strategy:
 * At each position, decide whether to start a new subarray or extend the current one
 */
function maxSubArray3(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the existing subarray or start a new one
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);

    // Update the global maximum
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

/**
 * Approach 4: Kadane's Algorithm - Alternative
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Strategy:
 * Reset current sum to 0 when it becomes negative
 */
function maxSubArray4(nums) {
  let maxSum = -Infinity;
  let currentSum = 0;

  for (const num of nums) {
    currentSum += num;
    maxSum = Math.max(maxSum, currentSum);

    if (currentSum < 0) {
      currentSum = 0;
    }
  }

  return maxSum;
}

/**
 * Approach 5: Divide and Conquer
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n)
 *
 * Strategy:
 * Recursively divide array and find maximum subarray in left, right, or crossing middle
 */
function maxSubArray5(nums) {
  function maxSubArrayHelper(arr, left, right) {
    if (left === right) {
      return arr[left];
    }

    const mid = Math.floor((left + right) / 2);

    // Maximum subarray in left half
    const leftMax = maxSubArrayHelper(arr, left, mid);

    // Maximum subarray in right half
    const rightMax = maxSubArrayHelper(arr, mid + 1, right);

    // Maximum subarray crossing the middle
    let leftSum = -Infinity;
    let sum = 0;
    for (let i = mid; i >= left; i--) {
      sum += arr[i];
      leftSum = Math.max(leftSum, sum);
    }

    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
      sum += arr[i];
      rightSum = Math.max(rightSum, sum);
    }

    const crossSum = leftSum + rightSum;

    return Math.max(leftMax, rightMax, crossSum);
  }

  return maxSubArrayHelper(nums, 0, nums.length - 1);
}

// Helper function to find the actual subarray (not just sum)
function findMaxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    if (currentSum < 0) {
      currentSum = nums[i];
      tempStart = i;
    } else {
      currentSum += nums[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }

  return {
    sum: maxSum,
    subarray: nums.slice(start, end + 1),
    startIndex: start,
    endIndex: end
  };
}

// Helper function for visualizing the algorithm
function kadaneWithSteps(nums) {
  console.log("Kadane's Algorithm Step by Step:");
  console.log(`Input: [${nums.join(", ")}]\n`);

  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  console.log(`Step 0: num = ${nums[0]}`);
  console.log(`  maxEndingHere = ${maxEndingHere}`);
  console.log(`  maxSoFar = ${maxSoFar}\n`);

  for (let i = 1; i < nums.length; i++) {
    const prevMaxEndingHere = maxEndingHere;
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);

    console.log(`Step ${i}: num = ${nums[i]}`);
    console.log(
      `  maxEndingHere = max(${nums[i]}, ${prevMaxEndingHere} + ${
        nums[i]
      }) = max(${nums[i]}, ${prevMaxEndingHere + nums[i]}) = ${maxEndingHere}`
    );
    console.log(
      `  maxSoFar = max(${
        maxSoFar === maxEndingHere ? "prev" : maxSoFar
      }, ${maxEndingHere}) = ${maxSoFar}\n`
    );
  }

  return maxSoFar;
}

// Test cases
function runTests() {
  console.log("Testing Maximum Subarray Solutions...\n");

  const testCases = [
    {
      nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
      expected: 6,
      description: "Example 1 - Mixed positive and negative"
    },
    {
      nums: [1],
      expected: 1,
      description: "Example 2 - Single element"
    },
    {
      nums: [5, 4, -1, 7, 8],
      expected: 23,
      description: "Example 3 - Mostly positive"
    },
    {
      nums: [-1, -2, -3, -4],
      expected: -1,
      description: "All negative numbers"
    },
    {
      nums: [1, 2, 3, 4, 5],
      expected: 15,
      description: "All positive numbers"
    },
    {
      nums: [-2, -1],
      expected: -1,
      description: "Two negative numbers"
    },
    {
      nums: [2, -3, 4, -1, 2, 1, -5, 4],
      expected: 6,
      description: "Another mixed case"
    }
  ];

  const solutions = [
    { name: "Brute Force O(n³)", func: maxSubArray1 },
    { name: "Brute Force O(n²)", func: maxSubArray2 },
    { name: "Kadane's Classic", func: maxSubArray3 },
    { name: "Kadane's Alternative", func: maxSubArray4 },
    { name: "Divide & Conquer", func: maxSubArray5 }
  ];

  testCases.forEach(({ nums, expected, description }) => {
    console.log(`Test Case: ${description}`);
    console.log(`Input: [${nums.join(", ")}]`);
    console.log(`Expected: ${expected}`);

    // Show the actual subarray
    const details = findMaxSubArray(nums);
    console.log(
      `Max subarray: [${details.subarray.join(", ")}] from index ${
        details.startIndex
      } to ${details.endIndex}`
    );

    solutions.forEach(({ name, func }) => {
      const result = func([...nums]);
      const isCorrect = result === expected;
      console.log(`${name}: ${result} ${isCorrect ? "✅" : "❌"}`);
    });

    console.log();
  });
}

// Performance comparison
function performanceTest() {
  console.log("Performance Testing...\n");

  const sizes = [100, 1000, 10000];

  sizes.forEach((size) => {
    console.log(`Array size: ${size}`);

    // Create test array with random values
    const nums = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 21) - 10
    );

    const solutions = [
      { name: "Kadane's Classic", func: maxSubArray3 },
      { name: "Kadane's Alternative", func: maxSubArray4 },
      { name: "Divide & Conquer", func: maxSubArray5 }
    ];

    // Only test brute force on smaller arrays
    if (size <= 100) {
      solutions.unshift(
        { name: "Brute Force O(n³)", func: maxSubArray1 },
        { name: "Brute Force O(n²)", func: maxSubArray2 }
      );
    } else if (size <= 1000) {
      solutions.unshift({ name: "Brute Force O(n²)", func: maxSubArray2 });
    }

    solutions.forEach(({ name, func }) => {
      const start = performance.now();
      func([...nums]);
      const end = performance.now();
      console.log(`${name}: ${(end - start).toFixed(3)}ms`);
    });

    console.log();
  });
}

// Pattern explanation
function explainPattern() {
  console.log("Maximum Subarray (Kadane's Algorithm) Pattern Analysis:\n");
  console.log("1. KADANE'S ALGORITHM:");
  console.log("   - Optimal O(n) solution for maximum subarray problem");
  console.log(
    "   - Key insight: at each position, choose to extend or start new"
  );
  console.log("   - If current sum becomes negative, reset to 0");
  console.log();
  console.log("2. CORE PRINCIPLE:");
  console.log(
    "   - maxEndingHere = max(current_element, maxEndingHere + current_element)"
  );
  console.log("   - This means: start new subarray OR extend existing one");
  console.log("   - Keep track of global maximum seen so far");
  console.log();
  console.log("3. VARIATIONS:");
  console.log(
    "   - Maximum Product Subarray: similar but track both max and min"
  );
  console.log("   - Maximum Circular Subarray: handle wraparound case");
  console.log("   - K-Concatenation Maximum Sum: extend array K times");
  console.log();
  console.log("4. REAL WORLD APPLICATIONS:");
  console.log("   - Stock trading: maximum profit from contiguous period");
  console.log("   - Image processing: finding brightest region");
  console.log("   - Performance analysis: best consecutive performance period");
  console.log();
  console.log("5. ALGORITHM INTUITION:");
  console.log("   - 'Why continue with negative sum when we can start fresh?'");
  console.log("   - Dynamic programming: optimal substructure principle");
  console.log("   - Local optimum leads to global optimum");
}

// Export for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    maxSubArray1,
    maxSubArray2,
    maxSubArray3,
    maxSubArray4,
    maxSubArray5,
    findMaxSubArray,
    kadaneWithSteps,
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
