/**
 * LeetCode 283: Move Zeroes
 *
 * Problem: Given an integer array nums, move all 0's to the end of it
 * while maintaining the relative order of the non-zero elements.
 * Note that you must do this in-place without making a copy of the array.
 *
 * Pattern: Two Pointers (slow and fast)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

// Approach 1: Two Pointers - Optimal (Single Pass)
function moveZeroesOptimal(nums) {
  let left = 0; // Points to position for next non-zero element

  // Move all non-zero elements to the front
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] !== 0) {
      nums[left] = nums[right];
      left++;
    }
  }

  // Fill remaining positions with zeros
  for (let i = left; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
}

// Approach 2: Two Pointers with Swap
function moveZeroesSwap(nums) {
  let left = 0; // Points to next zero position

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] !== 0) {
      // Swap non-zero element with zero
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
    }
  }

  return nums;
}

// Approach 3: Bubble Sort Style (Less efficient)
function moveZeroesBubble(nums) {
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (nums[j] === 0 && nums[j + 1] !== 0) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }

  return nums;
}

// Approach 4: Count and Fill
function moveZeroesCount(nums) {
  let zeroCount = 0;
  const nonZeros = [];

  // Count zeros and collect non-zeros
  for (let num of nums) {
    if (num === 0) {
      zeroCount++;
    } else {
      nonZeros.push(num);
    }
  }

  // Fill array with non-zeros first, then zeros
  for (let i = 0; i < nonZeros.length; i++) {
    nums[i] = nonZeros[i];
  }
  for (let i = nonZeros.length; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
}

// Approach 5: Filter and Fill (Using array methods)
function moveZeroesFilter(nums) {
  const nonZeros = nums.filter((num) => num !== 0);
  const zeroCount = nums.length - nonZeros.length;

  // Copy non-zeros and add zeros
  for (let i = 0; i < nonZeros.length; i++) {
    nums[i] = nonZeros[i];
  }
  for (let i = nonZeros.length; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
}

// Test cases
function testMoveZeroes() {
  console.log("Testing Move Zeroes...\n");

  const testCases = [
    {
      input: [0, 1, 0, 3, 12],
      expected: [1, 3, 12, 0, 0]
    },
    {
      input: [0],
      expected: [0]
    },
    {
      input: [1],
      expected: [1]
    },
    {
      input: [0, 0, 1],
      expected: [1, 0, 0]
    },
    {
      input: [1, 0, 0],
      expected: [1, 0, 0]
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3, 4, 5]
    },
    {
      input: [0, 0, 0, 0, 0],
      expected: [0, 0, 0, 0, 0]
    },
    {
      input: [2, 1, 0, 3, 0, 4, 0, 5],
      expected: [2, 1, 3, 4, 5, 0, 0, 0]
    }
  ];

  const approaches = [
    { name: "Two Pointers Optimal", func: moveZeroesOptimal },
    { name: "Two Pointers Swap", func: moveZeroesSwap },
    { name: "Bubble Sort Style", func: moveZeroesBubble },
    { name: "Count and Fill", func: moveZeroesCount },
    { name: "Filter Method", func: moveZeroesFilter }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.input]);
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
    { name: "Two Pointers Optimal", func: moveZeroesOptimal },
    { name: "Two Pointers Swap", func: moveZeroesSwap },
    { name: "Count and Fill", func: moveZeroesCount }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      // Create array with 30% zeros randomly distributed
      const nums = [];
      for (let i = 0; i < size; i++) {
        nums.push(
          Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 100) + 1
        );
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
  console.log("Example: [0, 1, 0, 3, 12]");
  console.log("\nTwo Pointers Optimal Approach:");

  const nums = [0, 1, 0, 3, 12];
  let left = 0;

  console.log(`Initial: left=0, array=[${nums}]`);

  for (let right = 0; right < nums.length; right++) {
    console.log(`\nStep ${right + 1}:`);
    console.log(`  right=${right}, nums[right]=${nums[right]}`);
    console.log(`  left=${left} (next position for non-zero)`);

    if (nums[right] !== 0) {
      console.log(`  Non-zero found! Place ${nums[right]} at position ${left}`);
      nums[left] = nums[right];
      left++;
      console.log(`  Array: [${nums}], left=${left}`);
    } else {
      console.log(`  Zero found, skip`);
    }
  }

  console.log(`\nFill remaining positions with zeros:`);
  for (let i = left; i < nums.length; i++) {
    nums[i] = 0;
  }
  console.log(`Final: [${nums}]`);
}

// Step-by-step comparison
function compareApproaches() {
  console.log("\n--- Approach Comparison ---");

  const testArray = [0, 1, 0, 3, 12];
  console.log(`Input: [${testArray}]`);

  console.log("\n1. Two Pointers Optimal:");
  console.log("   - Single pass to move non-zeros forward");
  console.log("   - Second pass to fill zeros");
  console.log("   - Time: O(n), Space: O(1)");

  console.log("\n2. Two Pointers Swap:");
  console.log("   - Swap non-zeros with zeros in-place");
  console.log("   - Maintains relative order");
  console.log("   - Time: O(n), Space: O(1)");

  console.log("\n3. Count and Fill:");
  console.log("   - Count zeros and collect non-zeros");
  console.log("   - Fill array with non-zeros first, then zeros");
  console.log("   - Time: O(n), Space: O(k) where k is non-zeros");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Two Pointers (Slow and Fast) ---");
  console.log("Key insight: Use two pointers to partition array in-place");
  console.log("- Left/Slow pointer: tracks position for next non-zero element");
  console.log("- Right/Fast pointer: traverses the array");
  console.log("- When fast finds non-zero, place it at slow position");
  console.log("- Fill remaining positions with zeros");
  console.log("- Time: O(n), Space: O(1)");
  console.log("\nVariations:");
  console.log("- Move all even/odd numbers to one side");
  console.log("- Partition array by condition");
  console.log("- Remove elements equal to val");
  console.log("- Dutch National Flag problem");
}

// Edge cases testing
function testEdgeCases() {
  console.log("\n--- Edge Cases ---");

  const edgeCases = [
    {
      name: "Empty array",
      input: [],
      expected: []
    },
    {
      name: "All zeros",
      input: [0, 0, 0],
      expected: [0, 0, 0]
    },
    {
      name: "No zeros",
      input: [1, 2, 3],
      expected: [1, 2, 3]
    },
    {
      name: "Single zero",
      input: [0],
      expected: [0]
    },
    {
      name: "Single non-zero",
      input: [5],
      expected: [5]
    },
    {
      name: "Zeros at beginning",
      input: [0, 0, 1, 2],
      expected: [1, 2, 0, 0]
    },
    {
      name: "Zeros at end",
      input: [1, 2, 0, 0],
      expected: [1, 2, 0, 0]
    }
  ];

  edgeCases.forEach((testCase) => {
    const result = moveZeroesOptimal([...testCase.input]);
    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
    console.log(`${testCase.name}: ${passed ? "PASS" : "FAIL"}`);
    if (!passed) {
      console.log(`  Expected: [${testCase.expected}]`);
      console.log(`  Got:      [${result}]`);
    }
  });
}

// Run tests
if (require.main === module) {
  testMoveZeroes();
  performanceTest();
  visualDemo();
  compareApproaches();
  explainPattern();
  testEdgeCases();
}

module.exports = {
  moveZeroesOptimal,
  moveZeroesSwap,
  moveZeroesBubble,
  moveZeroesCount,
  moveZeroesFilter
};
