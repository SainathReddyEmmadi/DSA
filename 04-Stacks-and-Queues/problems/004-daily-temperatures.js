/**
 * 739. Daily Temperatures
 * https://leetcode.com/problems/daily-temperatures/
 *
 * Difficulty: Medium
 * Topics: Array, Stack, Monotonic Stack
 *
 * Given an array of integers temperatures represents the daily temperatures,
 * return an array answer such that answer[i] is the number of days you have to wait
 * after the ith day to get a warmer temperature. If there is no future day for which
 * this is possible, keep answer[i] == 0.
 *
 * Example 1:
 * Input: temperatures = [73,74,75,71,69,72,76,73]
 * Output: [1,1,4,2,1,1,0,0]
 *
 * Example 2:
 * Input: temperatures = [30,40,50,60]
 * Output: [1,1,1,0]
 *
 * Example 3:
 * Input: temperatures = [30,60,90]
 * Output: [1,1,0]
 */

/**
 * APPROACH 1: Monotonic Stack (Most Efficient)
 * Time Complexity: O(n) - each element pushed and popped at most once
 * Space Complexity: O(n) - stack can hold up to n elements
 *
 * Algorithm:
 * 1. Use stack to store indices of temperatures in decreasing order
 * 2. For each temperature:
 *    - Pop indices from stack while current temp > stack top temp
 *    - For each popped index, calculate days difference
 *    - Push current index to stack
 * 3. Remaining indices in stack have no warmer day (answer = 0)
 *
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperaturesMonotonicStack(temperatures) {
  const n = temperatures.length;
  const answer = new Array(n).fill(0);
  const stack = []; // Store indices

  for (let i = 0; i < n; i++) {
    // While stack not empty and current temp > temp at stack top
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop();
      answer[prevIndex] = i - prevIndex;
    }

    stack.push(i);
  }

  // Remaining indices in stack have no warmer future day
  return answer;
}

/**
 * APPROACH 2: Brute Force (Nested Loops)
 * Time Complexity: O(n²) - for each day, check all future days
 * Space Complexity: O(1) - only output array
 *
 * Algorithm:
 * 1. For each day, scan all future days
 * 2. Find first day with higher temperature
 * 3. Calculate days difference
 *
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperaturesBruteForce(temperatures) {
  const n = temperatures.length;
  const answer = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (temperatures[j] > temperatures[i]) {
        answer[i] = j - i;
        break;
      }
    }
  }

  return answer;
}

/**
 * APPROACH 3: Reverse Iteration with Optimization
 * Time Complexity: O(n) average, O(n²) worst case
 * Space Complexity: O(1) extra space
 *
 * Algorithm:
 * 1. Iterate from right to left
 * 2. For each position, use previously computed results to skip ahead
 * 3. If next day is warmer, answer is 1
 * 4. Otherwise, jump using next day's answer
 *
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperaturesReverse(temperatures) {
  const n = temperatures.length;
  const answer = new Array(n).fill(0);

  for (let i = n - 2; i >= 0; i--) {
    let j = i + 1;

    // Find next warmer day using previously computed results
    while (j < n && temperatures[j] <= temperatures[i]) {
      if (answer[j] === 0) {
        j = n; // No warmer day exists
      } else {
        j += answer[j]; // Jump to next potentially warmer day
      }
    }

    if (j < n) {
      answer[i] = j - i;
    }
  }

  return answer;
}

/**
 * APPROACH 4: Using Map for Temperature Ranges
 * Time Complexity: O(n) average case
 * Space Complexity: O(1) - map size limited by temperature range
 *
 * Only efficient when temperature range is small
 *
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperaturesMap(temperatures) {
  const n = temperatures.length;
  const answer = new Array(n).fill(0);
  const nextIndex = new Map(); // temp -> next occurrence index

  for (let i = n - 1; i >= 0; i--) {
    let warmerDay = Infinity;

    // Check all temperatures higher than current
    for (let temp = temperatures[i] + 1; temp <= 100; temp++) {
      if (nextIndex.has(temp)) {
        warmerDay = Math.min(warmerDay, nextIndex.get(temp));
      }
    }

    if (warmerDay !== Infinity) {
      answer[i] = warmerDay - i;
    }

    nextIndex.set(temperatures[i], i);
  }

  return answer;
}

/**
 * APPROACH 5: Divide and Conquer
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n) - recursion depth
 *
 * Split array, solve recursively, then merge results
 *
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperaturesDivideConquer(temperatures) {
  const n = temperatures.length;

  function solve(left, right) {
    if (left >= right) return new Array(right - left + 1).fill(0);

    if (right - left === 1) {
      return temperatures[right] > temperatures[left] ? [1] : [0];
    }

    const mid = Math.floor((left + right) / 2);
    const leftResult = solve(left, mid);
    const rightResult = solve(mid + 1, right);

    // Merge results
    const result = [...leftResult, ...rightResult];

    // Handle cross-boundary cases
    for (let i = left; i <= mid; i++) {
      if (result[i - left] === 0) {
        // No answer in left half
        for (let j = mid + 1; j <= right; j++) {
          if (temperatures[j] > temperatures[i]) {
            result[i - left] = j - i;
            break;
          }
        }
      }
    }

    return result;
  }

  return solve(0, n - 1);
}

// Main function (using monotonic stack as default)
const dailyTemperatures = dailyTemperaturesMonotonicStack;

// ============================================================================
// TESTING
// ============================================================================

function testDailyTemperatures() {
  console.log("Testing Daily Temperatures...\n");

  const testCases = [
    {
      temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
      expected: [1, 1, 4, 2, 1, 1, 0, 0],
      description: "Example 1 from problem"
    },
    {
      temperatures: [30, 40, 50, 60],
      expected: [1, 1, 1, 0],
      description: "Increasing temperatures"
    },
    {
      temperatures: [30, 60, 90],
      expected: [1, 1, 0],
      description: "Strictly increasing"
    },
    {
      temperatures: [90, 80, 70, 60],
      expected: [0, 0, 0, 0],
      description: "Decreasing temperatures"
    },
    {
      temperatures: [89, 62, 70, 58, 47, 47, 46, 76, 100, 70],
      expected: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0],
      description: "Complex pattern"
    },
    {
      temperatures: [55],
      expected: [0],
      description: "Single temperature"
    },
    {
      temperatures: [55, 55, 55],
      expected: [0, 0, 0],
      description: "All same temperatures"
    }
  ];

  const approaches = [
    { name: "Monotonic Stack", fn: dailyTemperaturesMonotonicStack },
    { name: "Brute Force", fn: dailyTemperaturesBruteForce },
    { name: "Reverse Iteration", fn: dailyTemperaturesReverse },
    { name: "Map Method", fn: dailyTemperaturesMap }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}: ${testCase.description}`);
    console.log(`Input: [${testCase.temperatures.join(", ")}]`);
    console.log(`Expected: [${testCase.expected.join(", ")}]`);

    approaches.forEach((approach) => {
      const result = approach.fn(testCase.temperatures);
      const passed =
        JSON.stringify(result) === JSON.stringify(testCase.expected);
      console.log(
        `${approach.name}: [${result.join(", ")}] - ${passed ? "PASS" : "FAIL"}`
      );
    });

    console.log();
  });
}

function testPerformance() {
  console.log("Performance Comparison...\n");

  // Generate large test case
  const size = 10000;
  const temperatures = [];

  // Create a pattern that challenges different approaches
  for (let i = 0; i < size; i++) {
    temperatures.push(30 + (i % 50) + Math.floor(Math.random() * 10));
  }

  const approaches = [
    { name: "Monotonic Stack", fn: dailyTemperaturesMonotonicStack },
    { name: "Reverse Iteration", fn: dailyTemperaturesReverse },
    { name: "Map Method", fn: dailyTemperaturesMap }
    // Note: Brute force would be too slow for this size
  ];

  console.log(`Testing with ${size} temperatures`);

  approaches.forEach((approach) => {
    const start = performance.now();
    const result = approach.fn([...temperatures]);
    const end = performance.now();

    console.log(`${approach.name}: ${(end - start).toFixed(2)}ms`);
  });

  // Test brute force with smaller size
  const smallTemps = temperatures.slice(0, 1000);
  console.log(`\nBrute Force with ${smallTemps.length} temperatures:`);
  const start = performance.now();
  dailyTemperaturesBruteForce(smallTemps);
  const end = performance.now();
  console.log(`Brute Force: ${(end - start).toFixed(2)}ms`);
}

function demonstrateMonotonicStack() {
  console.log("Monotonic Stack Step-by-Step Demonstration...\n");

  const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];

  console.log("Input temperatures:", temperatures);
  console.log("Processing step by step:\n");

  for (let i = 0; i < temperatures.length; i++) {
    console.log(`Day ${i}: Temperature ${temperatures[i]}`);
    console.log(
      `Stack before: [${stack
        .map((idx) => `${idx}(${temperatures[idx]})`)
        .join(", ")}]`
    );

    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop();
      answer[prevIndex] = i - prevIndex;
      console.log(
        `  Found warmer day for index ${prevIndex}: ${i - prevIndex} days`
      );
    }

    stack.push(i);
    console.log(
      `Stack after: [${stack
        .map((idx) => `${idx}(${temperatures[idx]})`)
        .join(", ")}]`
    );
    console.log(`Answer so far: [${answer.join(", ")}]\n`);
  }

  console.log("Final answer:", answer);
}

function testEdgeCases() {
  console.log("Testing Edge Cases...\n");

  const edgeCases = [
    {
      temperatures: [100],
      expected: [0],
      description: "Single highest temperature"
    },
    {
      temperatures: [30, 31, 32, 33, 34],
      expected: [1, 1, 1, 1, 0],
      description: "Consecutive increasing by 1"
    },
    {
      temperatures: [100, 99, 98, 97, 96],
      expected: [0, 0, 0, 0, 0],
      description: "Strictly decreasing"
    },
    {
      temperatures: [30, 30, 30, 31],
      expected: [3, 2, 1, 0],
      description: "Equal temperatures with one warmer"
    },
    {
      temperatures: [30, 100, 30],
      expected: [1, 0, 0],
      description: "Peak in middle"
    }
  ];

  edgeCases.forEach((testCase, index) => {
    console.log(`Edge Case ${index + 1}: ${testCase.description}`);
    const result = dailyTemperatures(testCase.temperatures);
    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);

    console.log(`Input: [${testCase.temperatures.join(", ")}]`);
    console.log(`Result: [${result.join(", ")}]`);
    console.log(`Expected: [${testCase.expected.join(", ")}]`);
    console.log(`Status: ${passed ? "PASS" : "FAIL"}\n`);
  });
}

function analyzeComplexity() {
  console.log("Time Complexity Analysis...\n");

  console.log("Monotonic Stack:");
  console.log("- Each element is pushed once and popped at most once");
  console.log("- Total operations: 2n (push + pop)");
  console.log("- Time Complexity: O(n)");
  console.log("- Space Complexity: O(n) for stack\n");

  console.log("Brute Force:");
  console.log("- For each element, scan all future elements");
  console.log("- Worst case: n + (n-1) + (n-2) + ... + 1 = n(n-1)/2");
  console.log("- Time Complexity: O(n²)");
  console.log("- Space Complexity: O(1) extra space\n");

  console.log("Key Insight:");
  console.log("Monotonic stack maintains elements in decreasing order,");
  console.log("allowing us to find the next greater element efficiently.");
}

// Uncomment to run tests
// testDailyTemperatures();
// testPerformance();
// demonstrateMonotonicStack();
// testEdgeCases();
// analyzeComplexity();

module.exports = {
  dailyTemperatures,
  dailyTemperaturesMonotonicStack,
  dailyTemperaturesBruteForce,
  dailyTemperaturesReverse,
  dailyTemperaturesMap,
  dailyTemperaturesDivideConquer
};
