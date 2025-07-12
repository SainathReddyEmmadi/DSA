/**
 * LeetCode 448: Find All Numbers Disappeared in Array
 *
 * Problem: Given an array nums of n integers where nums[i] is in the range [1, n],
 * return an array of all the integers in the range [1, n] that do not appear in nums.
 *
 * Pattern: Cyclic Sort / Array as Hash Map
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

// Approach 1: Cyclic Sort (Optimal)
function findDisappearedNumbersOptimal(nums) {
  const n = nums.length;

  // Place each number in its correct position (nums[i] should be i+1)
  for (let i = 0; i < n; i++) {
    while (
      nums[i] !== i + 1 &&
      nums[i] >= 1 &&
      nums[i] <= n &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      // Swap nums[i] with nums[nums[i] - 1]
      const correctIndex = nums[i] - 1;
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    }
  }

  // Find missing numbers
  const result = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      result.push(i + 1);
    }
  }

  return result;
}

// Approach 2: Marking with Negative Numbers
function findDisappearedNumbersMarking(nums) {
  const n = nums.length;

  // Mark presence by making numbers at corresponding indices negative
  for (let i = 0; i < n; i++) {
    const index = Math.abs(nums[i]) - 1;
    if (nums[index] > 0) {
      nums[index] = -nums[index];
    }
  }

  // Find indices with positive numbers (missing numbers)
  const result = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      result.push(i + 1);
    }
  }

  return result;
}

// Approach 3: Using Set
function findDisappearedNumbersSet(nums) {
  const present = new Set(nums);
  const result = [];

  for (let i = 1; i <= nums.length; i++) {
    if (!present.has(i)) {
      result.push(i);
    }
  }

  return result;
}

// Approach 4: Using Boolean Array
function findDisappearedNumbersBoolean(nums) {
  const n = nums.length;
  const present = new Array(n + 1).fill(false);

  // Mark present numbers
  for (const num of nums) {
    present[num] = true;
  }

  // Find missing numbers
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (!present[i]) {
      result.push(i);
    }
  }

  return result;
}

// Approach 5: Adding n to mark presence
function findDisappearedNumbersAddN(nums) {
  const n = nums.length;

  // Add n to mark presence
  for (let i = 0; i < n; i++) {
    const index = (nums[i] - 1) % n;
    nums[index] += n;
  }

  // Find numbers that weren't marked
  const result = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] <= n) {
      result.push(i + 1);
    }
  }

  return result;
}

// Test cases
function testFindDisappearedNumbers() {
  console.log("Testing Find All Numbers Disappeared in Array...\n");

  const testCases = [
    {
      input: [4, 3, 2, 7, 8, 2, 3, 1],
      expected: [5, 6]
    },
    {
      input: [1, 1],
      expected: [2]
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: []
    },
    {
      input: [2, 2, 2, 2, 2],
      expected: [1, 3, 4, 5]
    },
    {
      input: [1],
      expected: []
    },
    {
      input: [2],
      expected: [1]
    },
    {
      input: [5, 4, 3, 2, 1],
      expected: []
    },
    {
      input: [1, 3, 5, 7],
      expected: [2, 4]
    }
  ];

  const approaches = [
    { name: "Cyclic Sort", func: findDisappearedNumbersOptimal },
    { name: "Negative Marking", func: findDisappearedNumbersMarking },
    { name: "Using Set", func: findDisappearedNumbersSet },
    { name: "Boolean Array", func: findDisappearedNumbersBoolean },
    { name: "Add N Method", func: findDisappearedNumbersAddN }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.input]);
      result.sort((a, b) => a - b); // Sort for comparison
      test.expected.sort((a, b) => a - b);

      const passed = JSON.stringify(result) === JSON.stringify(test.expected);
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  Input:    [${test.input}]`);
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
    { name: "Cyclic Sort", func: findDisappearedNumbersOptimal },
    { name: "Negative Marking", func: findDisappearedNumbersMarking },
    { name: "Using Set", func: findDisappearedNumbersSet }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      // Create array with some missing numbers
      const nums = [];
      for (let i = 1; i <= size; i++) {
        if (Math.random() > 0.1) {
          // 90% chance to include
          nums.push(i);
        }
      }
      // Fill to exact size with duplicates
      while (nums.length < size) {
        nums.push(Math.floor(Math.random() * size) + 1);
      }

      const start = performance.now();
      approach.func([...nums]);
      const end = performance.now();

      console.log(`${approach.name}: ${(end - start).toFixed(4)}ms`);
    });
  });
}

// Visual demonstration
function visualDemo() {
  console.log("\n--- Visual Demonstration ---");
  console.log("Example: [4, 3, 2, 7, 8, 2, 3, 1]");
  console.log("Expected range: [1, 2, 3, 4, 5, 6, 7, 8]");
  console.log("Present: [1, 2, 3, 4, 7, 8]");
  console.log("Missing: [5, 6]");

  console.log("\nCyclic Sort Process:");
  const nums = [4, 3, 2, 7, 8, 2, 3, 1];
  console.log(`Initial: [${nums}]`);

  for (let i = 0; i < nums.length; i++) {
    console.log(`\nProcessing index ${i}:`);
    while (
      nums[i] !== i + 1 &&
      nums[i] >= 1 &&
      nums[i] <= nums.length &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      const correctIndex = nums[i] - 1;
      console.log(`  ${nums[i]} should be at index ${correctIndex}`);
      console.log(
        `  Swap nums[${i}]=${nums[i]} with nums[${correctIndex}]=${nums[correctIndex]}`
      );
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
      console.log(`  Array: [${nums}]`);
    }
    console.log(`  Index ${i} settled with value ${nums[i]}`);
  }

  console.log(`\nFinal array: [${nums}]`);
  console.log("Missing numbers:");
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      console.log(`  Position ${i} should have ${i + 1} but has ${nums[i]}`);
    }
  }
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Cyclic Sort ---");
  console.log(
    "Key insight: Use array indices as hash map when numbers are in range [1, n]"
  );
  console.log("");
  console.log("Cyclic Sort properties:");
  console.log(
    '- Each number has a "correct" position: nums[i-1] should contain i'
  );
  console.log(
    "- Swap elements until each is in correct position or identified as duplicate"
  );
  console.log("- Missing numbers will leave gaps at their expected positions");
  console.log("");
  console.log("Alternative marking approach:");
  console.log("- Use array indices as flags");
  console.log("- Mark presence by negating values or adding offset");
  console.log("- Find unmarked positions");
  console.log("");
  console.log("When to use:");
  console.log("- Numbers are in range [1, n] or similar bounded range");
  console.log("- Need to find missing/duplicate numbers");
  console.log("- Space complexity must be O(1)");
}

// Similar problems
function explainSimilarProblems() {
  console.log("\n--- Similar Problems ---");
  console.log("1. Find the Duplicate Number (LC 287)");
  console.log("   - Use cycle detection or marking");

  console.log("\n2. First Missing Positive (LC 41)");
  console.log("   - Cyclic sort with range [1, n]");

  console.log("\n3. Find All Duplicates in Array (LC 442)");
  console.log("   - Mark by negating, collect duplicates");

  console.log("\n4. Missing Number (LC 268)");
  console.log("   - XOR or sum approach");

  console.log("\n5. Set Mismatch (LC 645)");
  console.log("   - Find both duplicate and missing");
}

// Edge cases
function explainEdgeCases() {
  console.log("\n--- Edge Cases ---");

  console.log("1. All numbers present: [1, 2, 3, 4, 5]");
  console.log("   - Return empty array");

  console.log("\n2. All numbers missing except one: [1, 1, 1, 1]");
  console.log("   - Return [2, 3, 4]");

  console.log("\n3. Single element arrays:");
  console.log("   - [1] → [] (nothing missing)");
  console.log("   - [2] → [1] (1 is missing)");

  console.log("\n4. Consecutive duplicates: [1, 1, 2, 2]");
  console.log("   - Missing: [3, 4]");

  console.log("\n5. Large gaps: [1, 8]");
  console.log("   - Missing: [2, 3, 4, 5, 6, 7]");
}

// Real-world applications
function explainApplications() {
  console.log("\n--- Real-world Applications ---");
  console.log("1. Database integrity checks:");
  console.log("   - Find missing record IDs in sequence");
  console.log("   - Validate data completeness");

  console.log("\n2. Game development:");
  console.log("   - Track unlocked achievements/levels");
  console.log("   - Find missing collectibles");

  console.log("\n3. System monitoring:");
  console.log("   - Detect missing log entries");
  console.log("   - Find gaps in time series data");

  console.log("\n4. Inventory management:");
  console.log("   - Track missing products in catalog");
  console.log("   - Validate SKU sequences");
}

// Run tests
if (require.main === module) {
  testFindDisappearedNumbers();
  performanceTest();
  visualDemo();
  explainPattern();
  explainSimilarProblems();
  explainEdgeCases();
  explainApplications();
}

module.exports = {
  findDisappearedNumbersOptimal,
  findDisappearedNumbersMarking,
  findDisappearedNumbersSet,
  findDisappearedNumbersBoolean,
  findDisappearedNumbersAddN
};
