/**
 * Merge Two Sorted Lists (LeetCode 21)
 * Difficulty: Easy
 *
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.
 * Return the head of the merged linked list.
 *
 * Pattern: Two Pointers / Dummy Node
 *
 * Examples:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 *
 * Input: list1 = [], list2 = []
 * Output: []
 *
 * Input: list1 = [], list2 = [0]
 * Output: [0]
 */

const {
  ListNode,
  arrayToList,
  listToArray
} = require("./01_reverse_linked_list.js");

/**
 * Approach 1: Iterative with Dummy Node (Optimal)
 * Time: O(m + n), Space: O(1)
 *
 * Use a dummy node to simplify edge cases and merge iteratively.
 */
function mergeTwoLists(list1, list2) {
  // Create a dummy node to simplify edge cases
  const dummy = new ListNode(0);
  let current = dummy;

  // Compare and merge while both lists have nodes
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Attach remaining nodes (at most one list will have remaining nodes)
  current.next = list1 || list2;

  return dummy.next; // Skip the dummy node
}

/**
 * Approach 2: Recursive (Alternative)
 * Time: O(m + n), Space: O(m + n) - due to call stack
 *
 * Recursively merge by choosing the smaller head.
 */
function mergeTwoListsRecursive(list1, list2) {
  // Base cases
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  // Choose the smaller head and recursively merge the rest
  if (list1.val <= list2.val) {
    list1.next = mergeTwoListsRecursive(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoListsRecursive(list1, list2.next);
    return list2;
  }
}

/**
 * Approach 3: In-place without Dummy Node (Space Optimized)
 * Time: O(m + n), Space: O(1)
 *
 * Merge without using a dummy node by handling the head separately.
 */
function mergeTwoListsInPlace(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  // Determine the head of the merged list
  let head, current;
  if (list1.val <= list2.val) {
    head = current = list1;
    list1 = list1.next;
  } else {
    head = current = list2;
    list2 = list2.next;
  }

  // Merge the remaining nodes
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Attach remaining nodes
  current.next = list1 || list2;

  return head;
}

/**
 * Approach 4: Using Array and Sorting (Less Efficient)
 * Time: O((m + n) log(m + n)), Space: O(m + n)
 *
 * Convert to arrays, merge, sort, and convert back.
 */
function mergeTwoListsArray(list1, list2) {
  const values = [];

  // Collect all values
  let current = list1;
  while (current) {
    values.push(current.val);
    current = current.next;
  }

  current = list2;
  while (current) {
    values.push(current.val);
    current = current.next;
  }

  // Sort and create new list
  values.sort((a, b) => a - b);
  return arrayToList(values);
}

// Test cases
function runTests() {
  console.log("Testing Merge Two Sorted Lists:");

  const testCases = [
    {
      list1: [1, 2, 4],
      list2: [1, 3, 4],
      expected: [1, 1, 2, 3, 4, 4],
      description: "Both lists with overlapping values"
    },
    {
      list1: [],
      list2: [],
      expected: [],
      description: "Both empty lists"
    },
    {
      list1: [],
      list2: [0],
      expected: [0],
      description: "One empty, one with single element"
    },
    {
      list1: [1, 3, 5],
      list2: [2, 4, 6],
      expected: [1, 2, 3, 4, 5, 6],
      description: "Interleaving values"
    },
    {
      list1: [1, 1, 1],
      list2: [2, 2, 2],
      expected: [1, 1, 1, 2, 2, 2],
      description: "All elements in list1 smaller"
    },
    {
      list1: [5],
      list2: [1, 2, 3, 4],
      expected: [1, 2, 3, 4, 5],
      description: "Single element vs multiple"
    },
    {
      list1: [-3, -1, 0],
      list2: [-2, 1, 2],
      expected: [-3, -2, -1, 0, 1, 2],
      description: "Negative numbers"
    }
  ];

  testCases.forEach((test, index) => {
    const l1_iter = arrayToList(test.list1);
    const l2_iter = arrayToList(test.list2);
    const l1_rec = arrayToList(test.list1);
    const l2_rec = arrayToList(test.list2);
    const l1_in = arrayToList(test.list1);
    const l2_in = arrayToList(test.list2);
    const l1_arr = arrayToList(test.list1);
    const l2_arr = arrayToList(test.list2);

    const result1 = listToArray(mergeTwoLists(l1_iter, l2_iter));
    const result2 = listToArray(mergeTwoListsRecursive(l1_rec, l2_rec));
    const result3 = listToArray(mergeTwoListsInPlace(l1_in, l2_in));
    const result4 = listToArray(mergeTwoListsArray(l1_arr, l2_arr));

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`List1: [${test.list1.join(", ")}]`);
    console.log(`List2: [${test.list2.join(", ")}]`);
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
      `In-place: [${result3.join(", ")}] ${
        JSON.stringify(result3) === JSON.stringify(test.expected) ? "✓" : "✗"
      }`
    );
    console.log(
      `Array: [${result4.join(", ")}] ${
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
    // Create two sorted arrays
    const arr1 = Array.from({ length: size / 2 }, (_, i) => i * 2);
    const arr2 = Array.from({ length: size / 2 }, (_, i) => i * 2 + 1);

    console.log(`\\nLists size: ${size / 2} each`);

    // Test Iterative
    let list1 = arrayToList(arr1);
    let list2 = arrayToList(arr2);
    let start = performance.now();
    mergeTwoLists(list1, list2);
    let end = performance.now();
    console.log(`Iterative: ${(end - start).toFixed(2)}ms`);

    // Test Recursive (for smaller sizes)
    if (size <= 5000) {
      list1 = arrayToList(arr1);
      list2 = arrayToList(arr2);
      start = performance.now();
      mergeTwoListsRecursive(list1, list2);
      end = performance.now();
      console.log(`Recursive: ${(end - start).toFixed(2)}ms`);
    }

    // Test In-place
    list1 = arrayToList(arr1);
    list2 = arrayToList(arr2);
    start = performance.now();
    mergeTwoListsInPlace(list1, list2);
    end = performance.now();
    console.log(`In-place: ${(end - start).toFixed(2)}ms`);

    // Test Array approach
    list1 = arrayToList(arr1);
    list2 = arrayToList(arr2);
    start = performance.now();
    mergeTwoListsArray(list1, list2);
    end = performance.now();
    console.log(`Array: ${(end - start).toFixed(2)}ms`);
  });
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Merge Two Sorted Lists - Algorithm Explanation:

The goal is to merge two already sorted linked lists into one sorted list.

Iterative with Dummy Node (Optimal):
1. Create a dummy node to simplify edge cases
2. Use a current pointer to build the result list
3. Compare heads of both lists and attach the smaller one
4. Move the pointer in the list from which we took the node
5. Continue until one list is exhausted
6. Attach the remaining nodes from the other list

Dummy Node Benefits:
- Eliminates need to handle empty result list separately
- Simplifies the logic for the first node
- Makes code cleaner and less error-prone

Recursive Approach:
1. Base cases: if one list is empty, return the other
2. Compare heads and recursively merge the rest
3. Return the node with the smaller value

Key Insights:
- Both input lists are already sorted
- We maintain the sorted order by always choosing the smaller head
- No need to create new nodes, just rearrange pointers
- Time complexity is linear as we visit each node exactly once

Time Complexity: O(m + n) where m, n are lengths of the lists
Space Complexity:
- Iterative: O(1)
- Recursive: O(m + n) due to call stack

Pattern: This demonstrates the "two pointers" and "dummy node" patterns,
essential for many LinkedList merge/manipulation problems.
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  mergeTwoLists,
  mergeTwoListsRecursive,
  mergeTwoListsInPlace,
  mergeTwoListsArray
};
