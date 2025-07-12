/**
 * Merge k Sorted Lists (LeetCode 23)
 * Difficulty: Hard
 *
 * You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 *
 * Examples:
 * Input: lists = [[1,4,5],[1,3,4],[2,6]]
 * Output: [1,1,2,3,4,4,5,6]
 *
 * Input: lists = []
 * Output: []
 *
 * Input: lists = [[]]
 * Output: []
 */

const {
  ListNode,
  arrayToList,
  listToArray
} = require("../easy/01_reverse_linked_list.js");
const { mergeTwoLists } = require("../easy/02_merge_two_sorted_lists.js");

/**
 * Approach 1: Divide and Conquer (Optimal)
 * Time: O(N log k), Space: O(log k)
 * where N is total number of nodes, k is number of lists
 */
function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;

  while (lists.length > 1) {
    const mergedLists = [];

    // Merge pairs of lists
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      mergedLists.push(mergeTwoLists(l1, l2));
    }

    lists = mergedLists;
  }

  return lists[0];
}

/**
 * Approach 2: Priority Queue/Min Heap Simulation
 * Time: O(N log k), Space: O(k)
 */
function mergeKListsHeap(lists) {
  if (!lists || lists.length === 0) return null;

  // Simple heap implementation for nodes
  class MinHeap {
    constructor() {
      this.heap = [];
    }

    push(node) {
      this.heap.push(node);
      this.heapifyUp(this.heap.length - 1);
    }

    pop() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();

      const min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown(0);
      return min;
    }

    isEmpty() {
      return this.heap.length === 0;
    }

    heapifyUp(index) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (
        parentIndex >= 0 &&
        this.heap[parentIndex].val > this.heap[index].val
      ) {
        [this.heap[parentIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[parentIndex]
        ];
        this.heapifyUp(parentIndex);
      }
    }

    heapifyDown(index) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild].val < this.heap[smallest].val
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].val < this.heap[smallest].val
      ) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        [this.heap[smallest], this.heap[index]] = [
          this.heap[index],
          this.heap[smallest]
        ];
        this.heapifyDown(smallest);
      }
    }
  }

  const heap = new MinHeap();

  // Add first node of each list to heap
  for (const list of lists) {
    if (list) {
      heap.push(list);
    }
  }

  const dummy = new ListNode(0);
  let current = dummy;

  while (!heap.isEmpty()) {
    const node = heap.pop();
    current.next = node;
    current = current.next;

    if (node.next) {
      heap.push(node.next);
    }
  }

  return dummy.next;
}

/**
 * Approach 3: Sequential Merging (Brute Force)
 * Time: O(N * k), Space: O(1)
 */
function mergeKListsSequential(lists) {
  if (!lists || lists.length === 0) return null;

  let result = lists[0];
  for (let i = 1; i < lists.length; i++) {
    result = mergeTwoLists(result, lists[i]);
  }

  return result;
}

/**
 * Approach 4: Collect and Sort (Alternative)
 * Time: O(N log N), Space: O(N)
 */
function mergeKListsSort(lists) {
  const values = [];

  // Collect all values
  for (const list of lists) {
    let current = list;
    while (current) {
      values.push(current.val);
      current = current.next;
    }
  }

  // Sort and create new list
  values.sort((a, b) => a - b);

  if (values.length === 0) return null;

  const dummy = new ListNode(0);
  let current = dummy;

  for (const val of values) {
    current.next = new ListNode(val);
    current = current.next;
  }

  return dummy.next;
}

// Test cases
function runTests() {
  console.log("Testing Merge k Sorted Lists:");

  const testCases = [
    {
      input: [
        [1, 4, 5],
        [1, 3, 4],
        [2, 6]
      ],
      expected: [1, 1, 2, 3, 4, 4, 5, 6],
      description: "Standard case with 3 lists"
    },
    {
      input: [],
      expected: [],
      description: "Empty input"
    },
    {
      input: [[]],
      expected: [],
      description: "Single empty list"
    },
    {
      input: [[1], [2], [3]],
      expected: [1, 2, 3],
      description: "Single element lists"
    },
    {
      input: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      expected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      description: "Non-overlapping ranges"
    }
  ];

  testCases.forEach((test, index) => {
    const lists1 = test.input.map((arr) => arrayToList(arr));
    const lists2 = test.input.map((arr) => arrayToList(arr));
    const lists3 = test.input.map((arr) => arrayToList(arr));
    const lists4 = test.input.map((arr) => arrayToList(arr));

    const result1 = listToArray(mergeKLists(lists1));
    const result2 = listToArray(mergeKListsHeap(lists2));
    const result3 = listToArray(mergeKListsSequential(lists3));
    const result4 = listToArray(mergeKListsSort(lists4));

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: ${JSON.stringify(test.input)}`);
    console.log(`Expected: [${test.expected.join(", ")}]`);
    console.log(
      `Divide & Conquer: [${result1.join(", ")}] ${
        JSON.stringify(result1) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Heap: [${result2.join(", ")}] ${
        JSON.stringify(result2) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Sequential: [${result3.join(", ")}] ${
        JSON.stringify(result3) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Sort: [${result4.join(", ")}] ${
        JSON.stringify(result4) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
  });
}

// Performance test
function performanceTest() {
  console.log("\\n\\nPerformance Test:");

  const k = 100; // Number of lists
  const listLength = 100; // Length of each list

  // Create k sorted lists
  const lists = [];
  for (let i = 0; i < k; i++) {
    const arr = Array.from(
      { length: listLength },
      (_, j) => i * listLength + j
    );
    lists.push(arrayToList(arr));
  }

  console.log(`Testing with ${k} lists of length ${listLength} each`);

  // Test Divide and Conquer
  const lists1 = lists.map((list) => {
    // Deep copy the list
    const arr = listToArray(list);
    return arrayToList(arr);
  });

  let start = performance.now();
  mergeKLists(lists1);
  let end = performance.now();
  console.log(`Divide & Conquer: ${(end - start).toFixed(2)}ms`);

  // Test Sequential (for smaller input)
  if (k <= 10) {
    const lists3 = lists.slice(0, 10).map((list) => {
      const arr = listToArray(list);
      return arrayToList(arr);
    });

    start = performance.now();
    mergeKListsSequential(lists3);
    end = performance.now();
    console.log(`Sequential (k=10): ${(end - start).toFixed(2)}ms`);
  }
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Merge k Sorted Lists - Algorithm Explanation:

Divide and Conquer Approach (Optimal):
1. Pair up k lists and merge each pair
2. After first round, we have k/2 lists
3. Repeat until only one list remains
4. Uses the efficient mergeTwoLists function

Time Complexity: O(N log k) where N = total nodes, k = number of lists
- Each node is processed log k times (height of divide tree)
- Each merge operation is O(length of lists being merged)

Space Complexity: O(log k) for recursion stack

Priority Queue/Heap Approach:
1. Add first node of each list to min heap
2. Extract minimum, add to result
3. Add next node of extracted node's list to heap
4. Repeat until heap is empty

Sequential Merging (Brute Force):
- Merge lists one by one: merge(merge(l1, l2), l3), etc.
- Time: O(N * k) - each node processed k times on average

The divide and conquer approach is optimal because it minimizes
the number of times each node is processed.
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  mergeKLists,
  mergeKListsHeap,
  mergeKListsSequential,
  mergeKListsSort
};
