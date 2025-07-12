/**
 * 42. Trapping Rain Water
 * https://leetcode.com/problems/trapping-rain-water/
 *
 * Difficulty: Hard
 * Topics: Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack
 *
 * Given n non-negative integers representing an elevation map where the width
 * of each bar is 1, compute how much water it can trap after raining.
 *
 * Example 1:
 * Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 * Explanation: The elevation map traps 6 units of rain water.
 */

/**
 * APPROACH 1: Monotonic Stack (Stack-based)
 *
 * Use stack to track potential water containers.
 * When we find a taller bar, calculate water trapped between current and previous bars.
 *
 * Time: O(n) - each element pushed/popped once
 * Space: O(n) - stack space
 */
function trapRainWaterStack(height) {
  const stack = [];
  let totalWater = 0;

  for (let i = 0; i < height.length; i++) {
    // While stack not empty and current height > stack top height
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop();

      if (stack.length === 0) break;

      const distance = i - stack[stack.length - 1] - 1;
      const boundedHeight =
        Math.min(height[i], height[stack[stack.length - 1]]) - height[top];
      totalWater += distance * boundedHeight;
    }

    stack.push(i);
  }

  return totalWater;
}

/**
 * APPROACH 2: Two Pointers (Optimal Space)
 *
 * Use two pointers moving towards each other.
 * Track max heights from both sides.
 *
 * Time: O(n)
 * Space: O(1)
 */
function trapRainWaterTwoPointers(height) {
  if (height.length < 3) return 0;

  let left = 0,
    right = height.length - 1;
  let leftMax = 0,
    rightMax = 0;
  let totalWater = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        totalWater += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        totalWater += rightMax - height[right];
      }
      right--;
    }
  }

  return totalWater;
}

/**
 * APPROACH 3: Dynamic Programming (Precompute Max Heights)
 *
 * Precompute maximum heights to the left and right of each position.
 * Water level at each position is min of left and right max minus current height.
 *
 * Time: O(n)
 * Space: O(n)
 */
function trapRainWaterDP(height) {
  const n = height.length;
  if (n < 3) return 0;

  const leftMax = new Array(n);
  const rightMax = new Array(n);

  // Fill left max array
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // Fill right max array
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // Calculate trapped water
  let totalWater = 0;
  for (let i = 0; i < n; i++) {
    const waterLevel = Math.min(leftMax[i], rightMax[i]);
    if (waterLevel > height[i]) {
      totalWater += waterLevel - height[i];
    }
  }

  return totalWater;
}

/**
 * APPROACH 4: Brute Force
 *
 * For each position, find max height to left and right, then calculate water.
 *
 * Time: O(n²)
 * Space: O(1)
 */
function trapRainWaterBruteForce(height) {
  const n = height.length;
  let totalWater = 0;

  for (let i = 1; i < n - 1; i++) {
    // Find max height to the left
    let leftMax = 0;
    for (let j = 0; j <= i; j++) {
      leftMax = Math.max(leftMax, height[j]);
    }

    // Find max height to the right
    let rightMax = 0;
    for (let j = i; j < n; j++) {
      rightMax = Math.max(rightMax, height[j]);
    }

    // Calculate water at current position
    const waterLevel = Math.min(leftMax, rightMax);
    if (waterLevel > height[i]) {
      totalWater += waterLevel - height[i];
    }
  }

  return totalWater;
}

// Test cases
function testTrapRainWater() {
  console.log("=== Testing Trapping Rain Water ===");

  const testCases = [
    {
      input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      expected: 6,
      description: "Standard case with multiple pools"
    },
    {
      input: [4, 2, 0, 3, 2, 5],
      expected: 9,
      description: "Deep valley case"
    },
    {
      input: [3, 0, 2, 0, 4],
      expected: 10,
      description: "Multiple valleys"
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: 0,
      description: "Strictly increasing - no water"
    },
    {
      input: [5, 4, 3, 2, 1],
      expected: 0,
      description: "Strictly decreasing - no water"
    },
    {
      input: [2, 1, 2],
      expected: 1,
      description: "Simple valley"
    },
    {
      input: [1, 1, 1],
      expected: 0,
      description: "All equal heights"
    },
    {
      input: [],
      expected: 0,
      description: "Empty array"
    },
    {
      input: [1, 2],
      expected: 0,
      description: "Two elements only"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}]`);

    const result1 = trapRainWaterStack(test.input);
    const result2 = trapRainWaterTwoPointers(test.input);
    const result3 = trapRainWaterDP(test.input);
    const result4 = trapRainWaterBruteForce(test.input);

    console.log(`Stack: ${result1}`);
    console.log(`Two Pointers: ${result2}`);
    console.log(`DP: ${result3}`);
    console.log(`Brute Force: ${result4}`);
    console.log(`Expected: ${test.expected}`);
    console.log(
      `✓ Pass: ${
        result1 === test.expected &&
        result2 === test.expected &&
        result3 === test.expected &&
        result4 === test.expected
      }`
    );
  });
}

// Uncomment to run tests
// testTrapRainWater();

/**
 * KEY INSIGHTS:
 *
 * 1. Stack Approach:
 *    - Maintain indices of potential left boundaries
 *    - When we find taller bar, calculate water between boundaries
 *    - Handle horizontal water accumulation layer by layer
 *
 * 2. Two Pointers Approach:
 *    - Move from both ends toward center
 *    - The side with smaller max height determines water level
 *    - Optimal for space complexity O(1)
 *
 * 3. DP Approach:
 *    - Precompute max heights in both directions
 *    - Water at each position = min(leftMax, rightMax) - height
 *    - Clear and intuitive but uses O(n) extra space
 *
 * 4. Water Calculation:
 *    - Water level at position i = min(maxLeft[i], maxRight[i])
 *    - Trapped water = waterLevel - height[i] (if positive)
 *    - Need at least 3 elements to trap any water
 *
 * 5. Algorithm Comparison:
 *    - Stack: O(n) time, O(n) space - good for understanding
 *    - Two Pointers: O(n) time, O(1) space - optimal
 *    - DP: O(n) time, O(n) space - most intuitive
 *    - Brute Force: O(n²) time, O(1) space - baseline
 *
 * 6. Related Problems:
 *    - Container With Most Water (11) - different problem!
 *    - Largest Rectangle in Histogram (84)
 *    - Rain Water Trapper II (407) - 2D version
 */

module.exports = {
  trapRainWaterStack,
  trapRainWaterTwoPointers,
  trapRainWaterDP,
  trapRainWaterBruteForce
};
