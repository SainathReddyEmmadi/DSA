/**
 * LeetCode 125: Valid Palindrome
 * Difficulty: Easy
 *
 * Problem:
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters
 * and removing all non-alphanumeric characters, it reads the same forward and backward.
 *
 * Given a string s, return true if it is a palindrome, or false otherwise.
 *
 * Example 1:
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: "amanaplanacanalpanama" is a palindrome.
 *
 * Example 2:
 * Input: s = "race a car"
 * Output: false
 * Explanation: "raceacar" is not a palindrome.
 */

// Approach 1: Two Pointers (Most Efficient)
// Time: O(n), Space: O(1)
function isPalindrome1(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters from left
    while (left < right && !isAlphaNumeric(s[left])) {
      left++;
    }

    // Skip non-alphanumeric characters from right
    while (left < right && !isAlphaNumeric(s[right])) {
      right--;
    }

    // Compare characters (case-insensitive)
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphaNumeric(char) {
  return /[a-zA-Z0-9]/.test(char);
}

// Approach 2: Clean String First
// Time: O(n), Space: O(n)
function isPalindrome2(s) {
  // Clean the string: keep only alphanumeric and convert to lowercase
  const cleaned = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Check if cleaned string equals its reverse
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

// Approach 3: Recursive Solution
// Time: O(n), Space: O(n) due to recursion stack
function isPalindrome3(s) {
  const cleaned = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  function helper(str, left, right) {
    if (left >= right) return true;
    if (str[left] !== str[right]) return false;
    return helper(str, left + 1, right - 1);
  }

  return helper(cleaned, 0, cleaned.length - 1);
}

// Approach 4: Using Array Methods
// Time: O(n), Space: O(n)
function isPalindrome4(s) {
  const chars = [];

  // Extract alphanumeric characters
  for (let char of s) {
    if (isAlphaNumeric(char)) {
      chars.push(char.toLowerCase());
    }
  }

  // Check palindrome using two pointers on array
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    if (chars[left] !== chars[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Test cases
function runTests() {
  const testCases = [
    {
      input: "A man, a plan, a canal: Panama",
      expected: true,
      description: "Classic palindrome with spaces and punctuation"
    },
    {
      input: "race a car",
      expected: false,
      description: "Not a palindrome"
    },
    {
      input: "",
      expected: true,
      description: "Empty string is palindrome"
    },
    {
      input: "a",
      expected: true,
      description: "Single character"
    },
    {
      input: "Madam",
      expected: true,
      description: "Simple palindrome with different cases"
    },
    {
      input: "No 'x' in Nixon",
      expected: true,
      description: "Palindrome with special characters"
    },
    {
      input: "Mr. Owl ate my metal worm",
      expected: true,
      description: "Long palindrome"
    }
  ];

  const approaches = [
    { name: "Two Pointers", func: isPalindrome1 },
    { name: "Clean First", func: isPalindrome2 },
    { name: "Recursive", func: isPalindrome3 },
    { name: "Array Methods", func: isPalindrome4 }
  ];

  approaches.forEach((approach) => {
    console.log(`\n=== Testing ${approach.name} Approach ===`);

    testCases.forEach((test, index) => {
      const result = approach.func(test.input);
      const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  Input: "${test.input}"`);
      console.log(`  Expected: ${test.expected}, Got: ${result}`);
      console.log(`  Description: ${test.description}`);
    });
  });
}

// Performance comparison
function performanceTest() {
  const testString = "A man, a plan, a canal: Panama".repeat(1000);

  console.log("\n=== Performance Comparison ===");

  const approaches = [
    { name: "Two Pointers (O(1) space)", func: isPalindrome1 },
    { name: "Clean First (O(n) space)", func: isPalindrome2 },
    { name: "Recursive (O(n) space)", func: isPalindrome3 },
    { name: "Array Methods (O(n) space)", func: isPalindrome4 }
  ];

  approaches.forEach((approach) => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      approach.func(testString);
    }
    const end = performance.now();
    console.log(`${approach.name}: ${(end - start).toFixed(2)}ms`);
  });
}

// Key Insights and Patterns:
console.log(`
=== Valid Palindrome - Key Insights ===

1. Pattern: Two Pointers
   - Most space-efficient approach
   - Skip invalid characters on the fly
   - Compare characters while moving pointers

2. String Preprocessing:
   - Remove non-alphanumeric characters
   - Convert to lowercase for comparison
   - Can be done upfront or on-the-fly

3. Edge Cases:
   - Empty strings (considered palindrome)
   - Single characters (always palindrome)
   - Strings with only special characters
   - Case sensitivity handling

4. Optimization Considerations:
   - Two pointers: O(1) space complexity
   - Early termination on mismatch
   - Avoid creating new strings when possible

5. Common Variations:
   - Ignore spaces only vs all non-alphanumeric
   - Case sensitive vs case insensitive
   - Allow certain punctuation

Time Complexity: O(n) - need to check each character
Space Complexity: O(1) with two pointers, O(n) with preprocessing
`);

// Run tests
if (require.main === module) {
  runTests();
  performanceTest();
}

module.exports = {
  isPalindrome1,
  isPalindrome2,
  isPalindrome3,
  isPalindrome4
};
