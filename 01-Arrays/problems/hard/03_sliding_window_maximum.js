/**
 * LeetCode 239: Sliding Window Maximum
 *
 * Problem: You are given an array of integers nums and an integer k.
 * There is a sliding window of size k which is moving from the very left of the array
 * to the very right. You can only see the k numbers in the window.
 * Each time the sliding window moves right by one position.
 * Return the max sliding window.
 *
 * Pattern: Sliding Window + Deque
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */

// Approach 1: Deque (Optimal)
function maxSlidingWindowOptimal(nums, k) {
  const result = [];
  const deque = []; // Store indices, not values

  for (let i = 0; i < nums.length; i++) {
    // Remove indices that are out of current window
    while (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    // Remove indices whose corresponding values are smaller than current
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }

    // Add current index
    deque.push(i);

    // Add to result if window is complete
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// Approach 2: Brute Force (For comparison)
function maxSlidingWindowBruteForce(nums, k) {
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

// Approach 3: Heap/Priority Queue simulation
function maxSlidingWindowHeap(nums, k) {
  const result = [];

  // Simple heap implementation using array
  class MaxHeap {
    constructor() {
      this.heap = [];
    }

    push(val, index) {
      this.heap.push({ val, index });
      this.heapifyUp(this.heap.length - 1);
    }

    pop() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();

      const max = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown(0);
      return max;
    }

    peek() {
      return this.heap.length > 0 ? this.heap[0] : null;
    }

    heapifyUp(index) {
      if (index === 0) return;
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].val > this.heap[parentIndex].val) {
        [this.heap[index], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[index]
        ];
        this.heapifyUp(parentIndex);
      }
    }

    heapifyDown(index) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let largest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild].val > this.heap[largest].val
      ) {
        largest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].val > this.heap[largest].val
      ) {
        largest = rightChild;
      }

      if (largest !== index) {
        [this.heap[index], this.heap[largest]] = [
          this.heap[largest],
          this.heap[index]
        ];
        this.heapifyDown(largest);
      }
    }
  }

  const heap = new MaxHeap();

  // Add first k elements
  for (let i = 0; i < k; i++) {
    heap.push(nums[i], i);
  }

  // Remove elements outside window and get max
  while (heap.peek() && heap.peek().index < 0) {
    heap.pop();
  }
  result.push(heap.peek().val);

  // Process remaining elements
  for (let i = k; i < nums.length; i++) {
    heap.push(nums[i], i);

    // Remove elements outside current window
    while (heap.peek() && heap.peek().index <= i - k) {
      heap.pop();
    }

    result.push(heap.peek().val);
  }

  return result;
}

// Approach 4: Block Maximum (Advanced)
function maxSlidingWindowBlock(nums, k) {
  const n = nums.length;
  if (n === 0 || k === 0) return [];
  if (k === 1) return nums;

  // Precompute left and right maximums for each block
  const left = new Array(n);
  const right = new Array(n);

  // Fill left array (block maximums from left)
  left[0] = nums[0];
  for (let i = 1; i < n; i++) {
    if (i % k === 0) {
      left[i] = nums[i];
    } else {
      left[i] = Math.max(left[i - 1], nums[i]);
    }
  }

  // Fill right array (block maximums from right)
  right[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    if ((i + 1) % k === 0) {
      right[i] = nums[i];
    } else {
      right[i] = Math.max(right[i + 1], nums[i]);
    }
  }

  // Calculate result
  const result = [];
  for (let i = 0; i <= n - k; i++) {
    result.push(Math.max(right[i], left[i + k - 1]));
  }

  return result;
}

// Approach 5: Two Stacks method
function maxSlidingWindowTwoStacks(nums, k) {
  if (k === 1) return nums;

  const result = [];
  let left = 0;

  const maxQueue = {
    stack1: [], // [value, max]
    stack2: [], // [value, max]

    push(val) {
      const max1 = this.stack1.length
        ? this.stack1[this.stack1.length - 1][1]
        : -Infinity;
      this.stack1.push([val, Math.max(val, max1)]);
    },

    pop() {
      if (this.stack2.length === 0) {
        while (this.stack1.length) {
          const val = this.stack1.pop()[0];
          const max2 = this.stack2.length
            ? this.stack2[this.stack2.length - 1][1]
            : -Infinity;
          this.stack2.push([val, Math.max(val, max2)]);
        }
      }
      return this.stack2.length ? this.stack2.pop()[0] : null;
    },

    getMax() {
      const max1 = this.stack1.length
        ? this.stack1[this.stack1.length - 1][1]
        : -Infinity;
      const max2 = this.stack2.length
        ? this.stack2[this.stack2.length - 1][1]
        : -Infinity;
      return Math.max(max1, max2);
    }
  };

  // Initialize first window
  for (let i = 0; i < k; i++) {
    maxQueue.push(nums[i]);
  }
  result.push(maxQueue.getMax());

  // Slide window
  for (let right = k; right < nums.length; right++) {
    maxQueue.pop(); // Remove leftmost element
    maxQueue.push(nums[right]); // Add rightmost element
    result.push(maxQueue.getMax());
  }

  return result;
}

// Test cases
function testMaxSlidingWindow() {
  console.log("Testing Sliding Window Maximum...\n");

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
      nums: [4, -2, -3, 4, -1, 2, 1, -5, 4],
      k: 4,
      expected: [4, 4, 4, 4, 2, 2]
    },
    {
      nums: [1, 3, 1, 2, 0, 5],
      k: 3,
      expected: [3, 3, 2, 5]
    },
    {
      nums: [7, 2, 4],
      k: 2,
      expected: [7, 4]
    }
  ];

  const approaches = [
    { name: "Deque Optimal", func: maxSlidingWindowOptimal },
    { name: "Brute Force", func: maxSlidingWindowBruteForce },
    { name: "Block Maximum", func: maxSlidingWindowBlock }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.nums], test.k);
      const passed = JSON.stringify(result) === JSON.stringify(test.expected);
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  nums:     [${test.nums}]`);
        console.log(`  k:        ${test.k}`);
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
  const kValues = [10, 50, 100];

  const approaches = [
    { name: "Deque Optimal", func: maxSlidingWindowOptimal },
    { name: "Block Maximum", func: maxSlidingWindowBlock }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    kValues.forEach((k) => {
      if (k > size) return;

      console.log(`  Window size: ${k}`);

      approaches.forEach((approach) => {
        const nums = [];
        for (let i = 0; i < size; i++) {
          nums.push(Math.floor(Math.random() * 1000));
        }

        const start = performance.now();
        approach.func([...nums], k);
        const end = performance.now();

        console.log(`    ${approach.name}: ${(end - start).toFixed(4)}ms`);
      });
    });
  });
}

// Visual demonstration
function visualDemo() {
  console.log("\n--- Visual Demonstration ---");
  console.log("Example: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3");
  console.log("");

  const nums = [1, 3, -1, -3, 5, 3, 6, 7];
  const k = 3;

  console.log("Windows and their maximums:");
  for (let i = 0; i <= nums.length - k; i++) {
    const window = nums.slice(i, i + k);
    const max = Math.max(...window);
    console.log(`Window [${window.join(", ")}]: max = ${max}`);
  }

  console.log("\nDeque process:");
  const deque = [];
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove out-of-window indices
    while (deque.length && deque[0] <= i - k) {
      const removed = deque.shift();
      console.log(`Remove index ${removed} (out of window)`);
    }

    // Remove smaller elements
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
      const removed = deque.pop();
      console.log(
        `Remove index ${removed} (nums[${removed}]=${nums[removed]} <= nums[${i}]=${nums[i]})`
      );
    }

    deque.push(i);
    console.log(
      `Add index ${i} (nums[${i}]=${nums[i]}), deque: [${deque.join(", ")}]`
    );

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
      console.log(
        `Window complete, max = nums[${deque[0]}] = ${nums[deque[0]]}`
      );
    }
    console.log("");
  }

  console.log(`Final result: [${result.join(", ")}]`);
}

// Algorithm explanation
function explainAlgorithm() {
  console.log("\n--- Deque Algorithm Explanation ---");
  console.log("Key insight: Maintain potential maximums in decreasing order");
  console.log("");
  console.log("Deque properties:");
  console.log("1. Stores indices, not values");
  console.log("2. Front always contains index of current maximum");
  console.log("3. Elements are in decreasing order of their values");
  console.log("4. No element older than window size");
  console.log("");
  console.log("For each element:");
  console.log("1. Remove indices outside current window (from front)");
  console.log("2. Remove indices with smaller values (from back)");
  console.log("3. Add current index (to back)");
  console.log("4. Front index gives maximum for current window");
  console.log("");
  console.log("Time: O(n) - each element added and removed at most once");
  console.log("Space: O(k) - deque size limited by window size");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Sliding Window + Monotonic Deque ---");
  console.log("When to use:");
  console.log("- Need to track min/max in sliding windows");
  console.log("- Window size is fixed");
  console.log("- Need to efficiently add/remove elements from both ends");
  console.log("");
  console.log("Monotonic deque maintains:");
  console.log("- Decreasing order for maximum queries");
  console.log("- Increasing order for minimum queries");
  console.log("- Elements that could potentially be answer");
  console.log("");
  console.log("Similar problems:");
  console.log("- Sliding window minimum");
  console.log("- Shortest subarray with sum at least K");
  console.log("- Constrained subsequence sum");
}

// Edge cases and optimizations
function explainOptimizations() {
  console.log("\n--- Edge Cases and Optimizations ---");

  console.log("Edge cases:");
  console.log("1. k = 1: Every element is its own maximum");
  console.log("2. k = n: Single window covering entire array");
  console.log("3. Array with duplicates: Handle equal values correctly");
  console.log("4. Empty array: Return empty result");

  console.log("\nOptimizations:");
  console.log("1. Use deque instead of priority queue (better performance)");
  console.log("2. Store indices instead of values (easier window management)");
  console.log("3. Block maximum approach for very large k");
  console.log("4. Early termination if all elements are in decreasing order");
}

// Real-world applications
function explainApplications() {
  console.log("\n--- Real-world Applications ---");
  console.log("1. Stock market analysis:");
  console.log("   - Track maximum price in sliding time windows");
  console.log("   - Identify price patterns and trends");

  console.log("\n2. System monitoring:");
  console.log("   - Monitor peak CPU/memory usage in time windows");
  console.log("   - Alert on unusual resource consumption");

  console.log("\n3. Game development:");
  console.log("   - Track maximum score in recent moves");
  console.log("   - Difficulty adjustment based on recent performance");

  console.log("\n4. Image processing:");
  console.log("   - Maximum filter for noise reduction");
  console.log("   - Feature detection in sliding windows");
}

// Run tests
if (require.main === module) {
  testMaxSlidingWindow();
  performanceTest();
  visualDemo();
  explainAlgorithm();
  explainPattern();
  explainOptimizations();
  explainApplications();
}

module.exports = {
  maxSlidingWindowOptimal,
  maxSlidingWindowBruteForce,
  maxSlidingWindowHeap,
  maxSlidingWindowBlock,
  maxSlidingWindowTwoStacks
};
