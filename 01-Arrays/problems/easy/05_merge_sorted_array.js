/**
 * LeetCode 88: Merge Sorted Array
 *
 * Problem: You are given two integer arrays nums1 and nums2, sorted in non-decreasing order,
 * and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 *
 * The final sorted array should not be returned by the function, but instead be stored inside
 * the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements
 * denote the elements that should be merged, and the last n elements are set to 0 and should be ignored.
 * nums2 has a length of n.
 *
 * Pattern: Two Pointers (from end)
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */

// Approach 1: Two Pointers from End (Optimal)
// Start from the end to avoid overwriting elements
function mergeOptimal(nums1, m, nums2, n) {
  let i = m - 1; // pointer for nums1
  let j = n - 1; // pointer for nums2
  let k = m + n - 1; // pointer for merged array position

  // Merge from the end
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  // Copy remaining elements from nums2 (if any)
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }

  // No need to copy remaining from nums1 as they're already in place
  return nums1;
}

// Approach 2: Extra Space (Simpler to understand)
function mergeWithExtraSpace(nums1, m, nums2, n) {
  const temp = [...nums1.slice(0, m)];
  let i = 0,
    j = 0,
    k = 0;

  while (i < m && j < n) {
    if (temp[i] <= nums2[j]) {
      nums1[k] = temp[i];
      i++;
    } else {
      nums1[k] = nums2[j];
      j++;
    }
    k++;
  }

  // Copy remaining elements
  while (i < m) {
    nums1[k] = temp[i];
    i++;
    k++;
  }

  while (j < n) {
    nums1[k] = nums2[j];
    j++;
    k++;
  }

  return nums1;
}

// Approach 3: Using built-in sort (Not optimal but valid)
function mergeUsingSorting(nums1, m, nums2, n) {
  // Copy nums2 to the end of nums1
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }

  // Sort the entire array
  nums1.sort((a, b) => a - b);
  return nums1;
}

// Test cases
function testMergeSortedArray() {
  console.log("Testing Merge Sorted Array...\n");

  const testCases = [
    {
      nums1: [1, 2, 3, 0, 0, 0],
      m: 3,
      nums2: [2, 5, 6],
      n: 3,
      expected: [1, 2, 2, 3, 5, 6]
    },
    {
      nums1: [1],
      m: 1,
      nums2: [],
      n: 0,
      expected: [1]
    },
    {
      nums1: [0],
      m: 0,
      nums2: [1],
      n: 1,
      expected: [1]
    },
    {
      nums1: [4, 5, 6, 0, 0, 0],
      m: 3,
      nums2: [1, 2, 3],
      n: 3,
      expected: [1, 2, 3, 4, 5, 6]
    },
    {
      nums1: [1, 3, 5, 0, 0, 0],
      m: 3,
      nums2: [2, 4, 6],
      n: 3,
      expected: [1, 2, 3, 4, 5, 6]
    }
  ];

  const approaches = [
    { name: "Two Pointers from End", func: mergeOptimal },
    { name: "Extra Space", func: mergeWithExtraSpace },
    { name: "Using Sorting", func: mergeUsingSorting }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const nums1Copy = [...test.nums1];
      const result = approach.func(nums1Copy, test.m, test.nums2, test.n);
      const passed = JSON.stringify(result) === JSON.stringify(test.expected);
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
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
    { name: "Two Pointers from End", func: mergeOptimal },
    { name: "Extra Space", func: mergeWithExtraSpace }
  ];

  sizes.forEach((size) => {
    const m = Math.floor(size / 2);
    const n = size - m;

    console.log(`\nArray size: ${size} (m=${m}, n=${n})`);

    approaches.forEach((approach) => {
      const nums1 = [...Array(m)]
        .map(() => Math.floor(Math.random() * 1000))
        .sort((a, b) => a - b)
        .concat(new Array(n).fill(0));
      const nums2 = [...Array(n)]
        .map(() => Math.floor(Math.random() * 1000))
        .sort((a, b) => a - b);

      const start = performance.now();
      approach.func([...nums1], m, [...nums2], n);
      const end = performance.now();

      console.log(`${approach.name}: ${(end - start).toFixed(4)}ms`);
    });
  });
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Two Pointers from End ---");
  console.log("Key insight: Start from the end to avoid overwriting elements");
  console.log(
    "- Use three pointers: i (nums1 end), j (nums2 end), k (result position)"
  );
  console.log("- Compare elements and place larger one at position k");
  console.log("- Move pointers backward");
  console.log("- Only need to handle remaining nums2 elements explicitly");
  console.log("- Time: O(m + n), Space: O(1)");
}

// Run tests
if (require.main === module) {
  testMergeSortedArray();
  performanceTest();
  explainPattern();
}

module.exports = {
  mergeOptimal,
  mergeWithExtraSpace,
  mergeUsingSorting
};
