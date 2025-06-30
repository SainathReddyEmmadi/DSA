/**
 * 141. Linked List Cycle
 * https://leetcode.com/problems/linked-list-cycle/
 *
 * Difficulty: Easy
 * Topics: Hash Table, Linked List, Two Pointers
 *
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 *
 * There is a cycle in a linked list if there is some node in the list that can be
 * reached again by continuously following the next pointer. Internally, pos is used
 * to denote the index of the node that tail's next pointer is connected to.
 * Note that pos is not passed as a parameter.
 *
 * Return true if there is a cycle in the linked list. Otherwise, return false.
 *
 * Example 1:
 * Input: head = [3,2,0,-4], pos = 1
 * Output: true
 * Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
 *
 * Example 2:
 * Input: head = [1,2], pos = 0
 * Output: true
 * Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
 *
 * Example 3:
 * Input: head = [1], pos = -1
 * Output: false
 * Explanation: There is no cycle in the linked list.
 */

// Definition for singly-linked list
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * APPROACH 1: Floyd's Cycle Detection Algorithm (Tortoise and Hare)
 * Time Complexity: O(n) - in worst case, slow pointer travels n/2 nodes
 * Space Complexity: O(1) - only use two pointers
 *
 * Algorithm:
 * 1. Use two pointers: slow (moves 1 step) and fast (moves 2 steps)
 * 2. If there's a cycle, fast will eventually meet slow
 * 3. If there's no cycle, fast will reach the end (null)
 *
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycleFloyd(head) {
  if (!head || !head.next) {
    return false;
  }

  let slow = head;
  let fast = head;

  // Move pointers until they meet or fast reaches end
  while (fast && fast.next) {
    slow = slow.next; // Move 1 step
    fast = fast.next.next; // Move 2 steps

    if (slow === fast) {
      return true; // Cycle detected
    }
  }

  return false; // No cycle found
}

/**
 * APPROACH 2: Hash Set (Visited Nodes)
 * Time Complexity: O(n) - visit each node once
 * Space Complexity: O(n) - store up to n nodes in hash set
 *
 * Algorithm:
 * 1. Keep track of visited nodes in a Set
 * 2. If we encounter a node we've seen before, there's a cycle
 * 3. If we reach the end (null), there's no cycle
 *
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycleHashSet(head) {
  const visited = new Set();
  let current = head;

  while (current) {
    if (visited.has(current)) {
      return true; // Found cycle
    }
    visited.add(current);
    current = current.next;
  }

  return false; // No cycle
}

/**
 * APPROACH 3: Node Marking (Destructive)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Note: This approach modifies the original list structure
 *
 * Algorithm:
 * 1. Mark visited nodes by setting a special flag
 * 2. If we encounter a marked node, there's a cycle
 *
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycleMarking(head) {
  let current = head;

  while (current) {
    if (current.visited) {
      return true; // Found cycle
    }
    current.visited = true;
    current = current.next;
  }

  return false; // No cycle
}

/**
 * APPROACH 4: Limit-based Detection
 * Time Complexity: O(min(n, limit))
 * Space Complexity: O(1)
 *
 * Algorithm:
 * 1. Traverse the list up to a certain limit
 * 2. If we exceed the limit, assume there's a cycle
 * 3. This is not a perfect solution but works for practical cases
 *
 * @param {ListNode} head
 * @param {number} limit
 * @return {boolean}
 */
function hasCycleLimit(head, limit = 10000) {
  let current = head;
  let count = 0;

  while (current && count < limit) {
    current = current.next;
    count++;
  }

  return current !== null; // If we didn't reach end, assume cycle
}

// Main function (using Floyd's algorithm as default)
const hasCycle = hasCycleFloyd;

// ============================================================================
// TESTING
// ============================================================================

// Helper function to create linked list with cycle
function createLinkedListWithCycle(arr, pos) {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;
  let cycleNode = null;

  // Create the linked list
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;

    // Mark the cycle position
    if (i === pos) {
      cycleNode = current;
    }
  }

  // Create cycle if pos is valid
  if (pos >= 0 && pos < arr.length) {
    if (pos === 0) {
      current.next = head;
    } else {
      current.next = cycleNode;
    }
  }

  return head;
}

// Helper function to create regular linked list (no cycle)
function createLinkedList(arr) {
  return createLinkedListWithCycle(arr, -1);
}

// Test cases
function testHasCycle() {
  console.log("Testing Linked List Cycle Detection...\n");

  const testCases = [
    { input: [3, 2, 0, -4], pos: 1, expected: true },
    { input: [1, 2], pos: 0, expected: true },
    { input: [1], pos: -1, expected: false },
    { input: [], pos: -1, expected: false },
    { input: [1, 2, 3, 4, 5], pos: -1, expected: false },
    { input: [1, 2, 3, 4, 5], pos: 2, expected: true },
    { input: [1], pos: 0, expected: true }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log(`Input: [${testCase.input.join(", ")}], pos = ${testCase.pos}`);
    console.log(`Expected: ${testCase.expected}`);

    // Test all approaches (except marking which modifies the list)
    const approaches = [
      { name: "Floyd's Algorithm", fn: hasCycleFloyd },
      { name: "Hash Set", fn: hasCycleHashSet },
      { name: "Limit-based", fn: (head) => hasCycleLimit(head, 100) }
    ];

    approaches.forEach((approach) => {
      const head = createLinkedListWithCycle(testCase.input, testCase.pos);
      const result = approach.fn(head);
      const passed = result === testCase.expected;

      console.log(`${approach.name}: ${result} - ${passed ? "PASS" : "FAIL"}`);
    });

    // Test marking approach separately (since it modifies the list)
    const headForMarking = createLinkedListWithCycle(
      testCase.input,
      testCase.pos
    );
    const markingResult = hasCycleMarking(headForMarking);
    const markingPassed = markingResult === testCase.expected;
    console.log(
      `Node Marking: ${markingResult} - ${markingPassed ? "PASS" : "FAIL"}`
    );

    console.log();
  });
}

// Performance comparison
function performanceTest() {
  console.log("Performance Test (Large List)...\n");

  // Create a large list with cycle
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);
  const head = createLinkedListWithCycle(largeArray, 5000);

  const approaches = [
    { name: "Floyd's Algorithm", fn: hasCycleFloyd },
    { name: "Hash Set", fn: hasCycleHashSet }
  ];

  approaches.forEach((approach) => {
    const start = performance.now();
    const result = approach.fn(head);
    const end = performance.now();

    console.log(`${approach.name}: ${result} (${(end - start).toFixed(2)}ms)`);
  });
}

// Uncomment to run tests
// testHasCycle();
// performanceTest();

module.exports = {
  ListNode,
  hasCycle,
  hasCycleFloyd,
  hasCycleHashSet,
  hasCycleMarking,
  hasCycleLimit,
  createLinkedList,
  createLinkedListWithCycle
};
