/**
 * 394. Decode String
 * https://leetcode.com/problems/decode-string/
 *
 * Given an encoded string, return its decoded string.
 * The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets
 * is being repeated exactly k times.
 *
 * Example: s = "3[a2[c]]" returns "accaccacc"
 *
 * Patterns: Stack, String Processing, Recursion
 * Time: O(n), Space: O(n)
 */

// Approach 1: Using Stack (Iterative)
// Time: O(n), Space: O(n)
function decodeString(s) {
  const stack = [];
  let currentNum = 0;
  let currentStr = "";

  for (let char of s) {
    if (char >= "0" && char <= "9") {
      currentNum = currentNum * 10 + parseInt(char);
    } else if (char === "[") {
      // Push current state to stack
      stack.push([currentStr, currentNum]);
      currentStr = "";
      currentNum = 0;
    } else if (char === "]") {
      // Pop from stack and decode
      const [prevStr, num] = stack.pop();
      currentStr = prevStr + currentStr.repeat(num);
    } else {
      // Regular character
      currentStr += char;
    }
  }

  return currentStr;
}

// Approach 2: Recursive Solution
// Time: O(n), Space: O(n) due to call stack
function decodeStringRecursive(s) {
  let index = 0;

  function decode() {
    let result = "";
    let num = 0;

    while (index < s.length) {
      const char = s[index];

      if (char >= "0" && char <= "9") {
        num = num * 10 + parseInt(char);
      } else if (char === "[") {
        index++; // Skip '['
        const decoded = decode();
        result += decoded.repeat(num);
        num = 0;
      } else if (char === "]") {
        return result;
      } else {
        result += char;
      }

      index++;
    }

    return result;
  }

  return decode();
}

// Approach 3: Two Stacks (Alternative)
// Time: O(n), Space: O(n)
function decodeStringTwoStacks(s) {
  const numStack = [];
  const strStack = [];
  let currentNum = 0;
  let currentStr = "";

  for (let char of s) {
    if (char >= "0" && char <= "9") {
      currentNum = currentNum * 10 + parseInt(char);
    } else if (char === "[") {
      numStack.push(currentNum);
      strStack.push(currentStr);
      currentNum = 0;
      currentStr = "";
    } else if (char === "]") {
      const num = numStack.pop();
      const prevStr = strStack.pop();
      currentStr = prevStr + currentStr.repeat(num);
    } else {
      currentStr += char;
    }
  }

  return currentStr;
}

// Approach 4: Using Regular Expression (Creative approach)
// Time: O(n^2) worst case, Space: O(n)
function decodeStringRegex(s) {
  // Keep replacing innermost patterns until no more brackets
  while (s.includes("[")) {
    s = s.replace(/(\d+)\[([a-z]*)\]/g, (match, num, str) => {
      return str.repeat(parseInt(num));
    });
  }
  return s;
}

// Test cases
function testDecodeString() {
  console.log("Testing Decode String:");

  const testCases = [
    {
      input: "3[a]2[bc]",
      expected: "aaabcbc"
    },
    {
      input: "2[abc]3[cd]ef",
      expected: "abcabccdcdcdef"
    },
    {
      input: "abc3[cd]xyz",
      expected: "abccdcdcdxyz"
    },
    {
      input: "3[a2[c]]",
      expected: "accaccacc"
    },
    {
      input: "2[abc]3[cd]ef",
      expected: "abcabccdcdcdef"
    },
    {
      input: "3[z]2[2[y]pq4[2[jk]e1[f]]]ef",
      expected: "zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef"
    },
    {
      input: "abc",
      expected: "abc"
    },
    {
      input: "3[a]",
      expected: "aaa"
    }
  ];

  testCases.forEach((test, index) => {
    const result1 = decodeString(test.input);
    const result2 = decodeStringRecursive(test.input);
    const result3 = decodeStringTwoStacks(test.input);
    const result4 = decodeStringRegex(test.input);

    const passed =
      result1 === test.expected &&
      result2 === test.expected &&
      result3 === test.expected &&
      result4 === test.expected;

    console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
    console.log(`  Input: "${test.input}"`);
    console.log(`  Expected: "${test.expected}"`);
    console.log(`  Stack: "${result1}"`);
    console.log(`  Recursive: "${result2}"`);
    console.log(`  Two Stacks: "${result3}"`);
    console.log(`  Regex: "${result4}"`);
    console.log();
  });
}

// Helper function to demonstrate stack state
function decodeStringWithTrace(s) {
  console.log(`\nTracing decode for: "${s}"`);
  const stack = [];
  let currentNum = 0;
  let currentStr = "";

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    console.log(
      `Step ${
        i + 1
      }: char='${char}', num=${currentNum}, str='${currentStr}', stack=${JSON.stringify(
        stack
      )}`
    );

    if (char >= "0" && char <= "9") {
      currentNum = currentNum * 10 + parseInt(char);
    } else if (char === "[") {
      stack.push([currentStr, currentNum]);
      currentStr = "";
      currentNum = 0;
    } else if (char === "]") {
      const [prevStr, num] = stack.pop();
      currentStr = prevStr + currentStr.repeat(num);
    } else {
      currentStr += char;
    }
  }

  console.log(`Final result: "${currentStr}"`);
  return currentStr;
}

// Complexity Analysis
console.log(`
Complexity Analysis:
1. Stack Approach:
   - Time: O(n) where n is length of decoded string
   - Space: O(n) for stack storage
   - Most efficient and intuitive

2. Recursive Approach:
   - Time: O(n) where n is length of decoded string
   - Space: O(n) for call stack
   - Clean but uses implicit stack

3. Two Stacks Approach:
   - Time: O(n) where n is length of decoded string
   - Space: O(n) for two stacks
   - Separates concerns clearly

4. Regex Approach:
   - Time: O(n^2) worst case due to repeated replacements
   - Space: O(n) for string operations
   - Creative but less efficient

Key Insights:
- Stack naturally handles nested structures
- When we see '[', we need to save current state
- When we see ']', we need to restore and apply repetition
- Numbers can be multi-digit, need to accumulate
- Characters outside brackets are part of result
`);

// Run tests
testDecodeString();

// Demo with tracing
decodeStringWithTrace("3[a2[c]]");

module.exports = {
  decodeString,
  decodeStringRecursive,
  decodeStringTwoStacks,
  decodeStringRegex
};
