/**
 * Container With Most Water - LeetCode Problem 11
 *
 * Problem: You are given an integer array height of length n. There are n
 * vertical lines drawn such that the two endpoints of the ith line are (i, 0)
 * and (i, height[i]). Find two lines that together with the x-axis form a
 * container that can hold the most water.
 *
 * Return the maximum amount of water a container can store.
 *
 * Constraints:
 * - n == height.length
 * - 2 <= n <= 10^5
 * - 0 <= height[i] <= 10^4
 *
 * Link: https://leetcode.com/problems/container-with-most-water/
 * Difficulty: Medium
 * Topics: Array, Two Pointers, Greedy
 * Companies: Amazon, Microsoft, Facebook, Apple, Bloomberg
 */

/**
 * Approach 1: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function maxAreaBruteForce(height) {
  let maxArea = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const width = j - i;
      const minHeight = Math.min(height[i], height[j]);
      const area = width * minHeight;
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea;
}

/**
 * Approach 2: Two Pointers (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Strategy: Start with widest container (left=0, right=n-1)
 * Move the pointer with smaller height inward
 */
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    // Calculate current area
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;

    maxArea = Math.max(maxArea, area);

    // Move the pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

/**
 * Approach 3: Two Pointers with detailed tracking
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function maxAreaDetailed(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  let bestLeft = 0,
    bestRight = 0;

  console.log("Starting two pointers approach:");
  console.log("Heights:", height);

  while (left < right) {
    const width = right - left;
    const leftHeight = height[left];
    const rightHeight = height[right];
    const minHeight = Math.min(leftHeight, rightHeight);
    const area = width * minHeight;

    console.log(
      `left=${left}(h=${leftHeight}), right=${right}(h=${rightHeight}), width=${width}, area=${area}`
    );

    if (area > maxArea) {
      maxArea = area;
      bestLeft = left;
      bestRight = right;
      console.log(`  New max area: ${area}`);
    }

    // Move the pointer with smaller height
    if (leftHeight < rightHeight) {
      left++;
      console.log(`  Moving left pointer (smaller height)`);
    } else {
      right--;
      console.log(`  Moving right pointer (smaller/equal height)`);
    }
  }

  console.log(
    `Best container: left=${bestLeft}, right=${bestRight}, area=${maxArea}`
  );
  return maxArea;
}

/**
 * Approach 4: Optimized with early termination
 * Time Complexity: O(n) - but with optimizations
 * Space Complexity: O(1)
 */
function maxAreaOptimized(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const leftHeight = height[left];
    const rightHeight = height[right];
    const width = right - left;
    const minHeight = Math.min(leftHeight, rightHeight);
    const area = width * minHeight;

    maxArea = Math.max(maxArea, area);

    // Optimization: skip all smaller heights on the side we're moving
    if (leftHeight < rightHeight) {
      const currentLeft = left;
      while (left < right && height[left] <= height[currentLeft]) {
        left++;
      }
    } else {
      const currentRight = right;
      while (left < right && height[right] <= height[currentRight]) {
        right--;
      }
    }
  }

  return maxArea;
}

// Test cases
console.log("=== Container With Most Water Tests ===");
const testCases = [
  [1, 8, 6, 2, 5, 4, 8, 3, 7], // Expected: 49 (indices 1 and 8)
  [1, 1], // Expected: 1
  [4, 3, 2, 1, 4], // Expected: 16 (indices 0 and 4)
  [1, 2, 1], // Expected: 2 (indices 0 and 2)
  [2, 1] // Expected: 1
];

testCases.forEach((test, index) => {
  console.log(`\nTest ${index + 1}: [${test}]`);
  console.log(`Brute Force: ${maxAreaBruteForce(test)}`);
  console.log(`Two Pointers: ${maxArea(test)}`);
  console.log(`Optimized: ${maxAreaOptimized(test)}`);
});

console.log("\n=== Detailed Step-by-Step Example ===");
maxAreaDetailed([1, 8, 6, 2, 5, 4, 8, 3, 7]);

/**
 * Key Insights:
 *
 * 1. TWO POINTERS INTUITION:
 *    - Start with maximum possible width (left=0, right=n-1)
 *    - Area = width × min(height[left], height[right])
 *    - To increase area, we need to increase height since width decreases
 *    - Move the pointer with smaller height (bottleneck)
 *
 * 2. WHY MOVE THE SMALLER HEIGHT?
 *    - If we move the taller line, width decreases and height stays same/decreases
 *    - If we move the shorter line, width decreases but height might increase
 *    - The shorter line is the bottleneck determining the area
 *
 * 3. GREEDY CHOICE:
 *    - At each step, we make the choice that could potentially lead to larger area
 *    - We don't miss any optimal solutions because of the bottleneck principle
 *
 * 4. PROOF OF CORRECTNESS:
 *    - Suppose optimal solution uses lines at positions i and j (i < j)
 *    - Our algorithm will encounter this pair or find a better one
 *    - When we eliminate a position, we've checked all containers using it
 *
 * 5. OPTIMIZATIONS:
 *    - Skip consecutive smaller/equal heights on the side we're moving
 *    - Early termination if remaining width × max_height ≤ current_max
 */

/**
 * Common Mistakes:
 * 1. Moving both pointers simultaneously
 * 2. Always moving the left pointer
 * 3. Not understanding why we move the smaller height
 * 4. Calculating area incorrectly (forgetting it's width × min_height)
 */

/**
 * Related Problems:
 * - Trapping Rain Water (LC 42) - Similar two pointers but different logic
 * - Largest Rectangle in Histogram (LC 84)
 * - Maximal Rectangle (LC 85)
 * - Most Stones Removed with Same Row or Column (LC 947)
 */

module.exports = {
  maxArea,
  maxAreaBruteForce,
  maxAreaDetailed,
  maxAreaOptimized
};
