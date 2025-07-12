/**
 * LeetCode 189: Rotate Array
 *
 * Problem: Given an array, rotate the array to the right by k steps, where k is non-negative.
 *
 * Pattern: Array Rotation - Multiple approaches
 * Time Complexity: O(n)
 * Space Complexity: O(1) for optimal solution
 */

// Approach 1: Reverse Array Technique (Optimal)
function rotateOptimal(nums, k) {
  const n = nums.length;
  k = k % n; // Handle k > n

  if (k === 0) return nums;

  // Helper function to reverse array segment
  function reverse(start, end) {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  }

  // Reverse entire array
  reverse(0, n - 1);
  // Reverse first k elements
  reverse(0, k - 1);
  // Reverse remaining elements
  reverse(k, n - 1);

  return nums;
}

// Approach 2: Using Extra Array
function rotateExtraArray(nums, k) {
  const n = nums.length;
  k = k % n;

  if (k === 0) return nums;

  const result = new Array(n);

  // Place each element at its new position
  for (let i = 0; i < n; i++) {
    result[(i + k) % n] = nums[i];
  }

  // Copy back to original array
  for (let i = 0; i < n; i++) {
    nums[i] = result[i];
  }

  return nums;
}

// Approach 3: Cyclic Replacements
function rotateCyclic(nums, k) {
  const n = nums.length;
  k = k % n;

  if (k === 0) return nums;

  let count = 0;

  for (let start = 0; count < n; start++) {
    let current = start;
    let prev = nums[start];

    do {
      const next = (current + k) % n;
      const temp = nums[next];
      nums[next] = prev;
      prev = temp;
      current = next;
      count++;
    } while (start !== current);
  }

  return nums;
}

// Approach 4: Brute Force (One by one)
function rotateBruteForce(nums, k) {
  const n = nums.length;
  k = k % n;

  // Rotate one step at a time, k times
  for (let i = 0; i < k; i++) {
    const last = nums[n - 1];
    for (let j = n - 1; j > 0; j--) {
      nums[j] = nums[j - 1];
    }
    nums[0] = last;
  }

  return nums;
}

// Approach 5: Using slice and concat
function rotateSlice(nums, k) {
  const n = nums.length;
  k = k % n;

  if (k === 0) return nums;

  const rotated = nums.slice(-k).concat(nums.slice(0, -k));

  // Copy back to original array
  for (let i = 0; i < n; i++) {
    nums[i] = rotated[i];
  }

  return nums;
}

// Test cases
function testRotateArray() {
  console.log("Testing Rotate Array...\n");

  const testCases = [
    {
      nums: [1, 2, 3, 4, 5, 6, 7],
      k: 3,
      expected: [5, 6, 7, 1, 2, 3, 4]
    },
    {
      nums: [-1, -100, 3, 99],
      k: 2,
      expected: [3, 99, -1, -100]
    },
    {
      nums: [1, 2],
      k: 1,
      expected: [2, 1]
    },
    {
      nums: [1],
      k: 1,
      expected: [1]
    },
    {
      nums: [1, 2, 3, 4, 5],
      k: 0,
      expected: [1, 2, 3, 4, 5]
    },
    {
      nums: [1, 2, 3, 4, 5],
      k: 5,
      expected: [1, 2, 3, 4, 5]
    },
    {
      nums: [1, 2, 3, 4, 5],
      k: 7,
      expected: [4, 5, 1, 2, 3]
    },
    {
      nums: [1, 2, 3],
      k: 4,
      expected: [3, 1, 2]
    }
  ];

  const approaches = [
    { name: "Reverse Technique", func: rotateOptimal },
    { name: "Extra Array", func: rotateExtraArray },
    { name: "Cyclic Replacements", func: rotateCyclic },
    { name: "Brute Force", func: rotateBruteForce },
    { name: "Slice Method", func: rotateSlice }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.nums], test.k);
      const passed = JSON.stringify(result) === JSON.stringify(test.expected);
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  Input:    [${test.nums}], k=${test.k}`);
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
    { name: "Reverse Technique", func: rotateOptimal },
    { name: "Extra Array", func: rotateExtraArray },
    { name: "Cyclic Replacements", func: rotateCyclic }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      const nums = [];
      for (let i = 0; i < size; i++) {
        nums.push(i + 1);
      }
      const k = Math.floor(size / 3);

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
  console.log("Example: nums = [1, 2, 3, 4, 5, 6, 7], k = 3");
  console.log("Expected: [5, 6, 7, 1, 2, 3, 4]");

  console.log("\nReverse Technique Process:");
  const nums = [1, 2, 3, 4, 5, 6, 7];
  const k = 3;

  console.log(`Original: [${nums}]`);

  // Step 1: Reverse entire array
  function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }

  console.log("\nStep 1: Reverse entire array");
  reverse(nums, 0, nums.length - 1);
  console.log(`After reversing all: [${nums}]`);

  console.log("\nStep 2: Reverse first k elements");
  reverse(nums, 0, k - 1);
  console.log(`After reversing first ${k}: [${nums}]`);

  console.log("\nStep 3: Reverse remaining elements");
  reverse(nums, k, nums.length - 1);
  console.log(`After reversing rest: [${nums}]`);

  console.log("\nWhy this works:");
  console.log("- Original: [1,2,3,4,5,6,7]");
  console.log("- After step 1: [7,6,5,4,3,2,1] (entire array reversed)");
  console.log(
    "- After step 2: [5,6,7,4,3,2,1] (first k elements back to order)"
  );
  console.log(
    "- After step 3: [5,6,7,1,2,3,4] (remaining elements back to order)"
  );
}

// Algorithm comparison
function compareAlgorithms() {
  console.log("\n--- Algorithm Comparison ---");

  console.log("1. Reverse Technique:");
  console.log("   - Time: O(n), Space: O(1)");
  console.log("   - Three reversal operations");
  console.log("   - Most space-efficient");

  console.log("\n2. Extra Array:");
  console.log("   - Time: O(n), Space: O(n)");
  console.log("   - Simple and intuitive");
  console.log("   - Good for understanding");

  console.log("\n3. Cyclic Replacements:");
  console.log("   - Time: O(n), Space: O(1)");
  console.log("   - Complex but educational");
  console.log("   - Handles cycles in permutation");

  console.log("\n4. Brute Force:");
  console.log("   - Time: O(n×k), Space: O(1)");
  console.log("   - Inefficient for large k");
  console.log("   - Easy to understand");

  console.log("\n5. Slice Method:");
  console.log("   - Time: O(n), Space: O(n)");
  console.log("   - Uses built-in methods");
  console.log("   - Readable but not in-place");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Array Rotation ---");
  console.log("Key insight: Rotation = moving suffix to prefix");
  console.log("");
  console.log("Mathematical approach:");
  console.log("- Element at index i goes to index (i + k) % n");
  console.log("- Can be solved by reversing segments");
  console.log("");
  console.log("Reverse technique intuition:");
  console.log("- Want to move last k elements to front");
  console.log("- Reverse entire array puts them at front (but in wrong order)");
  console.log("- Reverse first k and last (n-k) separately to fix order");
  console.log("");
  console.log("Applications:");
  console.log("- Circular buffers");
  console.log("- String rotation problems");
  console.log("- Sliding window optimizations");
}

// Edge cases explanation
function explainEdgeCases() {
  console.log("\n--- Edge Cases ---");

  console.log("1. k = 0: No rotation needed");
  console.log("   - Return array unchanged");

  console.log("\n2. k >= n: Use k % n");
  console.log("   - k = 7, n = 5 → same as k = 2");
  console.log("   - Avoid unnecessary full rotations");

  console.log("\n3. Single element: [1], k = any");
  console.log("   - Always returns [1]");

  console.log("\n4. Empty array: [], k = any");
  console.log("   - Return empty array");

  console.log("\n5. k = n: Full rotation");
  console.log("   - Array returns to original state");

  console.log("\n6. Two elements: Special case for cyclic approach");
  console.log("   - Need to handle GCD properly");
}

// Step-by-step cyclic explanation
function explainCyclicApproach() {
  console.log("\n--- Cyclic Replacements Explanation ---");
  console.log("Example: [1, 2, 3, 4, 5, 6], k = 2");
  console.log("");
  console.log("Element movements:");
  console.log("- 1 (index 0) → index 2");
  console.log("- 2 (index 1) → index 3");
  console.log("- 3 (index 2) → index 4");
  console.log("- 4 (index 3) → index 5");
  console.log("- 5 (index 4) → index 0");
  console.log("- 6 (index 5) → index 1");
  console.log("");
  console.log("Cycles formed:");
  console.log("- Cycle 1: 0 → 2 → 4 → 0 (elements 1, 3, 5)");
  console.log("- Cycle 2: 1 → 3 → 5 → 1 (elements 2, 4, 6)");
  console.log("");
  console.log(
    "Algorithm processes each cycle completely before moving to next"
  );
}

// Real-world applications
function explainApplications() {
  console.log("\n--- Real-world Applications ---");
  console.log("1. Image processing:");
  console.log("   - Rotate image pixels");
  console.log("   - Circular shift in filters");

  console.log("\n2. Cryptography:");
  console.log("   - Caesar cipher implementation");
  console.log("   - Key rotation in encryption");

  console.log("\n3. Game development:");
  console.log("   - Rotate game board");
  console.log("   - Circular player turns");

  console.log("\n4. Data structures:");
  console.log("   - Circular queue operations");
  console.log("   - Ring buffer management");

  console.log("\n5. String algorithms:");
  console.log("   - Check if string is rotation of another");
  console.log("   - Pattern matching with rotations");
}

// Run tests
if (require.main === module) {
  testRotateArray();
  performanceTest();
  visualDemo();
  compareAlgorithms();
  explainPattern();
  explainEdgeCases();
  explainCyclicApproach();
  explainApplications();
}

module.exports = {
  rotateOptimal,
  rotateExtraArray,
  rotateCyclic,
  rotateBruteForce,
  rotateSlice
};
