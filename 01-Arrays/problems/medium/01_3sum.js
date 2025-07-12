/**
 * LeetCode 15: 3Sum
 *
 * Problem: Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
 * such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * Notice that the solution set must not contain duplicate triplets.
 *
 * Pattern: Two Pointers + Sorting
 * Time Complexity: O(n²)
 * Space Complexity: O(1) excluding output array
 */

// Approach 1: Sorted Array + Two Pointers (Optimal)
function threeSumOptimal(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for first number
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for second and third numbers
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

// Approach 2: Hash Set for each pair (Less optimal)
function threeSumHashSet(nums) {
  const result = [];
  const triplets = new Set();

  for (let i = 0; i < nums.length - 2; i++) {
    const seen = new Set();

    for (let j = i + 1; j < nums.length; j++) {
      const complement = -(nums[i] + nums[j]);

      if (seen.has(complement)) {
        const triplet = [nums[i], complement, nums[j]].sort((a, b) => a - b);
        triplets.add(triplet.join(","));
      }

      seen.add(nums[j]);
    }
  }

  return Array.from(triplets).map((triplet) => triplet.split(",").map(Number));
}

// Approach 3: Brute Force (For comparison)
function threeSumBruteForce(nums) {
  const result = [];
  const triplets = new Set();

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          triplets.add(triplet.join(","));
        }
      }
    }
  }

  return Array.from(triplets).map((triplet) => triplet.split(",").map(Number));
}

// Approach 4: Using Map for Two Sum
function threeSumWithMap(nums) {
  const result = [];
  const triplets = new Set();

  for (let i = 0; i < nums.length - 2; i++) {
    const target = -nums[i];
    const map = new Map();

    for (let j = i + 1; j < nums.length; j++) {
      const complement = target - nums[j];

      if (map.has(complement)) {
        const triplet = [nums[i], complement, nums[j]].sort((a, b) => a - b);
        triplets.add(triplet.join(","));
      }

      map.set(nums[j], j);
    }
  }

  return Array.from(triplets).map((triplet) => triplet.split(",").map(Number));
}

// Test cases
function testThreeSum() {
  console.log("Testing 3Sum...\n");

  const testCases = [
    {
      input: [-1, 0, 1, 2, -1, -4],
      expected: [
        [-1, -1, 2],
        [-1, 0, 1]
      ]
    },
    {
      input: [0, 1, 1],
      expected: []
    },
    {
      input: [0, 0, 0],
      expected: [[0, 0, 0]]
    },
    {
      input: [-2, 0, 1, 1, 2],
      expected: [
        [-2, 0, 2],
        [-2, 1, 1]
      ]
    },
    {
      input: [1, -1, -1, 0],
      expected: [[-1, 0, 1]]
    },
    {
      input: [],
      expected: []
    },
    {
      input: [1, 2, 3],
      expected: []
    }
  ];

  const approaches = [
    { name: "Two Pointers Optimal", func: threeSumOptimal },
    { name: "Hash Set", func: threeSumHashSet },
    { name: "Brute Force", func: threeSumBruteForce },
    { name: "Using Map", func: threeSumWithMap }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.input]);

      // Sort both expected and result for comparison
      const sortedResult = result
        .map((triplet) => triplet.sort((a, b) => a - b))
        .sort((a, b) => {
          for (let i = 0; i < 3; i++) {
            if (a[i] !== b[i]) return a[i] - b[i];
          }
          return 0;
        });

      const sortedExpected = test.expected
        .map((triplet) => triplet.sort((a, b) => a - b))
        .sort((a, b) => {
          for (let i = 0; i < 3; i++) {
            if (a[i] !== b[i]) return a[i] - b[i];
          }
          return 0;
        });

      const passed =
        JSON.stringify(sortedResult) === JSON.stringify(sortedExpected);
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  Input:    [${test.input}]`);
        console.log(`  Expected: ${JSON.stringify(sortedExpected)}`);
        console.log(`  Got:      ${JSON.stringify(sortedResult)}`);
      }
    });
  });
}

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [50, 100, 200];
  const approaches = [
    { name: "Two Pointers Optimal", func: threeSumOptimal },
    { name: "Hash Set", func: threeSumHashSet }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      // Generate random array
      const nums = [];
      for (let i = 0; i < size; i++) {
        nums.push(Math.floor(Math.random() * 200) - 100);
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
  console.log("Example: [-1, 0, 1, 2, -1, -4]");
  console.log("After sorting: [-4, -1, -1, 0, 1, 2]");

  const nums = [-4, -1, -1, 0, 1, 2];
  console.log("\nTwo Pointers Approach:");

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      console.log(`\nSkip i=${i} (duplicate of ${nums[i]})`);
      continue;
    }

    console.log(`\nFix first number: i=${i}, nums[i]=${nums[i]}`);
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      console.log(
        `  Try: [${nums[i]}, ${nums[left]}, ${nums[right]}] = ${sum}`
      );

      if (sum === 0) {
        console.log(
          `    Found triplet: [${nums[i]}, ${nums[left]}, ${nums[right]}]`
        );
        // Skip duplicates
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
          console.log(`    Skip duplicate left: ${nums[left]}`);
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
          console.log(`    Skip duplicate right: ${nums[right]}`);
        }
        left++;
        right--;
      } else if (sum < 0) {
        console.log(`    Sum too small, move left pointer`);
        left++;
      } else {
        console.log(`    Sum too large, move right pointer`);
        right--;
      }
    }
  }
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Two Pointers + Sorting ---");
  console.log(
    "Key insight: Fix one number, use two pointers for the other two"
  );
  console.log("1. Sort the array first");
  console.log("2. For each number (first), use two pointers (second, third)");
  console.log("3. If sum == 0: found triplet, move both pointers");
  console.log("4. If sum < 0: move left pointer (increase sum)");
  console.log("5. If sum > 0: move right pointer (decrease sum)");
  console.log("6. Skip duplicates to avoid duplicate triplets");
  console.log("Time: O(n²), Space: O(1)");
  console.log("\nWhy this works:");
  console.log("- Sorting allows us to use two pointers effectively");
  console.log("- Fixing first element reduces 3Sum to 2Sum problem");
  console.log("- Two pointers can find all pairs efficiently");
}

// Edge cases testing
function testEdgeCases() {
  console.log("\n--- Edge Cases ---");

  const edgeCases = [
    {
      name: "All zeros",
      input: [0, 0, 0, 0],
      expected: [[0, 0, 0]]
    },
    {
      name: "Two elements",
      input: [1, 2],
      expected: []
    },
    {
      name: "All positive",
      input: [1, 2, 3, 4],
      expected: []
    },
    {
      name: "All negative",
      input: [-4, -3, -2, -1],
      expected: []
    },
    {
      name: "Large duplicates",
      input: [-1, -1, -1, 0, 1, 1, 1],
      expected: [[-1, 0, 1]]
    }
  ];

  edgeCases.forEach((testCase) => {
    const result = threeSumOptimal([...testCase.input]);
    const sortedResult = result
      .map((triplet) => triplet.sort((a, b) => a - b))
      .sort((a, b) => {
        for (let i = 0; i < 3; i++) {
          if (a[i] !== b[i]) return a[i] - b[i];
        }
        return 0;
      });
    const sortedExpected = testCase.expected
      .map((triplet) => triplet.sort((a, b) => a - b))
      .sort((a, b) => {
        for (let i = 0; i < 3; i++) {
          if (a[i] !== b[i]) return a[i] - b[i];
        }
        return 0;
      });

    const passed =
      JSON.stringify(sortedResult) === JSON.stringify(sortedExpected);
    console.log(`${testCase.name}: ${passed ? "PASS" : "FAIL"}`);
    if (!passed) {
      console.log(`  Expected: ${JSON.stringify(sortedExpected)}`);
      console.log(`  Got:      ${JSON.stringify(sortedResult)}`);
    }
  });
}

// Run tests
if (require.main === module) {
  testThreeSum();
  performanceTest();
  visualDemo();
  explainPattern();
  testEdgeCases();
}

module.exports = {
  threeSumOptimal,
  threeSumHashSet,
  threeSumBruteForce,
  threeSumWithMap
};
