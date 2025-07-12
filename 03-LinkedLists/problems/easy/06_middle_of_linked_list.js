/**
 * Middle of the Linked List (LeetCode 876)
 * Difficulty: Easy
 *
 * Given the head of a singly linked list, return the middle node of the linked list.
 * If there are two middle nodes, return the second middle node.
 *
 * Pattern: Two Pointers (Slow/Fast)
 *
 * Examples:
 * Input: head = [1,2,3,4,5]
 * Output: [3,4,5] (node with value 3)
 *
 * Input: head = [1,2,3,4,5,6]
 * Output: [4,5,6] (node with value 4, second middle)
 *
 * Input: head = [1]
 * Output: [1]
 */

const {
  ListNode,
  arrayToList,
  listToArray
} = require("./01_reverse_linked_list.js");

/**
 * Approach 1: Two Pointers - Slow and Fast (Optimal)
 * Time: O(n), Space: O(1)
 *
 * Slow moves 1 step, fast moves 2 steps. When fast reaches end, slow is at middle.
 */
function middleNode(head) {
  let slow = head;
  let fast = head;

  // Fast moves 2 steps, slow moves 1 step
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow; // Slow is at the middle (or second middle for even length)
}

/**
 * Approach 2: Two Pass - Count Length First
 * Time: O(n), Space: O(1)
 *
 * First pass to count length, second pass to find middle.
 */
function middleNodeTwoPass(head) {
  if (!head) return null;

  // First pass: count length
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }

  // Second pass: go to middle
  const middleIndex = Math.floor(length / 2);
  current = head;
  for (let i = 0; i < middleIndex; i++) {
    current = current.next;
  }

  return current;
}

/**
 * Approach 3: Array Conversion (Less Efficient)
 * Time: O(n), Space: O(n)
 *
 * Convert to array, then access middle by index.
 */
function middleNodeArray(head) {
  const nodes = [];
  let current = head;

  while (current) {
    nodes.push(current);
    current = current.next;
  }

  if (nodes.length === 0) return null;

  const middleIndex = Math.floor(nodes.length / 2);
  return nodes[middleIndex];
}

/**
 * Approach 4: Stack-based (For learning purposes)
 * Time: O(n), Space: O(n)
 *
 * Use stack to find middle after knowing the length.
 */
function middleNodeStack(head) {
  if (!head) return null;

  const stack = [];
  let current = head;

  // Push all nodes to stack
  while (current) {
    stack.push(current);
    current = current.next;
  }

  // Calculate middle index and return
  const middleIndex = Math.floor(stack.length / 2);
  return stack[middleIndex];
}

/**
 * Variant: Get both middle nodes for even length lists
 * Returns array with [firstMiddle, secondMiddle] for even length
 * Returns array with [middle] for odd length
 */
function getMiddleNodes(head) {
  if (!head) return [];
  if (!head.next) return [head];

  let slow = head;
  let fast = head;
  let prev = null;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  // If fast is null, even length - return both middle nodes
  if (!fast) {
    return [prev, slow];
  }
  // If fast.next is null, odd length - return single middle
  return [slow];
}

/**
 * Helper: Get middle value(s) instead of node(s)
 */
function getMiddleValues(head) {
  const middleNodes = getMiddleNodes(head);
  return middleNodes.map((node) => node.val);
}

/**
 * Advanced: Split list at middle
 * Returns {firstHalf, secondHalf}
 */
function splitAtMiddle(head) {
  if (!head) return { firstHalf: null, secondHalf: null };
  if (!head.next) return { firstHalf: head, secondHalf: null };

  let slow = head;
  let fast = head;
  let prev = null;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  // Break the connection
  if (prev) {
    prev.next = null;
  }

  return {
    firstHalf: head,
    secondHalf: slow
  };
}

/**
 * Helper: Check if list has even or odd length
 */
function isEvenLength(head) {
  let fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
  }
  return !fast; // If fast is null, even length
}

// Test cases
function runTests() {
  console.log("Testing Middle of the Linked List:");

  const testCases = [
    {
      input: [1, 2, 3, 4, 5],
      expectedValue: 3,
      expectedFromIndex: 2,
      description: "Odd length list (5 nodes)"
    },
    {
      input: [1, 2, 3, 4, 5, 6],
      expectedValue: 4,
      expectedFromIndex: 3,
      description: "Even length list (6 nodes) - second middle"
    },
    {
      input: [1],
      expectedValue: 1,
      expectedFromIndex: 0,
      description: "Single node"
    },
    {
      input: [1, 2],
      expectedValue: 2,
      expectedFromIndex: 1,
      description: "Two nodes - second middle"
    },
    {
      input: [1, 2, 3],
      expectedValue: 2,
      expectedFromIndex: 1,
      description: "Three nodes"
    },
    {
      input: [1, 2, 3, 4],
      expectedValue: 3,
      expectedFromIndex: 2,
      description: "Four nodes - second middle"
    }
  ];

  testCases.forEach((test, index) => {
    const list1 = arrayToList(test.input);
    const list2 = arrayToList(test.input);
    const list3 = arrayToList(test.input);
    const list4 = arrayToList(test.input);

    const result1 = middleNode(list1);
    const result2 = middleNodeTwoPass(list2);
    const result3 = middleNodeArray(list3);
    const result4 = middleNodeStack(list4);

    const value1 = result1 ? result1.val : null;
    const value2 = result2 ? result2.val : null;
    const value3 = result3 ? result3.val : null;
    const value4 = result4 ? result4.val : null;

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}]`);
    console.log(`Expected middle value: ${test.expectedValue}`);
    console.log(
      `Two Pointers: ${value1} ${value1 === test.expectedValue ? "✓" : "✗"}`
    );
    console.log(
      `Two Pass: ${value2} ${value2 === test.expectedValue ? "✓" : "✗"}`
    );
    console.log(
      `Array: ${value3} ${value3 === test.expectedValue ? "✓" : "✗"}`
    );
    console.log(
      `Stack: ${value4} ${value4 === test.expectedValue ? "✓" : "✗"}`
    );

    // Test additional functions
    const listForMiddles = arrayToList(test.input);
    const middleValues = getMiddleValues(listForMiddles);
    console.log(`Middle value(s): [${middleValues.join(", ")}]`);

    const listForSplit = arrayToList(test.input);
    const { firstHalf, secondHalf } = splitAtMiddle(listForSplit);
    const firstHalfArray = listToArray(firstHalf);
    const secondHalfArray = listToArray(secondHalf);
    console.log(
      `Split: First=[${firstHalfArray.join(
        ", "
      )}], Second=[${secondHalfArray.join(", ")}]`
    );

    const listForLength = arrayToList(test.input);
    const isEven = isEvenLength(listForLength);
    console.log(`Length is ${isEven ? "even" : "odd"}`);
  });
}

// Performance test
function performanceTest() {
  console.log("\\n\\nPerformance Test:");

  const sizes = [1000, 10000, 100000];

  sizes.forEach((size) => {
    const arr = Array.from({ length: size }, (_, i) => i + 1);

    console.log(`\\nList size: ${size}`);

    // Test Two Pointers
    let list = arrayToList(arr);
    let start = performance.now();
    middleNode(list);
    let end = performance.now();
    console.log(`Two Pointers: ${(end - start).toFixed(2)}ms`);

    // Test Two Pass
    list = arrayToList(arr);
    start = performance.now();
    middleNodeTwoPass(list);
    end = performance.now();
    console.log(`Two Pass: ${(end - start).toFixed(2)}ms`);

    // Test Array (for smaller sizes)
    if (size <= 10000) {
      list = arrayToList(arr);
      start = performance.now();
      middleNodeArray(list);
      end = performance.now();
      console.log(`Array: ${(end - start).toFixed(2)}ms`);
    }

    // Test Stack (for smaller sizes)
    if (size <= 10000) {
      list = arrayToList(arr);
      start = performance.now();
      middleNodeStack(list);
      end = performance.now();
      console.log(`Stack: ${(end - start).toFixed(2)}ms`);
    }

    // Test split operation
    list = arrayToList(arr);
    start = performance.now();
    splitAtMiddle(list);
    end = performance.now();
    console.log(`Split at Middle: ${(end - start).toFixed(2)}ms`);
  });
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Middle of the Linked List - Algorithm Explanation:

The goal is to find the middle node of a linked list efficiently.

Two Pointers Approach (Optimal):
1. Use slow and fast pointers, both starting at head
2. Slow moves 1 step at a time, fast moves 2 steps at a time
3. When fast reaches the end, slow is at the middle

Why it works:
- Fast pointer covers 2x the distance of slow pointer
- When fast reaches end (after n/2 iterations), slow has moved n/2 steps
- For odd length: slow points to exact middle
- For even length: slow points to second middle node

Mathematical insight:
- Odd length (2k+1): After k iterations, slow at position k (middle)
- Even length (2k): After k iterations, slow at position k (second middle)

Example walkthrough:
List: 1 → 2 → 3 → 4 → 5

Iteration 0: slow=1, fast=1
Iteration 1: slow=2, fast=3
Iteration 2: slow=3, fast=5
Iteration 3: fast.next=null, stop. slow=3 (middle)

List: 1 → 2 → 3 → 4 → 5 → 6

Iteration 0: slow=1, fast=1
Iteration 1: slow=2, fast=3
Iteration 2: slow=3, fast=5
Iteration 3: slow=4, fast=null, stop. slow=4 (second middle)

Alternative Approaches:
1. Two Pass: Count length first, then traverse to middle
2. Array Conversion: Store all nodes, access by index
3. Stack: Push all nodes, calculate middle index

Time Complexity: O(n) for all approaches
Space Complexity:
- Two Pointers: O(1)
- Two Pass: O(1)
- Array/Stack: O(n)

Applications:
- Binary search on linked lists
- Merge sort on linked lists (divide step)
- Finding median in data streams
- Load balancing (split workload)
- Palindrome checking (compare first and second half)

Pattern: This demonstrates the "slow/fast pointers" technique, which is
fundamental for many linked list problems involving finding positions,
detecting cycles, and dividing lists.
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  middleNode,
  middleNodeTwoPass,
  middleNodeArray,
  middleNodeStack,
  getMiddleNodes,
  getMiddleValues,
  splitAtMiddle,
  isEvenLength
};
