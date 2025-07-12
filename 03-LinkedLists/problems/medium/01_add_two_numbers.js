/**
 * Add Two Numbers (LeetCode 2)
 * Difficulty: Medium
 *
 * You are given two non-empty linked lists representing two non-negative integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 *
 * Pattern: Simulation / Carry Handling
 *
 * Examples:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807
 *
 * Input: l1 = [0], l2 = [0]
 * Output: [0]
 *
 * Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * Output: [8,9,9,9,0,0,0,1]
 */

const {
  ListNode,
  arrayToList,
  listToArray
} = require("../easy/01_reverse_linked_list.js");

/**
 * Approach 1: Single Pass with Carry (Optimal)
 * Time: O(max(m, n)), Space: O(max(m, n))
 *
 * Simulate addition digit by digit, handling carry properly.
 */
function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;

    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }

  return dummy.next;
}

/**
 * Approach 2: Recursive (Alternative)
 * Time: O(max(m, n)), Space: O(max(m, n)) - due to call stack
 *
 * Recursively add digits and handle carry.
 */
function addTwoNumbersRecursive(l1, l2, carry = 0) {
  if (!l1 && !l2 && carry === 0) {
    return null;
  }

  const val1 = l1 ? l1.val : 0;
  const val2 = l2 ? l2.val : 0;
  const sum = val1 + val2 + carry;

  const result = new ListNode(sum % 10);
  const newCarry = Math.floor(sum / 10);

  result.next = addTwoNumbersRecursive(
    l1 ? l1.next : null,
    l2 ? l2.next : null,
    newCarry
  );

  return result;
}

/**
 * Approach 3: Convert to Numbers (Limited by Integer Size)
 * Time: O(m + n), Space: O(max(m, n))
 *
 * Convert lists to numbers, add, then convert back. Limited by integer overflow.
 */
function addTwoNumbersConvert(l1, l2) {
  const num1 = listToNumber(l1);
  const num2 = listToNumber(l2);
  const sum = num1 + num2;
  return numberToList(sum);
}

/**
 * Approach 4: String-based Addition (For very large numbers)
 * Time: O(max(m, n)), Space: O(max(m, n))
 *
 * Convert to strings, add manually, convert back.
 */
function addTwoNumbersString(l1, l2) {
  const str1 = listToString(l1);
  const str2 = listToString(l2);
  const sumStr = addStrings(str1, str2);
  return stringToList(sumStr);
}

// Helper functions
function listToNumber(head) {
  let number = 0;
  let multiplier = 1;

  while (head) {
    number += head.val * multiplier;
    multiplier *= 10;
    head = head.next;
  }

  return number;
}

function numberToList(num) {
  if (num === 0) return new ListNode(0);

  const dummy = new ListNode(0);
  let current = dummy;

  while (num > 0) {
    current.next = new ListNode(num % 10);
    current = current.next;
    num = Math.floor(num / 10);
  }

  return dummy.next;
}

function listToString(head) {
  let str = "";
  while (head) {
    str = head.val + str; // Prepend to reverse the order
    head = head.next;
  }
  return str || "0";
}

function stringToList(str) {
  const dummy = new ListNode(0);
  let current = dummy;

  // Process from right to left (reverse order for linked list)
  for (let i = str.length - 1; i >= 0; i--) {
    current.next = new ListNode(parseInt(str[i]));
    current = current.next;
  }

  return dummy.next;
}

function addStrings(str1, str2) {
  let i = str1.length - 1;
  let j = str2.length - 1;
  let carry = 0;
  let result = "";

  while (i >= 0 || j >= 0 || carry > 0) {
    const digit1 = i >= 0 ? parseInt(str1[i]) : 0;
    const digit2 = j >= 0 ? parseInt(str2[j]) : 0;
    const sum = digit1 + digit2 + carry;

    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);

    i--;
    j--;
  }

  return result;
}

/**
 * Advanced: Add multiple numbers (array of linked lists)
 */
function addMultipleNumbers(lists) {
  if (lists.length === 0) return null;
  if (lists.length === 1) return lists[0];

  let result = lists[0];
  for (let i = 1; i < lists.length; i++) {
    result = addTwoNumbers(result, lists[i]);
  }

  return result;
}

/**
 * Helper: Validate linked list represents a valid number
 */
function isValidNumber(head) {
  while (head) {
    if (head.val < 0 || head.val > 9) {
      return false;
    }
    head = head.next;
  }
  return true;
}

/**
 * Helper: Compare two number lists (for testing)
 */
function compareNumbers(l1, l2) {
  while (l1 && l2) {
    if (l1.val !== l2.val) {
      return false;
    }
    l1 = l1.next;
    l2 = l2.next;
  }
  return !l1 && !l2; // Both should be null
}

// Test cases
function runTests() {
  console.log("Testing Add Two Numbers:");

  const testCases = [
    {
      l1: [2, 4, 3],
      l2: [5, 6, 4],
      expected: [7, 0, 8],
      description: "Standard addition: 342 + 465 = 807"
    },
    {
      l1: [0],
      l2: [0],
      expected: [0],
      description: "Zero addition"
    },
    {
      l1: [9, 9, 9, 9, 9, 9, 9],
      l2: [9, 9, 9, 9],
      expected: [8, 9, 9, 9, 0, 0, 0, 1],
      description: "Multiple carries: 9999999 + 9999 = 10009998"
    },
    {
      l1: [1],
      l2: [9, 9],
      expected: [0, 0, 1],
      description: "Different lengths: 1 + 99 = 100"
    },
    {
      l1: [5],
      l2: [5],
      expected: [0, 1],
      description: "Single digit with carry: 5 + 5 = 10"
    },
    {
      l1: [1, 8],
      l2: [0],
      expected: [1, 8],
      description: "One number is zero: 81 + 0 = 81"
    }
  ];

  testCases.forEach((test, index) => {
    const list1_1 = arrayToList(test.l1);
    const list2_1 = arrayToList(test.l2);
    const list1_2 = arrayToList(test.l1);
    const list2_2 = arrayToList(test.l2);
    const list1_3 = arrayToList(test.l1);
    const list2_3 = arrayToList(test.l2);
    const list1_4 = arrayToList(test.l1);
    const list2_4 = arrayToList(test.l2);

    const result1 = listToArray(addTwoNumbers(list1_1, list2_1));
    const result2 = listToArray(addTwoNumbersRecursive(list1_2, list2_2));

    // Only test conversion approach for smaller numbers
    let result3 = [];
    let result4 = [];
    if (test.l1.length <= 6 && test.l2.length <= 6) {
      result3 = listToArray(addTwoNumbersConvert(list1_3, list2_3));
      result4 = listToArray(addTwoNumbersString(list1_4, list2_4));
    }

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`L1: [${test.l1.join(", ")}]`);
    console.log(`L2: [${test.l2.join(", ")}]`);
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

    if (result3.length > 0) {
      console.log(
        `Convert: [${result3.join(", ")}] ${
          JSON.stringify(result3) === JSON.stringify(test.expected) ? "✓" : "✗"
        }`
      );
    }
    if (result4.length > 0) {
      console.log(
        `String: [${result4.join(", ")}] ${
          JSON.stringify(result4) === JSON.stringify(test.expected) ? "✓" : "✗"
        }`
      );
    }
  });
}

// Performance test
function performanceTest() {
  console.log("\\n\\nPerformance Test:");

  const sizes = [100, 1000, 5000];

  sizes.forEach((size) => {
    // Create two large numbers
    const arr1 = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 10)
    );
    const arr2 = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 10)
    );

    console.log(`\\nNumber length: ${size} digits`);

    // Test Iterative
    let list1 = arrayToList(arr1);
    let list2 = arrayToList(arr2);
    let start = performance.now();
    addTwoNumbers(list1, list2);
    let end = performance.now();
    console.log(`Iterative: ${(end - start).toFixed(2)}ms`);

    // Test Recursive (for smaller sizes)
    if (size <= 1000) {
      list1 = arrayToList(arr1);
      list2 = arrayToList(arr2);
      start = performance.now();
      addTwoNumbersRecursive(list1, list2);
      end = performance.now();
      console.log(`Recursive: ${(end - start).toFixed(2)}ms`);
    }

    // Test String approach
    list1 = arrayToList(arr1);
    list2 = arrayToList(arr2);
    start = performance.now();
    addTwoNumbersString(list1, list2);
    end = performance.now();
    console.log(`String: ${(end - start).toFixed(2)}ms`);
  });
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Add Two Numbers - Algorithm Explanation:

The goal is to add two numbers represented as linked lists in reverse order.

Key Insights:
- Numbers are stored in reverse order (least significant digit first)
- This makes addition natural - start from head and work forward
- Need to handle carry propagation correctly
- Result may be longer than both inputs due to final carry

Iterative Approach (Optimal):
1. Use a dummy node to simplify edge cases
2. Track carry from previous addition
3. At each step:
   - Get digits from both lists (0 if list is exhausted)
   - Add digits + carry
   - Create new node with (sum % 10)
   - Update carry = sum / 10
   - Move to next nodes
4. Continue until both lists are exhausted AND carry is 0

Example walkthrough:
L1: 2 → 4 → 3 (represents 342)
L2: 5 → 6 → 4 (represents 465)

Step 1: 2 + 5 + 0 = 7, carry = 0, result: 7
Step 2: 4 + 6 + 0 = 10, carry = 1, result: 7 → 0
Step 3: 3 + 4 + 1 = 8, carry = 0, result: 7 → 0 → 8

Final: 7 → 0 → 8 (represents 807)

Edge Cases to Handle:
- Different length lists
- Carry from the last addition
- One or both lists being null
- All zeros

Recursive Approach:
- Same logic but implemented recursively
- Base case: both lists null and no carry
- Recur with next nodes and new carry

Time Complexity: O(max(m, n)) where m, n are list lengths
Space Complexity:
- Iterative: O(max(m, n)) for result list
- Recursive: O(max(m, n)) for result + call stack

Applications:
- Big integer arithmetic
- Financial calculations requiring arbitrary precision
- Cryptographic operations
- Calculator implementations
- Number processing in distributed systems

Pattern: This demonstrates digit-by-digit processing with carry propagation,
fundamental for arithmetic operations on large numbers.
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  addTwoNumbers,
  addTwoNumbersRecursive,
  addTwoNumbersConvert,
  addTwoNumbersString,
  addMultipleNumbers,
  listToNumber,
  numberToList,
  isValidNumber,
  compareNumbers
};
