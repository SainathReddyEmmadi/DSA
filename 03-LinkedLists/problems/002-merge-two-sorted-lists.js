/**
 * 21. Merge Two Sorted Lists
 * https://leetcode.com/problems/merge-two-sorted-lists/
 *
 * Difficulty: Easy
 * Topics: Linked List, Recursion
 *
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists into one sorted list. The list should be made by splicing
 * together the nodes of the first two lists.
 *
 * Return the head of the merged linked list.
 *
 * Example 1:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 *
 * Example 2:
 * Input: list1 = [], list2 = []
 * Output: []
 *
 * Example 3:
 * Input: list1 = [], list2 = [0]
 * Output: [0]
 */

// Definition for singly-linked list
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * APPROACH 1: Iterative with Dummy Node
 * Time Complexity: O(m + n) - where m and n are lengths of the two lists
 * Space Complexity: O(1) - only use constant extra space
 *
 * Algorithm:
 * 1. Create a dummy node to simplify edge cases
 * 2. Use a current pointer to build the merged list
 * 3. Compare values and append the smaller node
 * 4. Append remaining nodes from non-empty list
 *
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoListsIterative(list1, list2) {
  // Create dummy node to simplify logic
  const dummy = new ListNode(0);
  let current = dummy;

  // Merge while both lists have nodes
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

  // Append remaining nodes (at most one list is non-empty)
  current.next = list1 || list2;

  return dummy.next;
}

/**
 * APPROACH 2: Recursive
 * Time Complexity: O(m + n) - visit each node once
 * Space Complexity: O(m + n) - recursion call stack depth
 *
 * Algorithm:
 * 1. Base cases: if one list is empty, return the other
 * 2. Compare head values and choose the smaller one
 * 3. Recursively merge the rest
 *
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
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
 * APPROACH 3: In-place without dummy node
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 *
 * Algorithm:
 * 1. Handle edge cases first
 * 2. Ensure list1 starts with the smaller value
 * 3. Merge by adjusting pointers
 *
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoListsInPlace(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  // Ensure list1 starts with smaller value
  if (list1.val > list2.val) {
    [list1, list2] = [list2, list1];
  }

  const result = list1;

  while (list1.next && list2) {
    if (list1.next.val <= list2.val) {
      list1 = list1.next;
    } else {
      // Insert list2 node between list1 and list1.next
      const temp = list1.next;
      list1.next = list2;
      list2 = list2.next;
      list1.next.next = temp;
      list1 = list1.next;
    }
  }

  // Append remaining nodes from list2
  if (!list1.next) {
    list1.next = list2;
  }

  return result;
}

// Main function (using iterative approach as default)
const mergeTwoLists = mergeTwoListsIterative;

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
function testMergeTwoLists() {
  console.log("Testing Merge Two Sorted Lists...\n");

  const testCases = [
    {
      list1: [1, 2, 4],
      list2: [1, 3, 4],
      expected: [1, 1, 2, 3, 4, 4]
    },
    {
      list1: [],
      list2: [],
      expected: []
    },
    {
      list1: [],
      list2: [0],
      expected: [0]
    },
    {
      list1: [1, 3, 5],
      list2: [2, 4, 6],
      expected: [1, 2, 3, 4, 5, 6]
    },
    {
      list1: [1],
      list2: [2],
      expected: [1, 2]
    },
    {
      list1: [2],
      list2: [1],
      expected: [1, 2]
    }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log(`List1: [${testCase.list1.join(", ")}]`);
    console.log(`List2: [${testCase.list2.join(", ")}]`);
    console.log(`Expected: [${testCase.expected.join(", ")}]`);

    // Test all approaches
    const approaches = [
      { name: "Iterative", fn: mergeTwoListsIterative },
      { name: "Recursive", fn: mergeTwoListsRecursive },
      { name: "In-place", fn: mergeTwoListsInPlace }
    ];

    approaches.forEach((approach) => {
      const list1 = createLinkedList(testCase.list1);
      const list2 = createLinkedList(testCase.list2);
      const result = approach.fn(list1, list2);
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
// testMergeTwoLists();

module.exports = {
  ListNode,
  mergeTwoLists,
  mergeTwoListsIterative,
  mergeTwoListsRecursive,
  mergeTwoListsInPlace,
  createLinkedList,
  linkedListToArray
};
