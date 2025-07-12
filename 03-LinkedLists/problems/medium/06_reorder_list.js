/**
 * Reorder List (LeetCode 143)
 * Difficulty: Medium
 *
 * You are given the head of a singly linked-list. The list can be represented as:
 * L0 → L1 → … → Ln - 1 → Ln
 * Reorder it to: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
 *
 * Examples:
 * Input: head = [1,2,3,4]
 * Output: [1,4,2,3]
 *
 * Input: head = [1,2,3,4,5]
 * Output: [1,5,2,4,3]
 */

const {
  ListNode,
  arrayToList,
  listToArray
} = require("../easy/01_reverse_linked_list.js");
const { reverseList } = require("../easy/01_reverse_linked_list.js");

/**
 * Approach 1: Find Middle + Reverse + Merge (Optimal)
 * Time: O(n), Space: O(1)
 */
function reorderList(head) {
  if (!head || !head.next) return;

  // Step 1: Find middle
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Split and reverse second half
  const secondHalf = slow.next;
  slow.next = null;
  const reversedSecond = reverseList(secondHalf);

  // Step 3: Merge two halves
  let first = head;
  let second = reversedSecond;

  while (second) {
    const firstNext = first.next;
    const secondNext = second.next;

    first.next = second;
    second.next = firstNext;

    first = firstNext;
    second = secondNext;
  }
}

/**
 * Approach 2: Using Array
 * Time: O(n), Space: O(n)
 */
function reorderListArray(head) {
  if (!head) return;

  const nodes = [];
  let current = head;
  while (current) {
    nodes.push(current);
    current = current.next;
  }

  let left = 0;
  let right = nodes.length - 1;
  let current2 = new ListNode(0);

  while (left <= right) {
    current2.next = nodes[left];
    current2 = current2.next;
    left++;

    if (left <= right) {
      current2.next = nodes[right];
      current2 = current2.next;
      right--;
    }
  }

  current2.next = null;
}

// Test cases
function runTests() {
  console.log("Testing Reorder List:");

  const testCases = [
    {
      input: [1, 2, 3, 4],
      expected: [1, 4, 2, 3],
      description: "Even length list"
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: [1, 5, 2, 4, 3],
      description: "Odd length list"
    },
    {
      input: [1, 2],
      expected: [1, 2],
      description: "Two nodes"
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

    reorderList(list1);
    reorderListArray(list2);

    const result1 = listToArray(list1);
    const result2 = listToArray(list2);

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}]`);
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

module.exports = { reorderList, reorderListArray };
