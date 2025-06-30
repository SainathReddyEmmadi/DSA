/**
 * LeetCode 49: Group Anagrams
 * Difficulty: Medium
 *
 * Problem:
 * Given an array of strings strs, group the anagrams together.
 * You can return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * Example 1:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * Example 2:
 * Input: strs = [""]
 * Output: [[""]]
 *
 * Example 3:
 * Input: strs = ["a"]
 * Output: [["a"]]
 */

// Approach 1: Sorting (Most Common)
// Time: O(n * k log k), Space: O(n * k)
// where n = number of strings, k = average length of strings
function groupAnagrams1(strs) {
  const map = new Map();

  for (let str of strs) {
    // Sort characters to create a key
    const key = str.split("").sort().join("");

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

// Approach 2: Character Count (Better for long strings)
// Time: O(n * k), Space: O(n * k)
function groupAnagrams2(strs) {
  const map = new Map();

  for (let str of strs) {
    // Create character count array (26 letters)
    const count = new Array(26).fill(0);

    for (let char of str) {
      count[char.charCodeAt(0) - "a".charCodeAt(0)]++;
    }

    // Use count array as key
    const key = count.join("#");

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

// Approach 3: Prime Number Multiplication
// Time: O(n * k), Space: O(n * k)
// Unique mathematical property: each letter gets a prime number
function groupAnagrams3(strs) {
  // Prime numbers for each letter a-z
  const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97, 101
  ];

  const map = new Map();

  for (let str of strs) {
    // Calculate product of primes
    let key = 1;
    for (let char of str) {
      key *= primes[char.charCodeAt(0) - "a".charCodeAt(0)];
    }

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

// Approach 4: Using Object instead of Map
// Time: O(n * k log k), Space: O(n * k)
function groupAnagrams4(strs) {
  const groups = {};

  for (let str of strs) {
    const key = str.split("").sort().join("");

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(str);
  }

  return Object.values(groups);
}

// Approach 5: Character Frequency String
// Time: O(n * k), Space: O(n * k)
function groupAnagrams5(strs) {
  const map = new Map();

  for (let str of strs) {
    // Create frequency map
    const freq = {};
    for (let char of str) {
      freq[char] = (freq[char] || 0) + 1;
    }

    // Create sorted key from frequency
    const key = Object.keys(freq)
      .sort()
      .map((char) => `${char}${freq[char]}`)
      .join("");

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

// Helper function to check if two strings are anagrams
function areAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq = {};

  // Count characters in first string
  for (let char of str1) {
    freq[char] = (freq[char] || 0) + 1;
  }

  // Subtract characters from second string
  for (let char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}

// Test cases
function runTests() {
  const testCases = [
    {
      input: ["eat", "tea", "tan", "ate", "nat", "bat"],
      description: "Basic anagram grouping",
      expectedGroups: 3
    },
    {
      input: [""],
      description: "Empty string",
      expectedGroups: 1
    },
    {
      input: ["a"],
      description: "Single character",
      expectedGroups: 1
    },
    {
      input: ["abc", "bca", "cab", "xyz", "zyx", "yxz"],
      description: "Two groups of anagrams",
      expectedGroups: 2
    },
    {
      input: ["listen", "silent", "enlist", "hello", "world"],
      description: "Mixed anagrams and non-anagrams",
      expectedGroups: 3
    },
    {
      input: ["a", "aa", "aaa"],
      description: "Different lengths",
      expectedGroups: 3
    },
    {
      input: ["ab", "ba", "abc", "bca", "cab"],
      description: "Different string lengths",
      expectedGroups: 2
    }
  ];

  const approaches = [
    { name: "Sorting", func: groupAnagrams1 },
    { name: "Character Count", func: groupAnagrams2 },
    { name: "Prime Multiplication", func: groupAnagrams3 },
    { name: "Object Groups", func: groupAnagrams4 },
    { name: "Frequency String", func: groupAnagrams5 }
  ];

  approaches.forEach((approach) => {
    console.log(`\n=== Testing ${approach.name} Approach ===`);

    testCases.forEach((test, index) => {
      const result = approach.func([...test.input]);
      const actualGroups = result.length;
      const status =
        actualGroups === test.expectedGroups ? "✅ PASS" : "❌ FAIL";

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  Input: [${test.input.map((s) => `"${s}"`).join(", ")}]`);
      console.log(
        `  Expected groups: ${test.expectedGroups}, Got: ${actualGroups}`
      );
      console.log(`  Result: ${JSON.stringify(result)}`);
      console.log(`  Description: ${test.description}`);

      // Verify that groups contain only anagrams
      let allAnagrams = true;
      for (let group of result) {
        for (let i = 0; i < group.length - 1; i++) {
          if (!areAnagrams(group[i], group[i + 1])) {
            allAnagrams = false;
            break;
          }
        }
        if (!allAnagrams) break;
      }
      console.log(
        `  All groups contain anagrams: ${allAnagrams ? "✅" : "❌"}`
      );
    });
  });
}

// Performance comparison
function performanceTest() {
  console.log("\n=== Performance Comparison ===");

  // Generate test data
  const words = [];
  const baseWords = [
    "listen",
    "silent",
    "enlist",
    "hello",
    "world",
    "abc",
    "bca",
    "cab"
  ];

  for (let i = 0; i < 1000; i++) {
    words.push(baseWords[i % baseWords.length]);
  }

  const approaches = [
    { name: "Sorting O(n*k*log k)", func: groupAnagrams1 },
    { name: "Character Count O(n*k)", func: groupAnagrams2 },
    { name: "Prime Multiplication O(n*k)", func: groupAnagrams3 },
    { name: "Object Groups O(n*k*log k)", func: groupAnagrams4 },
    { name: "Frequency String O(n*k)", func: groupAnagrams5 }
  ];

  approaches.forEach((approach) => {
    const start = performance.now();
    approach.func([...words]);
    const end = performance.now();
    console.log(`${approach.name}: ${(end - start).toFixed(2)}ms`);
  });
}

// Advanced anagram operations
function advancedOperations() {
  console.log("\n=== Advanced Anagram Operations ===");

  // Find all anagrams of a word in an array
  function findAnagrams(word, wordList) {
    const anagrams = [];
    for (let w of wordList) {
      if (areAnagrams(word, w)) {
        anagrams.push(w);
      }
    }
    return anagrams;
  }

  // Count total anagram groups
  function countAnagramGroups(words) {
    return groupAnagrams1(words).length;
  }

  // Find largest anagram group
  function findLargestAnagramGroup(words) {
    const groups = groupAnagrams1(words);
    return groups.reduce(
      (largest, current) =>
        current.length > largest.length ? current : largest,
      []
    );
  }

  // Check if all words in array are anagrams of each other
  function allAnagrams(words) {
    if (words.length <= 1) return true;

    const first = words[0];
    return words.every((word) => areAnagrams(first, word));
  }

  const testWords = ["eat", "tea", "tan", "ate", "nat", "bat", "tab"];

  console.log(`Words: [${testWords.map((w) => `"${w}"`).join(", ")}]`);
  console.log(
    `Anagrams of "eat": [${findAnagrams("eat", testWords)
      .map((w) => `"${w}"`)
      .join(", ")}]`
  );
  console.log(`Total anagram groups: ${countAnagramGroups(testWords)}`);
  console.log(
    `Largest anagram group: [${findLargestAnagramGroup(testWords)
      .map((w) => `"${w}"`)
      .join(", ")}]`
  );
  console.log(`Are all words anagrams: ${allAnagrams(["eat", "tea", "ate"])}`);
}

// Key Insights and Patterns
console.log(`
=== Group Anagrams - Key Insights ===

1. Core Strategy: Create Unique Keys
   - Anagrams must have identical keys
   - Different approaches to generate keys
   - Use Map/Object to group by keys

2. Key Generation Methods:
   a) Sorting: Sort characters alphabetically
   b) Character Count: Count frequency of each character
   c) Prime Multiplication: Assign prime to each letter
   d) Frequency String: Create string from character frequencies

3. Time Complexity Analysis:
   - Sorting: O(n * k log k) - dominant sorting cost
   - Character Count: O(n * k) - linear scan of characters
   - Prime Multiplication: O(n * k) - but may overflow for long strings

4. Space Complexity:
   - All approaches: O(n * k) for storing results
   - Additional space for keys and intermediate structures

5. Trade-offs:
   - Sorting: Simple, works for any characters
   - Character Count: Faster for long strings, assumes lowercase a-z
   - Prime Multiplication: Elegant but risk of overflow

6. Edge Cases:
   - Empty strings
   - Single characters
   - Different string lengths
   - Special characters and numbers

7. Optimization Tips:
   - Use character count for long strings
   - Use sorting for simplicity
   - Consider input constraints (character set, string length)

Applications:
- Word games and puzzles
- Data deduplication
- Linguistic analysis
- Pattern recognition
`);

// Run tests
if (require.main === module) {
  runTests();
  performanceTest();
  advancedOperations();
}

module.exports = {
  groupAnagrams1,
  groupAnagrams2,
  groupAnagrams3,
  groupAnagrams4,
  groupAnagrams5,
  areAnagrams
};
