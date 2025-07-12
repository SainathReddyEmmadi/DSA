/**
 * LeetCode 167: Two Sum II - Input Array Is Sorted
 *
 * Problem: Given a 1-indexed array of integers numbers that is already sorted in
 * non-decreasing order, find two numbers such that they add up to a specific target number.
 * Let these two numbers be numbers[index1] and numbers[index2] where 1 ≤ index1 < index2 ≤ numbers.length.
 * Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2].
 *
 * Pattern: Two Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

// Approach 1: Two Pointers (Optimal)
function twoSumOptimal(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1]; // Convert to 1-indexed
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return []; // No solution found (shouldn't happen per problem constraints)
}

// Approach 2: Binary Search for each element
function twoSumBinarySearch(numbers, target) {
  for (let i = 0; i < numbers.length - 1; i++) {
    const complement = target - numbers[i];
    const complementIndex = binarySearch(numbers, complement, i + 1);

    if (complementIndex !== -1) {
      return [i + 1, complementIndex + 1]; // Convert to 1-indexed
    }
  }

  return [];
}

function binarySearch(arr, target, startIndex) {
  let left = startIndex;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// Approach 3: Hash Map (Space trade-off)
function twoSumHashMap(numbers, target) {
  const map = new Map();

  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];

    if (map.has(complement)) {
      return [map.get(complement) + 1, i + 1]; // Convert to 1-indexed
    }

    map.set(numbers[i], i);
  }

  return [];
}

// Approach 4: Brute Force (For comparison)
function twoSumBruteForce(numbers, target) {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [i + 1, j + 1]; // Convert to 1-indexed
      }
    }
  }

  return [];
}

// Test cases
function testTwoSum() {
  console.log("Testing Two Sum II - Input Array Is Sorted...\n");

  const testCases = [
    {
      numbers: [2, 7, 11, 15],
      target: 9,
      expected: [1, 2]
    },
    {
      numbers: [2, 3, 4],
      target: 6,
      expected: [1, 3]
    },
    {
      numbers: [-1, 0],
      target: -1,
      expected: [1, 2]
    },
    {
      numbers: [1, 2, 3, 4, 4, 9, 56, 90],
      target: 8,
      expected: [4, 5]
    },
    {
      numbers: [5, 25, 75],
      target: 100,
      expected: [2, 3]
    },
    {
      numbers: [-3, -1, 0, 2, 4, 6],
      target: 0,
      expected: [2, 3]
    }
  ];

  const approaches = [
    { name: "Two Pointers", func: twoSumOptimal },
    { name: "Binary Search", func: twoSumBinarySearch },
    { name: "Hash Map", func: twoSumHashMap },
    { name: "Brute Force", func: twoSumBruteForce }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.numbers], test.target);
      const passed = JSON.stringify(result) === JSON.stringify(test.expected);
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  Numbers:  [${test.numbers}]`);
        console.log(`  Target:   ${test.target}`);
        console.log(`  Expected: [${test.expected}]`);
        console.log(`  Got:      [${result}]`);
      }
    });
  });
}

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [1000, 5000, 10000];
  const approaches = [
    { name: "Two Pointers", func: twoSumOptimal },
    { name: "Binary Search", func: twoSumBinarySearch },
    { name: "Hash Map", func: twoSumHashMap }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      // Create sorted array
      const numbers = [];
      for (let i = 0; i < size; i++) {
        numbers.push(i * 2); // Even numbers for simplicity
      }

      // Choose target that exists
      const target = numbers[10] + numbers[size - 10];

      const start = performance.now();
      approach.func([...numbers], target);
      const end = performance.now();

      console.log(`${approach.name}: ${(end - start).toFixed(4)}ms`);
    });
  });
}

// Visual demonstration
function visualDemo() {
  console.log("\n--- Visual Demonstration ---");
  console.log("Example: numbers = [2, 7, 11, 15], target = 9");

  const numbers = [2, 7, 11, 15];
  const target = 9;
  let left = 0;
  let right = numbers.length - 1;
  let step = 0;

  console.log("Two Pointers Process:");

  while (left < right) {
    step++;
    const sum = numbers[left] + numbers[right];

    console.log(`\nStep ${step}:`);
    console.log(`  left=${left}, right=${right}`);
    console.log(
      `  numbers[${left}]=${numbers[left]}, numbers[${right}]=${numbers[right]}`
    );
    console.log(`  sum=${sum}, target=${target}`);

    if (sum === target) {
      console.log(`  Found! Return [${left + 1}, ${right + 1}]`);
      break;
    } else if (sum < target) {
      console.log(`  Sum too small, move left pointer`);
      left++;
    } else {
      console.log(`  Sum too large, move right pointer`);
      right--;
    }
  }
}

// Compare with original Two Sum
function compareWithTwoSum() {
  console.log("\n--- Comparison with Two Sum I ---");
  console.log("Two Sum I (unsorted array):");
  console.log("- Use hash map to store complements");
  console.log("- Time: O(n), Space: O(n)");
  console.log("- Return 0-indexed positions");
  console.log("");
  console.log("Two Sum II (sorted array):");
  console.log("- Use two pointers technique");
  console.log("- Time: O(n), Space: O(1)");
  console.log("- Return 1-indexed positions");
  console.log("- Can leverage sorted property");
  console.log("");
  console.log("Key insight: Sorting enables space-efficient solution");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Two Pointers in Sorted Array ---");
  console.log("When to use: Finding pair with specific sum in sorted array");
  console.log("- Start with leftmost and rightmost elements");
  console.log("- If sum equals target: found solution");
  console.log("- If sum < target: need larger sum, move left pointer right");
  console.log("- If sum > target: need smaller sum, move right pointer left");
  console.log("- Each step eliminates at least one impossible solution");
  console.log("");
  console.log("Why it works:");
  console.log("- Array is sorted, so moving pointers changes sum predictably");
  console.log("- Moving left pointer increases sum");
  console.log("- Moving right pointer decreases sum");
  console.log("- We never miss the optimal solution");
}

// Algorithm variations
function explainVariations() {
  console.log("\n--- Algorithm Variations ---");

  console.log("1. Two Sum (closest to target):");
  console.log("   - Track minimum difference instead of exact match");
  console.log("   - Continue until pointers meet");

  console.log("\n2. Two Sum (all pairs):");
  console.log("   - Don't return immediately when found");
  console.log("   - Handle duplicates carefully");

  console.log("\n3. Three Sum:");
  console.log("   - Fix first element, apply Two Sum on remaining");
  console.log("   - Time complexity becomes O(n²)");

  console.log("\n4. Two Sum (greater than target):");
  console.log("   - Find first pair with sum > target");
  console.log("   - Similar pointer movement logic");
}

// Edge cases testing
function testEdgeCases() {
  console.log("\n--- Edge Cases ---");

  const edgeCases = [
    {
      name: "Minimum array",
      numbers: [1, 2],
      target: 3,
      expected: [1, 2]
    },
    {
      name: "Negative numbers",
      numbers: [-5, -3, -1, 0, 2],
      target: -4,
      expected: [1, 3]
    },
    {
      name: "Duplicates",
      numbers: [1, 1, 1, 1],
      target: 2,
      expected: [1, 2]
    },
    {
      name: "Large gap",
      numbers: [1, 100],
      target: 101,
      expected: [1, 2]
    },
    {
      name: "Adjacent elements",
      numbers: [1, 2, 3, 4],
      target: 3,
      expected: [1, 2]
    }
  ];

  edgeCases.forEach((testCase) => {
    const result = twoSumOptimal([...testCase.numbers], testCase.target);
    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
    console.log(`${testCase.name}: ${passed ? "PASS" : "FAIL"}`);
    if (!passed) {
      console.log(`  Expected: [${testCase.expected}]`);
      console.log(`  Got:      [${result}]`);
    }
  });
}

// Time complexity analysis
function analyzeComplexity() {
  console.log("\n--- Time Complexity Analysis ---");

  console.log("Two Pointers: O(n)");
  console.log("- Each element is visited at most once");
  console.log("- Total operations: at most n comparisons");

  console.log("\nBinary Search: O(n log n)");
  console.log("- For each element: O(log n) binary search");
  console.log("- Total: n × log n operations");

  console.log("\nHash Map: O(n)");
  console.log("- Single pass through array");
  console.log("- O(1) hash operations on average");
  console.log("- But uses O(n) extra space");

  console.log("\nBrute Force: O(n²)");
  console.log("- Check all pairs");
  console.log("- n × (n-1) / 2 comparisons");
}

// Run tests
if (require.main === module) {
  testTwoSum();
  performanceTest();
  visualDemo();
  compareWithTwoSum();
  explainPattern();
  explainVariations();
  testEdgeCases();
  analyzeComplexity();
}

module.exports = {
  twoSumOptimal,
  twoSumBinarySearch,
  twoSumHashMap,
  twoSumBruteForce
};
