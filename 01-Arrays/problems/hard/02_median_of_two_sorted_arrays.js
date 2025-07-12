/**
 * LeetCode 4: Median of Two Sorted Arrays
 *
 * Problem: Given two sorted arrays nums1 and nums2 of size m and n respectively,
 * return the median of the two arrays. The overall run time complexity should be O(log (m+n)).
 *
 * Pattern: Binary Search
 * Time Complexity: O(log(min(m, n)))
 * Space Complexity: O(1)
 */

// Approach 1: Binary Search (Optimal)
function findMedianSortedArraysOptimal(nums1, nums2) {
  // Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  const totalLength = m + n;
  const half = Math.floor(totalLength / 2);

  let left = 0;
  let right = m;

  while (left <= right) {
    const partitionX = Math.floor((left + right) / 2);
    const partitionY = half - partitionX;

    // Get boundary elements
    const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minRightX = partitionX === m ? Infinity : nums1[partitionX];

    const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minRightY = partitionY === n ? Infinity : nums2[partitionY];

    // Check if we found the correct partition
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      // Found the correct partition
      if (totalLength % 2 === 0) {
        return (
          (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2
        );
      } else {
        return Math.min(minRightX, minRightY);
      }
    } else if (maxLeftX > minRightY) {
      // Too many elements from nums1, move left
      right = partitionX - 1;
    } else {
      // Too few elements from nums1, move right
      left = partitionX + 1;
    }
  }

  throw new Error("Input arrays are not sorted");
}

// Approach 2: Merge and Find (Simple but not optimal)
function findMedianSortedArraysMerge(nums1, nums2) {
  const merged = [];
  let i = 0,
    j = 0;

  // Merge arrays
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      merged.push(nums1[i]);
      i++;
    } else {
      merged.push(nums2[j]);
      j++;
    }
  }

  // Add remaining elements
  while (i < nums1.length) {
    merged.push(nums1[i]);
    i++;
  }

  while (j < nums2.length) {
    merged.push(nums2[j]);
    j++;
  }

  // Find median
  const totalLength = merged.length;
  if (totalLength % 2 === 0) {
    return (merged[totalLength / 2 - 1] + merged[totalLength / 2]) / 2;
  } else {
    return merged[Math.floor(totalLength / 2)];
  }
}

// Approach 3: Partial Merge (Optimized merge)
function findMedianSortedArraysPartialMerge(nums1, nums2) {
  const totalLength = nums1.length + nums2.length;
  const midIndex = Math.floor(totalLength / 2);
  const isEven = totalLength % 2 === 0;

  let i = 0,
    j = 0,
    count = 0;
  let prev = 0,
    curr = 0;

  // Only merge until we reach the median position(s)
  while (count <= midIndex) {
    prev = curr;

    if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
      curr = nums1[i];
      i++;
    } else {
      curr = nums2[j];
      j++;
    }

    count++;
  }

  if (isEven) {
    return (prev + curr) / 2;
  } else {
    return curr;
  }
}

// Approach 4: Recursive Binary Search
function findMedianSortedArraysRecursive(nums1, nums2) {
  function findKth(nums1, start1, nums2, start2, k) {
    // Ensure nums1 is not longer than nums2
    if (nums1.length - start1 > nums2.length - start2) {
      return findKth(nums2, start2, nums1, start1, k);
    }

    // If nums1 is empty, return kth element from nums2
    if (start1 >= nums1.length) {
      return nums2[start2 + k - 1];
    }

    // If k is 1, return minimum of first elements
    if (k === 1) {
      return Math.min(nums1[start1], nums2[start2]);
    }

    // Binary search
    const midK = Math.floor(k / 2);
    const mid1 = Math.min(start1 + midK - 1, nums1.length - 1);
    const mid2 = start2 + midK - 1;

    if (nums1[mid1] < nums2[mid2]) {
      return findKth(nums1, mid1 + 1, nums2, start2, k - (mid1 - start1 + 1));
    } else {
      return findKth(nums1, start1, nums2, mid2 + 1, k - midK);
    }
  }

  const totalLength = nums1.length + nums2.length;

  if (totalLength % 2 === 1) {
    return findKth(nums1, 0, nums2, 0, Math.floor(totalLength / 2) + 1);
  } else {
    const left = findKth(nums1, 0, nums2, 0, totalLength / 2);
    const right = findKth(nums1, 0, nums2, 0, totalLength / 2 + 1);
    return (left + right) / 2;
  }
}

// Test cases
function testFindMedian() {
  console.log("Testing Median of Two Sorted Arrays...\n");

  const testCases = [
    {
      nums1: [1, 3],
      nums2: [2],
      expected: 2.0
    },
    {
      nums1: [1, 2],
      nums2: [3, 4],
      expected: 2.5
    },
    {
      nums1: [],
      nums2: [1],
      expected: 1.0
    },
    {
      nums1: [2],
      nums2: [],
      expected: 2.0
    },
    {
      nums1: [1, 3, 5],
      nums2: [2, 4, 6],
      expected: 3.5
    },
    {
      nums1: [1, 2, 3, 4],
      nums2: [5, 6, 7, 8],
      expected: 4.5
    },
    {
      nums1: [1],
      nums2: [2, 3, 4],
      expected: 2.5
    },
    {
      nums1: [1, 1, 1],
      nums2: [1, 1, 1],
      expected: 1.0
    }
  ];

  const approaches = [
    { name: "Binary Search Optimal", func: findMedianSortedArraysOptimal },
    { name: "Merge Arrays", func: findMedianSortedArraysMerge },
    { name: "Partial Merge", func: findMedianSortedArraysPartialMerge },
    { name: "Recursive Binary Search", func: findMedianSortedArraysRecursive }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.nums1], [...test.nums2]);
      const passed = Math.abs(result - test.expected) < 0.0001;
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  nums1:    [${test.nums1}]`);
        console.log(`  nums2:    [${test.nums2}]`);
        console.log(`  Expected: ${test.expected}`);
        console.log(`  Got:      ${result}`);
      }
    });
  });
}

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [
    [100, 100],
    [500, 300],
    [1000, 800]
  ];
  const approaches = [
    { name: "Binary Search", func: findMedianSortedArraysOptimal },
    { name: "Partial Merge", func: findMedianSortedArraysPartialMerge }
  ];

  sizes.forEach(([size1, size2]) => {
    console.log(`\nArray sizes: ${size1}, ${size2}`);

    approaches.forEach((approach) => {
      // Create sorted arrays
      const nums1 = [];
      const nums2 = [];

      for (let i = 0; i < size1; i++) {
        nums1.push(i * 2); // Even numbers
      }

      for (let i = 0; i < size2; i++) {
        nums2.push(i * 2 + 1); // Odd numbers
      }

      const start = performance.now();
      approach.func([...nums1], [...nums2]);
      const end = performance.now();

      console.log(`${approach.name}: ${(end - start).toFixed(4)}ms`);
    });
  });
}

// Visual demonstration
function visualDemo() {
  console.log("\n--- Visual Demonstration ---");
  console.log("Example: nums1 = [1, 3], nums2 = [2]");

  const nums1 = [1, 3];
  const nums2 = [2];

  console.log("Step 1: Understand the problem");
  console.log("Combined array would be: [1, 2, 3]");
  console.log("Length = 3 (odd), so median = middle element = 2");

  console.log("\nStep 2: Binary search approach");
  console.log("Total length = 3, half = 1");
  console.log("We need to partition arrays so that:");
  console.log("- Left partition has 1 element");
  console.log("- Right partition has 2 elements");

  console.log("\nTry partition: nums1[0:0], nums2[0:1]");
  console.log("Left partition: [] from nums1, [2] from nums2");
  console.log("Right partition: [1, 3] from nums1, [] from nums2");
  console.log("This gives us median = min(1, ∞) = 1 (incorrect)");

  console.log("\nTry partition: nums1[0:1], nums2[0:0]");
  console.log("Left partition: [1] from nums1, [] from nums2");
  console.log("Right partition: [3] from nums1, [2] from nums2");
  console.log("Check: 1 ≤ 2 ✓ and -∞ ≤ 3 ✓");
  console.log("Median = min(3, 2) = 2 ✓");
}

// Algorithm explanation
function explainAlgorithm() {
  console.log("\n--- Binary Search Algorithm ---");
  console.log("Key insight: Find the correct way to partition both arrays");
  console.log("");
  console.log("Partition rules:");
  console.log("1. Left partition should have (m+n+1)/2 elements");
  console.log("2. All elements in left ≤ all elements in right");
  console.log("3. max(leftPartition) ≤ min(rightPartition)");
  console.log("");
  console.log("Binary search on the smaller array:");
  console.log("- Try different partition points");
  console.log("- Check if partition satisfies the conditions");
  console.log("- Adjust partition based on comparison");
  console.log("");
  console.log("Time complexity: O(log(min(m, n)))");
  console.log("Space complexity: O(1)");
}

// Edge cases explanation
function explainEdgeCases() {
  console.log("\n--- Edge Cases ---");

  console.log("1. One array is empty:");
  console.log("   - Simply find median of the non-empty array");
  console.log("   - No partitioning needed");

  console.log("\n2. Arrays have same elements:");
  console.log("   - Median will be one of the common values");
  console.log("   - Algorithm still works correctly");

  console.log("\n3. No overlap between arrays:");
  console.log("   - e.g., [1, 2] and [3, 4]");
  console.log(
    "   - Median might be average of last element of first array and first element of second"
  );

  console.log("\n4. Different sizes:");
  console.log("   - Always binary search on smaller array");
  console.log("   - Reduces search space effectively");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Binary Search on Answer ---");
  console.log('This problem uses "binary search on answer" pattern:');
  console.log(
    "- Instead of searching for an element, search for partition point"
  );
  console.log("- Each partition represents a potential solution");
  console.log("- Use conditions to determine if partition is valid");
  console.log("- Adjust search space based on validation");
  console.log("");
  console.log("Similar problems:");
  console.log("- Kth smallest element in sorted matrix");
  console.log("- Split array largest sum");
  console.log("- Minimum in rotated sorted array");
}

// Comparison of approaches
function compareApproaches() {
  console.log("\n--- Approach Comparison ---");

  console.log("1. Binary Search:");
  console.log("   - Time: O(log(min(m, n)))");
  console.log("   - Space: O(1)");
  console.log("   - Most efficient, meets problem requirement");

  console.log("\n2. Full Merge:");
  console.log("   - Time: O(m + n)");
  console.log("   - Space: O(m + n)");
  console.log("   - Simple but not optimal");

  console.log("\n3. Partial Merge:");
  console.log("   - Time: O((m + n) / 2)");
  console.log("   - Space: O(1)");
  console.log("   - Better than full merge but still not optimal");

  console.log("\n4. Recursive Binary Search:");
  console.log("   - Time: O(log(min(m, n)))");
  console.log("   - Space: O(log(min(m, n))) due to recursion");
  console.log("   - Alternative implementation of binary search");
}

// Run tests
if (require.main === module) {
  testFindMedian();
  performanceTest();
  visualDemo();
  explainAlgorithm();
  explainEdgeCases();
  explainPattern();
  compareApproaches();
}

module.exports = {
  findMedianSortedArraysOptimal,
  findMedianSortedArraysMerge,
  findMedianSortedArraysPartialMerge,
  findMedianSortedArraysRecursive
};
