/**
 * 19. Remove Nth Node From End of List
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 *
 * Difficulty: Medium
 * Topics: Linked List, Two Pointers
 *
 * Given the head of a linked list, remove the nth node from the end of the list
 * and return its head.
 *
 * Example 1:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5]
 *
 * Example 2:
 * Input: head = [1], n = 1
 * Output: []
 *
 * Example 3:
 * Input: head = [1,2], n = 1
 * Output: [1]
 *
 * Follow up: Could you do this in one pass?
 */

// Definition for singly-linked list
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * APPROACH 1: Two Pass (Calculate Length First)
 * Time Complexity: O(n) - two passes through the list
 * Space Complexity: O(1) - only use constant extra space
 *
 * Algorithm:
 * 1. First pass: calculate the length of the list
 * 2. Second pass: find the (length - n)th node and remove next node
 * 3. Handle edge case where we need to remove the head
 *
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEndTwoPass(head, n) {
  // First pass: calculate length
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }

  // Edge case: remove head node
  if (n === length) {
    return head.next;
  }

  // Second pass: find the node before the one to remove
  let nodeBeforeTarget = length - n - 1;
  current = head;

  for (let i = 0; i < nodeBeforeTarget; i++) {
    current = current.next;
  }

  // Remove the nth node from end
  current.next = current.next.next;

  return head;
}

/**
 * APPROACH 2: One Pass with Two Pointers (Gap Method)
 * Time Complexity: O(n) - single pass through the list
 * Space Complexity: O(1) - only use constant extra space
 *
 * Algorithm:
 * 1. Use two pointers with a gap of n+1 nodes
 * 2. When fast pointer reaches end, slow pointer is at node before target
 * 3. Remove the target node
 *
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEndOnePass(head, n) {
  // Create dummy node to handle edge cases
  const dummy = new ListNode(0);
  dummy.next = head;

  let first = dummy;
  let second = dummy;

  // Move first pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }

  // Move both pointers until first reaches end
  while (first) {
    first = first.next;
    second = second.next;
  }

  // Remove the nth node from end
  second.next = second.next.next;

  return dummy.next;
}

/**
 * APPROACH 3: Stack-based
 * Time Complexity: O(n) - single pass to build stack, then pop n times
 * Space Complexity: O(n) - stack to store all nodes
 *
 * Algorithm:
 * 1. Push all nodes onto a stack
 * 2. Pop n nodes to reach the target
 * 3. Remove the target node
 *
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEndStack(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;

  const stack = [];
  let current = dummy;

  // Push all nodes onto stack
  while (current) {
    stack.push(current);
    current = current.next;
  }

  // Pop n nodes to get to the node before target
  for (let i = 0; i < n; i++) {
    stack.pop();
  }

  // Remove the target node
  const nodeBeforeTarget = stack[stack.length - 1];
  nodeBeforeTarget.next = nodeBeforeTarget.next.next;

  return dummy.next;
}

/**
 * APPROACH 4: Recursive
 * Time Complexity: O(n) - visit each node once
 * Space Complexity: O(n) - recursion call stack
 *
 * Algorithm:
 * 1. Recursively traverse to the end
 * 2. Count nodes from the end during backtracking
 * 3. Remove node when count equals n
 *
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEndRecursive(head, n) {
  function removeHelper(node) {
    if (!node) return 0;

    const count = removeHelper(node.next) + 1;

    if (count === n + 1) {
      // Skip the nth node from end
      node.next = node.next.next;
    }

    return count;
  }

  const dummy = new ListNode(0);
  dummy.next = head;
  removeHelper(dummy);
  return dummy.next;
}

// Main function (using one pass approach as default)
const removeNthFromEnd = removeNthFromEndOnePass;

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

// Helper function to convert linked list to array
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
function testRemoveNthFromEnd() {
  console.log("Testing Remove Nth Node From End...\n");

  const testCases = [
    {
      input: [1, 2, 3, 4, 5],
      n: 2,
      expected: [1, 2, 3, 5],
      description: "Remove 2nd from end"
    },
    {
      input: [1],
      n: 1,
      expected: [],
      description: "Remove only node"
    },
    {
      input: [1, 2],
      n: 1,
      expected: [1],
      description: "Remove last node"
    },
    {
      input: [1, 2],
      n: 2,
      expected: [2],
      description: "Remove first node"
    },
    {
      input: [1, 2, 3, 4, 5],
      n: 5,
      expected: [2, 3, 4, 5],
      description: "Remove head"
    },
    {
      input: [1, 2, 3, 4, 5],
      n: 1,
      expected: [1, 2, 3, 4],
      description: "Remove tail"
    },
    {
      input: [1, 2, 3],
      n: 2,
      expected: [1, 3],
      description: "Remove middle node"
    }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}: ${testCase.description}`);
    console.log(`Input: [${testCase.input.join(", ")}], n = ${testCase.n}`);
    console.log(`Expected: [${testCase.expected.join(", ")}]`);

    // Test all approaches
    const approaches = [
      { name: "Two Pass", fn: removeNthFromEndTwoPass },
      { name: "One Pass", fn: removeNthFromEndOnePass },
      { name: "Stack", fn: removeNthFromEndStack },
      { name: "Recursive", fn: removeNthFromEndRecursive }
    ];

    approaches.forEach((approach) => {
      const head = createLinkedList(testCase.input);
      const result = approach.fn(head, testCase.n);
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

// Edge cases test
function testEdgeCases() {
  console.log("Testing Edge Cases...\n");

  const edgeCases = [
    {
      name: "Single node removal",
      input: [42],
      n: 1,
      expected: []
    },
    {
      name: "Large list, remove from middle",
      input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      n: 5,
      expected: [1, 2, 3, 4, 5, 7, 8, 9, 10]
    },
    {
      name: "Two nodes, remove first",
      input: [10, 20],
      n: 2,
      expected: [20]
    }
  ];

  edgeCases.forEach((testCase, index) => {
    console.log(`Edge Case ${index + 1}: ${testCase.name}`);

    const head = createLinkedList(testCase.input);
    const result = removeNthFromEnd(head, testCase.n);
    const resultArray = linkedListToArray(result);
    const passed =
      JSON.stringify(resultArray) === JSON.stringify(testCase.expected);

    console.log(`Input: [${testCase.input.join(", ")}], n = ${testCase.n}`);
    console.log(
      `Result: [${resultArray.join(", ")}] - ${passed ? "PASS" : "FAIL"}`
    );
    console.log();
  });
}

// Performance test
function performanceTest() {
  console.log("Performance Comparison...\n");

  // Create a large list
  const largeArray = Array.from({ length: 10000 }, (_, i) => i + 1);
  const n = 5000;

  const approaches = [
    { name: "Two Pass", fn: removeNthFromEndTwoPass },
    { name: "One Pass", fn: removeNthFromEndOnePass }
  ];

  approaches.forEach((approach) => {
    const head = createLinkedList(largeArray);
    const start = performance.now();
    approach.fn(head, n);
    const end = performance.now();

    console.log(`${approach.name}: ${(end - start).toFixed(2)}ms`);
  });
}

// Uncomment to run tests
// testRemoveNthFromEnd();
// testEdgeCases();
// performanceTest();

module.exports = {
  ListNode,
  removeNthFromEnd,
  removeNthFromEndTwoPass,
  removeNthFromEndOnePass,
  removeNthFromEndStack,
  removeNthFromEndRecursive,
  createLinkedList,
  linkedListToArray
};
