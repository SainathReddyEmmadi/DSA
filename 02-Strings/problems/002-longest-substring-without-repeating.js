/**
 * Longest Substring Without Repeating Characters - LeetCode Problem 3
 *
 * Problem: Given a string s, find the length of the longest substring
 * without repeating characters.
 *
 * Constraints:
 * - 0 <= s.length <= 5 * 10^4
 * - s consists of English letters, digits, symbols and spaces
 *
 * Link: https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * Difficulty: Medium
 * Topics: Hash Table, String, Sliding Window
 * Companies: Amazon, Bloomberg, Adobe, Microsoft, Facebook
 */

/**
 * Approach 1: Brute Force
 * Time Complexity: O(n³)
 * Space Complexity: O(min(m, n)) where m is charset size
 */
function lengthOfLongestSubstringBruteForce(s) {
  const n = s.length;
  let maxLength = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const substring = s.slice(i, j + 1);
      if (hasUniqueCharacters(substring)) {
        maxLength = Math.max(maxLength, j - i + 1);
      } else {
        break; // No point checking longer substrings starting at i
      }
    }
  }

  return maxLength;
}

function hasUniqueCharacters(s) {
  const seen = new Set();
  for (const char of s) {
    if (seen.has(char)) return false;
    seen.add(char);
  }
  return true;
}

/**
 * Approach 2: Sliding Window with Set
 * Time Complexity: O(2n) = O(n) - each character visited at most twice
 * Space Complexity: O(min(m, n)) where m is charset size
 */
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    // If character already exists, shrink window from left
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    // Add current character and update max length
    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

/**
 * Approach 3: Optimized Sliding Window with Map
 * Time Complexity: O(n) - each character visited at most once
 * Space Complexity: O(min(m, n)) where m is charset size
 */
function lengthOfLongestSubstringOptimized(s) {
  const charIndexMap = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If character was seen and is within current window
    if (charIndexMap.has(char) && charIndexMap.get(char) >= left) {
      left = charIndexMap.get(char) + 1;
    }

    charIndexMap.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

/**
 * Approach 4: Sliding Window with Character Array (ASCII)
 * Time Complexity: O(n)
 * Space Complexity: O(1) - fixed size array
 * Note: Only works for ASCII characters
 */
function lengthOfLongestSubstringASCII(s) {
  const charIndex = new Array(128).fill(-1); // ASCII character set
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const charCode = s.charCodeAt(right);

    // If character was seen and is within current window
    if (charIndex[charCode] >= left) {
      left = charIndex[charCode] + 1;
    }

    charIndex[charCode] = right;
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

/**
 * Approach 5: Detailed step-by-step with tracking
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n))
 */
function lengthOfLongestSubstringDetailed(s) {
  console.log(`Finding longest substring in: "${s}"`);

  const seen = new Set();
  let left = 0;
  let maxLength = 0;
  let bestStart = 0;
  let bestEnd = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    console.log(`\nStep ${right + 1}: Processing '${char}' at index ${right}`);

    // Shrink window if character already exists
    while (seen.has(char)) {
      console.log(`  Removing '${s[left]}' from left (index ${left})`);
      seen.delete(s[left]);
      left++;
    }

    seen.add(char);
    const currentLength = right - left + 1;
    console.log(
      `  Current window: "${s.slice(
        left,
        right + 1
      )}" (length: ${currentLength})`
    );

    if (currentLength > maxLength) {
      maxLength = currentLength;
      bestStart = left;
      bestEnd = right;
      console.log(`  New max length: ${maxLength}`);
    }
  }

  console.log(
    `\nResult: "${s.slice(bestStart, bestEnd + 1)}" with length ${maxLength}`
  );
  return maxLength;
}

// Test cases
console.log("=== Longest Substring Without Repeating Characters Tests ===");
const testCases = [
  "abcabcbb", // Expected: 3 ("abc")
  "bbbbb", // Expected: 1 ("b")
  "pwwkew", // Expected: 3 ("wke")
  "", // Expected: 0
  "au", // Expected: 2 ("au")
  "dvdf", // Expected: 3 ("vdf")
  "anviaj", // Expected: 5 ("nviaj")
  "abcdef", // Expected: 6 ("abcdef")
  "abba" // Expected: 2 ("ab" or "ba")
];

testCases.forEach((test, index) => {
  console.log(`\nTest ${index + 1}: "${test}"`);
  console.log(`Brute Force: ${lengthOfLongestSubstringBruteForce(test)}`);
  console.log(`Sliding Window: ${lengthOfLongestSubstring(test)}`);
  console.log(`Optimized: ${lengthOfLongestSubstringOptimized(test)}`);
  console.log(`ASCII Array: ${lengthOfLongestSubstringASCII(test)}`);
});

console.log("\n=== Detailed Step-by-Step Example ===");
lengthOfLongestSubstringDetailed("abcabcbb");

/**
 * Key Insights:
 *
 * 1. SLIDING WINDOW PATTERN:
 *    - Maintain a window [left, right] of unique characters
 *    - Expand right to include new characters
 *    - Shrink left when duplicates are found
 *    - Track maximum window size seen so far
 *
 * 2. TWO OPTIMIZATION LEVELS:
 *    - Basic sliding window: Move left one step at a time
 *    - Optimized: Jump left directly to after the duplicate character
 *
 * 3. DATA STRUCTURE CHOICES:
 *    - Set for checking existence (basic sliding window)
 *    - Map for storing last seen index (optimized sliding window)
 *    - Array for ASCII characters (space optimization)
 *
 * 4. WINDOW MANAGEMENT:
 *    - Always maintain the invariant: no duplicates in current window
 *    - Use two pointers to represent window boundaries
 *    - Update maximum length whenever window is valid
 *
 * 5. EDGE CASES:
 *    - Empty string (return 0)
 *    - Single character (return 1)
 *    - All unique characters (return string length)
 *    - All same characters (return 1)
 */

/**
 * Sliding Window Template:
 * 1. Initialize left pointer and data structure
 * 2. Iterate with right pointer
 * 3. Process right element (add to window)
 * 4. While window is invalid, shrink from left
 * 5. Update result if current window is better
 */

/**
 * Common Mistakes:
 * 1. Forgetting to update left pointer correctly
 * 2. Not handling edge cases (empty string)
 * 3. Off-by-one errors in window size calculation
 * 4. Not clearing data structure when shrinking window
 */

/**
 * Related Problems:
 * - Longest Repeating Character Replacement (LC 424)
 * - Minimum Window Substring (LC 76)
 * - Permutation in String (LC 567)
 * - Find All Anagrams in String (LC 438)
 */

module.exports = {
  lengthOfLongestSubstring,
  lengthOfLongestSubstringBruteForce,
  lengthOfLongestSubstringOptimized,
  lengthOfLongestSubstringASCII,
  lengthOfLongestSubstringDetailed
};
