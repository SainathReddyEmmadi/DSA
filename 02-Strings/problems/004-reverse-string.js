/**
 * LeetCode 344: Reverse String
 * Difficulty: Easy
 *
 * Problem:
 * Write a function that reverses a string. The input string is given as an array of characters s.
 * You must do this by modifying the input array in-place with O(1) extra memory.
 *
 * Example 1:
 * Input: s = ["h","e","l","l","o"]
 * Output: ["o","l","l","e","h"]
 *
 * Example 2:
 * Input: s = ["H","a","n","n","a","h"]
 * Output: ["h","a","n","n","a","H"]
 */

// Approach 1: Two Pointers (In-place, Most Efficient)
// Time: O(n), Space: O(1)
function reverseString1(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Swap characters
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }

  return s;
}

// Approach 2: Using Built-in Reverse (Not in-place)
// Time: O(n), Space: O(1) for the operation itself
function reverseString2(s) {
  return s.reverse();
}

// Approach 3: Recursive Solution
// Time: O(n), Space: O(n) due to recursion stack
function reverseString3(s) {
  function helper(left, right) {
    if (left >= right) return;

    // Swap characters
    [s[left], s[right]] = [s[right], s[left]];

    // Recurse
    helper(left + 1, right - 1);
  }

  helper(0, s.length - 1);
  return s;
}

// Approach 4: Using Stack (Not in-place)
// Time: O(n), Space: O(n)
function reverseString4(s) {
  const stack = [];

  // Push all characters to stack
  for (let char of s) {
    stack.push(char);
  }

  // Pop characters back to array
  for (let i = 0; i < s.length; i++) {
    s[i] = stack.pop();
  }

  return s;
}

// Bonus: Reverse a regular string (not character array)
function reverseStringRegular(str) {
  // Method 1: Built-in
  const method1 = str.split("").reverse().join("");

  // Method 2: For loop
  let method2 = "";
  for (let i = str.length - 1; i >= 0; i--) {
    method2 += str[i];
  }

  // Method 3: Reduce
  const method3 = str.split("").reduce((reversed, char) => char + reversed, "");

  // Method 4: Recursion
  function recursiveReverse(s) {
    if (s.length <= 1) return s;
    return recursiveReverse(s.slice(1)) + s[0];
  }
  const method4 = recursiveReverse(str);

  return { method1, method2, method3, method4 };
}

// Test cases
function runTests() {
  const testCases = [
    {
      input: ["h", "e", "l", "l", "o"],
      expected: ["o", "l", "l", "e", "h"],
      description: "Basic string reversal"
    },
    {
      input: ["H", "a", "n", "n", "a", "h"],
      expected: ["h", "a", "n", "n", "a", "H"],
      description: "Palindrome-like string"
    },
    {
      input: ["a"],
      expected: ["a"],
      description: "Single character"
    },
    {
      input: [],
      expected: [],
      description: "Empty array"
    },
    {
      input: ["1", "2", "3", "4", "5"],
      expected: ["5", "4", "3", "2", "1"],
      description: "Numeric characters"
    },
    {
      input: ["A", "B", "C", "D", "E", "F", "G"],
      expected: ["G", "F", "E", "D", "C", "B", "A"],
      description: "Odd length array"
    }
  ];

  const approaches = [
    { name: "Two Pointers", func: reverseString1 },
    { name: "Built-in Reverse", func: reverseString2 },
    { name: "Recursive", func: reverseString3 },
    { name: "Stack", func: reverseString4 }
  ];

  approaches.forEach((approach) => {
    console.log(`\n=== Testing ${approach.name} Approach ===`);

    testCases.forEach((test, index) => {
      const input = [...test.input]; // Create copy to avoid mutation
      const result = approach.func(input);
      const passed = JSON.stringify(result) === JSON.stringify(test.expected);
      const status = passed ? "✅ PASS" : "❌ FAIL";

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  Input: [${test.input.map((c) => `"${c}"`).join(", ")}]`);
      console.log(
        `  Expected: [${test.expected.map((c) => `"${c}"`).join(", ")}]`
      );
      console.log(`  Got: [${result.map((c) => `"${c}"`).join(", ")}]`);
      console.log(`  Description: ${test.description}`);
    });
  });
}

// Test regular string reversal methods
function testRegularStringReversal() {
  console.log("\n=== Regular String Reversal Methods ===");

  const testStrings = ["hello", "javascript", "a", "", "12345"];

  testStrings.forEach((str) => {
    console.log(`\nReversing "${str}":`);
    const results = reverseStringRegular(str);

    Object.entries(results).forEach(([method, result]) => {
      console.log(`  ${method}: "${result}"`);
    });
  });
}

// Performance comparison
function performanceTest() {
  console.log("\n=== Performance Comparison ===");

  // Create large test array
  const largeArray = Array.from({ length: 100000 }, (_, i) =>
    String.fromCharCode(65 + (i % 26))
  );

  const approaches = [
    { name: "Two Pointers (In-place)", func: reverseString1 },
    { name: "Built-in Reverse", func: reverseString2 },
    { name: "Recursive", func: reverseString3 },
    { name: "Stack", func: reverseString4 }
  ];

  approaches.forEach((approach) => {
    const testArray = [...largeArray]; // Create copy

    const start = performance.now();
    approach.func(testArray);
    const end = performance.now();

    console.log(`${approach.name}: ${(end - start).toFixed(2)}ms`);
  });
}

// Advanced string reversal patterns
function advancedPatterns() {
  console.log("\n=== Advanced String Reversal Patterns ===");

  // Reverse words in a string
  function reverseWords(str) {
    return str
      .split(" ")
      .map((word) => word.split("").reverse().join(""))
      .join(" ");
  }

  // Reverse sentence (word order)
  function reverseSentence(str) {
    return str.split(" ").reverse().join(" ");
  }

  // Reverse only letters (keep numbers/symbols in place)
  function reverseOnlyLetters(s) {
    const chars = s.split("");
    let left = 0;
    let right = chars.length - 1;

    while (left < right) {
      if (!/[a-zA-Z]/.test(chars[left])) {
        left++;
      } else if (!/[a-zA-Z]/.test(chars[right])) {
        right--;
      } else {
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
      }
    }

    return chars.join("");
  }

  const testStr = "hello world 123";
  console.log(`Original: "${testStr}"`);
  console.log(`Reverse words: "${reverseWords(testStr)}"`);
  console.log(`Reverse sentence: "${reverseSentence(testStr)}"`);
  console.log(`Reverse only letters: "${reverseOnlyLetters(testStr)}"`);
}

// Key Insights and Patterns
console.log(`
=== Reverse String - Key Insights ===

1. Pattern: Two Pointers
   - Most efficient for in-place reversal
   - Swap elements from both ends moving inward
   - O(1) space complexity

2. In-place vs New Array:
   - In-place: Modifies original array
   - New array: Creates reversed copy
   - Consider requirements and constraints

3. Edge Cases:
   - Empty arrays
   - Single element arrays
   - Arrays with odd/even lengths

4. Optimization Considerations:
   - Two pointers: Most space efficient
   - Built-in methods: Often optimized but may not be in-place
   - Recursive: Elegant but uses stack space

5. Common Variations:
   - Reverse words in string
   - Reverse sentence (word order)
   - Reverse only certain characters
   - Reverse substrings

6. Swapping Techniques:
   - ES6 destructuring: [a, b] = [b, a]
   - Temporary variable: tmp = a; a = b; b = tmp
   - XOR (for numbers): a ^= b; b ^= a; a ^= b

Time Complexity: O(n) - must visit each element
Space Complexity: O(1) for in-place, O(n) for new array
`);

// Run tests
if (require.main === module) {
  runTests();
  testRegularStringReversal();
  performanceTest();
  advancedPatterns();
}

module.exports = {
  reverseString1,
  reverseString2,
  reverseString3,
  reverseString4,
  reverseStringRegular
};
