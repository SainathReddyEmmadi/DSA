/**
 * 206. Reverse Linked List
 * https://leetcode.com/problems/reverse-linked-list/
 *
 * Difficulty: Easy
 * Topics: Linked List, Recursion
 *
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 *
 * Example 1:
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 *
 * Example 2:
 * Input: head = [1,2]
 * Output: [2,1]
 *
 * Example 3:
 * Input: head = []
 * Output: []
 */

// Definition for singly-linked list
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * APPROACH 1: Iterative (Two Pointers)
 * Time Complexity: O(n) - visit each node once
 * Space Complexity: O(1) - only use constant extra space
 *
 * Algorithm:
 * 1. Use three pointers: prev, current, next
 * 2. Iterate through the list, reversing the direction of each link
 * 3. Update pointers for next iteration
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseListIterative(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    // Store next node before we lose it
    let next = current.next;

    // Reverse the link
    current.next = prev;

    // Move pointers one step forward
    prev = current;
    current = next;
  }

  // prev is now the new head
  return prev;
}

/**
 * APPROACH 2: Recursive
 * Time Complexity: O(n) - visit each node once
 * Space Complexity: O(n) - recursion call stack
 *
 * Algorithm:
 * 1. Base case: if head is null or has no next, return head
 * 2. Recursively reverse the rest of the list
 * 3. Reverse the current connection
 * 4. Set current node's next to null
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseListRecursive(head) {
  // Base case: empty list or single node
  if (head === null || head.next === null) {
    return head;
  }

  // Recursively reverse the rest of the list
  let reversedHead = reverseListRecursive(head.next);

  // Reverse the current connection
  head.next.next = head;
  head.next = null;

  return reversedHead;
}

/**
 * APPROACH 3: Stack-based
 * Time Complexity: O(n) - visit each node twice
 * Space Complexity: O(n) - stack to store all nodes
 *
 * Algorithm:
 * 1. Push all nodes onto a stack
 * 2. Pop nodes and rebuild the list in reverse order
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseListStack(head) {
  if (!head) return null;

  const stack = [];
  let current = head;

  // Push all nodes onto stack
  while (current) {
    stack.push(current);
    current = current.next;
  }

  // Pop first node as new head
  const newHead = stack.pop();
  current = newHead;

  // Connect remaining nodes
  while (stack.length > 0) {
    current.next = stack.pop();
    current = current.next;
  }

  // Set last node's next to null
  current.next = null;

  return newHead;
}

// Main function (using iterative approach as default)
const reverseList = reverseListIterative;

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
function testReverseList() {
  console.log("Testing Reverse Linked List...\n");

  const testCases = [
    { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
    { input: [1, 2], expected: [2, 1] },
    { input: [], expected: [] },
    { input: [1], expected: [1] },
    { input: [1, 2, 3], expected: [3, 2, 1] }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log(`Input: [${testCase.input.join(", ")}]`);
    console.log(`Expected: [${testCase.expected.join(", ")}]`);

    // Test all approaches
    const approaches = [
      { name: "Iterative", fn: reverseListIterative },
      { name: "Recursive", fn: reverseListRecursive },
      { name: "Stack", fn: reverseListStack }
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

// Uncomment to run tests
// testReverseList();

module.exports = {
  ListNode,
  reverseList,
  reverseListIterative,
  reverseListRecursive,
  reverseListStack,
  createLinkedList,
  linkedListToArray
};
