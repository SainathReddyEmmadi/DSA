/**
 * LeetCode 560: Subarray Sum Equals K
 *
 * Problem: Given an array of integers nums and an integer k, return the total number of
 * continuous subarrays whose sum is equal to k.
 *
 * Pattern: Prefix Sum + Hash Map
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

// Approach 1: Prefix Sum with Hash Map (Optimal)
function subarraySum(nums, k) {
  const prefixSumCount = new Map();
  prefixSumCount.set(0, 1); // Handle subarrays starting from index 0

  let prefixSum = 0;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    // Check if (prefixSum - k) exists
    // If yes, there are subarrays ending at i with sum k
    const needed = prefixSum - k;
    if (prefixSumCount.has(needed)) {
      count += prefixSumCount.get(needed);
    }

    // Add current prefix sum to map
    prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
  }

  return count;
}

// Approach 2: Brute Force (Two Nested Loops)
function subarraySumBruteForce(nums, k) {
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) {
        count++;
      }
    }
  }

  return count;
}

// Approach 3: Prefix Sum Array (Less efficient)
function subarraySumPrefixArray(nums, k) {
  const n = nums.length;
  const prefixSum = new Array(n + 1);
  prefixSum[0] = 0;

  // Build prefix sum array
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + nums[i];
  }

  let count = 0;

  // Check all possible subarrays
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const subarraySum = prefixSum[j + 1] - prefixSum[i];
      if (subarraySum === k) {
        count++;
      }
    }
  }

  return count;
}

// Approach 4: Sliding Window (Only works for positive numbers)
function subarraySumSlidingWindow(nums, k) {
  // Note: This only works if all numbers are positive
  // Including for educational purposes
  if (k <= 0) return 0;

  let left = 0;
  let right = 0;
  let sum = 0;
  let count = 0;

  while (right < nums.length) {
    sum += nums[right];

    while (sum > k && left <= right) {
      sum -= nums[left];
      left++;
    }

    if (sum === k) {
      count++;
    }

    right++;
  }

  return count;
}

// Approach 5: Hash Map with Running Sum (Alternative implementation)
function subarraySumAlternative(nums, k) {
  const sumFreq = new Map();
  let runningSum = 0;
  let result = 0;

  for (const num of nums) {
    runningSum += num;

    // Check if current running sum equals k
    if (runningSum === k) {
      result++;
    }

    // Check if (runningSum - k) exists in map
    const complement = runningSum - k;
    if (sumFreq.has(complement)) {
      result += sumFreq.get(complement);
    }

    // Update frequency of current running sum
    sumFreq.set(runningSum, (sumFreq.get(runningSum) || 0) + 1);
  }

  return result;
}

// Test cases
function testSubarraySum() {
  console.log("Testing Subarray Sum Equals K...\n");

  const testCases = [
    {
      nums: [1, 1, 1],
      k: 2,
      expected: 2
    },
    {
      nums: [1, 2, 3],
      k: 3,
      expected: 2
    },
    {
      nums: [1, -1, 0],
      k: 0,
      expected: 3
    },
    {
      nums: [-1, -1, 1],
      k: 0,
      expected: 1
    },
    {
      nums: [1],
      k: 1,
      expected: 1
    },
    {
      nums: [1, 2, 1, 2, 1],
      k: 3,
      expected: 4
    },
    {
      nums: [3, 4, 7, 2, -3, 1, 4, 2],
      k: 7,
      expected: 4
    },
    {
      nums: [1, 0, 1, 0, 1],
      k: 2,
      expected: 4
    }
  ];

  const approaches = [
    { name: "Prefix Sum + Hash Map", func: subarraySum },
    { name: "Brute Force", func: subarraySumBruteForce },
    { name: "Prefix Sum Array", func: subarraySumPrefixArray },
    { name: "Alternative Hash Map", func: subarraySumAlternative }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.nums], test.k);
      const passed = result === test.expected;
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  nums:     [${test.nums}]`);
        console.log(`  k:        ${test.k}`);
        console.log(`  Expected: ${test.expected}`);
        console.log(`  Got:      ${result}`);
      }
    });
  });
}

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [1000, 3000, 5000];
  const approaches = [
    { name: "Prefix Sum + Hash Map", func: subarraySum },
    { name: "Brute Force", func: subarraySumBruteForce }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      const nums = [];
      for (let i = 0; i < size; i++) {
        nums.push(Math.floor(Math.random() * 20) - 10); // Random -10 to 9
      }
      const k = 5;

      const start = performance.now();
      approach.func([...nums], k);
      const end = performance.now();

      console.log(`${approach.name}: ${(end - start).toFixed(4)}ms`);
    });
  });
}

// Visual demonstration
function visualDemo() {
  console.log("\n--- Visual Demonstration ---");
  console.log("Example: nums = [1, 1, 1], k = 2");
  console.log("Find all subarrays with sum = 2");

  const nums = [1, 1, 1];
  const k = 2;

  console.log("\nAll possible subarrays:");
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      const subarray = nums.slice(i, j + 1);
      const sum = subarray.reduce((a, b) => a + b, 0);
      const matches = sum === k;
      if (matches) count++;
      console.log(
        `[${i}, ${j}]: [${subarray.join(", ")}] = ${sum} ${matches ? "✓" : ""}`
      );
    }
  }
  console.log(`Total count: ${count}`);

  console.log("\nPrefix Sum + Hash Map approach:");
  const prefixSumCount = new Map();
  prefixSumCount.set(0, 1);

  let prefixSum = 0;
  let resultCount = 0;

  console.log("Initial: prefixSumCount = {0: 1}");

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    const needed = prefixSum - k;

    console.log(`\nStep ${i + 1}: nums[${i}] = ${nums[i]}`);
    console.log(`  prefixSum = ${prefixSum}`);
    console.log(`  needed = ${prefixSum} - ${k} = ${needed}`);

    if (prefixSumCount.has(needed)) {
      const count = prefixSumCount.get(needed);
      resultCount += count;
      console.log(
        `  Found ${needed} in map ${count} times → add ${count} to result`
      );
    } else {
      console.log(`  ${needed} not found in map`);
    }

    prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
    console.log(`  Updated map:`, Object.fromEntries(prefixSumCount));
    console.log(`  Current result: ${resultCount}`);
  }
}

// Algorithm explanation
function explainAlgorithm() {
  console.log("\n--- Algorithm Explanation ---");
  console.log("Key insight: Use prefix sums and hash map for O(n) solution");
  console.log("");
  console.log("Mathematical foundation:");
  console.log("- sum(i, j) = prefixSum[j] - prefixSum[i-1]");
  console.log("- If sum(i, j) = k, then prefixSum[j] - prefixSum[i-1] = k");
  console.log("- Therefore: prefixSum[i-1] = prefixSum[j] - k");
  console.log("");
  console.log("Algorithm:");
  console.log("1. Maintain running prefix sum");
  console.log("2. For each position, check if (prefixSum - k) exists in map");
  console.log("3. If yes, add its frequency to result");
  console.log("4. Update frequency of current prefix sum");
  console.log("");
  console.log("Why map[0] = 1?");
  console.log("- Handles subarrays starting from index 0");
  console.log("- When prefixSum equals k, we need map[0] to count it");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Prefix Sum + Hash Map ---");
  console.log("When to use:");
  console.log("- Finding subarrays with specific sum/property");
  console.log("- Need to track cumulative values");
  console.log("- Looking for complement relationships");
  console.log("");
  console.log("Core technique:");
  console.log("- Build prefix sum while iterating");
  console.log("- Use hash map to store frequency of prefix sums");
  console.log("- Look for complement (target - current)");
  console.log("");
  console.log("Similar problems:");
  console.log("- Two Sum (complement pattern)");
  console.log("- Continuous Subarray Sum");
  console.log("- Binary Subarrays With Sum");
  console.log("- Contiguous Array");
}

// Edge cases and variations
function explainEdgeCases() {
  console.log("\n--- Edge Cases and Variations ---");

  console.log("Edge cases:");
  console.log("1. k = 0: Count subarrays with sum 0");
  console.log("2. Single element array: Check if element equals k");
  console.log("3. All negative numbers: Algorithm still works");
  console.log("4. Array with zeros: Handle carefully");

  console.log("\nVariations:");
  console.log("1. Maximum length subarray with sum k");
  console.log("2. Minimum length subarray with sum ≥ k");
  console.log("3. Count subarrays with sum divisible by k");
  console.log("4. Subarray with sum closest to k");

  console.log("\nCommon mistakes:");
  console.log("- Forgetting to initialize map[0] = 1");
  console.log("- Adding to map before checking for complement");
  console.log("- Not handling negative numbers properly");
}

// Real-world applications
function explainApplications() {
  console.log("\n--- Real-world Applications ---");
  console.log("1. Financial analysis:");
  console.log("   - Find periods with specific profit/loss");
  console.log("   - Balance budget constraints");

  console.log("\n2. Performance monitoring:");
  console.log("   - Identify time windows with target metrics");
  console.log("   - Resource usage analysis");

  console.log("\n3. Genomics:");
  console.log("   - Find DNA sequences with specific properties");
  console.log("   - Gene expression analysis");

  console.log("\n4. Quality control:");
  console.log("   - Manufacturing defect patterns");
  console.log("   - Statistical process control");

  console.log("\n5. Game development:");
  console.log("   - Score combinations");
  console.log("   - Achievement systems");
}

// Advanced techniques
function explainAdvancedTechniques() {
  console.log("\n--- Advanced Techniques ---");

  console.log("1. Space optimization:");
  console.log("   - Can't reduce space complexity for this problem");
  console.log("   - Hash map is essential for O(n) time");

  console.log("\n2. Handling overflow:");
  console.log("   - Use appropriate data types for large sums");
  console.log("   - Consider modular arithmetic if needed");

  console.log("\n3. Extension to 2D arrays:");
  console.log("   - Use prefix sums for subrectangles");
  console.log("   - Kadane's algorithm variant");

  console.log("\n4. Online algorithm:");
  console.log("   - Process elements as they arrive");
  console.log("   - Maintain running statistics");
}

// Run tests
if (require.main === module) {
  testSubarraySum();
  performanceTest();
  visualDemo();
  explainAlgorithm();
  explainPattern();
  explainEdgeCases();
  explainApplications();
  explainAdvancedTechniques();
}

module.exports = {
  subarraySum,
  subarraySumBruteForce,
  subarraySumPrefixArray,
  subarraySumSlidingWindow,
  subarraySumAlternative
};
