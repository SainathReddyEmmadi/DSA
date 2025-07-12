/**
 * LeetCode 11: Container With Most Water
 *
 * Problem: You are given an integer array height of length n. There are n vertical lines
 * drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
 * Find two lines that together with the x-axis form a container that contains the most water.
 * Return the maximum amount of water a container can store.
 *
 * Pattern: Two Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

// Approach 1: Two Pointers (Optimal)
function maxAreaOptimal(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    // Calculate current area
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const area = width * currentHeight;

    maxArea = Math.max(maxArea, area);

    // Move pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

// Approach 2: Brute Force (For comparison)
function maxAreaBruteForce(height) {
  let maxArea = 0;

  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const width = j - i;
      const currentHeight = Math.min(height[i], height[j]);
      const area = width * currentHeight;
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea;
}

// Approach 3: Two Pointers with tracking
function maxAreaWithTracking(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  let bestLeft = 0;
  let bestRight = 0;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const area = width * currentHeight;

    if (area > maxArea) {
      maxArea = area;
      bestLeft = left;
      bestRight = right;
    }

    // Move pointer with smaller height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return { maxArea, bestLeft, bestRight };
}

// Approach 4: Divide and Conquer
function maxAreaDivideConquer(height, left = 0, right = height.length - 1) {
  if (left >= right) return 0;

  // Calculate area with current boundaries
  const width = right - left;
  const currentHeight = Math.min(height[left], height[right]);
  const currentArea = width * currentHeight;

  // Recursively check smaller problems
  let maxFromLeft, maxFromRight;

  if (height[left] < height[right]) {
    maxFromLeft = maxAreaDivideConquer(height, left + 1, right);
    maxFromRight = 0; // Don't need to check right side
  } else {
    maxFromLeft = 0; // Don't need to check left side
    maxFromRight = maxAreaDivideConquer(height, left, right - 1);
  }

  return Math.max(currentArea, maxFromLeft, maxFromRight);
}

// Test cases
function testMaxArea() {
  console.log("Testing Container With Most Water...\n");

  const testCases = [
    {
      input: [1, 8, 6, 2, 5, 4, 8, 3, 7],
      expected: 49
    },
    {
      input: [1, 1],
      expected: 1
    },
    {
      input: [4, 3, 2, 1, 4],
      expected: 16
    },
    {
      input: [1, 2, 1],
      expected: 2
    },
    {
      input: [2, 1],
      expected: 1
    },
    {
      input: [1, 3, 2, 5, 25, 24, 5],
      expected: 24
    },
    {
      input: [1, 2, 4, 3],
      expected: 4
    }
  ];

  const approaches = [
    { name: "Two Pointers Optimal", func: maxAreaOptimal },
    { name: "Brute Force", func: maxAreaBruteForce },
    { name: "Divide and Conquer", func: maxAreaDivideConquer }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.input]);
      const actualResult = typeof result === "object" ? result.maxArea : result;
      const passed = actualResult === test.expected;
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  Input:    [${test.input}]`);
        console.log(`  Expected: ${test.expected}`);
        console.log(`  Got:      ${actualResult}`);
      }
    });
  });
}

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [1000, 5000, 10000];
  const approaches = [
    { name: "Two Pointers Optimal", func: maxAreaOptimal },
    { name: "Brute Force", func: maxAreaBruteForce }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      const height = [];
      for (let i = 0; i < size; i++) {
        height.push(Math.floor(Math.random() * 100) + 1);
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
  console.log("Example: [1, 8, 6, 2, 5, 4, 8, 3, 7]");
  console.log("Indices:  0  1  2  3  4  5  6  7  8");

  const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  let step = 0;

  console.log("\nTwo Pointers Process:");

  while (left < right) {
    step++;
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const area = width * currentHeight;

    console.log(`\nStep ${step}:`);
    console.log(`  left=${left}, right=${right}`);
    console.log(
      `  height[${left}]=${height[left]}, height[${right}]=${height[right]}`
    );
    console.log(`  width=${width}, height=${currentHeight}`);
    console.log(`  area=${area}`);

    if (area > maxArea) {
      maxArea = area;
      console.log(`  New max area: ${maxArea}`);
    }

    if (height[left] < height[right]) {
      console.log(`  Move left pointer (smaller height)`);
      left++;
    } else {
      console.log(`  Move right pointer (smaller or equal height)`);
      right--;
    }
  }

  console.log(`\nFinal max area: ${maxArea}`);
}

// Why two pointers work
function explainAlgorithm() {
  console.log("\n--- Why Two Pointers Work ---");
  console.log("Key insight: Always move the pointer with smaller height");
  console.log("");
  console.log("Proof by contradiction:");
  console.log("- Suppose we have optimal solution with pointers at i and j");
  console.log(
    "- If height[i] < height[j], moving j inward cannot give better solution"
  );
  console.log(
    "- Because: new width is smaller, height is limited by height[i]"
  );
  console.log("- So new area ≤ old area");
  console.log("- Therefore, we must move the pointer with smaller height");
  console.log("");
  console.log("Time complexity: O(n) - each element visited at most once");
  console.log("Space complexity: O(1) - only using constant extra space");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Two Pointers (Opposite Directions) ---");
  console.log("When to use: Finding optimal pair with constraint");
  console.log(
    "- Start with widest possible container (leftmost and rightmost)"
  );
  console.log("- Always move the pointer with worse condition");
  console.log("- This ensures we don't miss any better solutions");
  console.log("");
  console.log("Similar problems:");
  console.log("- Trapping rain water");
  console.log("- Two sum in sorted array");
  console.log("- Remove duplicates");
  console.log("- Valid palindrome");
}

// Detailed analysis
function detailedAnalysis() {
  console.log("\n--- Detailed Analysis ---");

  const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  const result = maxAreaWithTracking(height);

  console.log(`Input: [${height}]`);
  console.log(`Max area: ${result.maxArea}`);
  console.log(
    `Best container: index ${result.bestLeft} to ${result.bestRight}`
  );
  console.log(
    `Heights: ${height[result.bestLeft]} and ${height[result.bestRight]}`
  );
  console.log(`Width: ${result.bestRight - result.bestLeft}`);
  console.log(
    `Area calculation: min(${height[result.bestLeft]}, ${
      height[result.bestRight]
    }) × ${result.bestRight - result.bestLeft} = ${result.maxArea}`
  );
}

// Edge cases testing
function testEdgeCases() {
  console.log("\n--- Edge Cases ---");

  const edgeCases = [
    {
      name: "Minimum input",
      input: [1, 1],
      expected: 1
    },
    {
      name: "Decreasing heights",
      input: [5, 4, 3, 2, 1],
      expected: 6
    },
    {
      name: "Increasing heights",
      input: [1, 2, 3, 4, 5],
      expected: 6
    },
    {
      name: "All same heights",
      input: [3, 3, 3, 3],
      expected: 9
    },
    {
      name: "Two high walls",
      input: [10, 1, 1, 1, 10],
      expected: 40
    }
  ];

  edgeCases.forEach((testCase) => {
    const result = maxAreaOptimal([...testCase.input]);
    const passed = result === testCase.expected;
    console.log(`${testCase.name}: ${passed ? "PASS" : "FAIL"}`);
    if (!passed) {
      console.log(`  Expected: ${testCase.expected}`);
      console.log(`  Got:      ${result}`);
    }
  });
}

// Run tests
if (require.main === module) {
  testMaxArea();
  performanceTest();
  visualDemo();
  explainAlgorithm();
  explainPattern();
  detailedAnalysis();
  testEdgeCases();
}

module.exports = {
  maxAreaOptimal,
  maxAreaBruteForce,
  maxAreaWithTracking,
  maxAreaDivideConquer
};
