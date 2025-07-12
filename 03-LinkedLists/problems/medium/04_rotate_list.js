/**
 * Rotate List (LeetCode 61)
 * Difficulty: Medium
 *
 * Given the head of a linked list, rotate the list to the right by k places.
 *
 * Examples:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [4,5,1,2,3]
 *
 * Input: head = [0,1,2], k = 4
 * Output: [2,0,1]
 */

const {
  ListNode,
  arrayToList,
  listToArray
} = require("../easy/01_reverse_linked_list.js");

/**
 * Approach 1: Find New Tail (Optimal)
 * Time: O(n), Space: O(1)
 */
function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;

  // Calculate length and find tail
  let length = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    length++;
  }

  // Make it circular
  tail.next = head;

  // Find new tail (length - k % length - 1)th node
  k = k % length;
  let stepsToNewTail = length - k;
  let newTail = head;

  for (let i = 1; i < stepsToNewTail; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
}

/**
 * Approach 2: Using Array
 * Time: O(n), Space: O(n)
 */
function rotateRightArray(head, k) {
  if (!head) return head;

  const nodes = [];
  let current = head;
  while (current) {
    nodes.push(current);
    current = current.next;
  }

  const n = nodes.length;
  k = k % n;

  if (k === 0) return head;

  // Reconnect nodes
  for (let i = 0; i < n; i++) {
    nodes[i].next = nodes[(i + 1) % n];
  }

  nodes[n - 1].next = null;
  return nodes[n - k];
}

// Test cases
function runTests() {
  console.log("Testing Rotate List:");

  const testCases = [
    {
      input: [1, 2, 3, 4, 5],
      k: 2,
      expected: [4, 5, 1, 2, 3],
      description: "Rotate right by 2"
    },
    {
      input: [0, 1, 2],
      k: 4,
      expected: [2, 0, 1],
      description: "k > length"
    },
    {
      input: [1],
      k: 1000,
      expected: [1],
      description: "Single node"
    },
    {
      input: [1, 2],
      k: 1,
      expected: [2, 1],
      description: "Two nodes"
    }
  ];

  testCases.forEach((test, index) => {
    const list1 = arrayToList(test.input);
    const list2 = arrayToList(test.input);

    const result1 = listToArray(rotateRight(list1, test.k));
    const result2 = listToArray(rotateRightArray(list2, test.k));

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}], k=${test.k}`);
    console.log(`Expected: [${test.expected.join(", ")}]`);
    console.log(
      `Optimal: [${result1.join(", ")}] ${
        JSON.stringify(result1) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Array: [${result2.join(", ")}] ${
        JSON.stringify(result2) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
  });
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

module.exports = { rotateRight, rotateRightArray };
