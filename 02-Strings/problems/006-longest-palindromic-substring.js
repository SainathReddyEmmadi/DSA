/**
 * LeetCode 5: Longest Palindromic Substring
 * Difficulty: Medium
 *
 * Problem:
 * Given a string s, return the longest palindromic substring in s.
 *
 * Example 1:
 * Input: s = "babad"
 * Output: "bab"
 * Note: "aba" is also a valid answer.
 *
 * Example 2:
 * Input: s = "cbbd"
 * Output: "bb"
 */

// Approach 1: Expand Around Centers (Optimal)
// Time: O(n²), Space: O(1)
function longestPalindrome1(s) {
  if (!s || s.length < 2) return s;

  let start = 0;
  let maxLength = 1;

  for (let i = 0; i < s.length; i++) {
    // Check for odd-length palindromes (center at i)
    const len1 = expandAroundCenter(s, i, i);
    // Check for even-length palindromes (center between i and i+1)
    const len2 = expandAroundCenter(s, i, i + 1);

    const currentMax = Math.max(len1, len2);

    if (currentMax > maxLength) {
      maxLength = currentMax;
      start = i - Math.floor((currentMax - 1) / 2);
    }
  }

  return s.substring(start, start + maxLength);
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}

// Approach 2: Dynamic Programming
// Time: O(n²), Space: O(n²)
function longestPalindrome2(s) {
  if (!s || s.length < 2) return s;

  const n = s.length;
  const dp = Array(n)
    .fill()
    .map(() => Array(n).fill(false));
  let start = 0;
  let maxLength = 1;

  // Every single character is a palindrome
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // Check for palindromes of length 2
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLength = 2;
    }
  }

  // Check for palindromes of length 3 and more
  for (let length = 3; length <= n; length++) {
    for (let i = 0; i <= n - length; i++) {
      const j = i + length - 1;

      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        if (length > maxLength) {
          start = i;
          maxLength = length;
        }
      }
    }
  }

  return s.substring(start, start + maxLength);
}

// Approach 3: Brute Force (For learning purposes)
// Time: O(n³), Space: O(1)
function longestPalindrome3(s) {
  if (!s || s.length < 2) return s;

  let longest = s[0];

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      const substring = s.substring(i, j + 1);
      if (isPalindromeSimple(substring) && substring.length > longest.length) {
        longest = substring;
      }
    }
  }

  return longest;
}

function isPalindromeSimple(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Approach 4: Manacher's Algorithm (Most Optimal)
// Time: O(n), Space: O(n)
function longestPalindrome4(s) {
  if (!s || s.length < 2) return s;

  // Preprocess string: "abc" -> "^#a#b#c#$"
  const processed = "^#" + s.split("").join("#") + "#$";
  const n = processed.length;
  const p = new Array(n).fill(0); // p[i] = radius of palindrome centered at i
  let center = 0;
  let right = 0;
  let maxLength = 0;
  let centerIndex = 0;

  for (let i = 1; i < n - 1; i++) {
    const mirror = 2 * center - i;

    if (i < right) {
      p[i] = Math.min(right - i, p[mirror]);
    }

    // Try to expand palindrome centered at i
    while (processed[i + (1 + p[i])] === processed[i - (1 + p[i])]) {
      p[i]++;
    }

    // If palindrome centered at i extends past right, adjust center and right
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }

    // Update maximum length palindrome found so far
    if (p[i] > maxLength) {
      maxLength = p[i];
      centerIndex = i;
    }
  }

  const start = Math.floor((centerIndex - maxLength) / 2);
  return s.substring(start, start + maxLength);
}

// Helper: Find all palindromic substrings
function findAllPalindromes(s) {
  const palindromes = [];

  for (let i = 0; i < s.length; i++) {
    // Odd length palindromes
    expandAndCollect(s, i, i, palindromes);
    // Even length palindromes
    expandAndCollect(s, i, i + 1, palindromes);
  }

  return [...new Set(palindromes)].sort((a, b) => b.length - a.length);
}

function expandAndCollect(s, left, right, palindromes) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    palindromes.push(s.substring(left, right + 1));
    left--;
    right++;
  }
}

// Helper: Count palindromic substrings
function countPalindromicSubstrings(s) {
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    // Count odd length palindromes
    count += countPalindromes(s, i, i);
    // Count even length palindromes
    count += countPalindromes(s, i, i + 1);
  }

  return count;
}

function countPalindromes(s, left, right) {
  let count = 0;
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    count++;
    left--;
    right++;
  }
  return count;
}

// Test cases
function runTests() {
  const testCases = [
    {
      input: "babad",
      expectedLength: 3,
      description: "Multiple longest palindromes possible",
      validOutputs: ["bab", "aba"]
    },
    {
      input: "cbbd",
      expectedLength: 2,
      description: "Even length palindrome",
      validOutputs: ["bb"]
    },
    {
      input: "a",
      expectedLength: 1,
      description: "Single character",
      validOutputs: ["a"]
    },
    {
      input: "ac",
      expectedLength: 1,
      description: "No palindrome longer than 1",
      validOutputs: ["a", "c"]
    },
    {
      input: "racecar",
      expectedLength: 7,
      description: "Entire string is palindrome",
      validOutputs: ["racecar"]
    },
    {
      input: "noon high it is",
      expectedLength: 4,
      description: "Multiple palindromes",
      validOutputs: ["noon"]
    },
    {
      input: "",
      expectedLength: 0,
      description: "Empty string",
      validOutputs: [""]
    }
  ];

  const approaches = [
    { name: "Expand Around Centers", func: longestPalindrome1 },
    { name: "Dynamic Programming", func: longestPalindrome2 },
    { name: "Brute Force", func: longestPalindrome3 },
    { name: "Manacher's Algorithm", func: longestPalindrome4 }
  ];

  approaches.forEach((approach) => {
    console.log(`\n=== Testing ${approach.name} Approach ===`);

    testCases.forEach((test, index) => {
      const result = approach.func(test.input);
      const isValid =
        test.validOutputs.includes(result) ||
        result.length === test.expectedLength;
      const status = isValid ? "✅ PASS" : "❌ FAIL";

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  Input: "${test.input}"`);
      console.log(`  Expected length: ${test.expectedLength}`);
      console.log(`  Got: "${result}" (length: ${result.length})`);
      console.log(
        `  Valid outputs: [${test.validOutputs
          .map((s) => `"${s}"`)
          .join(", ")}]`
      );
      console.log(`  Description: ${test.description}`);

      // Verify result is actually a palindrome
      const isPalin = isPalindromeSimple(result);
      console.log(`  Is palindrome: ${isPalin ? "✅" : "❌"}`);
    });
  });
}

// Performance comparison
function performanceTest() {
  console.log("\n=== Performance Comparison ===");

  const testStrings = [
    "a".repeat(100),
    "abcdefghijklmnopqrstuvwxyz".repeat(4),
    "racecar" + "x".repeat(93),
    "abccba" + "y".repeat(94)
  ];

  const approaches = [
    { name: "Expand Around Centers O(n²)", func: longestPalindrome1 },
    { name: "Dynamic Programming O(n²)", func: longestPalindrome2 },
    { name: "Brute Force O(n³)", func: longestPalindrome3 },
    { name: "Manacher's Algorithm O(n)", func: longestPalindrome4 }
  ];

  testStrings.forEach((testStr, strIndex) => {
    console.log(`\nTest String ${strIndex + 1} (length: ${testStr.length}):`);

    approaches.forEach((approach) => {
      const start = performance.now();
      const result = approach.func(testStr);
      const end = performance.now();

      console.log(
        `  ${approach.name}: ${(end - start).toFixed(2)}ms (result length: ${
          result.length
        })`
      );
    });
  });
}

// Demonstrate palindrome analysis
function palindromeAnalysis() {
  console.log("\n=== Palindrome Analysis ===");

  const testStrings = ["babad", "racecar", "abccba", "noon high it is"];

  testStrings.forEach((str) => {
    console.log(`\nAnalyzing: "${str}"`);
    console.log(`Longest palindrome: "${longestPalindrome1(str)}"`);
    console.log(`All palindromes: ${JSON.stringify(findAllPalindromes(str))}`);
    console.log(
      `Total palindromic substrings: ${countPalindromicSubstrings(str)}`
    );
  });
}

// Key Insights and Patterns
console.log(`
=== Longest Palindromic Substring - Key Insights ===

1. Core Approaches:
   a) Expand Around Centers: Check each possible center
   b) Dynamic Programming: Build up solution using subproblems
   c) Manacher's Algorithm: Linear time using preprocessing
   d) Brute Force: Check all substrings (inefficient)

2. Expand Around Centers (Recommended):
   - Check both odd and even length palindromes
   - For each center, expand outward while characters match
   - Time: O(n²), Space: O(1) - good balance

3. Dynamic Programming:
   - dp[i][j] = true if substring from i to j is palindrome
   - Fill table for increasing lengths
   - Time: O(n²), Space: O(n²) - clear logic but more space

4. Manacher's Algorithm:
   - Preprocess string to handle odd/even uniformly
   - Use previously computed results to avoid redundant work
   - Time: O(n), Space: O(n) - most optimal

5. Key Considerations:
   - Handle both odd and even length palindromes
   - Empty string and single character edge cases
   - Multiple valid answers of same length

6. Pattern Recognition:
   - Center expansion is common for palindrome problems
   - DP useful when need to store intermediate results
   - Manacher's for when linear time is critical

7. Common Variations:
   - Count all palindromic substrings
   - Find all palindromic substrings
   - Longest palindromic subsequence (different problem)
   - Check if string can be rearranged to form palindrome

8. Optimization Tips:
   - Early termination when remaining string can't be longer
   - Precompute character frequencies for some variants
   - Use two pointers for expansion

Applications:
- Text processing and analysis
- DNA sequence analysis
- Data compression
- Pattern matching
`);

// Run tests
if (require.main === module) {
  runTests();
  performanceTest();
  palindromeAnalysis();
}

module.exports = {
  longestPalindrome1,
  longestPalindrome2,
  longestPalindrome3,
  longestPalindrome4,
  findAllPalindromes,
  countPalindromicSubstrings
};
