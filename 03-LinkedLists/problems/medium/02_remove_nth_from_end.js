/**
 * Remove Nth Node From End of List (LeetCode 19)
 * Difficulty: Medium
 *
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.
 *
 * Pattern: Two Pointers with Distance
 *
 * Examples:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5]
 *
 * Input: head = [1], n = 1
 * Output: []
 *
 * Input: head = [1,2], n = 1
 * Output: [1]
 */

const {
  ListNode,
  arrayToList,
  listToArray
} = require("../easy/01_reverse_linked_list.js");

/**
 * Approach 1: Two Pointers with Distance (Optimal)
 * Time: O(n), Space: O(1)
 *
 * Move first pointer n steps ahead, then move both until first reaches end.
 */
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let first = dummy;
  let second = dummy;

  // Move first pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }

  // Move both pointers until first reaches end
  while (first !== null) {
    first = first.next;
    second = second.next;
  }

  // Remove the nth node from end
  second.next = second.next.next;

  return dummy.next;
}

/**
 * Approach 2: Two Pass - Calculate Length First
 * Time: O(n), Space: O(1)
 */
function removeNthFromEndTwoPass(head, n) {
  // First pass: calculate length
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }

  // Edge case: remove head
  if (n === length) {
    return head.next;
  }

  // Second pass: go to (length - n - 1)th node
  current = head;
  for (let i = 0; i < length - n - 1; i++) {
    current = current.next;
  }

  // Remove the next node
  current.next = current.next.next;

  return head;
}

/**
 * Approach 3: Using Stack
 * Time: O(n), Space: O(n)
 */
function removeNthFromEndStack(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;

  const stack = [];
  let current = dummy;

  // Push all nodes to stack
  while (current) {
    stack.push(current);
    current = current.next;
  }

  // Pop n times to get to the node before target
  for (let i = 0; i < n; i++) {
    stack.pop();
  }

  const nodeBeforeTarget = stack[stack.length - 1];
  nodeBeforeTarget.next = nodeBeforeTarget.next.next;

  return dummy.next;
}

// Test cases
function runTests() {
  console.log("Testing Remove Nth Node From End:");

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
    }
  ];

  testCases.forEach((test, index) => {
    const list1 = arrayToList(test.input);
    const list2 = arrayToList(test.input);
    const list3 = arrayToList(test.input);

    const result1 = listToArray(removeNthFromEnd(list1, test.n));
    const result2 = listToArray(removeNthFromEndTwoPass(list2, test.n));
    const result3 = listToArray(removeNthFromEndStack(list3, test.n));

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}], n=${test.n}`);
    console.log(`Expected: [${test.expected.join(", ")}]`);
    console.log(
      `Two Pointers: [${result1.join(", ")}] ${
        JSON.stringify(result1) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Two Pass: [${result2.join(", ")}] ${
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

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Remove Nth Node From End - Algorithm Explanation:

Two Pointers with Distance (Optimal):
1. Use dummy node to handle edge cases
2. Move first pointer n+1 steps ahead
3. Move both pointers until first reaches end
4. Second pointer will be at node before target
5. Remove target by updating second.next

Time: O(n), Space: O(1)

This technique is crucial for many linked list problems.
    `);
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
  explainAlgorithm();
}

module.exports = {
  removeNthFromEnd,
  removeNthFromEndTwoPass,
  removeNthFromEndStack
};
