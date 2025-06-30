/**
 * Trie (Prefix Tree) Implementation
 *
 * A tree data structure used to efficiently store and search strings.
 * Each node represents a character, and paths from root to leaf represent complete words.
 *
 * Features:
 * - Insert, search, and delete operations
 * - Prefix matching and autocompletion
 * - Word frequency counting
 * - Lexicographic ordering
 * - Memory efficient for large datasets with common prefixes
 */

class TrieNode {
  constructor() {
    this.children = new Map(); // Map from character to TrieNode
    this.isEndOfWord = false;
    this.count = 0; // Number of words ending at this node
    this.prefixCount = 0; // Number of words passing through this node
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.totalWords = 0;
  }

  /**
   * Inserts a word into the trie
   * @param {string} word - Word to insert
   * @returns {boolean} - True if word was newly inserted, false if already existed
   */
  insert(word) {
    if (!word || typeof word !== "string") {
      throw new Error("Word must be a non-empty string");
    }

    let current = this.root;
    let isNewWord = false;

    for (let char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
      current.prefixCount++;
    }

    if (!current.isEndOfWord) {
      isNewWord = true;
      this.totalWords++;
    }

    current.isEndOfWord = true;
    current.count++;

    return isNewWord;
  }

  /**
   * Searches for a word in the trie
   * @param {string} word - Word to search for
   * @returns {boolean} - True if word exists
   */
  search(word) {
    if (!word || typeof word !== "string") {
      return false;
    }

    const node = this._findNode(word);
    return node !== null && node.isEndOfWord;
  }

  /**
   * Checks if any word starts with the given prefix
   * @param {string} prefix - Prefix to check
   * @returns {boolean} - True if prefix exists
   */
  startsWith(prefix) {
    if (!prefix || typeof prefix !== "string") {
      return false;
    }

    return this._findNode(prefix) !== null;
  }

  /**
   * Deletes a word from the trie
   * @param {string} word - Word to delete
   * @returns {boolean} - True if word was deleted, false if word didn't exist
   */
  delete(word) {
    if (!word || typeof word !== "string") {
      return false;
    }

    return this._deleteHelper(this.root, word, 0);
  }

  /**
   * Gets the count of a specific word
   * @param {string} word - Word to count
   * @returns {number} - Number of times word was inserted
   */
  getWordCount(word) {
    if (!word || typeof word !== "string") {
      return 0;
    }

    const node = this._findNode(word);
    return node && node.isEndOfWord ? node.count : 0;
  }

  /**
   * Gets the number of words with the given prefix
   * @param {string} prefix - Prefix to count
   * @returns {number} - Number of words with prefix
   */
  getPrefixCount(prefix) {
    if (!prefix || typeof prefix !== "string") {
      return this.totalWords;
    }

    const node = this._findNode(prefix);
    return node ? node.prefixCount : 0;
  }

  /**
   * Gets all words with the given prefix
   * @param {string} prefix - Prefix to search for
   * @param {number} limit - Maximum number of results (default: no limit)
   * @returns {string[]} - Array of words with the prefix
   */
  getWordsWithPrefix(prefix = "", limit = Infinity) {
    const results = [];
    const node = prefix ? this._findNode(prefix) : this.root;

    if (node) {
      this._collectWords(node, prefix, results, limit);
    }

    return results;
  }

  /**
   * Gets all words in the trie in lexicographic order
   * @returns {string[]} - Array of all words
   */
  getAllWords() {
    return this.getWordsWithPrefix("");
  }

  /**
   * Finds the longest common prefix of all words
   * @returns {string} - Longest common prefix
   */
  getLongestCommonPrefix() {
    if (this.totalWords === 0) return "";

    let current = this.root;
    let prefix = "";

    while (current.children.size === 1 && !current.isEndOfWord) {
      const [char, nextNode] = current.children.entries().next().value;
      prefix += char;
      current = nextNode;
    }

    return prefix;
  }

  /**
   * Auto-complete functionality
   * @param {string} prefix - Prefix to complete
   * @param {number} maxSuggestions - Maximum suggestions to return
   * @returns {string[]} - Array of completion suggestions
   */
  autoComplete(prefix, maxSuggestions = 10) {
    return this.getWordsWithPrefix(prefix, maxSuggestions);
  }

  /**
   * Spell checker: finds words within edit distance k
   * @param {string} word - Target word
   * @param {number} k - Maximum edit distance
   * @returns {string[]} - Array of similar words
   */
  findSimilarWords(word, k = 1) {
    const results = [];
    this._findSimilarWordsHelper(this.root, "", word, k, results);
    return results;
  }

  /**
   * Gets statistics about the trie
   * @returns {Object} - Trie statistics
   */
  getStats() {
    const stats = {
      totalWords: this.totalWords,
      totalNodes: 0,
      maxDepth: 0,
      minWordLength: Infinity,
      maxWordLength: 0,
      averageWordLength: 0
    };

    let totalLength = 0;
    const words = this.getAllWords();

    words.forEach((word) => {
      totalLength += word.length;
      stats.minWordLength = Math.min(stats.minWordLength, word.length);
      stats.maxWordLength = Math.max(stats.maxWordLength, word.length);
    });

    stats.averageWordLength = words.length > 0 ? totalLength / words.length : 0;
    stats.minWordLength =
      stats.minWordLength === Infinity ? 0 : stats.minWordLength;

    this._countNodes(this.root, 0, stats);

    return stats;
  }

  /**
   * Clears the entire trie
   */
  clear() {
    this.root = new TrieNode();
    this.totalWords = 0;
  }

  /**
   * Checks if trie is empty
   * @returns {boolean} - True if empty
   */
  isEmpty() {
    return this.totalWords === 0;
  }

  /**
   * Converts trie to a serializable format
   * @returns {Object} - Serialized trie
   */
  serialize() {
    return {
      root: this._serializeNode(this.root),
      totalWords: this.totalWords
    };
  }

  /**
   * Creates trie from serialized data
   * @param {Object} data - Serialized trie data
   * @returns {Trie} - New Trie instance
   */
  static deserialize(data) {
    const trie = new Trie();
    trie.root = Trie._deserializeNode(data.root);
    trie.totalWords = data.totalWords;
    return trie;
  }

  // Private helper methods

  /**
   * Finds the node corresponding to a given string
   * @private
   * @param {string} str - String to find
   * @returns {TrieNode|null} - Node if found, null otherwise
   */
  _findNode(str) {
    let current = this.root;

    for (let char of str) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char);
    }

    return current;
  }

  /**
   * Helper function for delete operation
   * @private
   * @param {TrieNode} node - Current node
   * @param {string} word - Word to delete
   * @param {number} index - Current character index
   * @returns {boolean} - True if current node should be deleted
   */
  _deleteHelper(node, word, index) {
    if (index === word.length) {
      // Reached end of word
      if (!node.isEndOfWord) {
        return false; // Word doesn't exist
      }

      node.isEndOfWord = false;
      node.count = 0;
      this.totalWords--;

      // Return true if current has no children (should be deleted)
      return node.children.size === 0;
    }

    const char = word[index];
    const childNode = node.children.get(char);

    if (!childNode) {
      return false; // Word doesn't exist
    }

    const shouldDeleteChild = this._deleteHelper(childNode, word, index + 1);

    if (shouldDeleteChild) {
      node.children.delete(char);
    } else {
      childNode.prefixCount--;
    }

    // Return true if current node should be deleted
    return !node.isEndOfWord && node.children.size === 0;
  }

  /**
   * Collects all words starting from a given node
   * @private
   * @param {TrieNode} node - Starting node
   * @param {string} currentWord - Current word being built
   * @param {string[]} results - Array to store results
   * @param {number} limit - Maximum results to collect
   */
  _collectWords(node, currentWord, results, limit) {
    if (results.length >= limit) return;

    if (node.isEndOfWord) {
      for (let i = 0; i < node.count && results.length < limit; i++) {
        results.push(currentWord);
      }
    }

    for (let [char, childNode] of node.children) {
      this._collectWords(childNode, currentWord + char, results, limit);
      if (results.length >= limit) break;
    }
  }

  /**
   * Helper for finding similar words using edit distance
   * @private
   * @param {TrieNode} node - Current node
   * @param {string} currentWord - Current word being built
   * @param {string} targetWord - Target word
   * @param {number} k - Maximum edit distance
   * @param {string[]} results - Array to store results
   */
  _findSimilarWordsHelper(node, currentWord, targetWord, k, results) {
    if (node.isEndOfWord && this._editDistance(currentWord, targetWord) <= k) {
      results.push(currentWord);
    }

    if (currentWord.length - targetWord.length > k) {
      return; // Pruning: too many insertions
    }

    for (let [char, childNode] of node.children) {
      this._findSimilarWordsHelper(
        childNode,
        currentWord + char,
        targetWord,
        k,
        results
      );
    }
  }

  /**
   * Calculates edit distance between two strings
   * @private
   * @param {string} str1 - First string
   * @param {string} str2 - Second string
   * @returns {number} - Edit distance
   */
  _editDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1)
      .fill()
      .map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }

    return dp[m][n];
  }

  /**
   * Counts nodes and calculates max depth for statistics
   * @private
   * @param {TrieNode} node - Current node
   * @param {number} depth - Current depth
   * @param {Object} stats - Statistics object to update
   */
  _countNodes(node, depth, stats) {
    stats.totalNodes++;
    stats.maxDepth = Math.max(stats.maxDepth, depth);

    for (let childNode of node.children.values()) {
      this._countNodes(childNode, depth + 1, stats);
    }
  }

  /**
   * Serializes a node to JSON-compatible format
   * @private
   * @param {TrieNode} node - Node to serialize
   * @returns {Object} - Serialized node
   */
  _serializeNode(node) {
    const serialized = {
      isEndOfWord: node.isEndOfWord,
      count: node.count,
      prefixCount: node.prefixCount,
      children: {}
    };

    for (let [char, childNode] of node.children) {
      serialized.children[char] = this._serializeNode(childNode);
    }

    return serialized;
  }

  /**
   * Deserializes a node from JSON format
   * @private
   * @param {Object} data - Serialized node data
   * @returns {TrieNode} - Deserialized node
   */
  static _deserializeNode(data) {
    const node = new TrieNode();
    node.isEndOfWord = data.isEndOfWord;
    node.count = data.count;
    node.prefixCount = data.prefixCount;

    for (let [char, childData] of Object.entries(data.children)) {
      node.children.set(char, Trie._deserializeNode(childData));
    }

    return node;
  }
}

// Test cases and examples
function runTests() {
  console.log("=== Trie Tests ===\n");

  // Basic operations
  console.log("1. Basic Operations:");
  const trie = new Trie();

  console.log(`Insert "apple": ${trie.insert("apple")}`); // true
  console.log(`Insert "app": ${trie.insert("app")}`); // true
  console.log(`Insert "apple" again: ${trie.insert("apple")}`); // false
  console.log(`Search "app": ${trie.search("app")}`); // true
  console.log(`Search "apple": ${trie.search("apple")}`); // true
  console.log(`Search "appl": ${trie.search("appl")}`); // false
  console.log(`Starts with "app": ${trie.startsWith("app")}`); // true
  console.log(`Starts with "xyz": ${trie.startsWith("xyz")}`); // false
  console.log();

  // Word counting
  console.log("2. Word Counting:");
  trie.insert("hello");
  trie.insert("hello");
  trie.insert("hello");
  console.log(`Word count for "hello": ${trie.getWordCount("hello")}`); // 3
  console.log(`Word count for "apple": ${trie.getWordCount("apple")}`); // 1
  console.log(`Prefix count for "app": ${trie.getPrefixCount("app")}`); // 2
  console.log();

  // Prefix operations
  console.log("3. Prefix Operations:");
  trie.insert("application");
  trie.insert("apply");
  trie.insert("appreciate");

  const wordsWithApp = trie.getWordsWithPrefix("app");
  console.log(`Words with prefix "app": [${wordsWithApp.join(", ")}]`);

  const wordsWithAppl = trie.getWordsWithPrefix("appl");
  console.log(`Words with prefix "appl": [${wordsWithAppl.join(", ")}]`);
  console.log();

  // Auto-complete
  console.log("4. Auto-complete:");
  const suggestions = trie.autoComplete("ap", 3);
  console.log(`Auto-complete for "ap" (max 3): [${suggestions.join(", ")}]`);
  console.log();

  // Delete operations
  console.log("5. Delete Operations:");
  console.log(`Before delete - Search "app": ${trie.search("app")}`);
  console.log(`Delete "app": ${trie.delete("app")}`);
  console.log(`After delete - Search "app": ${trie.search("app")}`);
  console.log(`After delete - Search "apple": ${trie.search("apple")}`);
  console.log(`After delete - Starts with "app": ${trie.startsWith("app")}`);
  console.log();

  // Statistics
  console.log("6. Trie Statistics:");
  const stats = trie.getStats();
  console.log(`Total words: ${stats.totalWords}`);
  console.log(`Total nodes: ${stats.totalNodes}`);
  console.log(`Max depth: ${stats.maxDepth}`);
  console.log(`Min word length: ${stats.minWordLength}`);
  console.log(`Max word length: ${stats.maxWordLength}`);
  console.log(`Average word length: ${stats.averageWordLength.toFixed(2)}`);
  console.log();
}

// Performance tests
function performanceTest() {
  console.log("=== Performance Tests ===\n");

  const words = [
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "up",
    "down",
    "out",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too"
  ];

  console.log("1. Insertion Performance:");
  const trie = new Trie();
  const start1 = performance.now();

  for (let i = 0; i < 1000; i++) {
    for (let word of words) {
      trie.insert(word + i);
    }
  }

  const end1 = performance.now();
  console.log(
    `Inserted ${words.length * 1000} words in ${(end1 - start1).toFixed(2)}ms`
  );

  console.log("\n2. Search Performance:");
  const start2 = performance.now();

  let searchCount = 0;
  for (let i = 0; i < 1000; i++) {
    for (let word of words.slice(0, 10)) {
      if (trie.search(word + i)) {
        searchCount++;
      }
    }
  }

  const end2 = performance.now();
  console.log(
    `Performed ${10 * 1000} searches in ${(end2 - start2).toFixed(2)}ms`
  );
  console.log(`Found ${searchCount} words`);

  console.log("\n3. Prefix Search Performance:");
  const start3 = performance.now();

  let prefixResults = 0;
  for (let i = 0; i < 100; i++) {
    const results = trie.getWordsWithPrefix("the" + i, 10);
    prefixResults += results.length;
  }

  const end3 = performance.now();
  console.log(
    `Performed 100 prefix searches in ${(end3 - start3).toFixed(2)}ms`
  );
  console.log(`Found ${prefixResults} total results`);
  console.log();
}

// Practical examples
function practicalExamples() {
  console.log("=== Practical Examples ===\n");

  // Autocomplete system
  console.log("1. Autocomplete System:");
  const autocomplete = new Trie();
  const commonWords = [
    "javascript",
    "java",
    "python",
    "programming",
    "program",
    "code",
    "coding",
    "algorithm",
    "data",
    "structure",
    "computer",
    "science",
    "software",
    "development"
  ];

  commonWords.forEach((word) => autocomplete.insert(word));

  function getAutocompleteSuggestions(input, maxSuggestions = 5) {
    return autocomplete.getWordsWithPrefix(input.toLowerCase(), maxSuggestions);
  }

  console.log(
    `Typing "prog": ${getAutocompleteSuggestions("prog").join(", ")}`
  );
  console.log(
    `Typing "java": ${getAutocompleteSuggestions("java").join(", ")}`
  );
  console.log(`Typing "com": ${getAutocompleteSuggestions("com").join(", ")}`);
  console.log();

  // Spell checker
  console.log("2. Spell Checker:");
  const dictionary = new Trie();
  const words = [
    "hello",
    "world",
    "programming",
    "computer",
    "science",
    "algorithm",
    "data"
  ];
  words.forEach((word) => dictionary.insert(word));

  function spellCheck(word) {
    if (dictionary.search(word.toLowerCase())) {
      return { correct: true, suggestions: [] };
    } else {
      const suggestions = dictionary.findSimilarWords(word.toLowerCase(), 2);
      return { correct: false, suggestions: suggestions.slice(0, 3) };
    }
  }

  const testWords = ["hello", "helo", "wrold", "programing", "compter"];
  testWords.forEach((word) => {
    const result = spellCheck(word);
    if (result.correct) {
      console.log(`"${word}" - ✅ Correct`);
    } else {
      console.log(
        `"${word}" - ❌ Suggestions: [${result.suggestions.join(", ")}]`
      );
    }
  });
  console.log();

  // Word frequency analysis
  console.log("3. Word Frequency Analysis:");
  const frequencyTrie = new Trie();
  const text = "the quick brown fox jumps over the lazy dog the fox is quick";
  const wordsInText = text.toLowerCase().split(" ");

  wordsInText.forEach((word) => frequencyTrie.insert(word));

  console.log("Word frequencies:");
  const uniqueWords = [...new Set(wordsInText)];
  uniqueWords.forEach((word) => {
    console.log(`  "${word}": ${frequencyTrie.getWordCount(word)}`);
  });
  console.log();

  // URL routing simulation
  console.log("4. URL Routing Simulation:");
  const routes = new Trie();
  const routePaths = [
    "/api/users",
    "/api/users/profile",
    "/api/users/settings",
    "/api/products",
    "/api/products/categories",
    "/admin/dashboard",
    "/admin/users",
    "/admin/settings"
  ];

  routePaths.forEach((route) => routes.insert(route));

  function findMatchingRoutes(path) {
    return routes.getWordsWithPrefix(path);
  }

  console.log(
    `Routes starting with "/api": [${findMatchingRoutes("/api").join(", ")}]`
  );
  console.log(
    `Routes starting with "/api/users": [${findMatchingRoutes(
      "/api/users"
    ).join(", ")}]`
  );
  console.log(
    `Routes starting with "/admin": [${findMatchingRoutes("/admin").join(
      ", "
    )}]`
  );
  console.log();
}

// Advanced features demo
function advancedFeatures() {
  console.log("=== Advanced Features ===\n");

  // Serialization and deserialization
  console.log("1. Serialization:");
  const originalTrie = new Trie();
  ["apple", "app", "application", "apply"].forEach((word) =>
    originalTrie.insert(word)
  );

  const serialized = originalTrie.serialize();
  console.log(`Original trie has ${originalTrie.getAllWords().length} words`);

  const deserializedTrie = Trie.deserialize(serialized);
  console.log(
    `Deserialized trie has ${deserializedTrie.getAllWords().length} words`
  );
  console.log(
    `Words match: ${
      JSON.stringify(originalTrie.getAllWords()) ===
      JSON.stringify(deserializedTrie.getAllWords())
    }`
  );
  console.log();

  // Longest common prefix
  console.log("2. Longest Common Prefix:");
  const prefixTrie = new Trie();
  ["flower", "flow", "flight"].forEach((word) => prefixTrie.insert(word));
  console.log(
    `LCP of [flower, flow, flight]: "${prefixTrie.getLongestCommonPrefix()}"`
  );

  prefixTrie.clear();
  ["dog", "racecar", "car"].forEach((word) => prefixTrie.insert(word));
  console.log(
    `LCP of [dog, racecar, car]: "${prefixTrie.getLongestCommonPrefix()}"`
  );
  console.log();

  // Memory usage comparison
  console.log("3. Memory Efficiency:");
  const testWords = [];
  const baseWord = "test";
  for (let i = 0; i < 1000; i++) {
    testWords.push(baseWord + i);
  }

  // Array storage
  const arrayStart = performance.now();
  const wordArray = [...testWords];
  const arrayEnd = performance.now();

  // Trie storage
  const trieStart = performance.now();
  const wordTrie = new Trie();
  testWords.forEach((word) => wordTrie.insert(word));
  const trieEnd = performance.now();

  console.log(`Array creation time: ${(arrayEnd - arrayStart).toFixed(2)}ms`);
  console.log(`Trie creation time: ${(trieEnd - trieStart).toFixed(2)}ms`);
  console.log(`Trie nodes: ${wordTrie.getStats().totalNodes}`);
  console.log(
    `Space efficiency: Trie uses ${wordTrie.getStats().totalNodes} nodes vs ${
      testWords.length
    } array elements`
  );
}

// Run all tests and examples
if (require.main === module) {
  runTests();
  performanceTest();
  practicalExamples();
  advancedFeatures();
}

module.exports = { Trie, TrieNode };
