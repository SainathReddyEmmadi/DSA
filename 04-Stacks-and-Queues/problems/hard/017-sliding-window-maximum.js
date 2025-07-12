/**
 * 239. Sliding Window Maximum
 * https://leetcode.com/problems/sliding-window-maximum/
 *
 * Given an array nums and a sliding window of size k which is moving from the very left
 * to the very right, return the max sliding window.
 *
 * Example:
 * Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
 * Output: [3,3,5,5,6,7]
 *
 * Patterns: Sliding Window, Monotonic Deque, Stack/Queue
 * Time: O(n), Space: O(k)
 */

// Approach 1: Monotonic Deque (Optimal)
// Use deque to maintain elements in decreasing order
// Time: O(n), Space: O(k)
function maxSlidingWindow(nums, k) {
  if (!nums || nums.length === 0 || k <= 0) return [];

  const result = [];
  const deque = []; // Store indices

  for (let i = 0; i < nums.length; i++) {
    // Remove indices that are out of current window
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // Remove indices whose corresponding values are smaller than current
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // Add to result when window size is k
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// Approach 2: Brute Force (For comparison)
// Time: O(n*k), Space: O(1)
function maxSlidingWindowBruteForce(nums, k) {
  if (!nums || nums.length === 0 || k <= 0) return [];

  const result = [];

  for (let i = 0; i <= nums.length - k; i++) {
    let max = nums[i];
    for (let j = i + 1; j < i + k; j++) {
      max = Math.max(max, nums[j]);
    }
    result.push(max);
  }

  return result;
}

// Approach 3: Using Priority Queue (Max Heap simulation)
// Time: O(n log k), Space: O(k)
function maxSlidingWindowHeap(nums, k) {
  if (!nums || nums.length === 0 || k <= 0) return [];

  const result = [];
  const heap = []; // [value, index] pairs

  // Helper function to maintain max heap property
  function heapify() {
    heap.sort((a, b) => b[0] - a[0]);
  }

  for (let i = 0; i < nums.length; i++) {
    // Add current element
    heap.push([nums[i], i]);
    heapify();

    // Remove elements outside window
    while (heap.length > 0 && heap[0][1] <= i - k) {
      heap.shift();
    }

    // Add to result when window is complete
    if (i >= k - 1) {
      result.push(heap[0][0]);
    }
  }

  return result;
}

// Test cases
function testSlidingWindowMaximum() {
  console.log("Testing Sliding Window Maximum:");

  const testCases = [
    {
      nums: [1, 3, -1, -3, 5, 3, 6, 7],
      k: 3,
      expected: [3, 3, 5, 5, 6, 7]
    },
    {
      nums: [1],
      k: 1,
      expected: [1]
    },
    {
      nums: [1, -1],
      k: 1,
      expected: [1, -1]
    },
    {
      nums: [9, 11],
      k: 2,
      expected: [11]
    },
    {
      nums: [4, -2, -1, 3, 5],
      k: 2,
      expected: [4, -1, 3, 5]
    }
  ];

  testCases.forEach((test, index) => {
    const result1 = maxSlidingWindow(test.nums, test.k);
    const result2 = maxSlidingWindowBruteForce(test.nums, test.k);
    const result3 = maxSlidingWindowHeap(test.nums, test.k);

    const passed1 = JSON.stringify(result1) === JSON.stringify(test.expected);
    const passed2 = JSON.stringify(result2) === JSON.stringify(test.expected);
    const passed3 = JSON.stringify(result3) === JSON.stringify(test.expected);

    console.log(
      `Test ${index + 1}: ${passed1 && passed2 && passed3 ? "PASS" : "FAIL"}`
    );
    console.log(`  Input: nums = [${test.nums}], k = ${test.k}`);
    console.log(`  Expected: [${test.expected}]`);
    console.log(`  Deque: [${result1}]`);
    console.log(`  Brute Force: [${result2}]`);
    console.log(`  Heap: [${result3}]`);
    console.log();
  });
}

// Complexity Analysis:
console.log(`
Complexity Analysis:
1. Monotonic Deque Approach:
   - Time: O(n) - each element added/removed at most once
   - Space: O(k) - deque size at most k

2. Brute Force Approach:
   - Time: O(n*k) - for each window, scan k elements
   - Space: O(1) - no extra space

3. Priority Queue Approach:
   - Time: O(n log k) - n insertions, each O(log k)
   - Space: O(k) - heap size at most k

Key Insights:
- Monotonic deque maintains decreasing order of elements
- Front of deque always contains index of maximum in current window
- Remove indices outside current window from front
- Remove smaller elements from back before adding new element
- This ensures O(1) amortized time per element
`);

// Run tests
testSlidingWindowMaximum();

module.exports = {
  maxSlidingWindow,
  maxSlidingWindowBruteForce,
  maxSlidingWindowHeap
};
