/**
 * 876. Middle of the Linked List
 * https://leetcode.com/problems/middle-of-the-linked-list/
 *
 * Difficulty: Easy
 * Topics: Linked List, Two Pointers
 *
 * Given the head of a singly linked list, return the middle node of the linked list.
 * If there are two middle nodes, return the second middle node.
 *
 * Example 1:
 * Input: head = [1,2,3,4,5]
 * Output: [3,4,5]
 * Explanation: The middle node of the list is node 3.
 *
 * Example 2:
 * Input: head = [1,2,3,4,5,6]
 * Output: [4,5,6]
 * Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
 */

// Definition for singly-linked list
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * APPROACH 1: Two Pass (Count Length First)
 * Time Complexity: O(n) - two passes through the list
 * Space Complexity: O(1) - only use constant extra space
 *
 * Algorithm:
 * 1. First pass: count the total number of nodes
 * 2. Second pass: traverse to the middle node (length/2)
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNodeTwoPass(head) {
  if (!head) return null;

  // First pass: count nodes
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }

  // Second pass: find middle node
  const middleIndex = Math.floor(length / 2);
  current = head;
  for (let i = 0; i < middleIndex; i++) {
    current = current.next;
  }

  return current;
}

/**
 * APPROACH 2: Two Pointers (Tortoise and Hare)
 * Time Complexity: O(n) - single pass through the list
 * Space Complexity: O(1) - only use constant extra space
 *
 * Algorithm:
 * 1. Use slow pointer (moves 1 step) and fast pointer (moves 2 steps)
 * 2. When fast reaches end, slow is at the middle
 * 3. This naturally handles both odd and even length lists
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNodeTwoPointers(head) {
  let slow = head;
  let fast = head;

  // Move fast 2 steps and slow 1 step
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

/**
 * APPROACH 3: Array Conversion
 * Time Complexity: O(n) - single pass to build array
 * Space Complexity: O(n) - array to store all nodes
 *
 * Algorithm:
 * 1. Convert linked list to array of nodes
 * 2. Return the middle element from array
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNodeArray(head) {
  const nodes = [];
  let current = head;

  // Convert to array
  while (current) {
    nodes.push(current);
    current = current.next;
  }

  // Return middle element
  return nodes[Math.floor(nodes.length / 2)];
}

/**
 * APPROACH 4: Recursive with Counter
 * Time Complexity: O(n) - visit each node once
 * Space Complexity: O(n) - recursion call stack
 *
 * Algorithm:
 * 1. Recursively traverse to the end while counting
 * 2. During backtracking, decrement counter
 * 3. Return node when counter reaches middle
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
function middleNodeRecursive(head) {
  function findMiddle(node, counter) {
    if (!node) return { length: 0, middle: null };

    const result = findMiddle(node.next, counter);
    const currentIndex = result.length;

    // Check if this is the middle node
    if (currentIndex === Math.floor((counter.total - 1) / 2)) {
      result.middle = node;
    }

    result.length++;
    return result;
  }

  // First, count total nodes
  let total = 0;
  let current = head;
  while (current) {
    total++;
    current = current.next;
  }

  const counter = { total };
  return findMiddle(head, counter).middle;
}

/**
 * APPROACH 5: Modified Two Pointers (Return Both Middles for Even Length)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * This variation returns both middle nodes for even-length lists
 *
 * @param {ListNode} head
 * @return {ListNode|ListNode[]}
 */
function middleNodeBothMiddles(head) {
  let slow = head;
  let fast = head;
  let prev = null;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  // If fast is null, list has even length, return both middles
  if (!fast) {
    return [prev, slow];
  }

  // Odd length, return single middle
  return slow;
}

// Main function (using two pointers approach as default)
const middleNode = middleNodeTwoPointers;

// ============================================================================
// TESTING
// ============================================================================

// Helper function to create linked list from array
function createLinkedList(arr) {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

// Helper function to convert linked list to array starting from given node
function linkedListToArray(head) {
  const result = [];
  let current = head;

  while (current) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

// Test cases
function testMiddleNode() {
  console.log("Testing Middle of Linked List...\n");

  const testCases = [
    {
      input: [1, 2, 3, 4, 5],
      expected: [3, 4, 5],
      description: "Odd length - middle is 3rd node"
    },
    {
      input: [1, 2, 3, 4, 5, 6],
      expected: [4, 5, 6],
      description: "Even length - return 2nd middle (4th node)"
    },
    {
      input: [1],
      expected: [1],
      description: "Single node"
    },
    {
      input: [1, 2],
      expected: [2],
      description: "Two nodes - return 2nd"
    },
    {
      input: [1, 2, 3],
      expected: [2, 3],
      description: "Three nodes - return middle"
    },
    {
      input: [1, 2, 3, 4],
      expected: [3, 4],
      description: "Four nodes - return 2nd middle"
    }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}: ${testCase.description}`);
    console.log(`Input: [${testCase.input.join(", ")}]`);
    console.log(`Expected: [${testCase.expected.join(", ")}]`);

    // Test all approaches
    const approaches = [
      { name: "Two Pass", fn: middleNodeTwoPass },
      { name: "Two Pointers", fn: middleNodeTwoPointers },
      { name: "Array", fn: middleNodeArray },
      { name: "Recursive", fn: middleNodeRecursive }
    ];

    approaches.forEach((approach) => {
      const head = createLinkedList(testCase.input);
      const result = approach.fn(head);
      const resultArray = linkedListToArray(result);
      const passed =
        JSON.stringify(resultArray) === JSON.stringify(testCase.expected);

      console.log(
        `${approach.name}: [${resultArray.join(", ")}] - ${
          passed ? "PASS" : "FAIL"
        }`
      );
    });

    console.log();
  });
}

// Test the both middles variation
function testBothMiddles() {
  console.log("Testing Both Middles Variation...\n");

  const testCases = [
    { input: [1, 2, 3, 4, 5], description: "Odd length" },
    { input: [1, 2, 3, 4, 5, 6], description: "Even length" },
    { input: [1, 2], description: "Two nodes" },
    { input: [1], description: "Single node" }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}: ${testCase.description}`);
    console.log(`Input: [${testCase.input.join(", ")}]`);

    const head = createLinkedList(testCase.input);
    const result = middleNodeBothMiddles(head);

    if (Array.isArray(result)) {
      console.log(
        `Both middles: [${result.map((node) => node.val).join(", ")}]`
      );
    } else {
      console.log(`Single middle: ${result.val}`);
    }
    console.log();
  });
}

// Performance test
function performanceTest() {
  console.log("Performance Comparison...\n");

  // Create a large list
  const largeArray = Array.from({ length: 100000 }, (_, i) => i + 1);

  const approaches = [
    { name: "Two Pass", fn: middleNodeTwoPass },
    { name: "Two Pointers", fn: middleNodeTwoPointers },
    { name: "Array", fn: middleNodeArray }
  ];

  approaches.forEach((approach) => {
    const head = createLinkedList(largeArray);
    const start = performance.now();
    approach.fn(head);
    const end = performance.now();

    console.log(`${approach.name}: ${(end - start).toFixed(2)}ms`);
  });
}

// Edge cases test
function testEdgeCases() {
  console.log("Testing Edge Cases...\n");

  // Test with various list lengths
  for (let length = 1; length <= 10; length++) {
    const arr = Array.from({ length }, (_, i) => i + 1);
    const head = createLinkedList(arr);
    const middle = middleNode(head);
    const expectedIndex = Math.floor(length / 2);
    const expectedValue = arr[expectedIndex];

    console.log(
      `Length ${length}: Expected middle = ${expectedValue}, Got = ${
        middle.val
      } - ${middle.val === expectedValue ? "PASS" : "FAIL"}`
    );
  }
}

// Uncomment to run tests
// testMiddleNode();
// testBothMiddles();
// testEdgeCases();
// performanceTest();

module.exports = {
  ListNode,
  middleNode,
  middleNodeTwoPass,
  middleNodeTwoPointers,
  middleNodeArray,
  middleNodeRecursive,
  middleNodeBothMiddles,
  createLinkedList,
  linkedListToArray
};
