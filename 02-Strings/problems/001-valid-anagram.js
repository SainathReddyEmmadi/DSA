/**
 * Valid Anagram - LeetCode Problem 242
 *
 * Problem: Given two strings s and t, return true if t is an anagram of s,
 * and false otherwise. An Anagram is a word or phrase formed by rearranging
 * the letters of a different word or phrase, typically using all the original
 * letters exactly once.
 *
 * Constraints:
 * - 1 <= s.length, t.length <= 5 * 10^4
 * - s and t consist of lowercase English letters only
 *
 * Link: https://leetcode.com/problems/valid-anagram/
 * Difficulty: Easy
 * Topics: Hash Table, String, Sorting
 * Companies: Amazon, Bloomberg, Adobe, Uber
 */

/**
 * Approach 1: Sorting
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) - if we can modify input, O(n) for sorting space
 */
function isAnagramSorting(s, t) {
  if (s.length !== t.length) return false;

  const sortedS = s.split("").sort().join("");
  const sortedT = t.split("").sort().join("");

  return sortedS === sortedT;
}

/**
 * Approach 2: Character Frequency Count with Map
 * Time Complexity: O(n)
 * Space Complexity: O(1) - at most 26 lowercase letters
 */
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const charCount = new Map();

  // Count characters in s
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  // Decrement count for characters in t
  for (const char of t) {
    if (!charCount.has(char)) return false;

    charCount.set(char, charCount.get(char) - 1);
    if (charCount.get(char) === 0) {
      charCount.delete(char);
    }
  }

  return charCount.size === 0;
}

/**
 * Approach 3: Character Frequency Count with Array
 * Time Complexity: O(n)
 * Space Complexity: O(1) - fixed size array of 26
 */
function isAnagramArray(s, t) {
  if (s.length !== t.length) return false;

  const charCount = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    charCount[s.charCodeAt(i) - 97]++; // 'a' is 97
    charCount[t.charCodeAt(i) - 97]--;
  }

  return charCount.every((count) => count === 0);
}

/**
 * Approach 4: Two separate frequency maps
 * Time Complexity: O(n)
 * Space Complexity: O(1) - at most 26 lowercase letters
 */
function isAnagramTwoMaps(s, t) {
  if (s.length !== t.length) return false;

  const getFrequency = (str) => {
    const freq = new Map();
    for (const char of str) {
      freq.set(char, (freq.get(char) || 0) + 1);
    }
    return freq;
  };

  const freqS = getFrequency(s);
  const freqT = getFrequency(t);

  if (freqS.size !== freqT.size) return false;

  for (const [char, count] of freqS) {
    if (freqT.get(char) !== count) return false;
  }

  return true;
}

/**
 * Approach 5: Using Object instead of Map
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function isAnagramObject(s, t) {
  if (s.length !== t.length) return false;

  const charCount = {};

  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (const char of t) {
    if (!charCount[char]) return false;
    charCount[char]--;
  }

  return Object.values(charCount).every((count) => count === 0);
}

// Test cases
console.log("=== Valid Anagram Tests ===");
const testCases = [
  ["anagram", "nagaram"], // Expected: true
  ["rat", "car"], // Expected: false
  ["listen", "silent"], // Expected: true
  ["hello", "bello"], // Expected: false
  ["", ""], // Expected: true
  ["a", "a"], // Expected: true
  ["ab", "ba"], // Expected: true
  ["abc", "def"] // Expected: false
];

testCases.forEach(([s, t], index) => {
  console.log(`\nTest ${index + 1}: "${s}" and "${t}"`);
  console.log(`Sorting: ${isAnagramSorting(s, t)}`);
  console.log(`Map: ${isAnagram(s, t)}`);
  console.log(`Array: ${isAnagramArray(s, t)}`);
  console.log(`Two Maps: ${isAnagramTwoMaps(s, t)}`);
  console.log(`Object: ${isAnagramObject(s, t)}`);
});

/**
 * Key Insights:
 *
 * 1. EARLY LENGTH CHECK:
 *    - If strings have different lengths, they can't be anagrams
 *    - This optimization saves unnecessary computation
 *
 * 2. CHARACTER FREQUENCY PATTERN:
 *    - Count frequency of each character
 *    - Two strings are anagrams if they have identical character frequencies
 *    - This is a fundamental pattern in string problems
 *
 * 3. SPACE-TIME TRADE-OFFS:
 *    - Sorting: O(n log n) time, O(1) space
 *    - Frequency counting: O(n) time, O(k) space where k is unique characters
 *    - For lowercase English letters, k ≤ 26, so effectively O(1) space
 *
 * 4. IMPLEMENTATION CHOICES:
 *    - Map vs Array: Array is faster for fixed character set (a-z)
 *    - Single pass vs Two passes: Both have same complexity
 *    - Increment/decrement vs separate counting: Personal preference
 *
 * 5. EDGE CASES:
 *    - Empty strings (both empty = anagram)
 *    - Single characters
 *    - Identical strings
 *    - Different lengths
 */

/**
 * Follow-up Questions:
 * 1. What if inputs contain Unicode characters? (Use Map instead of Array)
 * 2. What if we need to ignore case? (Convert to lowercase first)
 * 3. What about spaces and punctuation? (Filter them out)
 * 4. Can we do it without extra space? (Sorting modifies input)
 * 5. What if strings are very long? (Consider streaming algorithms)
 */

/**
 * Related Problems:
 * - Group Anagrams (LC 49)
 * - Find All Anagrams in a String (LC 438)
 * - Valid Palindrome (LC 125)
 * - Isomorphic Strings (LC 205)
 */

module.exports = {
  isAnagram,
  isAnagramSorting,
  isAnagramArray,
  isAnagramTwoMaps,
  isAnagramObject
};
