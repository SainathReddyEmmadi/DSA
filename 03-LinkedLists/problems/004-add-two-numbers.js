/**
 * 2. Add Two Numbers
 * https://leetcode.com/problems/add-two-numbers/
 *
 * Difficulty: Medium
 * Topics: Linked List, Math, Recursion
 *
 * You are given two non-empty linked lists representing two non-negative integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 *
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 * Example 1:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807.
 *
 * Example 2:
 * Input: l1 = [0], l2 = [0]
 * Output: [0]
 *
 * Example 3:
 * Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * Output: [8,9,9,9,0,0,0,1]
 */

// Definition for singly-linked list
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * APPROACH 1: Iterative with Carry
 * Time Complexity: O(max(m, n)) - where m and n are lengths of the lists
 * Space Complexity: O(max(m, n)) - for the result list
 *
 * Algorithm:
 * 1. Traverse both lists simultaneously
 * 2. Add corresponding digits plus carry from previous addition
 * 3. Handle carry and create new node for result
 * 4. Continue until both lists are exhausted and no carry remains
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbersIterative(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    // Get values from current nodes (0 if null)
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    // Calculate sum and new carry
    const sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);
    const digit = sum % 10;

    // Create new node for result
    current.next = new ListNode(digit);
    current = current.next;

    // Move to next nodes
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }

  return dummy.next;
}

/**
 * APPROACH 2: Recursive
 * Time Complexity: O(max(m, n))
 * Space Complexity: O(max(m, n)) - recursion call stack
 *
 * Algorithm:
 * 1. Base case: if both lists are null and no carry, return null
 * 2. Calculate sum of current digits plus carry
 * 3. Create node with current digit
 * 4. Recursively process next nodes with new carry
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @param {number} carry
 * @return {ListNode}
 */
function addTwoNumbersRecursive(l1, l2, carry = 0) {
  // Base case: if all are null/zero, return null
  if (!l1 && !l2 && carry === 0) {
    return null;
  }

  // Get values from current nodes
  const val1 = l1 ? l1.val : 0;
  const val2 = l2 ? l2.val : 0;

  // Calculate sum and new carry
  const sum = val1 + val2 + carry;
  const newCarry = Math.floor(sum / 10);
  const digit = sum % 10;

  // Create result node
  const result = new ListNode(digit);

  // Get next nodes
  const next1 = l1 ? l1.next : null;
  const next2 = l2 ? l2.next : null;

  // Recursively process next nodes
  result.next = addTwoNumbersRecursive(next1, next2, newCarry);

  return result;
}

/**
 * APPROACH 3: In-place modification (modifies l1)
 * Time Complexity: O(max(m, n))
 * Space Complexity: O(1) - if we don't count the additional nodes for longer list
 *
 * Note: This approach modifies the first input list
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbersInPlace(l1, l2) {
  let head = l1;
  let carry = 0;
  let prev = null;

  while (l1 || l2 || carry) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    const sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);
    const digit = sum % 10;

    if (l1) {
      l1.val = digit;
      prev = l1;
      l1 = l1.next;
    } else {
      // Create new node if l1 is exhausted
      prev.next = new ListNode(digit);
      prev = prev.next;
    }

    l2 = l2 ? l2.next : null;
  }

  return head;
}

// Main function (using iterative approach as default)
const addTwoNumbers = addTwoNumbersIterative;

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

// Helper function to convert array to number (reverse order)
function arrayToNumber(arr) {
  return parseInt(arr.reverse().join(""));
}

// Helper function to convert number to array (reverse order)
function numberToArray(num) {
  return num.toString().split("").map(Number).reverse();
}

// Test cases
function testAddTwoNumbers() {
  console.log("Testing Add Two Numbers...\n");

  const testCases = [
    {
      l1: [2, 4, 3],
      l2: [5, 6, 4],
      expected: [7, 0, 8],
      description: "342 + 465 = 807"
    },
    {
      l1: [0],
      l2: [0],
      expected: [0],
      description: "0 + 0 = 0"
    },
    {
      l1: [9, 9, 9, 9, 9, 9, 9],
      l2: [9, 9, 9, 9],
      expected: [8, 9, 9, 9, 0, 0, 0, 1],
      description: "9999999 + 9999 = 10009998"
    },
    {
      l1: [1],
      l2: [9, 9],
      expected: [0, 0, 1],
      description: "1 + 99 = 100"
    },
    {
      l1: [5],
      l2: [5],
      expected: [0, 1],
      description: "5 + 5 = 10"
    }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}: ${testCase.description}`);
    console.log(`L1: [${testCase.l1.join(", ")}]`);
    console.log(`L2: [${testCase.l2.join(", ")}]`);
    console.log(`Expected: [${testCase.expected.join(", ")}]`);

    // Test all approaches
    const approaches = [
      { name: "Iterative", fn: addTwoNumbersIterative },
      { name: "Recursive", fn: (l1, l2) => addTwoNumbersRecursive(l1, l2) }
    ];

    approaches.forEach((approach) => {
      const l1 = createLinkedList(testCase.l1);
      const l2 = createLinkedList(testCase.l2);
      const result = approach.fn(l1, l2);
      const resultArray = linkedListToArray(result);
      const passed =
        JSON.stringify(resultArray) === JSON.stringify(testCase.expected);

      console.log(
        `${approach.name}: [${resultArray.join(", ")}] - ${
          passed ? "PASS" : "FAIL"
        }`
      );
    });

    // Test in-place approach separately (since it modifies input)
    const l1InPlace = createLinkedList(testCase.l1);
    const l2InPlace = createLinkedList(testCase.l2);
    const inPlaceResult = addTwoNumbersInPlace(l1InPlace, l2InPlace);
    const inPlaceArray = linkedListToArray(inPlaceResult);
    const inPlacePassed =
      JSON.stringify(inPlaceArray) === JSON.stringify(testCase.expected);
    console.log(
      `In-place: [${inPlaceArray.join(", ")}] - ${
        inPlacePassed ? "PASS" : "FAIL"
      }`
    );

    console.log();
  });
}

// Edge cases test
function testEdgeCases() {
  console.log("Testing Edge Cases...\n");

  const edgeCases = [
    {
      name: "Different lengths",
      l1: [1, 8],
      l2: [0],
      expected: [1, 8]
    },
    {
      name: "All 9s with carry",
      l1: [9, 9],
      l2: [1],
      expected: [0, 0, 1]
    },
    {
      name: "Single digits",
      l1: [5],
      l2: [7],
      expected: [2, 1]
    }
  ];

  edgeCases.forEach((testCase, index) => {
    console.log(`Edge Case ${index + 1}: ${testCase.name}`);

    const l1 = createLinkedList(testCase.l1);
    const l2 = createLinkedList(testCase.l2);
    const result = addTwoNumbers(l1, l2);
    const resultArray = linkedListToArray(result);
    const passed =
      JSON.stringify(resultArray) === JSON.stringify(testCase.expected);

    console.log(
      `Input: [${testCase.l1.join(", ")}] + [${testCase.l2.join(", ")}]`
    );
    console.log(
      `Result: [${resultArray.join(", ")}] - ${passed ? "PASS" : "FAIL"}`
    );
    console.log();
  });
}

// Uncomment to run tests
// testAddTwoNumbers();
// testEdgeCases();

module.exports = {
  ListNode,
  addTwoNumbers,
  addTwoNumbersIterative,
  addTwoNumbersRecursive,
  addTwoNumbersInPlace,
  createLinkedList,
  linkedListToArray
};
