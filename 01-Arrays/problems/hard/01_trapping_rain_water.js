/**
 * LeetCode 42: Trapping Rain Water
 *
 * Problem: Given n non-negative integers representing an elevation map where the width
 * of each bar is 1, compute how much water it can trap after raining.
 *
 * Pattern: Two Pointers / Dynamic Programming
 * Time Complexity: O(n)
 * Space Complexity: O(1) for optimal solution
 */

// Approach 1: Two Pointers (Optimal)
function trapOptimal(height) {
  if (height.length < 3) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}

// Approach 2: Dynamic Programming with Arrays
function trapDP(height) {
  if (height.length < 3) return 0;

  const n = height.length;
  const leftMax = new Array(n);
  const rightMax = new Array(n);

  // Fill leftMax array
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // Fill rightMax array
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // Calculate trapped water
  let water = 0;
  for (let i = 0; i < n; i++) {
    const waterLevel = Math.min(leftMax[i], rightMax[i]);
    if (waterLevel > height[i]) {
      water += waterLevel - height[i];
    }
  }

  return water;
}

// Approach 3: Stack-based solution
function trapStack(height) {
  const stack = [];
  let water = 0;

  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const popIndex = stack.pop();

      if (stack.length === 0) break;

      const distance = i - stack[stack.length - 1] - 1;
      const boundedHeight =
        Math.min(height[i], height[stack[stack.length - 1]]) - height[popIndex];
      water += distance * boundedHeight;
    }
    stack.push(i);
  }

  return water;
}

// Approach 4: Brute Force (For comparison)
function trapBruteForce(height) {
  let water = 0;

  for (let i = 1; i < height.length - 1; i++) {
    // Find max height to the left
    let leftMax = 0;
    for (let j = 0; j < i; j++) {
      leftMax = Math.max(leftMax, height[j]);
    }

    // Find max height to the right
    let rightMax = 0;
    for (let j = i + 1; j < height.length; j++) {
      rightMax = Math.max(rightMax, height[j]);
    }

    // Calculate water at current position
    const waterLevel = Math.min(leftMax, rightMax);
    if (waterLevel > height[i]) {
      water += waterLevel - height[i];
    }
  }

  return water;
}

// Approach 5: Divide and Conquer
function trapDivideConquer(height) {
  if (height.length < 3) return 0;

  function trap(left, right, maxLeft, maxRight) {
    if (left >= right) return 0;

    // Find the peak in current range
    let peak = left;
    for (let i = left + 1; i <= right; i++) {
      if (height[i] > height[peak]) {
        peak = i;
      }
    }

    let water = 0;

    // Calculate water on the left side
    let currentMax = maxLeft;
    for (let i = left; i < peak; i++) {
      currentMax = Math.max(currentMax, height[i]);
      const waterLevel = Math.min(currentMax, height[peak]);
      if (waterLevel > height[i]) {
        water += waterLevel - height[i];
      }
    }

    // Calculate water on the right side
    currentMax = maxRight;
    for (let i = right; i > peak; i--) {
      currentMax = Math.max(currentMax, height[i]);
      const waterLevel = Math.min(height[peak], currentMax);
      if (waterLevel > height[i]) {
        water += waterLevel - height[i];
      }
    }

    return water;
  }

  return trap(0, height.length - 1, 0, 0);
}

// Test cases
function testTrapRainWater() {
  console.log("Testing Trapping Rain Water...\n");

  const testCases = [
    {
      input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      expected: 6
    },
    {
      input: [4, 2, 0, 3, 2, 5],
      expected: 9
    },
    {
      input: [3, 0, 2, 0, 4],
      expected: 7
    },
    {
      input: [0, 2, 0],
      expected: 0
    },
    {
      input: [2, 0, 2],
      expected: 2
    },
    {
      input: [5, 4, 1, 2],
      expected: 1
    },
    {
      input: [1, 2, 3, 4],
      expected: 0
    },
    {
      input: [4, 3, 2, 1],
      expected: 0
    },
    {
      input: [],
      expected: 0
    },
    {
      input: [1],
      expected: 0
    }
  ];

  const approaches = [
    { name: "Two Pointers Optimal", func: trapOptimal },
    { name: "Dynamic Programming", func: trapDP },
    { name: "Stack Based", func: trapStack },
    { name: "Brute Force", func: trapBruteForce },
    { name: "Divide and Conquer", func: trapDivideConquer }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.input]);
      const passed = result === test.expected;
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  Input:    [${test.input}]`);
        console.log(`  Expected: ${test.expected}`);
        console.log(`  Got:      ${result}`);
      }
    });
  });
}

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [1000, 5000, 10000];
  const approaches = [
    { name: "Two Pointers", func: trapOptimal },
    { name: "Dynamic Programming", func: trapDP },
    { name: "Stack Based", func: trapStack }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      const height = [];
      for (let i = 0; i < size; i++) {
        height.push(Math.floor(Math.random() * 10));
      }

      const start = performance.now();
      approach.func([...height]);
      const end = performance.now();

      console.log(`${approach.name}: ${(end - start).toFixed(4)}ms`);
    });
  });
}

// Visual demonstration
function visualDemo() {
  console.log("\n--- Visual Demonstration ---");
  console.log("Example: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]");
  console.log("");
  console.log("Elevation map:");
  console.log("    ■");
  console.log("■   ■ ■ ■ ■");
  console.log("■ ■ ■ ■ ■ ■ ■ ■");
  console.log("0 1 2 3 4 5 6 7 8 9 10 11");
  console.log("");
  console.log("Water trapped (≈):");
  console.log("    ■");
  console.log("■ ≈ ■≈■ ■≈■ ■");
  console.log("■≈■≈■≈■≈■≈■≈■≈■");
  console.log("0 1 2 3 4 5 6 7 8 9 10 11");

  const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  console.log("\nStep-by-step calculation:");

  // Using DP approach for clarity
  const n = height.length;
  const leftMax = new Array(n);
  const rightMax = new Array(n);

  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  console.log(`Height:   [${height.join(", ")}]`);
  console.log(`LeftMax:  [${leftMax.join(", ")}]`);
  console.log(`RightMax: [${rightMax.join(", ")}]`);

  let totalWater = 0;
  console.log("\nWater calculation:");
  for (let i = 0; i < n; i++) {
    const waterLevel = Math.min(leftMax[i], rightMax[i]);
    const water = Math.max(0, waterLevel - height[i]);
    totalWater += water;
    console.log(
      `Position ${i}: min(${leftMax[i]}, ${rightMax[i]}) - ${height[i]} = ${water}`
    );
  }
  console.log(`Total water trapped: ${totalWater}`);
}

// Algorithm intuition
function explainIntuition() {
  console.log("\n--- Algorithm Intuition ---");
  console.log(
    "Key insight: Water level at position i = min(maxLeft[i], maxRight[i])"
  );
  console.log("");
  console.log("Why this works:");
  console.log(
    "- Water can only be trapped if there are higher bars on both sides"
  );
  console.log("- The water level is limited by the shorter of the two walls");
  console.log("- Water at position i = waterLevel - height[i] (if positive)");
  console.log("");
  console.log("Two pointers optimization:");
  console.log("- We don't need to store all left/right maximums");
  console.log("- Move the pointer with smaller maximum");
  console.log("- The side with smaller max determines the water level");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern Analysis ---");
  console.log("1. Brute Force O(n²):");
  console.log("   - For each position, find left and right maximums");
  console.log("   - Simple but inefficient");

  console.log("\n2. Dynamic Programming O(n), O(n):");
  console.log("   - Precompute all left and right maximums");
  console.log("   - Trade space for time");

  console.log("\n3. Two Pointers O(n), O(1):");
  console.log("   - Optimal solution using two pointers");
  console.log("   - Move pointer with smaller maximum");

  console.log("\n4. Stack O(n), O(n):");
  console.log("   - Different approach using monotonic stack");
  console.log("   - Process bars in order of increasing height");
}

// Edge cases explanation
function explainEdgeCases() {
  console.log("\n--- Edge Cases ---");

  console.log("1. Monotonic increasing [1, 2, 3, 4]:");
  console.log("   - No water can be trapped");
  console.log("   - Every position has no higher bars to the left");

  console.log("\n2. Monotonic decreasing [4, 3, 2, 1]:");
  console.log("   - No water can be trapped");
  console.log("   - Every position has no higher bars to the right");

  console.log("\n3. Empty or single element:");
  console.log("   - No water possible (need at least 3 positions)");

  console.log("\n4. All same height [2, 2, 2, 2]:");
  console.log('   - No water trapped (no "valleys")');

  console.log("\n5. Single valley [3, 0, 3]:");
  console.log("   - Water = min(3, 3) - 0 = 3");
}

// Real-world applications
function explainApplications() {
  console.log("\n--- Real-world Applications ---");
  console.log("1. Water management systems");
  console.log("   - Reservoir capacity calculation");
  console.log("   - Flood prediction and management");

  console.log("\n2. Architecture and construction");
  console.log("   - Roof water drainage design");
  console.log("   - Pool and water feature planning");

  console.log("\n3. Game development");
  console.log("   - Terrain flooding simulation");
  console.log("   - Water physics in 2D games");

  console.log("\n4. Algorithm pattern");
  console.log('   - Template for "container" problems');
  console.log("   - Max area, water trapped, etc.");
}

// Run tests
if (require.main === module) {
  testTrapRainWater();
  performanceTest();
  visualDemo();
  explainIntuition();
  explainPattern();
  explainEdgeCases();
  explainApplications();
}

module.exports = {
  trapOptimal,
  trapDP,
  trapStack,
  trapBruteForce,
  trapDivideConquer
};
