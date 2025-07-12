/**
 * Reverse Linked List (LeetCode 206)
 * Difficulty: Easy
 *
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 *
 * Pattern: Two Pointers / Recursion
 *
 * Examples:
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 *
 * Input: head = [1,2]
 * Output: [2,1]
 *
 * Input: head = []
 * Output: []
 */

// Definition for singly-linked list
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * Approach 1: Iterative (Optimal)
 * Time: O(n), Space: O(1)
 *
 * Use three pointers to reverse the links iteratively.
 */
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextTemp = current.next; // Store next node
    current.next = prev; // Reverse the link
    prev = current; // Move prev forward
    current = nextTemp; // Move current forward
  }

  return prev; // prev is the new head
}

/**
 * Approach 2: Recursive (Alternative)
 * Time: O(n), Space: O(n) - due to call stack
 *
 * Recursively reverse the list from the end.
 */
function reverseListRecursive(head) {
  // Base case
  if (head === null || head.next === null) {
    return head;
  }

  // Recursively reverse the rest
  const reversedHead = reverseListRecursive(head.next);

  // Reverse the current connection
  head.next.next = head;
  head.next = null;

  return reversedHead;
}

/**
 * Approach 3: Using Stack (For learning)
 * Time: O(n), Space: O(n)
 *
 * Push all nodes to stack, then pop to create reversed list.
 */
function reverseListStack(head) {
  if (!head) return null;

  const stack = [];
  let current = head;

  // Push all nodes to stack
  while (current) {
    stack.push(current);
    current = current.next;
  }

  // Pop from stack to create reversed list
  const newHead = stack.pop();
  current = newHead;

  while (stack.length > 0) {
    current.next = stack.pop();
    current = current.next;
  }

  current.next = null;
  return newHead;
}

// Helper functions for testing
function arrayToList(arr) {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

function listToArray(head) {
  const result = [];
  let current = head;

  while (current) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

function printList(head) {
  const values = listToArray(head);
  console.log(values.length === 0 ? "[]" : `[${values.join(" -> ")}]`);
}

// Test cases
function runTests() {
  console.log("Testing Reverse Linked List:");

  const testCases = [
    {
      input: [1, 2, 3, 4, 5],
      expected: [5, 4, 3, 2, 1],
      description: "Regular list with 5 nodes"
    },
    {
      input: [1, 2],
      expected: [2, 1],
      description: "Two nodes"
    },
    {
      input: [1],
      expected: [1],
      description: "Single node"
    },
    {
      input: [],
      expected: [],
      description: "Empty list"
    },
    {
      input: [1, 1, 2, 2, 3],
      expected: [3, 2, 2, 1, 1],
      description: "List with duplicates"
    }
  ];

  testCases.forEach((test, index) => {
    const list1 = arrayToList(test.input);
    const list2 = arrayToList(test.input);
    const list3 = arrayToList(test.input);

    const result1 = listToArray(reverseList(list1));
    const result2 = listToArray(reverseListRecursive(list2));
    const result3 = listToArray(reverseListStack(list3));

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}]`);
    console.log(`Expected: [${test.expected.join(", ")}]`);
    console.log(
      `Iterative: [${result1.join(", ")}] ${
        JSON.stringify(result1) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Recursive: [${result2.join(", ")}] ${
        JSON.stringify(result2) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Stack: [${result3.join(", ")}] ${
        JSON.stringify(result3) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
  });
}

// Performance test
function performanceTest() {
  console.log("\\n\\nPerformance Test:");

  const sizes = [1000, 10000, 50000];

  sizes.forEach((size) => {
    const arr = Array.from({ length: size }, (_, i) => i + 1);

    console.log(`\\nList size: ${size}`);

    // Test Iterative
    let list = arrayToList(arr);
    let start = performance.now();
    reverseList(list);
    let end = performance.now();
    console.log(`Iterative: ${(end - start).toFixed(2)}ms`);

    // Test Recursive (for smaller sizes only to avoid stack overflow)
    if (size <= 10000) {
      list = arrayToList(arr);
      start = performance.now();
      reverseListRecursive(list);
      end = performance.now();
      console.log(`Recursive: ${(end - start).toFixed(2)}ms`);
    }

    // Test Stack
    list = arrayToList(arr);
    start = performance.now();
    reverseListStack(list);
    end = performance.now();
    console.log(`Stack: ${(end - start).toFixed(2)}ms`);
  });
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Reverse Linked List - Algorithm Explanation:

The goal is to reverse the direction of pointers in a linked list.

Iterative Approach (Optimal):
1. Use three pointers: prev, current, next
2. For each node:
   - Store the next node (before breaking the link)
   - Reverse the current node's link to point to prev
   - Move prev and current forward
3. Return prev (which becomes the new head)

Visual representation:
Before: null <- 1 -> 2 -> 3 -> null
After:  null <- 1 <- 2 <- 3    (3 is new head)

Recursive Approach:
1. Recursively reverse from the end
2. At each return, reverse the link
3. The last node becomes the new head

Stack Approach:
1. Push all nodes onto a stack
2. Pop nodes to recreate the list in reverse order
3. Less efficient but intuitive

Time Complexity: O(n) for all approaches
Space Complexity:
- Iterative: O(1)
- Recursive: O(n) due to call stack
- Stack: O(n) for the stack storage

Pattern: This is a fundamental pointer manipulation pattern used in many
LinkedList problems. Master this technique for complex reversal operations.
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  reverseList,
  reverseListRecursive,
  reverseListStack,
  ListNode,
  arrayToList,
  listToArray,
  printList
};
