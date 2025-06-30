/**
 * LeetCode 72: Edit Distance (Levenshtein Distance)
 * Difficulty: Hard
 *
 * Problem:
 * Given two strings word1 and word2, return the minimum number of operations
 * required to convert word1 to word2.
 *
 * You have the following three operations permitted on a word:
 * - Insert a character
 * - Delete a character
 * - Replace a character
 *
 * Example 1:
 * Input: word1 = "horse", word2 = "ros"
 * Output: 3
 * Explanation:
 * horse -> rorse (replace 'h' with 'r')
 * rorse -> rose (remove 'r')
 * rose -> ros (remove 'e')
 *
 * Example 2:
 * Input: word1 = "intention", word2 = "execution"
 * Output: 5
 * Explanation:
 * intention -> inention (remove 't')
 * inention -> enention (replace 'i' with 'e')
 * enention -> exention (replace 'n' with 'x')
 * exention -> exection (replace 'n' with 'c')
 * exection -> execution (insert 'u')
 */

// Approach 1: Dynamic Programming (Bottom-up)
// Time: O(m * n), Space: O(m * n)
function minDistance1(word1, word2) {
  const m = word1.length;
  const n = word2.length;

  // dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  // Base cases: converting empty string
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i; // Delete all characters from word1
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j; // Insert all characters to form word2
  }

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // Characters match, no operation needed
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // Choose minimum of three operations
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j], // Delete from word1
            dp[i][j - 1], // Insert into word1
            dp[i - 1][j - 1] // Replace in word1
          );
      }
    }
  }

  return dp[m][n];
}

// Approach 2: Space-Optimized DP
// Time: O(m * n), Space: O(min(m, n))
function minDistance2(word1, word2) {
  // Ensure word2 is the shorter string for space optimization
  if (word1.length < word2.length) {
    [word1, word2] = [word2, word1];
  }

  const m = word1.length;
  const n = word2.length;

  // Only need two rows: previous and current
  let prev = Array(n + 1).fill(0);
  let curr = Array(n + 1).fill(0);

  // Initialize first row
  for (let j = 0; j <= n; j++) {
    prev[j] = j;
  }

  for (let i = 1; i <= m; i++) {
    curr[0] = i; // First column

    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] =
          1 +
          Math.min(
            prev[j], // Delete
            curr[j - 1], // Insert
            prev[j - 1] // Replace
          );
      }
    }

    // Swap rows
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}

// Approach 3: Recursive with Memoization
// Time: O(m * n), Space: O(m * n)
function minDistance3(word1, word2) {
  const memo = new Map();

  function dp(i, j) {
    // Base cases
    if (i === 0) return j; // Insert all remaining chars from word2
    if (j === 0) return i; // Delete all remaining chars from word1

    const key = `${i},${j}`;
    if (memo.has(key)) {
      return memo.get(key);
    }

    let result;
    if (word1[i - 1] === word2[j - 1]) {
      result = dp(i - 1, j - 1);
    } else {
      result =
        1 +
        Math.min(
          dp(i - 1, j), // Delete
          dp(i, j - 1), // Insert
          dp(i - 1, j - 1) // Replace
        );
    }

    memo.set(key, result);
    return result;
  }

  return dp(word1.length, word2.length);
}

// Approach 4: Pure Recursive (For understanding - inefficient)
// Time: O(3^max(m,n)), Space: O(max(m,n))
function minDistance4(word1, word2) {
  function helper(i, j) {
    // Base cases
    if (i === word1.length) return word2.length - j; // Insert remaining
    if (j === word2.length) return word1.length - i; // Delete remaining

    if (word1[i] === word2[j]) {
      return helper(i + 1, j + 1); // No operation needed
    } else {
      return (
        1 +
        Math.min(
          helper(i + 1, j), // Delete from word1
          helper(i, j + 1), // Insert into word1
          helper(i + 1, j + 1) // Replace in word1
        )
      );
    }
  }

  return helper(0, 0);
}

// Helper function: Reconstruct actual edit sequence
function getEditSequence(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  // Fill DP table (same as approach 1)
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  // Backtrack to find operations
  const operations = [];
  let i = m,
    j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && word1[i - 1] === word2[j - 1]) {
      // No operation
      i--;
      j--;
    } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
      // Replace
      operations.unshift(
        `Replace '${word1[i - 1]}' with '${word2[j - 1]}' at position ${i - 1}`
      );
      i--;
      j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      // Delete
      operations.unshift(`Delete '${word1[i - 1]}' at position ${i - 1}`);
      i--;
    } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
      // Insert
      operations.unshift(`Insert '${word2[j - 1]}' at position ${i}`);
      j--;
    }
  }

  return {
    distance: dp[m][n],
    operations
  };
}

// Helper function: Calculate similarity percentage
function calculateSimilarity(word1, word2) {
  const maxLength = Math.max(word1.length, word2.length);
  if (maxLength === 0) return 100; // Both empty strings

  const distance = minDistance1(word1, word2);
  const similarity = ((maxLength - distance) / maxLength) * 100;
  return Math.round(similarity * 100) / 100; // Round to 2 decimal places
}

// Helper function: Find closest words
function findClosestWords(target, wordList, k = 3) {
  const distances = wordList.map((word) => ({
    word,
    distance: minDistance1(target, word),
    similarity: calculateSimilarity(target, word)
  }));

  return distances.sort((a, b) => a.distance - b.distance).slice(0, k);
}

// Test cases
function runTests() {
  const testCases = [
    {
      word1: "horse",
      word2: "ros",
      expected: 3,
      description: "Classic example - horse to ros"
    },
    {
      word1: "intention",
      word2: "execution",
      expected: 5,
      description: "Complex transformation"
    },
    {
      word1: "",
      word2: "abc",
      expected: 3,
      description: "Empty string to non-empty"
    },
    {
      word1: "abc",
      word2: "",
      expected: 3,
      description: "Non-empty to empty string"
    },
    {
      word1: "abc",
      word2: "abc",
      expected: 0,
      description: "Identical strings"
    },
    {
      word1: "a",
      word2: "b",
      expected: 1,
      description: "Single character replacement"
    },
    {
      word1: "kitten",
      word2: "sitting",
      expected: 3,
      description: "Classic Levenshtein example"
    },
    {
      word1: "flaw",
      word2: "lawn",
      expected: 2,
      description: "Replace and insert"
    },
    {
      word1: "saturday",
      word2: "sunday",
      expected: 3,
      description: "Day transformation"
    }
  ];

  const approaches = [
    { name: "Bottom-up DP", func: minDistance1 },
    { name: "Space-Optimized DP", func: minDistance2 },
    { name: "Memoized Recursion", func: minDistance3 }
    // Note: Skipping pure recursion as it's too slow for larger inputs
  ];

  approaches.forEach((approach) => {
    console.log(`\n=== Testing ${approach.name} Approach ===`);

    testCases.forEach((test, index) => {
      const result = approach.func(test.word1, test.word2);
      const status = result === test.expected ? "✅ PASS" : "❌ FAIL";

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  word1: "${test.word1}"`);
      console.log(`  word2: "${test.word2}"`);
      console.log(`  Expected: ${test.expected}, Got: ${result}`);
      console.log(`  Description: ${test.description}`);
    });
  });
}

// Demonstrate edit sequence reconstruction
function demonstrateEditSequence() {
  console.log("\n=== Edit Sequence Reconstruction ===");

  const examples = [
    { word1: "horse", word2: "ros" },
    { word1: "kitten", word2: "sitting" },
    { word1: "intention", word2: "execution" }
  ];

  examples.forEach((example, index) => {
    console.log(
      `\nExample ${index + 1}: "${example.word1}" → "${example.word2}"`
    );
    const result = getEditSequence(example.word1, example.word2);

    console.log(`Minimum edit distance: ${result.distance}`);
    console.log(`Operations:`);

    if (result.operations.length === 0) {
      console.log("  No operations needed (strings are identical)");
    } else {
      result.operations.forEach((op, i) => {
        console.log(`  ${i + 1}. ${op}`);
      });
    }

    console.log(
      `Similarity: ${calculateSimilarity(example.word1, example.word2)}%`
    );
  });
}

// Performance comparison
function performanceTest() {
  console.log("\n=== Performance Comparison ===");

  const testCases = [
    {
      word1: "a".repeat(100),
      word2: "b".repeat(100),
      description: "Long identical-length strings"
    },
    {
      word1: "algorithm".repeat(10),
      word2: "logarithm".repeat(10),
      description: "Repeating patterns"
    },
    {
      word1: "abcdefghijklmnopqrstuvwxyz",
      word2: "zyxwvutsrqponmlkjihgfedcba",
      description: "Alphabet vs reverse"
    }
  ];

  const approaches = [
    { name: "Bottom-up DP O(mn) space", func: minDistance1 },
    { name: "Space-Optimized O(min(m,n)) space", func: minDistance2 },
    { name: "Memoized Recursion O(mn) space", func: minDistance3 }
  ];

  testCases.forEach((test, testIndex) => {
    console.log(`\nTest Case ${testIndex + 1}: ${test.description}`);
    console.log(`Lengths: ${test.word1.length} vs ${test.word2.length}`);

    approaches.forEach((approach) => {
      const start = performance.now();
      const result = approach.func(test.word1, test.word2);
      const end = performance.now();

      console.log(
        `  ${approach.name}: ${(end - start).toFixed(
          2
        )}ms (distance: ${result})`
      );
    });
  });
}

// Practical applications demo
function practicalApplications() {
  console.log("\n=== Practical Applications ===");

  // Spell checker simulation
  const dictionary = [
    "hello",
    "world",
    "algorithm",
    "programming",
    "computer",
    "science",
    "javascript",
    "python"
  ];
  const typos = ["helo", "wrold", "algoritm", "progamming"];

  console.log("Spell Checker Simulation:");
  typos.forEach((typo) => {
    const suggestions = findClosestWords(typo, dictionary, 3);
    console.log(`\n"${typo}" → Suggestions:`);
    suggestions.forEach((sug, i) => {
      console.log(
        `  ${i + 1}. "${sug.word}" (distance: ${sug.distance}, similarity: ${
          sug.similarity
        }%)`
      );
    });
  });

  // DNA sequence alignment simulation
  console.log("\n\nDNA Sequence Alignment:");
  const sequences = [
    { name: "Sequence A", seq: "ATCGATCG" },
    { name: "Sequence B", seq: "ATCGATCG" },
    { name: "Sequence C", seq: "ATCGTTCG" },
    { name: "Sequence D", seq: "ATCGAACG" }
  ];

  for (let i = 0; i < sequences.length; i++) {
    for (let j = i + 1; j < sequences.length; j++) {
      const distance = minDistance1(sequences[i].seq, sequences[j].seq);
      const similarity = calculateSimilarity(
        sequences[i].seq,
        sequences[j].seq
      );
      console.log(
        `${sequences[i].name} vs ${sequences[j].name}: distance=${distance}, similarity=${similarity}%`
      );
    }
  }
}

// Key Insights and Patterns
console.log(`
=== Edit Distance - Key Insights ===

1. Problem Type: Dynamic Programming
   - Optimal substructure: solution depends on smaller subproblems
   - Overlapping subproblems: same comparisons repeated
   - Bottom-up or top-down approaches work

2. State Definition:
   - dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1]
   - Base cases: empty string conversions

3. Transition Logic:
   - If characters match: dp[i][j] = dp[i-1][j-1]
   - If different: dp[i][j] = 1 + min(delete, insert, replace)

4. Three Operations:
   - Delete: dp[i-1][j] + 1
   - Insert: dp[i][j-1] + 1
   - Replace: dp[i-1][j-1] + 1

5. Time/Space Complexity:
   - Standard DP: O(mn) time, O(mn) space
   - Space optimized: O(mn) time, O(min(m,n)) space
   - Can be further optimized for specific use cases

6. Applications:
   - Spell checkers and autocorrect
   - DNA sequence alignment
   - Version control (diff algorithms)
   - Plagiarism detection
   - Machine translation metrics
   - Database record matching

7. Variations:
   - Weighted edit distance (different costs for operations)
   - Longest common subsequence (special case)
   - Hamming distance (only substitutions)
   - Damerau-Levenshtein (adds transposition)

8. Optimization Techniques:
   - Early termination if distance exceeds threshold
   - Diagonal optimization for similar-length strings
   - Hirschberg's algorithm for linear space
   - Approximate string matching variants

9. Common Pitfalls:
   - Off-by-one errors in indexing
   - Forgetting base cases
   - Incorrect operation costs
   - Not handling empty strings

Programming Patterns:
- 2D DP table construction
- Space optimization with rolling arrays
- Backtracking for solution reconstruction
- Memoization for top-down approach
`);

// Run tests
if (require.main === module) {
  runTests();
  demonstrateEditSequence();
  performanceTest();
  practicalApplications();
}

module.exports = {
  minDistance1,
  minDistance2,
  minDistance3,
  minDistance4,
  getEditSequence,
  calculateSimilarity,
  findClosestWords
};
