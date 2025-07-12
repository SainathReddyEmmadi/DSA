/**
 * LeetCode 217: Contains Duplicate
 * Difficulty: Easy
 *
 * Problem:
 * Given an integer array nums, return true if any value appears at least twice in the array,
 * and return false if every element is distinct.
 *
 * Example 1:
 * Input: nums = [1,2,3,1]
 * Output: true
 *
 * Example 2:
 * Input: nums = [1,2,3,4]
 * Output: false
 *
 * Example 3:
 * Input: nums = [1,1,1,3,3,4,3,2,4,2]
 * Output: true
 *
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 */

/**
 * Approach 1: Brute Force - Nested Loops
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * Strategy:
 * Compare each element with every other element
 */
function containsDuplicate1(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Approach 2: Sorting
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) if we can modify input, O(n) if we need to preserve input
 *
 * Strategy:
 * Sort the array and check adjacent elements
 */
function containsDuplicate2(nums) {
  // Create a copy to preserve original array
  const sorted = [...nums].sort((a, b) => a - b);

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]) {
      return true;
    }
  }
  return false;
}

/**
 * Approach 3: Hash Set
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Strategy:
 * Use a Set to track seen elements
 */
function containsDuplicate3(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}

/**
 * Approach 4: Hash Set - One Liner with Size Comparison
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Strategy:
 * Compare original array length with Set size
 */
function containsDuplicate4(nums) {
  return new Set(nums).size !== nums.length;
}

/**
 * Approach 5: Hash Map - Count Frequencies
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Strategy:
 * Count frequency of each element
 */
function containsDuplicate5(nums) {
  const freq = new Map();

  for (const num of nums) {
    if (freq.has(num)) {
      return true;
    }
    freq.set(num, 1);
  }
  return false;
}

/**
 * Approach 6: Early Exit with Set
 * Time Complexity: O(n) average, O(1) best case
 * Space Complexity: O(n)
 *
 * Strategy:
 * Return immediately when duplicate found
 */
function containsDuplicate6(nums) {
  const seen = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (seen.has(nums[i])) {
      return true;
    }
    seen.add(nums[i]);
  }
  return false;
}

// Helper function to find all duplicates
function findAllDuplicates(nums) {
  const freq = new Map();
  const duplicates = [];

  // Count frequencies
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  // Find duplicates
  for (const [num, count] of freq) {
    if (count > 1) {
      duplicates.push({ value: num, count });
    }
  }

  return duplicates;
}

// Helper function to find first duplicate
function findFirstDuplicate(nums) {
  const seen = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (seen.has(nums[i])) {
      return { value: nums[i], index: i };
    }
    seen.add(nums[i]);
  }

  return null;
}

// Test cases
function runTests() {
  console.log("Testing Contains Duplicate Solutions...\n");

  const testCases = [
    {
      nums: [1, 2, 3, 1],
      expected: true,
      description: "Example 1 - Contains duplicate 1"
    },
    {
      nums: [1, 2, 3, 4],
      expected: false,
      description: "Example 2 - All distinct elements"
    },
    {
      nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
      expected: true,
      description: "Example 3 - Multiple duplicates"
    },
    {
      nums: [1],
      expected: false,
      description: "Single element"
    },
    {
      nums: [1, 2],
      expected: false,
      description: "Two distinct elements"
    },
    {
      nums: [1, 1],
      expected: true,
      description: "Two identical elements"
    },
    {
      nums: [-1, -1],
      expected: true,
      description: "Negative duplicates"
    },
    {
      nums: [0, 0, 0],
      expected: true,
      description: "Zero duplicates"
    }
  ];

  const solutions = [
    { name: "Brute Force", func: containsDuplicate1 },
    { name: "Sorting", func: containsDuplicate2 },
    { name: "Hash Set", func: containsDuplicate3 },
    { name: "Set Size Comparison", func: containsDuplicate4 },
    { name: "Hash Map", func: containsDuplicate5 },
    { name: "Early Exit Set", func: containsDuplicate6 }
  ];

  testCases.forEach(({ nums, expected, description }) => {
    console.log(`Test Case: ${description}`);
    console.log(`Input: [${nums.join(", ")}]`);
    console.log(`Expected: ${expected}`);

    // Show duplicate details if any
    if (expected) {
      const firstDup = findFirstDuplicate(nums);
      const allDups = findAllDuplicates(nums);
      console.log(
        `First duplicate: ${firstDup.value} at index ${firstDup.index}`
      );
      console.log(
        `All duplicates: ${allDups
          .map((d) => `${d.value}(${d.count}x)`)
          .join(", ")}`
      );
    }

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

  const sizes = [1000, 10000, 50000];

  sizes.forEach((size) => {
    console.log(`Array size: ${size}`);

    // Test case 1: No duplicates (worst case for most algorithms)
    console.log("  No duplicates case:");
    const noDuplicates = Array.from({ length: size }, (_, i) => i);

    // Test case 2: Duplicate at end (worst case for early exit)
    console.log("  Duplicate at end:");
    const duplicateAtEnd = [...noDuplicates];
    duplicateAtEnd[size - 1] = 0;

    // Test case 3: Duplicate at beginning (best case for early exit)
    console.log("  Duplicate at beginning:");
    const duplicateAtStart = [...noDuplicates];
    duplicateAtStart[1] = 0;

    const solutions = [
      { name: "Hash Set", func: containsDuplicate3 },
      { name: "Set Size Comparison", func: containsDuplicate4 },
      { name: "Early Exit Set", func: containsDuplicate6 }
    ];

    // Only test brute force and sorting on smaller arrays
    if (size <= 1000) {
      solutions.unshift(
        { name: "Brute Force", func: containsDuplicate1 },
        { name: "Sorting", func: containsDuplicate2 }
      );
    }

    [
      { name: "No duplicates", array: noDuplicates },
      { name: "Duplicate at end", array: duplicateAtEnd },
      { name: "Duplicate at start", array: duplicateAtStart }
    ].forEach(({ name, array }) => {
      console.log(`    ${name}:`);
      solutions.forEach(({ name: solutionName, func }) => {
        const start = performance.now();
        func([...array]);
        const end = performance.now();
        console.log(`      ${solutionName}: ${(end - start).toFixed(3)}ms`);
      });
    });

    console.log();
  });
}

// Pattern explanation
function explainPattern() {
  console.log("Contains Duplicate Pattern Analysis:\n");
  console.log("1. HASH SET PATTERN:");
  console.log("   - Most efficient for duplicate detection");
  console.log("   - O(n) time, O(n) space");
  console.log("   - Early exit when duplicate found");
  console.log();
  console.log("2. KEY INSIGHTS:");
  console.log("   - Set automatically handles uniqueness");
  console.log("   - Size comparison is a clever one-liner");
  console.log("   - Early exit saves time in best case");
  console.log();
  console.log("3. TRADE-OFFS:");
  console.log("   - Time vs Space: Hash set uses extra space for speed");
  console.log("   - Sorting modifies input but uses less extra space");
  console.log("   - Brute force uses no extra space but very slow");
  console.log();
  console.log("4. VARIATIONS:");
  console.log("   - Contains Duplicate II: duplicates within k distance");
  console.log("   - Contains Duplicate III: value difference within t");
  console.log("   - Find all duplicates: return the duplicate values");
  console.log();
  console.log("5. REAL WORLD APPLICATIONS:");
  console.log("   - Data validation and cleaning");
  console.log("   - Database integrity checks");
  console.log("   - Finding unique users/items");
}

// Export for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    containsDuplicate1,
    containsDuplicate2,
    containsDuplicate3,
    containsDuplicate4,
    containsDuplicate5,
    containsDuplicate6,
    findAllDuplicates,
    findFirstDuplicate,
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
