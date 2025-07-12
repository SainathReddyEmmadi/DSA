/**
 * 20. Valid Parentheses
 * https://leetcode.com/problems/valid-parentheses/
 *
 * Difficulty: Easy
 * Topics: String, Stack
 *
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * Example 1:
 * Input: s = "()"
 * Output: true
 *
 * Example 2:
 * Input: s = "()[]{}"
 * Output: true
 *
 * Example 3:
 * Input: s = "(]"
 * Output: false
 */

/**
 * APPROACH 1: Stack with HashMap
 * Time Complexity: O(n) - single pass through string
 * Space Complexity: O(n) - stack can hold up to n/2 elements
 *
 * Algorithm:
 * 1. Use a stack to track opening brackets
 * 2. Use a map to match closing brackets to opening brackets
 * 3. For each character:
 *    - If opening bracket, push to stack
 *    - If closing bracket, check if it matches top of stack
 * 4. String is valid if stack is empty at the end
 *
 * @param {string} s
 * @return {boolean}
 */
function isValidStack(s) {
  const stack = [];
  const pairs = {
    ")": "(",
    "}": "{",
    "]": "["
  };

  for (const char of s) {
    if (char === "(" || char === "{" || char === "[") {
      // Opening bracket - push to stack
      stack.push(char);
    } else {
      // Closing bracket - check if it matches
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  // Valid if all brackets are matched (stack is empty)
  return stack.length === 0;
}

/**
 * APPROACH 2: Stack with Switch Statement
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Alternative implementation using switch for character handling
 *
 * @param {string} s
 * @return {boolean}
 */
function isValidSwitch(s) {
  const stack = [];

  for (const char of s) {
    switch (char) {
      case "(":
      case "{":
      case "[":
        stack.push(char);
        break;
      case ")":
        if (stack.pop() !== "(") return false;
        break;
      case "}":
        if (stack.pop() !== "{") return false;
        break;
      case "]":
        if (stack.pop() !== "[") return false;
        break;
      default:
        // Invalid character
        return false;
    }
  }

  return stack.length === 0;
}

/**
 * APPROACH 3: Optimized Stack (Push Closing Brackets)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Push expected closing bracket for each opening bracket
 *
 * @param {string} s
 * @return {boolean}
 */
function isValidOptimized(s) {
  const stack = [];

  for (const char of s) {
    if (char === "(") {
      stack.push(")");
    } else if (char === "{") {
      stack.push("}");
    } else if (char === "[") {
      stack.push("]");
    } else {
      // Closing bracket - should match top of stack
      if (stack.length === 0 || stack.pop() !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

/**
 * APPROACH 4: String Replacement (Less Efficient)
 * Time Complexity: O(n²) - string replacement in loop
 * Space Complexity: O(n) - string operations
 *
 * Keep removing valid pairs until no more can be removed
 *
 * @param {string} s
 * @return {boolean}
 */
function isValidReplacement(s) {
  while (s.includes("()") || s.includes("{}") || s.includes("[]")) {
    s = s.replace("()", "").replace("{}", "").replace("[]", "");
  }
  return s.length === 0;
}

/**
 * APPROACH 5: Counter-based (Only for Single Type)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Only works if all brackets are of the same type
 *
 * @param {string} s
 * @return {boolean}
 */
function isValidCounter(s) {
  // This only works for parentheses () - single type
  let count = 0;

  for (const char of s) {
    if (char === "(") {
      count++;
    } else if (char === ")") {
      count--;
      if (count < 0) return false; // More closing than opening
    }
  }

  return count === 0;
}

// Main function (using stack with HashMap as default)
const isValid = isValidStack;

// ============================================================================
// TESTING
// ============================================================================

function testIsValid() {
  console.log("Testing Valid Parentheses...\n");

  const testCases = [
    { input: "()", expected: true, description: "Simple parentheses" },
    { input: "()[]{}", expected: true, description: "All types in order" },
    { input: "(]", expected: false, description: "Mismatched brackets" },
    { input: "([)]", expected: false, description: "Incorrect nesting" },
    { input: "{[]}", expected: true, description: "Proper nesting" },
    { input: "", expected: true, description: "Empty string" },
    { input: "((", expected: false, description: "Only opening brackets" },
    { input: "))", expected: false, description: "Only closing brackets" },
    { input: "())", expected: false, description: "Extra closing bracket" },
    { input: "(()", expected: false, description: "Extra opening bracket" },
    { input: "(())", expected: true, description: "Nested parentheses" },
    { input: "([{}])", expected: true, description: "Complex nesting" },
    { input: "([{})]", expected: false, description: "Invalid complex nesting" }
  ];

  const approaches = [
    { name: "Stack with HashMap", fn: isValidStack },
    { name: "Stack with Switch", fn: isValidSwitch },
    { name: "Optimized Stack", fn: isValidOptimized },
    { name: "String Replacement", fn: isValidReplacement }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}: ${testCase.description}`);
    console.log(`Input: "${testCase.input}"`);
    console.log(`Expected: ${testCase.expected}`);

    approaches.forEach((approach) => {
      const result = approach.fn(testCase.input);
      const passed = result === testCase.expected;
      console.log(`${approach.name}: ${result} - ${passed ? "PASS" : "FAIL"}`);
    });

    console.log();
  });
}

// Edge cases test
function testEdgeCases() {
  console.log("Testing Edge Cases...\n");

  const edgeCases = [
    { input: "(", expected: false, description: "Single opening bracket" },
    { input: ")", expected: false, description: "Single closing bracket" },
    {
      input: "(((((((()",
      expected: false,
      description: "Many opening, one closing"
    },
    {
      input: "()()()())",
      expected: false,
      description: "Valid pairs with extra closing"
    },
    { input: "{[()]}", expected: true, description: "All types nested" },
    {
      input: "{[()]}a",
      expected: false,
      description: "Invalid character (using switch approach)"
    }
  ];

  edgeCases.forEach((testCase, index) => {
    console.log(`Edge Case ${index + 1}: ${testCase.description}`);
    const result = isValid(testCase.input);
    const passed = result === testCase.expected;
    console.log(
      `Input: "${testCase.input}" → ${result} - ${passed ? "PASS" : "FAIL"}`
    );
    console.log();
  });
}

// Performance test
function performanceTest() {
  console.log("Performance Comparison...\n");

  // Generate large test case
  const size = 10000;
  let largeValid = "";
  let largeInvalid = "";

  // Create nested valid string: (((...)))
  for (let i = 0; i < size; i++) {
    largeValid += "(";
  }
  for (let i = 0; i < size; i++) {
    largeValid += ")";
  }

  // Create invalid string: (((...))
  largeInvalid = largeValid.slice(0, -1);

  const approaches = [
    { name: "Stack with HashMap", fn: isValidStack },
    { name: "Optimized Stack", fn: isValidOptimized }
    // Note: String replacement approach is too slow for large inputs
  ];

  console.log(`Testing with string of length: ${largeValid.length}`);

  approaches.forEach((approach) => {
    // Test valid case
    const start1 = performance.now();
    const result1 = approach.fn(largeValid);
    const end1 = performance.now();

    // Test invalid case
    const start2 = performance.now();
    const result2 = approach.fn(largeInvalid);
    const end2 = performance.now();

    console.log(`${approach.name}:`);
    console.log(`  Valid case: ${result1} (${(end1 - start1).toFixed(2)}ms)`);
    console.log(`  Invalid case: ${result2} (${(end2 - start2).toFixed(2)}ms)`);
  });
}

// Pattern variations test
function testPatternVariations() {
  console.log("Testing Pattern Variations...\n");

  const patterns = [
    { input: "()()()", expected: true, description: "Sequential pairs" },
    { input: "((()))", expected: true, description: "Nested same type" },
    { input: "([{}])", expected: true, description: "Nested different types" },
    { input: "{[()]}", expected: true, description: "All types nested" },
    { input: "(){}[]", expected: true, description: "All types sequential" },
    { input: "({[]})", expected: true, description: "Outer to inner nesting" }
  ];

  patterns.forEach((pattern, index) => {
    console.log(`Pattern ${index + 1}: ${pattern.description}`);
    const result = isValid(pattern.input);
    const passed = result === pattern.expected;
    console.log(`"${pattern.input}" → ${result} - ${passed ? "PASS" : "FAIL"}`);
  });
}

// Uncomment to run tests
// testIsValid();
// testEdgeCases();
// performanceTest();
// testPatternVariations();

module.exports = {
  isValid,
  isValidStack,
  isValidSwitch,
  isValidOptimized,
  isValidReplacement,
  isValidCounter
};
