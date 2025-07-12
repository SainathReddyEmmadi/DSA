/**
 * Reverse Nodes in k-Group (LeetCode 25)
 * Difficulty: Hard
 *
 * Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
 * k is a positive integer and is less than or equal to the length of the linked list.
 * If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as is.
 *
 * Examples:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [2,1,4,3,5]
 *
 * Input: head = [1,2,3,4,5], k = 3
 * Output: [3,2,1,4,5]
 */

const {
  ListNode,
  arrayToList,
  listToArray
} = require("../easy/01_reverse_linked_list.js");

/**
 * Approach 1: Iterative with Group Detection (Optimal)
 * Time: O(n), Space: O(1)
 */
function reverseKGroup(head, k) {
  if (!head || k === 1) return head;

  // Check if we have at least k nodes
  function hasKNodes(node, k) {
    let count = 0;
    while (node && count < k) {
      node = node.next;
      count++;
    }
    return count === k;
  }

  // Reverse k nodes starting from head
  function reverseK(head, k) {
    let prev = null;
    let current = head;

    for (let i = 0; i < k; i++) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    return [prev, current]; // [new head, next group start]
  }

  const dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupEnd = dummy;

  while (hasKNodes(prevGroupEnd.next, k)) {
    const groupStart = prevGroupEnd.next;
    const [newGroupHead, nextGroupStart] = reverseK(groupStart, k);

    // Connect with previous group
    prevGroupEnd.next = newGroupHead;
    groupStart.next = nextGroupStart;

    // Move to end of current group for next iteration
    prevGroupEnd = groupStart;
  }

  return dummy.next;
}

/**
 * Approach 2: Recursive
 * Time: O(n), Space: O(n/k) for recursion stack
 */
function reverseKGroupRecursive(head, k) {
  // Check if we have k nodes
  let current = head;
  let count = 0;
  while (current && count < k) {
    current = current.next;
    count++;
  }

  if (count === k) {
    // Recursively reverse the rest
    current = reverseKGroupRecursive(current, k);

    // Reverse current k nodes
    while (count > 0) {
      const next = head.next;
      head.next = current;
      current = head;
      head = next;
      count--;
    }

    head = current;
  }

  return head;
}

/**
 * Approach 3: Using Stack
 * Time: O(n), Space: O(k)
 */
function reverseKGroupStack(head, k) {
  if (!head || k === 1) return head;

  const dummy = new ListNode(0);
  let current = dummy;
  let node = head;

  while (node) {
    const stack = [];

    // Collect k nodes
    for (let i = 0; i < k && node; i++) {
      stack.push(node);
      node = node.next;
    }

    // If we have k nodes, reverse them
    if (stack.length === k) {
      while (stack.length > 0) {
        current.next = stack.pop();
        current = current.next;
      }
    } else {
      // Less than k nodes remaining, keep original order
      for (const n of stack) {
        current.next = n;
        current = current.next;
      }
    }
  }

  current.next = null;
  return dummy.next;
}

/**
 * Helper: Get length of linked list
 */
function getLength(head) {
  let length = 0;
  while (head) {
    length++;
    head = head.next;
  }
  return length;
}

/**
 * Approach 4: Length-based approach
 * Time: O(n), Space: O(1)
 */
function reverseKGroupLength(head, k) {
  if (!head || k === 1) return head;

  const length = getLength(head);
  const numGroups = Math.floor(length / k);

  if (numGroups === 0) return head;

  const dummy = new ListNode(0);
  dummy.next = head;
  let prevGroupEnd = dummy;

  for (let group = 0; group < numGroups; group++) {
    const groupStart = prevGroupEnd.next;
    let prev = prevGroupEnd;
    let current = groupStart;

    // Reverse k nodes
    for (let i = 0; i < k; i++) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    // Connect with previous and next groups
    prevGroupEnd.next = prev;
    groupStart.next = current;
    prevGroupEnd = groupStart;
  }

  return dummy.next;
}

// Test cases
function runTests() {
  console.log("Testing Reverse Nodes in k-Group:");

  const testCases = [
    {
      input: [1, 2, 3, 4, 5],
      k: 2,
      expected: [2, 1, 4, 3, 5],
      description: "k=2, odd length"
    },
    {
      input: [1, 2, 3, 4, 5],
      k: 3,
      expected: [3, 2, 1, 4, 5],
      description: "k=3, remainder nodes"
    },
    {
      input: [1, 2, 3, 4, 5, 6],
      k: 3,
      expected: [3, 2, 1, 6, 5, 4],
      description: "k=3, exact multiple"
    },
    {
      input: [1],
      k: 1,
      expected: [1],
      description: "k=1, single node"
    },
    {
      input: [1, 2],
      k: 3,
      expected: [1, 2],
      description: "k > length"
    },
    {
      input: [1, 2, 3, 4],
      k: 2,
      expected: [2, 1, 4, 3],
      description: "k=2, even length"
    }
  ];

  testCases.forEach((test, index) => {
    const list1 = arrayToList(test.input);
    const list2 = arrayToList(test.input);
    const list3 = arrayToList(test.input);
    const list4 = arrayToList(test.input);

    const result1 = listToArray(reverseKGroup(list1, test.k));
    const result2 = listToArray(reverseKGroupRecursive(list2, test.k));
    const result3 = listToArray(reverseKGroupStack(list3, test.k));
    const result4 = listToArray(reverseKGroupLength(list4, test.k));

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}], k=${test.k}`);
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
    console.log(
      `Length: [${result4.join(", ")}] ${
        JSON.stringify(result4) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
  });
}

// Performance test
function performanceTest() {
  console.log("\\n\\nPerformance Test:");

  const sizes = [1000, 5000, 10000];

  sizes.forEach((size) => {
    const arr = Array.from({ length: size }, (_, i) => i + 1);
    const k = 3;

    console.log(`\\nList size: ${size}, k=${k}`);

    // Test Iterative
    let list = arrayToList(arr);
    let start = performance.now();
    reverseKGroup(list, k);
    let end = performance.now();
    console.log(`Iterative: ${(end - start).toFixed(2)}ms`);

    // Test Recursive (for smaller sizes)
    if (size <= 5000) {
      list = arrayToList(arr);
      start = performance.now();
      reverseKGroupRecursive(list, k);
      end = performance.now();
      console.log(`Recursive: ${(end - start).toFixed(2)}ms`);
    }

    // Test Stack
    list = arrayToList(arr);
    start = performance.now();
    reverseKGroupStack(list, k);
    end = performance.now();
    console.log(`Stack: ${(end - start).toFixed(2)}ms`);

    // Test Length-based
    list = arrayToList(arr);
    start = performance.now();
    reverseKGroupLength(list, k);
    end = performance.now();
    console.log(`Length: ${(end - start).toFixed(2)}ms`);
  });
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Reverse Nodes in k-Group - Algorithm Explanation:

The goal is to reverse every k consecutive nodes in a linked list,
leaving any remaining nodes (less than k) in their original order.

Iterative Approach (Optimal):
1. Check if there are at least k nodes remaining
2. If yes, reverse exactly k nodes
3. Connect the reversed group with previous and next groups
4. Move to the next group and repeat

Key Steps:
- Use dummy node to handle edge cases
- Track the end of the previous group
- Reverse k nodes using standard reversal technique
- Update connections carefully

Example with k=3:
Original: 1 → 2 → 3 → 4 → 5 → 6 → 7

Group 1 (1,2,3): Reverse to 3 → 2 → 1
Group 2 (4,5,6): Reverse to 6 → 5 → 4
Group 3 (7): Only 1 node, keep as is

Result: 3 → 2 → 1 → 6 → 5 → 4 → 7

Recursive Approach:
1. Check if we have k nodes
2. If yes, recursively process the rest first
3. Then reverse current k nodes
4. Return new head

Stack Approach:
1. Collect k nodes in a stack
2. Pop them to reverse order
3. Connect to result list
4. Handle remaining nodes normally

Time Complexity: O(n) - each node processed exactly once
Space Complexity:
- Iterative: O(1)
- Recursive: O(n/k) for call stack
- Stack: O(k) for the stack

This problem combines several important techniques:
- Group processing
- Pointer manipulation
- Reversal algorithms
- Edge case handling
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  reverseKGroup,
  reverseKGroupRecursive,
  reverseKGroupStack,
  reverseKGroupLength
};
