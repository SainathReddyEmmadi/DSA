/**
 * Maximum Subarray (Kadane's Algorithm) - LeetCode Problem 53
 *
 * Problem: Given an integer array nums, find the contiguous subarray
 * (containing at least one number) which has the largest sum and return its sum.
 *
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - -10^4 <= nums[i] <= 10^4
 *
 * Link: https://leetcode.com/problems/maximum-subarray/
 * Difficulty: Easy
 * Topics: Array, Divide and Conquer, Dynamic Programming
 * Companies: Amazon, Microsoft, Apple, LinkedIn, Bloomberg
 */

/**
 * Approach 1: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function maxSubarrayBruteForce(nums) {
  let maxSum = nums[0];

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
 * Approach 2: Kadane's Algorithm (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Strategy: At each position, decide whether to extend the current subarray
 * or start a new one
 */
function maxSubarray(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the existing subarray or start a new one
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

/**
 * Approach 3: Kadane's with tracking indices (if needed)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function maxSubarrayWithIndices(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  let start = 0,
    end = 0,
    tempStart = 0;

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

  return { maxSum, start, end, subarray: nums.slice(start, end + 1) };
}

/**
 * Approach 4: Divide and Conquer
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n) - recursion stack
 */
function maxSubarrayDivideConquer(nums) {
  function maxSubarrayHelper(nums, left, right) {
    if (left === right) return nums[left];

    const mid = Math.floor((left + right) / 2);

    // Maximum subarray in left half
    const leftMax = maxSubarrayHelper(nums, left, mid);

    // Maximum subarray in right half
    const rightMax = maxSubarrayHelper(nums, mid + 1, right);

    // Maximum subarray crossing the middle
    let leftSum = -Infinity;
    let sum = 0;
    for (let i = mid; i >= left; i--) {
      sum += nums[i];
      leftSum = Math.max(leftSum, sum);
    }

    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
      sum += nums[i];
      rightSum = Math.max(rightSum, sum);
    }

    const crossSum = leftSum + rightSum;

    return Math.max(leftMax, rightMax, crossSum);
  }

  return maxSubarrayHelper(nums, 0, nums.length - 1);
}

// Test cases
console.log("=== Maximum Subarray Tests ===");
const testCases = [
  [-2, 1, -3, 4, -1, 2, 1, -5, 4], // Expected: 6 ([4,-1,2,1])
  [1], // Expected: 1
  [5, 4, -1, 7, 8], // Expected: 23
  [-1], // Expected: -1
  [-2, -1] // Expected: -1
];

testCases.forEach((test, index) => {
  console.log(`\nTest ${index + 1}: [${test}]`);
  console.log(`Brute Force: ${maxSubarrayBruteForce(test)}`);
  console.log(`Kadane's: ${maxSubarray(test)}`);
  console.log(`With Indices:`, maxSubarrayWithIndices(test));
  console.log(`Divide & Conquer: ${maxSubarrayDivideConquer(test)}`);
});

/**
 * Key Insights:
 *
 * 1. KADANE'S ALGORITHM INTUITION:
 *    - At each position, ask: "Should I start fresh or continue?"
 *    - If current sum becomes negative, it's better to start fresh
 *    - Keep track of maximum seen so far
 *
 * 2. LOCAL VS GLOBAL OPTIMUM:
 *    - maxEndingHere = local optimum (best ending at current position)
 *    - maxSoFar = global optimum (best seen so far)
 *
 * 3. HANDLING ALL NEGATIVE NUMBERS:
 *    - Algorithm works correctly even with all negative numbers
 *    - Returns the least negative number
 *
 * 4. EXTENSIONS:
 *    - Can be modified to find the actual subarray (not just sum)
 *    - Can be extended to 2D arrays (maximum rectangle)
 *    - Forms basis for many DP problems
 */

/**
 * Related Problems:
 * - Maximum Product Subarray (LC 152)
 * - Maximum Sum Circular Subarray (LC 918)
 * - Best Time to Buy and Sell Stock (LC 121)
 * - House Robber (LC 198)
 */

module.exports = {
  maxSubarray,
  maxSubarrayBruteForce,
  maxSubarrayWithIndices,
  maxSubarrayDivideConquer
};
