/**
 * Swap Nodes in Pairs (LeetCode 24)
 * Difficulty: Medium
 *
 * Given a linked list, swap every two adjacent nodes and return its head.
 * You must solve the problem without modifying the values in the list's nodes.
 *
 * Examples:
 * Input: head = [1,2,3,4]
 * Output: [2,1,4,3]
 *
 * Input: head = []
 * Output: []
 *
 * Input: head = [1]
 * Output: [1]
 */

const {
  ListNode,
  arrayToList,
  listToArray
} = require("../easy/01_reverse_linked_list.js");

/**
 * Approach 1: Iterative (Optimal)
 * Time: O(n), Space: O(1)
 */
function swapPairs(head) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;

  while (prev.next && prev.next.next) {
    // Nodes to be swapped
    const first = prev.next;
    const second = prev.next.next;

    // Swapping
    prev.next = second;
    first.next = second.next;
    second.next = first;

    // Move prev to the end of swapped pair
    prev = first;
  }

  return dummy.next;
}

/**
 * Approach 2: Recursive
 * Time: O(n), Space: O(n)
 */
function swapPairsRecursive(head) {
  if (!head || !head.next) return head;

  const second = head.next;
  head.next = swapPairsRecursive(second.next);
  second.next = head;

  return second;
}

// Test cases
function runTests() {
  console.log("Testing Swap Nodes in Pairs:");

  const testCases = [
    {
      input: [1, 2, 3, 4],
      expected: [2, 1, 4, 3],
      description: "Even number of nodes"
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: [2, 1, 4, 3, 5],
      description: "Odd number of nodes"
    },
    {
      input: [],
      expected: [],
      description: "Empty list"
    },
    {
      input: [1],
      expected: [1],
      description: "Single node"
    }
  ];

  testCases.forEach((test, index) => {
    const list1 = arrayToList(test.input);
    const list2 = arrayToList(test.input);

    const result1 = listToArray(swapPairs(list1));
    const result2 = listToArray(swapPairsRecursive(list2));

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
  });
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

module.exports = { swapPairs, swapPairsRecursive };
