/**
 * LeetCode 76: Minimum Window Substring
 * Difficulty: Hard
 *
 * Problem:
 * Given two strings s and t of lengths m and n respectively, return the minimum window
 * substring of s such that every character in t (including duplicates) is included in the window.
 * If there is no such window in s that covers all characters in t, return the empty string "".
 *
 * Note that If there is such a window, it is guaranteed that there will always be only one
 * unique minimum window in s.
 *
 * Example 1:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
 *
 * Example 2:
 * Input: s = "a", t = "a"
 * Output: "a"
 *
 * Example 3:
 * Input: s = "a", t = "aa"
 * Output: ""
 * Explanation: Both 'a's from t must be included in the window.
 */

// Approach 1: Sliding Window (Optimal)
// Time: O(|s| + |t|), Space: O(|s| + |t|)
function minWindow1(s, t) {
  if (s.length < t.length) return "";

  // Count characters in target string t
  const targetCount = {};
  for (let char of t) {
    targetCount[char] = (targetCount[char] || 0) + 1;
  }

  let left = 0;
  let right = 0;
  let formed = 0; // Number of unique characters in current window that match target frequency
  const required = Object.keys(targetCount).length;

  const windowCounts = {};
  let minLength = Infinity;
  let minStart = 0;

  while (right < s.length) {
    // Add character from right to window
    const rightChar = s[right];
    windowCounts[rightChar] = (windowCounts[rightChar] || 0) + 1;

    // Check if current character's frequency matches target frequency
    if (
      targetCount[rightChar] &&
      windowCounts[rightChar] === targetCount[rightChar]
    ) {
      formed++;
    }

    // Try to shrink window from left while it's still valid
    while (left <= right && formed === required) {
      // Update minimum window if current is smaller
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        minStart = left;
      }

      // Remove character from left
      const leftChar = s[left];
      windowCounts[leftChar]--;

      if (
        targetCount[leftChar] &&
        windowCounts[leftChar] < targetCount[leftChar]
      ) {
        formed--;
      }

      left++;
    }

    right++;
  }

  return minLength === Infinity
    ? ""
    : s.substring(minStart, minStart + minLength);
}

// Approach 2: Optimized Sliding Window (Skip irrelevant characters)
// Time: O(|s| + |t|), Space: O(|s| + |t|)
function minWindow2(s, t) {
  if (s.length < t.length) return "";

  const targetCount = {};
  for (let char of t) {
    targetCount[char] = (targetCount[char] || 0) + 1;
  }

  // Create filtered string with only relevant characters and their indices
  const filteredS = [];
  for (let i = 0; i < s.length; i++) {
    if (targetCount[s[i]]) {
      filteredS.push([i, s[i]]);
    }
  }

  if (filteredS.length === 0) return "";

  let left = 0;
  let right = 0;
  let formed = 0;
  const required = Object.keys(targetCount).length;
  const windowCounts = {};
  let minLength = Infinity;
  let minStart = 0;

  while (right < filteredS.length) {
    const rightChar = filteredS[right][1];
    windowCounts[rightChar] = (windowCounts[rightChar] || 0) + 1;

    if (windowCounts[rightChar] === targetCount[rightChar]) {
      formed++;
    }

    while (left <= right && formed === required) {
      const currentLength = filteredS[right][0] - filteredS[left][0] + 1;

      if (currentLength < minLength) {
        minLength = currentLength;
        minStart = filteredS[left][0];
      }

      const leftChar = filteredS[left][1];
      windowCounts[leftChar]--;

      if (windowCounts[leftChar] < targetCount[leftChar]) {
        formed--;
      }

      left++;
    }

    right++;
  }

  return minLength === Infinity
    ? ""
    : s.substring(minStart, minStart + minLength);
}

// Approach 3: Brute Force (For understanding)
// Time: O(|s|² * |t|), Space: O(|t|)
function minWindow3(s, t) {
  if (s.length < t.length) return "";

  let minWindow = "";
  let minLength = Infinity;

  for (let i = 0; i < s.length; i++) {
    for (let j = i + t.length - 1; j < s.length; j++) {
      const window = s.substring(i, j + 1);

      if (containsAllChars(window, t) && window.length < minLength) {
        minLength = window.length;
        minWindow = window;
      }
    }
  }

  return minWindow;
}

function containsAllChars(window, target) {
  const targetCount = {};
  for (let char of target) {
    targetCount[char] = (targetCount[char] || 0) + 1;
  }

  const windowCount = {};
  for (let char of window) {
    windowCount[char] = (windowCount[char] || 0) + 1;
  }

  for (let char in targetCount) {
    if ((windowCount[char] || 0) < targetCount[char]) {
      return false;
    }
  }

  return true;
}

// Approach 4: Two-pass sliding window
// Time: O(|s| + |t|), Space: O(|s| + |t|)
function minWindow4(s, t) {
  if (s.length < t.length) return "";

  const targetCount = {};
  for (let char of t) {
    targetCount[char] = (targetCount[char] || 0) + 1;
  }

  const required = Object.keys(targetCount).length;
  let left = 0;
  let right = 0;
  let formed = 0;

  const windowCounts = {};
  const answer = { length: Infinity, left: 0, right: 0 };

  while (right < s.length) {
    const rightChar = s[right];
    windowCounts[rightChar] = (windowCounts[rightChar] || 0) + 1;

    if (
      targetCount[rightChar] &&
      windowCounts[rightChar] === targetCount[rightChar]
    ) {
      formed++;
    }

    while (left <= right && formed === required) {
      if (right - left + 1 < answer.length) {
        answer.length = right - left + 1;
        answer.left = left;
        answer.right = right;
      }

      const leftChar = s[left];
      windowCounts[leftChar]--;

      if (
        targetCount[leftChar] &&
        windowCounts[leftChar] < targetCount[leftChar]
      ) {
        formed--;
      }

      left++;
    }

    right++;
  }

  return answer.length === Infinity
    ? ""
    : s.substring(answer.left, answer.right + 1);
}

// Helper function: Find all valid windows
function findAllValidWindows(s, t) {
  const validWindows = [];
  const targetCount = {};

  for (let char of t) {
    targetCount[char] = (targetCount[char] || 0) + 1;
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = i + t.length - 1; j < s.length; j++) {
      const window = s.substring(i, j + 1);

      if (containsAllChars(window, t)) {
        validWindows.push({
          window,
          start: i,
          end: j,
          length: window.length
        });
      }
    }
  }

  return validWindows.sort((a, b) => a.length - b.length);
}

// Helper function: Check if window covers target at specific position
function checkWindowAtPosition(s, start, length, targetCount) {
  const windowCount = {};

  for (let i = start; i < start + length && i < s.length; i++) {
    const char = s[i];
    windowCount[char] = (windowCount[char] || 0) + 1;
  }

  for (let char in targetCount) {
    if ((windowCount[char] || 0) < targetCount[char]) {
      return false;
    }
  }

  return true;
}

// Test cases
function runTests() {
  const testCases = [
    {
      s: "ADOBECODEBANC",
      t: "ABC",
      expected: "BANC",
      description: "Standard case with multiple valid windows"
    },
    {
      s: "a",
      t: "a",
      expected: "a",
      description: "Single character match"
    },
    {
      s: "a",
      t: "aa",
      expected: "",
      description: "Target has more chars than source"
    },
    {
      s: "ab",
      t: "b",
      expected: "b",
      description: "Target is substring of source"
    },
    {
      s: "abc",
      t: "abc",
      expected: "abc",
      description: "Entire string is minimum window"
    },
    {
      s: "ADOBECODEBANC",
      t: "AABC",
      expected: "ADOBEC",
      description: "Target with duplicate characters"
    },
    {
      s: "wegdtzwabazduwdbesdjawdz",
      t: "ddw",
      expected: "dwdbe",
      description: "Complex case with scattered target chars"
    },
    {
      s: "",
      t: "a",
      expected: "",
      description: "Empty source string"
    },
    {
      s: "a",
      t: "",
      expected: "",
      description: "Empty target string"
    }
  ];

  const approaches = [
    { name: "Sliding Window", func: minWindow1 },
    { name: "Optimized Sliding Window", func: minWindow2 },
    { name: "Brute Force", func: minWindow3 },
    { name: "Two-pass Sliding Window", func: minWindow4 }
  ];

  approaches.forEach((approach) => {
    console.log(`\n=== Testing ${approach.name} Approach ===`);

    testCases.forEach((test, index) => {
      const result = approach.func(test.s, test.t);

      // Check if result is valid (contains all chars of target)
      const isValid =
        result === test.expected ||
        (result.length === test.expected.length &&
          containsAllChars(result, test.t));

      const status = isValid ? "✅ PASS" : "❌ FAIL";

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  s: "${test.s}"`);
      console.log(`  t: "${test.t}"`);
      console.log(`  Expected: "${test.expected}"`);
      console.log(`  Got: "${result}"`);
      console.log(`  Description: ${test.description}`);

      if (result && test.t) {
        console.log(
          `  Contains all target chars: ${
            containsAllChars(result, test.t) ? "✅" : "❌"
          }`
        );
      }
    });
  });
}

// Performance comparison
function performanceTest() {
  console.log("\n=== Performance Comparison ===");

  const testCases = [
    {
      s: "A".repeat(1000) + "B" + "C".repeat(1000),
      t: "ABC",
      description: "Large string with scattered target"
    },
    {
      s: "ABCDEFGH".repeat(100),
      t: "ABC",
      description: "Repeating pattern"
    },
    {
      s: "X".repeat(500) + "ADOBECODEBANC" + "Y".repeat(500),
      t: "ABC",
      description: "Target in middle of large string"
    }
  ];

  const approaches = [
    { name: "Sliding Window O(|s| + |t|)", func: minWindow1 },
    { name: "Optimized Sliding Window O(|s| + |t|)", func: minWindow2 },
    { name: "Two-pass Sliding Window O(|s| + |t|)", func: minWindow4 }
    // Note: Skipping brute force for performance test as it's too slow
  ];

  testCases.forEach((test, testIndex) => {
    console.log(`\nTest Case ${testIndex + 1}: ${test.description}`);
    console.log(
      `String length: ${test.s.length}, Target length: ${test.t.length}`
    );

    approaches.forEach((approach) => {
      const start = performance.now();
      const result = approach.func(test.s, test.t);
      const end = performance.now();

      console.log(
        `  ${approach.name}: ${(end - start).toFixed(
          2
        )}ms (result: "${result.substring(0, 20)}${
          result.length > 20 ? "..." : ""
        }")`
      );
    });
  });
}

// Advanced window analysis
function windowAnalysis() {
  console.log("\n=== Window Analysis ===");

  const testCases = [
    { s: "ADOBECODEBANC", t: "ABC" },
    { s: "ADOBECODEBANC", t: "AABC" }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nCase ${index + 1}: s="${test.s}", t="${test.t}"`);

    const minWindow = minWindow1(test.s, test.t);
    const allWindows = findAllValidWindows(test.s, test.t);

    console.log(`Minimum window: "${minWindow}" (length: ${minWindow.length})`);
    console.log(`Total valid windows: ${allWindows.length}`);

    if (allWindows.length > 0) {
      console.log(`All windows by length:`);
      allWindows.slice(0, 5).forEach((win, i) => {
        console.log(
          `  ${i + 1}. "${win.window}" (${win.start}-${win.end}, length: ${
            win.length
          })`
        );
      });
      if (allWindows.length > 5) {
        console.log(`  ... and ${allWindows.length - 5} more`);
      }
    }
  });
}

// Key Insights and Patterns
console.log(`
=== Minimum Window Substring - Key Insights ===

1. Pattern: Sliding Window with Character Counting
   - Expand right pointer to include more characters
   - Contract left pointer to find minimum valid window
   - Track character frequencies in current window

2. Algorithm Steps:
   a) Count target character frequencies
   b) Expand window by moving right pointer
   c) When window is valid, try to shrink from left
   d) Update minimum window when smaller valid window found

3. Key Data Structures:
   - targetCount: Character frequencies in target string
   - windowCounts: Character frequencies in current window
   - formed: Number of unique chars meeting target frequency

4. Time Complexity: O(|s| + |t|)
   - Each character visited at most twice (by left and right pointers)
   - Character frequency operations are O(1)

5. Space Complexity: O(|s| + |t|)
   - Hash maps for character counting
   - In worst case, all characters are unique

6. Optimization Techniques:
   a) Skip irrelevant characters (not in target)
   b) Early termination when no solution possible
   c) Use "formed" counter to avoid scanning entire frequency map

7. Edge Cases:
   - Target longer than source
   - No valid window exists
   - Entire string is the minimum window
   - Target has duplicate characters
   - Empty strings

8. Common Variations:
   - Find all valid windows
   - Minimum window with at most k distinct characters
   - Longest substring with exactly k distinct characters
   - Substring with character permutation

9. Problem-solving Pattern:
   - Two pointers (sliding window)
   - Hash map for frequency counting
   - Greedy approach (shrink when possible)

Applications:
- Text search and matching
- Data stream processing
- Pattern recognition
- Substring optimization problems
`);

// Run tests
if (require.main === module) {
  runTests();
  performanceTest();
  windowAnalysis();
}

module.exports = {
  minWindow1,
  minWindow2,
  minWindow3,
  minWindow4,
  findAllValidWindows,
  containsAllChars
};
