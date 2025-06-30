/**
 * String Matching Algorithms Implementation
 *
 * Collection of efficient string matching algorithms for pattern searching.
 * Each algorithm has different strengths and is optimal for different scenarios.
 *
 * Algorithms included:
 * - Naive/Brute Force
 * - KMP (Knuth-Morris-Pratt)
 * - Boyer-Moore
 * - Rabin-Karp (Rolling Hash)
 * - Z-Algorithm
 * - Aho-Corasick (Multiple Pattern Matching)
 */

class StringMatcher {
  constructor() {
    this.searchHistory = [];
  }

  /**
   * Naive string matching algorithm
   * Time: O(nm), Space: O(1)
   * @param {string} text - Text to search in
   * @param {string} pattern - Pattern to search for
   * @returns {number[]} - Array of starting indices where pattern is found
   */
  naiveSearch(text, pattern) {
    const result = [];
    const n = text.length;
    const m = pattern.length;

    if (m === 0 || m > n) return result;

    for (let i = 0; i <= n - m; i++) {
      let j = 0;

      // Check if pattern matches at position i
      while (j < m && text[i + j] === pattern[j]) {
        j++;
      }

      if (j === m) {
        result.push(i);
      }
    }

    this._recordSearch("Naive", text, pattern, result);
    return result;
  }

  /**
   * KMP (Knuth-Morris-Pratt) string matching algorithm
   * Time: O(n+m), Space: O(m)
   * @param {string} text - Text to search in
   * @param {string} pattern - Pattern to search for
   * @returns {number[]} - Array of starting indices where pattern is found
   */
  kmpSearch(text, pattern) {
    const result = [];
    const n = text.length;
    const m = pattern.length;

    if (m === 0 || m > n) return result;

    // Build LPS (Longest Proper Prefix which is also Suffix) array
    const lps = this._buildLPSArray(pattern);

    let i = 0; // Index for text
    let j = 0; // Index for pattern

    while (i < n) {
      if (text[i] === pattern[j]) {
        i++;
        j++;
      }

      if (j === m) {
        result.push(i - j);
        j = lps[j - 1];
      } else if (i < n && text[i] !== pattern[j]) {
        if (j !== 0) {
          j = lps[j - 1];
        } else {
          i++;
        }
      }
    }

    this._recordSearch("KMP", text, pattern, result);
    return result;
  }

  /**
   * Boyer-Moore string matching algorithm (simplified version)
   * Time: O(nm) worst case, O(n/m) best case, Space: O(σ) where σ is alphabet size
   * @param {string} text - Text to search in
   * @param {string} pattern - Pattern to search for
   * @returns {number[]} - Array of starting indices where pattern is found
   */
  boyerMooreSearch(text, pattern) {
    const result = [];
    const n = text.length;
    const m = pattern.length;

    if (m === 0 || m > n) return result;

    // Build bad character table
    const badChar = this._buildBadCharTable(pattern);

    let shift = 0;

    while (shift <= n - m) {
      let j = m - 1;

      // Keep reducing j while characters match
      while (j >= 0 && pattern[j] === text[shift + j]) {
        j--;
      }

      if (j < 0) {
        // Pattern found
        result.push(shift);

        // Shift pattern so that next character in text aligns with
        // last occurrence of it in pattern
        shift +=
          shift + m < n ? m - (badChar[text.charCodeAt(shift + m)] || -1) : 1;
      } else {
        // Shift pattern so that bad character in text aligns with
        // last occurrence of it in pattern
        shift += Math.max(1, j - (badChar[text.charCodeAt(shift + j)] || -1));
      }
    }

    this._recordSearch("Boyer-Moore", text, pattern, result);
    return result;
  }

  /**
   * Rabin-Karp string matching algorithm using rolling hash
   * Time: O(nm) worst case, O(n+m) average case, Space: O(1)
   * @param {string} text - Text to search in
   * @param {string} pattern - Pattern to search for
   * @param {number} prime - Prime number for hashing (default: 101)
   * @returns {number[]} - Array of starting indices where pattern is found
   */
  rabinKarpSearch(text, pattern, prime = 101) {
    const result = [];
    const n = text.length;
    const m = pattern.length;
    const d = 256; // Number of characters in alphabet

    if (m === 0 || m > n) return result;

    let patternHash = 0; // Hash value for pattern
    let textHash = 0; // Hash value for text
    let h = 1; // Hash multiplier

    // Calculate h = pow(d, m-1) % prime
    for (let i = 0; i < m - 1; i++) {
      h = (h * d) % prime;
    }

    // Calculate hash value of pattern and first window of text
    for (let i = 0; i < m; i++) {
      patternHash = (d * patternHash + pattern.charCodeAt(i)) % prime;
      textHash = (d * textHash + text.charCodeAt(i)) % prime;
    }

    // Slide pattern over text one by one
    for (let i = 0; i <= n - m; i++) {
      // Check if hash values match
      if (patternHash === textHash) {
        // Check characters one by one (to handle hash collisions)
        let match = true;
        for (let j = 0; j < m; j++) {
          if (text[i + j] !== pattern[j]) {
            match = false;
            break;
          }
        }

        if (match) {
          result.push(i);
        }
      }

      // Calculate hash for next window
      if (i < n - m) {
        textHash =
          (d * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) %
          prime;

        // Handle negative hash values
        if (textHash < 0) {
          textHash += prime;
        }
      }
    }

    this._recordSearch("Rabin-Karp", text, pattern, result);
    return result;
  }

  /**
   * Z-Algorithm for pattern matching
   * Time: O(n+m), Space: O(n+m)
   * @param {string} text - Text to search in
   * @param {string} pattern - Pattern to search for
   * @returns {number[]} - Array of starting indices where pattern is found
   */
  zAlgorithmSearch(text, pattern) {
    const result = [];
    const m = pattern.length;

    if (m === 0 || m > text.length) return result;

    // Create combined string: pattern + '$' + text
    const combined = pattern + "$" + text;
    const z = this._buildZArray(combined);

    // Find occurrences
    for (let i = 0; i < z.length; i++) {
      if (z[i] === m) {
        result.push(i - m - 1); // Subtract pattern length and separator
      }
    }

    this._recordSearch("Z-Algorithm", text, pattern, result);
    return result;
  }

  /**
   * Find all occurrences of multiple patterns using Aho-Corasick algorithm
   * Time: O(n + m + z) where z is number of matches, Space: O(m)
   * @param {string} text - Text to search in
   * @param {string[]} patterns - Array of patterns to search for
   * @returns {Object[]} - Array of objects with pattern and positions
   */
  ahoCorasickSearch(text, patterns) {
    if (!patterns || patterns.length === 0) return [];

    const trie = this._buildAhoCorasickTrie(patterns);
    const result = [];

    let currentNode = trie.root;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      // Follow failure links until we find a valid transition or reach root
      while (currentNode !== trie.root && !currentNode.children.has(char)) {
        currentNode = currentNode.failure;
      }

      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char);
      }

      // Check for matches at current node and all failure link nodes
      let temp = currentNode;
      while (temp !== trie.root) {
        if (temp.isEndOfWord) {
          const patternLength = temp.depth;
          const startIndex = i - patternLength + 1;
          result.push({
            pattern: temp.pattern,
            position: startIndex,
            endPosition: i
          });
        }
        temp = temp.failure;
      }
    }

    this._recordSearch("Aho-Corasick", text, patterns, result);
    return result;
  }

  /**
   * Find longest common substring between two strings
   * @param {string} str1 - First string
   * @param {string} str2 - Second string
   * @returns {Object} - Object with substring and positions
   */
  longestCommonSubstring(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    if (m === 0 || n === 0) {
      return { substring: "", length: 0, positions: [] };
    }

    const dp = Array(m + 1)
      .fill()
      .map(() => Array(n + 1).fill(0));
    let maxLength = 0;
    let endingPositions = [];

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;

          if (dp[i][j] > maxLength) {
            maxLength = dp[i][j];
            endingPositions = [{ str1: i - 1, str2: j - 1 }];
          } else if (dp[i][j] === maxLength) {
            endingPositions.push({ str1: i - 1, str2: j - 1 });
          }
        }
      }
    }

    const substring =
      maxLength > 0
        ? str1.substring(
            endingPositions[0].str1 - maxLength + 1,
            endingPositions[0].str1 + 1
          )
        : "";

    return {
      substring,
      length: maxLength,
      positions: endingPositions.map((pos) => ({
        str1Start: pos.str1 - maxLength + 1,
        str1End: pos.str1,
        str2Start: pos.str2 - maxLength + 1,
        str2End: pos.str2
      }))
    };
  }

  /**
   * Get search history
   * @returns {Array} - Array of search records
   */
  getSearchHistory() {
    return [...this.searchHistory];
  }

  /**
   * Clear search history
   */
  clearHistory() {
    this.searchHistory = [];
  }

  /**
   * Compare performance of all algorithms
   * @param {string} text - Text to search in
   * @param {string} pattern - Pattern to search for
   * @returns {Object} - Performance comparison results
   */
  compareAlgorithms(text, pattern) {
    const algorithms = [
      { name: "Naive", func: this.naiveSearch.bind(this) },
      { name: "KMP", func: this.kmpSearch.bind(this) },
      { name: "Boyer-Moore", func: this.boyerMooreSearch.bind(this) },
      { name: "Rabin-Karp", func: this.rabinKarpSearch.bind(this) },
      { name: "Z-Algorithm", func: this.zAlgorithmSearch.bind(this) }
    ];

    const results = {};

    algorithms.forEach(({ name, func }) => {
      const start = performance.now();
      const matches = func(text, pattern);
      const end = performance.now();

      results[name] = {
        time: end - start,
        matches: matches.length,
        positions: matches
      };
    });

    return results;
  }

  // Private helper methods

  /**
   * Build LPS (Longest Proper Prefix which is also Suffix) array for KMP
   * @private
   */
  _buildLPSArray(pattern) {
    const m = pattern.length;
    const lps = new Array(m).fill(0);
    let len = 0;
    let i = 1;

    while (i < m) {
      if (pattern[i] === pattern[len]) {
        len++;
        lps[i] = len;
        i++;
      } else {
        if (len !== 0) {
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }

    return lps;
  }

  /**
   * Build bad character table for Boyer-Moore
   * @private
   */
  _buildBadCharTable(pattern) {
    const badChar = {};
    const m = pattern.length;

    for (let i = 0; i < m; i++) {
      badChar[pattern.charCodeAt(i)] = i;
    }

    return badChar;
  }

  /**
   * Build Z array for Z-algorithm
   * @private
   */
  _buildZArray(str) {
    const n = str.length;
    const z = new Array(n).fill(0);
    let l = 0,
      r = 0;

    for (let i = 1; i < n; i++) {
      if (i <= r) {
        z[i] = Math.min(r - i + 1, z[i - l]);
      }

      while (i + z[i] < n && str[z[i]] === str[i + z[i]]) {
        z[i]++;
      }

      if (i + z[i] - 1 > r) {
        l = i;
        r = i + z[i] - 1;
      }
    }

    return z;
  }

  /**
   * Build Aho-Corasick trie with failure links
   * @private
   */
  _buildAhoCorasickTrie(patterns) {
    class ACNode {
      constructor() {
        this.children = new Map();
        this.failure = null;
        this.isEndOfWord = false;
        this.pattern = "";
        this.depth = 0;
      }
    }

    const root = new ACNode();

    // Build trie
    patterns.forEach((pattern) => {
      let current = root;
      for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        if (!current.children.has(char)) {
          current.children.set(char, new ACNode());
          current.children.get(char).depth = i + 1;
        }
        current = current.children.get(char);
      }
      current.isEndOfWord = true;
      current.pattern = pattern;
    });

    // Build failure links using BFS
    const queue = [];

    // Initialize failure links for nodes at depth 1
    for (let node of root.children.values()) {
      node.failure = root;
      queue.push(node);
    }

    while (queue.length > 0) {
      const current = queue.shift();

      for (let [char, child] of current.children) {
        queue.push(child);

        let failure = current.failure;
        while (failure !== root && !failure.children.has(char)) {
          failure = failure.failure;
        }

        if (
          failure.children.has(char) &&
          failure.children.get(char) !== child
        ) {
          child.failure = failure.children.get(char);
        } else {
          child.failure = root;
        }
      }
    }

    return { root };
  }

  /**
   * Record search operation for history
   * @private
   */
  _recordSearch(algorithm, text, pattern, result) {
    this.searchHistory.push({
      timestamp: new Date(),
      algorithm,
      textLength: text.length,
      patternLength: Array.isArray(pattern)
        ? pattern.join(",").length
        : pattern.length,
      matches: Array.isArray(result[0]) ? result.length : result.length,
      pattern: Array.isArray(pattern) ? pattern : pattern
    });
  }
}

// Test cases and examples
function runTests() {
  console.log("=== String Matcher Tests ===\n");

  const matcher = new StringMatcher();
  const text = "ABABDABACDABABCABCABCABCABC";
  const pattern = "ABABCAB";

  console.log(`Text: "${text}"`);
  console.log(`Pattern: "${pattern}"\n`);

  // Test all single pattern algorithms
  console.log("1. Single Pattern Matching:");

  const algorithms = [
    { name: "Naive", func: matcher.naiveSearch.bind(matcher) },
    { name: "KMP", func: matcher.kmpSearch.bind(matcher) },
    { name: "Boyer-Moore", func: matcher.boyerMooreSearch.bind(matcher) },
    { name: "Rabin-Karp", func: matcher.rabinKarpSearch.bind(matcher) },
    { name: "Z-Algorithm", func: matcher.zAlgorithmSearch.bind(matcher) }
  ];

  algorithms.forEach(({ name, func }) => {
    const result = func(text, pattern);
    console.log(`${name}: [${result.join(", ")}]`);
  });

  console.log("\n2. Multiple Pattern Matching (Aho-Corasick):");
  const patterns = ["AB", "ABC", "ABCAB", "BC"];
  const multiResult = matcher.ahoCorasickSearch(text, patterns);

  multiResult.forEach((match) => {
    console.log(`"${match.pattern}" found at position ${match.position}`);
  });

  console.log("\n3. Longest Common Substring:");
  const str1 = "GeeksforGeeks";
  const str2 = "GeeksQuiz";
  const lcs = matcher.longestCommonSubstring(str1, str2);
  console.log(
    `LCS of "${str1}" and "${str2}": "${lcs.substring}" (length: ${lcs.length})`
  );

  console.log("\n4. Performance Comparison:");
  const perfText = "A".repeat(1000) + "ABABCAB" + "B".repeat(1000);
  const perfPattern = "ABABCAB";
  const comparison = matcher.compareAlgorithms(perfText, perfPattern);

  Object.entries(comparison).forEach(([name, stats]) => {
    console.log(
      `${name}: ${stats.time.toFixed(2)}ms, ${stats.matches} matches`
    );
  });
}

// Practical examples
function practicalExamples() {
  console.log("\n=== Practical Examples ===\n");

  const matcher = new StringMatcher();

  // DNA sequence analysis
  console.log("1. DNA Sequence Analysis:");
  const dnaSequence = "ATCGATCGATCGTAGCTAGCATGCATGCATGC";
  const motif = "ATGC";

  const dnaMatches = matcher.kmpSearch(dnaSequence, motif);
  console.log(`DNA sequence: ${dnaSequence}`);
  console.log(
    `Motif "${motif}" found at positions: [${dnaMatches.join(", ")}]`
  );

  // Log file analysis
  console.log("\n2. Log File Analysis:");
  const logContent = `
[2024-01-01 10:00:00] INFO: User login successful
[2024-01-01 10:05:00] ERROR: Database connection failed
[2024-01-01 10:06:00] INFO: Retrying database connection
[2024-01-01 10:07:00] ERROR: Authentication failed for user
[2024-01-01 10:10:00] INFO: System status check completed
`;

  const errorPatterns = ["ERROR", "FAILED", "TIMEOUT"];
  const errors = matcher.ahoCorasickSearch(logContent, errorPatterns);

  console.log("Error patterns found:");
  errors.forEach((error) => {
    const line = logContent.substring(0, error.position).split("\n").length;
    console.log(
      `  Line ${line}: "${error.pattern}" at position ${error.position}`
    );
  });

  // Text editor find/replace simulation
  console.log("\n3. Text Editor Find/Replace:");
  const document =
    "The quick brown fox jumps over the lazy dog. The fox is quick.";
  const searchTerm = "fox";

  const occurrences = matcher.boyerMooreSearch(document, searchTerm);
  console.log(`Document: "${document}"`);
  console.log(
    `"${searchTerm}" found at positions: [${occurrences.join(", ")}]`
  );

  // Simulate replace operation
  let modifiedDoc = document;
  const replacement = "cat";
  occurrences.reverse().forEach((pos) => {
    modifiedDoc =
      modifiedDoc.substring(0, pos) +
      replacement +
      modifiedDoc.substring(pos + searchTerm.length);
  });
  console.log(`After replace: "${modifiedDoc}"`);

  // Plagiarism detection simulation
  console.log("\n4. Plagiarism Detection:");
  const original = "The theory of relativity was developed by Einstein";
  const suspicious = "Einstein developed the theory of relativity";

  const commonSubstring = matcher.longestCommonSubstring(original, suspicious);
  const similarity =
    (commonSubstring.length * 2) / (original.length + suspicious.length);

  console.log(`Original: "${original}"`);
  console.log(`Suspicious: "${suspicious}"`);
  console.log(`Longest common substring: "${commonSubstring.substring}"`);
  console.log(`Similarity: ${(similarity * 100).toFixed(1)}%`);
}

// Performance benchmarking
function performanceBenchmark() {
  console.log("\n=== Performance Benchmark ===\n");

  const matcher = new StringMatcher();

  // Different text sizes and patterns
  const testCases = [
    {
      name: "Small text, short pattern",
      text: "abcdefghijklmnopqrstuvwxyz".repeat(10),
      pattern: "xyz"
    },
    {
      name: "Medium text, medium pattern",
      text: "abcdefghijklmnopqrstuvwxyz".repeat(100),
      pattern: "mnopqr"
    },
    {
      name: "Large text, long pattern",
      text: "abcdefghijklmnopqrstuvwxyz".repeat(1000),
      pattern: "uvwxyzabc"
    },
    {
      name: "Worst case for naive",
      text: "a".repeat(10000),
      pattern: "a".repeat(50) + "b"
    }
  ];

  testCases.forEach((testCase) => {
    console.log(`${testCase.name}:`);
    console.log(
      `Text length: ${testCase.text.length}, Pattern length: ${testCase.pattern.length}`
    );

    const results = matcher.compareAlgorithms(testCase.text, testCase.pattern);

    // Sort by performance
    const sorted = Object.entries(results).sort(
      (a, b) => a[1].time - b[1].time
    );

    sorted.forEach(([name, stats], index) => {
      const rank =
        index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "  ";
      console.log(`  ${rank} ${name}: ${stats.time.toFixed(2)}ms`);
    });

    console.log();
  });
}

// Run all tests and examples
if (require.main === module) {
  runTests();
  practicalExamples();
  performanceBenchmark();
}

module.exports = StringMatcher;
