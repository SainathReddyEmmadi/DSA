/**
 * Remove Duplicates from Sorted List (LeetCode 83)
 * Difficulty: Easy
 *
 * Given the head of a sorted linked list, delete all duplicates such that each element appears only once.
 * Return the linked list sorted as well.
 *
 * Pattern: Single Pointer Traversal
 *
 * Examples:
 * Input: head = [1,1,2]
 * Output: [1,2]
 *
 * Input: head = [1,1,2,3,3]
 * Output: [1,2,3]
 *
 * Input: head = []
 * Output: []
 */

const {
  ListNode,
  arrayToList,
  listToArray
} = require("./01_reverse_linked_list.js");

/**
 * Approach 1: Single Pass (Optimal)
 * Time: O(n), Space: O(1)
 *
 * Traverse the list and skip duplicate nodes.
 */
function deleteDuplicates(head) {
  if (!head) return head;

  let current = head;

  while (current.next !== null) {
    if (current.val === current.next.val) {
      // Skip the duplicate node
      current.next = current.next.next;
    } else {
      // Move to the next unique node
      current = current.next;
    }
  }

  return head;
}

/**
 * Approach 2: Recursive (Alternative)
 * Time: O(n), Space: O(n) - due to call stack
 *
 * Recursively process and remove duplicates.
 */
function deleteDuplicatesRecursive(head) {
  if (!head || !head.next) return head;

  // Recursively process the rest of the list
  head.next = deleteDuplicatesRecursive(head.next);

  // If current and next are duplicates, skip current
  if (head.val === head.next.val) {
    return head.next;
  }

  return head;
}

/**
 * Approach 3: Two Pointers (Explicit)
 * Time: O(n), Space: O(1)
 *
 * Use two pointers to track previous and current nodes.
 */
function deleteDuplicatesTwoPointers(head) {
  if (!head || !head.next) return head;

  let prev = head;
  let current = head.next;

  while (current !== null) {
    if (prev.val === current.val) {
      // Skip the duplicate
      prev.next = current.next;
    } else {
      // Move prev pointer
      prev = current;
    }
    current = current.next;
  }

  return head;
}

/**
 * Approach 4: Using Set (Less Efficient)
 * Time: O(n), Space: O(n)
 *
 * Track seen values and rebuild the list.
 */
function deleteDuplicatesSet(head) {
  if (!head) return head;

  const seen = new Set();
  const dummy = new ListNode(0);
  let current = dummy;
  let original = head;

  while (original) {
    if (!seen.has(original.val)) {
      seen.add(original.val);
      current.next = new ListNode(original.val);
      current = current.next;
    }
    original = original.next;
  }

  return dummy.next;
}

/**
 * Helper function: Count unique values
 * Useful for verification
 */
function countUniqueValues(head) {
  if (!head) return 0;

  let count = 1;
  let current = head;

  while (current.next) {
    if (current.val !== current.next.val) {
      count++;
    }
    current = current.next;
  }

  return count;
}

/**
 * Helper function: Check if list is properly deduplicated
 */
function isNoDuplicates(head) {
  if (!head || !head.next) return true;

  let current = head;
  while (current.next) {
    if (current.val === current.next.val) {
      return false;
    }
    current = current.next;
  }

  return true;
}

// Test cases
function runTests() {
  console.log("Testing Remove Duplicates from Sorted List:");

  const testCases = [
    {
      input: [1, 1, 2],
      expected: [1, 2],
      description: "Simple duplicates"
    },
    {
      input: [1, 1, 2, 3, 3],
      expected: [1, 2, 3],
      description: "Multiple duplicates"
    },
    {
      input: [],
      expected: [],
      description: "Empty list"
    },
    {
      input: [1],
      expected: [1],
      description: "Single element"
    },
    {
      input: [1, 1, 1, 1, 1],
      expected: [1],
      description: "All same elements"
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3, 4, 5],
      description: "No duplicates"
    },
    {
      input: [1, 1, 1, 2, 2, 3, 3, 3, 3],
      expected: [1, 2, 3],
      description: "Multiple consecutive duplicates"
    },
    {
      input: [-3, -1, 0, 0, 0, 3, 3],
      expected: [-3, -1, 0, 3],
      description: "Negative numbers with duplicates"
    }
  ];

  testCases.forEach((test, index) => {
    const list1 = arrayToList(test.input);
    const list2 = arrayToList(test.input);
    const list3 = arrayToList(test.input);
    const list4 = arrayToList(test.input);

    const result1 = listToArray(deleteDuplicates(list1));
    const result2 = listToArray(deleteDuplicatesRecursive(list2));
    const result3 = listToArray(deleteDuplicatesTwoPointers(list3));
    const result4 = listToArray(deleteDuplicatesSet(list4));

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: [${test.input.join(", ")}]`);
    console.log(`Expected: [${test.expected.join(", ")}]`);
    console.log(
      `Single Pass: [${result1.join(", ")}] ${
        JSON.stringify(result1) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Recursive: [${result2.join(", ")}] ${
        JSON.stringify(result2) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Two Pointers: [${result3.join(", ")}] ${
        JSON.stringify(result3) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Set: [${result4.join(", ")}] ${
        JSON.stringify(result4) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );

    // Verify no duplicates remain
    const noDups1 = isNoDuplicates(arrayToList(result1));
    const noDups2 = isNoDuplicates(arrayToList(result2));
    console.log(`No duplicates check: ${noDups1 && noDups2 ? "✓" : "✗"}`);
  });
}

// Performance test
function performanceTest() {
  console.log("\\n\\nPerformance Test:");

  const sizes = [1000, 10000, 50000];

  sizes.forEach((size) => {
    // Create array with duplicates (each number appears 2-3 times)
    const arr = [];
    for (let i = 0; i < size / 3; i++) {
      const repeats = Math.floor(Math.random() * 3) + 1; // 1-3 repeats
      for (let j = 0; j < repeats; j++) {
        arr.push(i);
      }
    }

    console.log(
      `\\nList size: ${arr.length} (${Math.floor(
        arr.length / 3
      )} unique values)`
    );

    // Test Single Pass
    let list = arrayToList(arr);
    let start = performance.now();
    deleteDuplicates(list);
    let end = performance.now();
    console.log(`Single Pass: ${(end - start).toFixed(2)}ms`);

    // Test Recursive (for smaller sizes)
    if (arr.length <= 10000) {
      list = arrayToList(arr);
      start = performance.now();
      deleteDuplicatesRecursive(list);
      end = performance.now();
      console.log(`Recursive: ${(end - start).toFixed(2)}ms`);
    }

    // Test Two Pointers
    list = arrayToList(arr);
    start = performance.now();
    deleteDuplicatesTwoPointers(list);
    end = performance.now();
    console.log(`Two Pointers: ${(end - start).toFixed(2)}ms`);

    // Test Set
    list = arrayToList(arr);
    start = performance.now();
    deleteDuplicatesSet(list);
    end = performance.now();
    console.log(`Set: ${(end - start).toFixed(2)}ms`);
  });
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Remove Duplicates from Sorted List - Algorithm Explanation:

The goal is to remove all duplicate nodes from a sorted linked list,
keeping only the first occurrence of each value.

Single Pass Approach (Optimal):
1. Start from the head of the list
2. For each node, check if its value equals the next node's value
3. If they're equal, skip the next node by updating current.next
4. If they're different, move to the next node
5. Continue until the end of the list

Key Insights:
- Since the list is sorted, duplicates are consecutive
- We don't need to look ahead more than one node
- We can modify the list in-place by adjusting pointers
- We keep the first occurrence of each duplicate group

Example walkthrough:
Input: 1 -> 1 -> 2 -> 3 -> 3 -> null

Step 1: current=1, next=1 (duplicate) -> skip next
        1 -> 2 -> 3 -> 3 -> null

Step 2: current=1, next=2 (different) -> move current
        current=2, next=3 (different) -> move current

Step 3: current=3, next=3 (duplicate) -> skip next
        1 -> 2 -> 3 -> null

Recursive Approach:
1. Process the rest of the list recursively
2. On return, check if current and next are duplicates
3. If so, return next (skip current), else return current

Two Pointers Approach:
- More explicit tracking of previous and current nodes
- Same logic but with clearer separation of concerns

Time Complexity: O(n) - visit each node once
Space Complexity: O(1) for iterative, O(n) for recursive

Pattern: This demonstrates basic linked list traversal and in-place modification,
fundamental skills for linked list problems.

Edge Cases to Handle:
- Empty list
- Single node
- All nodes are duplicates
- No duplicates at all
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  deleteDuplicates,
  deleteDuplicatesRecursive,
  deleteDuplicatesTwoPointers,
  deleteDuplicatesSet,
  countUniqueValues,
  isNoDuplicates
};
