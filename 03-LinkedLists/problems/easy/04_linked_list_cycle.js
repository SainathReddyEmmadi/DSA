/**
 * Linked List Cycle (LeetCode 141)
 * Difficulty: Easy
 *
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 * There is a cycle in a linked list if there is some node in the list that can be reached again
 * by continuously following the next pointer.
 *
 * Pattern: Floyd's Cycle Detection (Two Pointers)
 *
 * Examples:
 * Input: head = [3,2,0,-4], pos = 1 (cycle from node 1 back to node 1)
 * Output: true
 *
 * Input: head = [1,2], pos = 0 (cycle from node 1 back to node 0)
 * Output: true
 *
 * Input: head = [1], pos = -1 (no cycle)
 * Output: false
 */

const { ListNode, arrayToList } = require("./01_reverse_linked_list.js");

/**
 * Approach 1: Floyd's Cycle Detection - Two Pointers (Optimal)
 * Time: O(n), Space: O(1)
 *
 * Use slow and fast pointers. If there's a cycle, they will meet.
 */
function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head.next;

  while (slow !== fast) {
    // If fast reaches the end, no cycle
    if (!fast || !fast.next) {
      return false;
    }

    slow = slow.next; // Move slow by 1
    fast = fast.next.next; // Move fast by 2
  }

  return true; // slow === fast, cycle detected
}

/**
 * Approach 2: Alternative Floyd's Implementation
 * Time: O(n), Space: O(1)
 *
 * Both pointers start at head, different loop condition.
 */
function hasCycleAlt(head) {
  if (!head) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}

/**
 * Approach 3: Using Set/HashSet (Less Optimal)
 * Time: O(n), Space: O(n)
 *
 * Track visited nodes using a set.
 */
function hasCycleSet(head) {
  const visited = new Set();
  let current = head;

  while (current) {
    if (visited.has(current)) {
      return true; // Found a cycle
    }
    visited.add(current);
    current = current.next;
  }

  return false; // Reached the end, no cycle
}

/**
 * Approach 4: Marking Nodes (Destructive)
 * Time: O(n), Space: O(1)
 *
 * Mark visited nodes by modifying them (not recommended for production).
 */
function hasCycleDestructive(head) {
  const VISITED_MARKER = "VISITED";
  let current = head;

  while (current) {
    if (current.val === VISITED_MARKER) {
      return true; // Found a cycle
    }
    current.val = VISITED_MARKER;
    current = current.next;
  }

  return false; // Reached the end, no cycle
}

/**
 * Helper function: Create a cycle in the list at given position
 * pos = -1 means no cycle
 * pos = 0 means cycle back to head
 * pos = 1 means cycle back to second node, etc.
 */
function createCycle(arr, pos) {
  if (arr.length === 0) return null;

  const head = arrayToList(arr);

  if (pos === -1) return head; // No cycle

  // Find the tail and the target node
  let tail = head;
  let target = head;
  let index = 0;

  // Find target node (where cycle should point back to)
  while (index < pos) {
    target = target.next;
    index++;
  }

  // Find tail
  while (tail.next) {
    tail = tail.next;
  }

  // Create cycle
  tail.next = target;

  return head;
}

/**
 * Advanced: Find cycle starting point (LeetCode 142)
 * Returns the node where cycle begins, or null if no cycle
 */
function detectCycleStart(head) {
  if (!head || !head.next) return null;

  // Phase 1: Detect if cycle exists
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      break; // Cycle detected
    }
  }

  // No cycle found
  if (!fast || !fast.next) return null;

  // Phase 2: Find the start of the cycle
  // Reset slow to head, keep fast at meeting point
  slow = head;

  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next; // Move fast by 1 now
  }

  return slow; // This is the start of the cycle
}

/**
 * Helper: Get cycle length
 * Returns 0 if no cycle, otherwise returns the length of the cycle
 */
function getCycleLength(head) {
  if (!hasCycle(head)) return 0;

  let slow = head;
  let fast = head;

  // Find meeting point
  do {
    slow = slow.next;
    fast = fast.next.next;
  } while (slow !== fast);

  // Count cycle length
  let length = 0;
  do {
    slow = slow.next;
    length++;
  } while (slow !== fast);

  return length;
}

// Test cases
function runTests() {
  console.log("Testing Linked List Cycle Detection:");

  const testCases = [
    {
      input: [3, 2, 0, -4],
      pos: 1,
      expected: true,
      description: "Cycle at position 1"
    },
    {
      input: [1, 2],
      pos: 0,
      expected: true,
      description: "Cycle at position 0"
    },
    {
      input: [1],
      pos: -1,
      expected: false,
      description: "Single node, no cycle"
    },
    {
      input: [],
      pos: -1,
      expected: false,
      description: "Empty list"
    },
    {
      input: [1, 2, 3, 4, 5],
      pos: -1,
      expected: false,
      description: "Linear list, no cycle"
    },
    {
      input: [1, 2, 3, 4, 5],
      pos: 2,
      expected: true,
      description: "Cycle at position 2"
    },
    {
      input: [1],
      pos: 0,
      expected: true,
      description: "Self-loop"
    }
  ];

  testCases.forEach((test, index) => {
    const list1 = createCycle(test.input, test.pos);
    const list2 = createCycle(test.input, test.pos);
    const list3 = createCycle(test.input, test.pos);

    const result1 = hasCycle(list1);
    const result2 = hasCycleAlt(list2);
    const result3 = hasCycleSet(list3);

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}], pos = ${test.pos}`);
    console.log(`Expected: ${test.expected}`);
    console.log(
      `Floyd's v1: ${result1} ${result1 === test.expected ? "✓" : "✗"}`
    );
    console.log(
      `Floyd's v2: ${result2} ${result2 === test.expected ? "✓" : "✗"}`
    );
    console.log(`Set: ${result3} ${result3 === test.expected ? "✓" : "✗"}`);

    // Test cycle start detection (for cycles only)
    if (test.expected) {
      const listForStart = createCycle(test.input, test.pos);
      const cycleStart = detectCycleStart(listForStart);
      const expectedStartValue = test.pos >= 0 ? test.input[test.pos] : null;
      console.log(
        `Cycle starts at node with value: ${
          cycleStart ? cycleStart.val : null
        } (expected: ${expectedStartValue})`
      );
    }
  });
}

// Performance test
function performanceTest() {
  console.log("\\n\\nPerformance Test:");

  const sizes = [1000, 10000, 50000];

  sizes.forEach((size) => {
    // Create a large list with cycle at the middle
    const arr = Array.from({ length: size }, (_, i) => i);
    const cyclePos = Math.floor(size / 2);

    console.log(`\\nList size: ${size}, cycle at position: ${cyclePos}`);

    // Test Floyd's Algorithm
    let list = createCycle(arr, cyclePos);
    let start = performance.now();
    hasCycle(list);
    let end = performance.now();
    console.log(`Floyd's: ${(end - start).toFixed(2)}ms`);

    // Test Set approach (for smaller sizes due to memory)
    if (size <= 10000) {
      list = createCycle(arr, cyclePos);
      start = performance.now();
      hasCycleSet(list);
      end = performance.now();
      console.log(`Set: ${(end - start).toFixed(2)}ms`);
    }

    // Test no cycle case
    list = createCycle(arr, -1); // No cycle
    start = performance.now();
    hasCycle(list);
    end = performance.now();
    console.log(`Floyd's (no cycle): ${(end - start).toFixed(2)}ms`);
  });
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Linked List Cycle Detection - Algorithm Explanation:

Floyd's Cycle Detection Algorithm (Tortoise and Hare):

The algorithm uses two pointers moving at different speeds:
- Slow pointer (tortoise): moves 1 step at a time
- Fast pointer (hare): moves 2 steps at a time

Key Insight: If there's a cycle, the fast pointer will eventually catch up to the slow pointer.

Why it works:
1. If there's no cycle, fast pointer reaches the end first
2. If there's a cycle, both pointers will be trapped in the cycle
3. Since fast moves 2 steps and slow moves 1 step, fast gains 1 step on slow each iteration
4. Eventually, fast will "lap" slow and they'll meet

Mathematical Proof:
- Let's say the cycle length is C
- When slow enters the cycle, fast is already K steps ahead
- After (C - K) iterations, they'll meet
- Fast travels 2(C - K) = 2C - 2K steps
- Slow travels (C - K) steps
- They meet at the same position

Finding Cycle Start (Advanced):
1. After detecting meeting point, reset slow to head
2. Move both pointers 1 step at a time
3. They'll meet at the cycle start

Time Complexity: O(n) - each node visited at most twice
Space Complexity: O(1) - only using two pointers

Alternative Approaches:
- Set/HashMap: Track visited nodes, O(n) space
- Node marking: Modify nodes (destructive), O(1) space

Applications:
- Detect infinite loops in processes
- Find duplicate elements in arrays (using indexes as pointers)
- Detect cycles in state machines
- Graph cycle detection
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  hasCycle,
  hasCycleAlt,
  hasCycleSet,
  hasCycleDestructive,
  createCycle,
  detectCycleStart,
  getCycleLength
};
