/**
 * LeetCode 26: Remove Duplicates from Sorted Array
 *
 * Problem: Given an integer array nums sorted in non-decreasing order, remove the duplicates
 * in-place such that each unique element appears only once. The relative order of the elements
 * should be kept the same. Then return the number of unique elements in nums.
 *
 * Pattern: Two Pointers (slow and fast)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

// Approach 1: Two Pointers (Optimal)
// Use slow pointer for unique elements, fast pointer to traverse
function removeDuplicatesOptimal(nums) {
  if (nums.length <= 1) return nums.length;

  let slow = 0; // Points to position for next unique element

  for (let fast = 1; fast < nums.length; fast++) {
    // If current element is different from previous unique element
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1; // Length of unique elements
}

// Approach 2: Using Set (Not in-place but demonstrates logic)
function removeDuplicatesWithSet(nums) {
  const uniqueElements = [...new Set(nums)];

  // Copy back to original array
  for (let i = 0; i < uniqueElements.length; i++) {
    nums[i] = uniqueElements[i];
  }

  return uniqueElements.length;
}

// Approach 3: Manual iteration with counter
function removeDuplicatesManual(nums) {
  if (nums.length === 0) return 0;

  let uniqueCount = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[uniqueCount] = nums[i];
      uniqueCount++;
    }
  }

  return uniqueCount;
}

// Approach 4: Using filter and indexOf (Creates new array)
function removeDuplicatesFilter(nums) {
  const unique = nums.filter((value, index) => nums.indexOf(value) === index);

  // Copy back to original array
  for (let i = 0; i < unique.length; i++) {
    nums[i] = unique[i];
  }

  return unique.length;
}

// Test cases
function testRemoveDuplicates() {
  console.log("Testing Remove Duplicates from Sorted Array...\n");

  const testCases = [
    {
      input: [1, 1, 2],
      expected: { length: 2, array: [1, 2] }
    },
    {
      input: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
      expected: { length: 5, array: [0, 1, 2, 3, 4] }
    },
    {
      input: [1],
      expected: { length: 1, array: [1] }
    },
    {
      input: [],
      expected: { length: 0, array: [] }
    },
    {
      input: [1, 1, 1, 1, 1],
      expected: { length: 1, array: [1] }
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: { length: 5, array: [1, 2, 3, 4, 5] }
    }
  ];

  const approaches = [
    { name: "Two Pointers", func: removeDuplicatesOptimal },
    { name: "Using Set", func: removeDuplicatesWithSet },
    { name: "Manual Iteration", func: removeDuplicatesManual },
    { name: "Filter Method", func: removeDuplicatesFilter }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const nums = [...test.input];
      const length = approach.func(nums);
      const resultArray = nums.slice(0, length);

      const lengthCorrect = length === test.expected.length;
      const arrayCorrect =
        JSON.stringify(resultArray) === JSON.stringify(test.expected.array);
      const passed = lengthCorrect && arrayCorrect;

      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  Input:    [${test.input}]`);
        console.log(
          `  Expected: length=${test.expected.length}, array=[${test.expected.array}]`
        );
        console.log(`  Got:      length=${length}, array=[${resultArray}]`);
      }
    });
  });
}

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [1000, 5000, 10000];
  const approaches = [
    { name: "Two Pointers", func: removeDuplicatesOptimal },
    { name: "Manual Iteration", func: removeDuplicatesManual }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      // Create array with many duplicates
      const nums = [];
      for (let i = 0; i < size; i++) {
        nums.push(Math.floor(i / 3)); // Each number appears ~3 times
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
  console.log("Input: [1, 1, 2, 2, 3]");
  console.log("Process:");

  const nums = [1, 1, 2, 2, 3];
  let slow = 0;

  console.log(`Initial: slow=0, nums=[${nums}]`);

  for (let fast = 1; fast < nums.length; fast++) {
    console.log(`\nStep ${fast}:`);
    console.log(`  fast=${fast}, nums[fast]=${nums[fast]}`);
    console.log(`  slow=${slow}, nums[slow]=${nums[slow]}`);

    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
      console.log(
        `  Different! Move slow to ${slow}, set nums[${slow}]=${nums[fast]}`
      );
    } else {
      console.log(`  Same! Skip.`);
    }
    console.log(`  Array: [${nums}]`);
  }

  console.log(
    `\nResult: length=${slow + 1}, unique elements=[${nums.slice(0, slow + 1)}]`
  );
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Two Pointers (Slow and Fast) ---");
  console.log(
    "Key insight: Use two pointers to maintain unique elements in-place"
  );
  console.log("- Slow pointer: tracks position for next unique element");
  console.log("- Fast pointer: traverses the array");
  console.log(
    "- When fast finds a new unique element, increment slow and copy"
  );
  console.log("- Works because array is sorted - duplicates are adjacent");
  console.log("- Time: O(n), Space: O(1)");
  console.log("\nVariations:");
  console.log("- Remove duplicates from unsorted array: use hash set");
  console.log("- Allow at most k duplicates: modify condition");
  console.log("- Remove specific value: same pattern with different condition");
}

// Run tests
if (require.main === module) {
  testRemoveDuplicates();
  performanceTest();
  visualDemo();
  explainPattern();
}

module.exports = {
  removeDuplicatesOptimal,
  removeDuplicatesWithSet,
  removeDuplicatesManual,
  removeDuplicatesFilter
};
