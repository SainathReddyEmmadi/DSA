/**
 * String Utilities Collection
 *
 * A comprehensive collection of string manipulation utilities commonly used
 * in algorithms, data processing, and competitive programming.
 *
 * Features:
 * - Character and substring analysis
 * - Pattern validation and generation
 * - String transformations and formatting
 * - Performance-optimized operations
 * - Unicode and internationalization support
 */

class StringUtils {
  constructor() {
    this.cache = new Map(); // Cache for expensive operations
  }

  // ============================================================================
  // CHARACTER ANALYSIS
  // ============================================================================

  /**
   * Get character frequency map
   * @param {string} str - Input string
   * @returns {Object} - Character frequency map
   */
  getCharFrequency(str) {
    const freq = {};
    for (let char of str) {
      freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
  }

  /**
   * Get character frequency using Map (better for Unicode)
   * @param {string} str - Input string
   * @returns {Map} - Character frequency map
   */
  getCharFrequencyMap(str) {
    const freq = new Map();
    for (let char of str) {
      freq.set(char, (freq.get(char) || 0) + 1);
    }
    return freq;
  }

  /**
   * Find most frequent character
   * @param {string} str - Input string
   * @returns {Object} - {char, count} of most frequent character
   */
  getMostFrequentChar(str) {
    const freq = this.getCharFrequency(str);
    let maxChar = "";
    let maxCount = 0;

    for (let [char, count] of Object.entries(freq)) {
      if (count > maxCount) {
        maxChar = char;
        maxCount = count;
      }
    }

    return { char: maxChar, count: maxCount };
  }

  /**
   * Find unique characters (appearing exactly once)
   * @param {string} str - Input string
   * @returns {string[]} - Array of unique characters
   */
  getUniqueChars(str) {
    const freq = this.getCharFrequency(str);
    return Object.keys(freq).filter((char) => freq[char] === 1);
  }

  /**
   * Check if string has all unique characters
   * @param {string} str - Input string
   * @returns {boolean} - True if all characters are unique
   */
  hasAllUniqueChars(str) {
    const seen = new Set();
    for (let char of str) {
      if (seen.has(char)) return false;
      seen.add(char);
    }
    return true;
  }

  /**
   * Find first non-repeating character
   * @param {string} str - Input string
   * @returns {string|null} - First non-repeating character or null
   */
  getFirstNonRepeatingChar(str) {
    const freq = this.getCharFrequency(str);
    for (let char of str) {
      if (freq[char] === 1) return char;
    }
    return null;
  }

  // ============================================================================
  // PALINDROME OPERATIONS
  // ============================================================================

  /**
   * Check if string is palindrome
   * @param {string} str - Input string
   * @param {boolean} ignoreCase - Ignore case (default: true)
   * @param {boolean} ignoreSpaces - Ignore spaces and punctuation (default: true)
   * @returns {boolean} - True if palindrome
   */
  isPalindrome(str, ignoreCase = true, ignoreSpaces = true) {
    let cleaned = str;

    if (ignoreSpaces) {
      cleaned = cleaned.replace(/[^a-zA-Z0-9]/g, "");
    }

    if (ignoreCase) {
      cleaned = cleaned.toLowerCase();
    }

    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
      if (cleaned[left] !== cleaned[right]) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  }

  /**
   * Find all palindromic substrings
   * @param {string} str - Input string
   * @returns {string[]} - Array of palindromic substrings
   */
  getAllPalindromes(str) {
    const palindromes = new Set();

    // Check all possible substrings
    for (let i = 0; i < str.length; i++) {
      // Odd length palindromes
      this._expandAroundCenter(str, i, i, palindromes);
      // Even length palindromes
      this._expandAroundCenter(str, i, i + 1, palindromes);
    }

    return Array.from(palindromes).sort((a, b) => b.length - a.length);
  }

  /**
   * Find longest palindromic substring
   * @param {string} str - Input string
   * @returns {string} - Longest palindromic substring
   */
  getLongestPalindrome(str) {
    if (!str || str.length < 2) return str;

    let start = 0;
    let maxLength = 1;

    for (let i = 0; i < str.length; i++) {
      const len1 = this._expandAroundCenterLength(str, i, i);
      const len2 = this._expandAroundCenterLength(str, i, i + 1);
      const currentMax = Math.max(len1, len2);

      if (currentMax > maxLength) {
        maxLength = currentMax;
        start = i - Math.floor((currentMax - 1) / 2);
      }
    }

    return str.substring(start, start + maxLength);
  }

  /**
   * Check if string can be rearranged to form palindrome
   * @param {string} str - Input string
   * @returns {boolean} - True if can form palindrome
   */
  canFormPalindrome(str) {
    const freq = this.getCharFrequency(str);
    let oddCount = 0;

    for (let count of Object.values(freq)) {
      if (count % 2 === 1) {
        oddCount++;
      }
    }

    return oddCount <= 1;
  }

  // ============================================================================
  // STRING TRANSFORMATIONS
  // ============================================================================

  /**
   * Convert to camelCase
   * @param {string} str - Input string
   * @returns {string} - camelCase string
   */
  toCamelCase(str) {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
      .replace(/^[A-Z]/, (char) => char.toLowerCase());
  }

  /**
   * Convert to PascalCase
   * @param {string} str - Input string
   * @returns {string} - PascalCase string
   */
  toPascalCase(str) {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
      .replace(/^[a-z]/, (char) => char.toUpperCase());
  }

  /**
   * Convert to snake_case
   * @param {string} str - Input string
   * @returns {string} - snake_case string
   */
  toSnakeCase(str) {
    return str
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      .replace(/[^a-zA-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .toLowerCase();
  }

  /**
   * Convert to kebab-case
   * @param {string} str - Input string
   * @returns {string} - kebab-case string
   */
  toKebabCase(str) {
    return str
      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
  }

  /**
   * Reverse string
   * @param {string} str - Input string
   * @returns {string} - Reversed string
   */
  reverse(str) {
    return str.split("").reverse().join("");
  }

  /**
   * Reverse words in string
   * @param {string} str - Input string
   * @returns {string} - String with reversed word order
   */
  reverseWords(str) {
    return str.trim().split(/\s+/).reverse().join(" ");
  }

  /**
   * Reverse each word in string
   * @param {string} str - Input string
   * @returns {string} - String with each word reversed
   */
  reverseEachWord(str) {
    return str
      .split(" ")
      .map((word) => this.reverse(word))
      .join(" ");
  }

  /**
   * Capitalize first letter of each word
   * @param {string} str - Input string
   * @returns {string} - Title case string
   */
  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
  }

  /**
   * Toggle case of each character
   * @param {string} str - Input string
   * @returns {string} - String with toggled case
   */
  toggleCase(str) {
    return str
      .split("")
      .map((char) =>
        char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()
      )
      .join("");
  }

  // ============================================================================
  // PATTERN MATCHING & VALIDATION
  // ============================================================================

  /**
   * Check if string matches pattern with wildcards
   * @param {string} str - Input string
   * @param {string} pattern - Pattern with * and ? wildcards
   * @returns {boolean} - True if matches pattern
   */
  matchesWildcard(str, pattern) {
    const dp = Array(str.length + 1)
      .fill()
      .map(() => Array(pattern.length + 1).fill(false));

    dp[0][0] = true;

    // Handle patterns like a* or *a*
    for (let j = 1; j <= pattern.length; j++) {
      if (pattern[j - 1] === "*") {
        dp[0][j] = dp[0][j - 1];
      }
    }

    for (let i = 1; i <= str.length; i++) {
      for (let j = 1; j <= pattern.length; j++) {
        if (pattern[j - 1] === "*") {
          dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
        } else if (pattern[j - 1] === "?" || str[i - 1] === pattern[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        }
      }
    }

    return dp[str.length][pattern.length];
  }

  /**
   * Validate email format
   * @param {string} email - Email string
   * @returns {boolean} - True if valid email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate URL format
   * @param {string} url - URL string
   * @returns {boolean} - True if valid URL format
   */
  isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if string contains only alphabetic characters
   * @param {string} str - Input string
   * @returns {boolean} - True if only alphabetic
   */
  isAlphabetic(str) {
    return /^[a-zA-Z]+$/.test(str);
  }

  /**
   * Check if string contains only numeric characters
   * @param {string} str - Input string
   * @returns {boolean} - True if only numeric
   */
  isNumeric(str) {
    return /^\d+$/.test(str);
  }

  /**
   * Check if string contains only alphanumeric characters
   * @param {string} str - Input string
   * @returns {boolean} - True if only alphanumeric
   */
  isAlphaNumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
  }

  // ============================================================================
  // SUBSTRING OPERATIONS
  // ============================================================================

  /**
   * Find all substrings of given length
   * @param {string} str - Input string
   * @param {number} length - Substring length
   * @returns {string[]} - Array of substrings
   */
  getAllSubstrings(str, length = null) {
    const substrings = [];

    if (length === null) {
      // All possible substrings
      for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
          substrings.push(str.substring(i, j));
        }
      }
    } else {
      // Substrings of specific length
      for (let i = 0; i <= str.length - length; i++) {
        substrings.push(str.substring(i, i + length));
      }
    }

    return substrings;
  }

  /**
   * Find longest common prefix of array of strings
   * @param {string[]} strings - Array of strings
   * @returns {string} - Longest common prefix
   */
  getLongestCommonPrefix(strings) {
    if (!strings || strings.length === 0) return "";
    if (strings.length === 1) return strings[0];

    let prefix = strings[0];

    for (let i = 1; i < strings.length; i++) {
      while (strings[i].indexOf(prefix) !== 0) {
        prefix = prefix.substring(0, prefix.length - 1);
        if (prefix === "") return "";
      }
    }

    return prefix;
  }

  /**
   * Find longest common suffix of array of strings
   * @param {string[]} strings - Array of strings
   * @returns {string} - Longest common suffix
   */
  getLongestCommonSuffix(strings) {
    if (!strings || strings.length === 0) return "";

    // Reverse all strings and find common prefix
    const reversedStrings = strings.map((str) => this.reverse(str));
    const commonPrefix = this.getLongestCommonPrefix(reversedStrings);

    return this.reverse(commonPrefix);
  }

  /**
   * Check if one string is rotation of another
   * @param {string} str1 - First string
   * @param {string} str2 - Second string
   * @returns {boolean} - True if str2 is rotation of str1
   */
  isRotation(str1, str2) {
    if (str1.length !== str2.length) return false;
    return (str1 + str1).includes(str2);
  }

  // ============================================================================
  // STRING ENCODING & COMPRESSION
  // ============================================================================

  /**
   * Run-length encoding
   * @param {string} str - Input string
   * @returns {string} - Encoded string
   */
  runLengthEncode(str) {
    if (!str) return "";

    let encoded = "";
    let count = 1;

    for (let i = 1; i < str.length; i++) {
      if (str[i] === str[i - 1]) {
        count++;
      } else {
        encoded += str[i - 1] + count;
        count = 1;
      }
    }

    encoded += str[str.length - 1] + count;
    return encoded;
  }

  /**
   * Run-length decoding
   * @param {string} encoded - Encoded string
   * @returns {string} - Decoded string
   */
  runLengthDecode(encoded) {
    let decoded = "";

    for (let i = 0; i < encoded.length; i += 2) {
      const char = encoded[i];
      const count = parseInt(encoded[i + 1]);
      decoded += char.repeat(count);
    }

    return decoded;
  }

  /**
   * Simple string compression (better than run-length for certain patterns)
   * @param {string} str - Input string
   * @returns {string} - Compressed string (returns original if compression isn't beneficial)
   */
  compress(str) {
    const compressed = this.runLengthEncode(str);
    return compressed.length < str.length ? compressed : str;
  }

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Count words in string
   * @param {string} str - Input string
   * @returns {number} - Word count
   */
  countWords(str) {
    return str
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }

  /**
   * Count sentences in string
   * @param {string} str - Input string
   * @returns {number} - Sentence count
   */
  countSentences(str) {
    return str.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0)
      .length;
  }

  /**
   * Calculate readability score (simplified Flesch reading ease)
   * @param {string} str - Input string
   * @returns {number} - Readability score
   */
  getReadabilityScore(str) {
    const sentences = this.countSentences(str);
    const words = this.countWords(str);
    const syllables = this._countSyllables(str);

    if (sentences === 0 || words === 0) return 0;

    return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  }

  /**
   * Generate random string
   * @param {number} length - String length
   * @param {string} charset - Character set to use
   * @returns {string} - Random string
   */
  generateRandom(
    length,
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  /**
   * Escape HTML entities
   * @param {string} str - Input string
   * @returns {string} - HTML escaped string
   */
  escapeHTML(str) {
    const entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return str.replace(/[&<>"']/g, (match) => entityMap[match]);
  }

  /**
   * Unescape HTML entities
   * @param {string} str - HTML escaped string
   * @returns {string} - Unescaped string
   */
  unescapeHTML(str) {
    const entityMap = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    };

    return str.replace(
      /&amp;|&lt;|&gt;|&quot;|&#39;/g,
      (match) => entityMap[match]
    );
  }

  /**
   * Calculate Levenshtein distance between two strings
   * @param {string} str1 - First string
   * @param {string} str2 - Second string
   * @returns {number} - Edit distance
   */
  getLevenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1)
      .fill()
      .map(() => Array(str1.length + 1).fill(0));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[j][i] = matrix[j - 1][i - 1];
        } else {
          matrix[j][i] = Math.min(
            matrix[j - 1][i - 1] + 1,
            matrix[j][i - 1] + 1,
            matrix[j - 1][i] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Clear utility cache
   */
  clearCache() {
    this.cache.clear();
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Expand around center for palindrome detection
   * @private
   */
  _expandAroundCenter(str, left, right, palindromes) {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      palindromes.add(str.substring(left, right + 1));
      left--;
      right++;
    }
  }

  /**
   * Get length of palindrome expanding around center
   * @private
   */
  _expandAroundCenterLength(str, left, right) {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }

  /**
   * Count syllables in text (simplified)
   * @private
   */
  _countSyllables(text) {
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    return words.reduce((total, word) => {
      let syllables = word.match(/[aeiouy]+/g) || [];
      if (word.endsWith("e")) syllables.pop();
      return total + Math.max(1, syllables.length);
    }, 0);
  }
}

// Test cases and examples
function runTests() {
  console.log("=== String Utils Tests ===\n");

  const utils = new StringUtils();

  // Character analysis
  console.log("1. Character Analysis:");
  const testStr = "hello world";
  console.log(`String: "${testStr}"`);
  console.log(`Character frequency:`, utils.getCharFrequency(testStr));
  console.log(`Most frequent char:`, utils.getMostFrequentChar(testStr));
  console.log(`Unique chars:`, utils.getUniqueChars(testStr));
  console.log(`Has all unique chars:`, utils.hasAllUniqueChars(testStr));
  console.log(`First non-repeating:`, utils.getFirstNonRepeatingChar(testStr));
  console.log();

  // Palindrome operations
  console.log("2. Palindrome Operations:");
  const palindromeTests = ["racecar", "A man a plan a canal Panama", "hello"];
  palindromeTests.forEach((str) => {
    console.log(`"${str}" is palindrome: ${utils.isPalindrome(str)}`);
  });
  console.log(`All palindromes in "ababa":`, utils.getAllPalindromes("ababa"));
  console.log(
    `Longest palindrome in "babad":`,
    utils.getLongestPalindrome("babad")
  );
  console.log();

  // String transformations
  console.log("3. String Transformations:");
  const transformTest = "hello world example";
  console.log(`Original: "${transformTest}"`);
  console.log(`camelCase: "${utils.toCamelCase(transformTest)}"`);
  console.log(`PascalCase: "${utils.toPascalCase(transformTest)}"`);
  console.log(`snake_case: "${utils.toSnakeCase(transformTest)}"`);
  console.log(`kebab-case: "${utils.toKebabCase(transformTest)}"`);
  console.log(`Title Case: "${utils.toTitleCase(transformTest)}"`);
  console.log(`Reversed: "${utils.reverse(transformTest)}"`);
  console.log(`Reversed words: "${utils.reverseWords(transformTest)}"`);
  console.log();

  // Pattern matching
  console.log("4. Pattern Matching:");
  console.log(
    `"hello" matches "h*o": ${utils.matchesWildcard("hello", "h*o")}`
  );
  console.log(
    `"hello" matches "h?llo": ${utils.matchesWildcard("hello", "h?llo")}`
  );
  console.log(
    `"test@example.com" is valid email: ${utils.isValidEmail(
      "test@example.com"
    )}`
  );
  console.log(
    `"https://example.com" is valid URL: ${utils.isValidURL(
      "https://example.com"
    )}`
  );
  console.log();

  // Substring operations
  console.log("5. Substring Operations:");
  const substringTest = "programming";
  console.log(
    `All substrings of length 3 in "${substringTest}":`,
    utils.getAllSubstrings(substringTest, 3)
  );

  const stringArray = ["flower", "flow", "flight"];
  console.log(
    `Common prefix of [${stringArray.join(
      ", "
    )}]: "${utils.getLongestCommonPrefix(stringArray)}"`
  );

  console.log(
    `"waterbottle" is rotation of "erbottlewat": ${utils.isRotation(
      "waterbottle",
      "erbottlewat"
    )}`
  );
  console.log();

  // Encoding and compression
  console.log("6. Encoding and Compression:");
  const compressTest = "aaabbcccc";
  const encoded = utils.runLengthEncode(compressTest);
  console.log(`"${compressTest}" encoded: "${encoded}"`);
  console.log(`Decoded back: "${utils.runLengthDecode(encoded)}"`);
  console.log(`Compressed: "${utils.compress(compressTest)}"`);
  console.log();

  // Utility functions
  console.log("7. Utility Functions:");
  const textSample = "Hello world. This is a test sentence! How are you?";
  console.log(`Text: "${textSample}"`);
  console.log(`Word count: ${utils.countWords(textSample)}`);
  console.log(`Sentence count: ${utils.countSentences(textSample)}`);
  console.log(
    `Readability score: ${utils.getReadabilityScore(textSample).toFixed(1)}`
  );
  console.log(`Random string (10 chars): "${utils.generateRandom(10)}"`);
  console.log(
    `Levenshtein distance ("kitten", "sitting"): ${utils.getLevenshteinDistance(
      "kitten",
      "sitting"
    )}`
  );
}

// Practical examples
function practicalExamples() {
  console.log("\n=== Practical Examples ===\n");

  const utils = new StringUtils();

  // Data validation
  console.log("1. Data Validation:");
  const userData = [
    { email: "user@example.com", username: "user123", phone: "1234567890" },
    { email: "invalid-email", username: "user@123", phone: "123abc" },
    { email: "test@domain.co.uk", username: "validUser", phone: "9876543210" }
  ];

  userData.forEach((user, index) => {
    console.log(`User ${index + 1}:`);
    console.log(`  Email valid: ${utils.isValidEmail(user.email)}`);
    console.log(
      `  Username alphanumeric: ${utils.isAlphaNumeric(user.username)}`
    );
    console.log(`  Phone numeric: ${utils.isNumeric(user.phone)}`);
  });

  // Text processing
  console.log("\n2. Text Processing:");
  const articles = [
    "The Quick Brown Fox",
    "the_quick_brown_fox",
    "TheQuickBrownFox",
    "the-quick-brown-fox"
  ];

  console.log("Converting different formats to camelCase:");
  articles.forEach((article) => {
    console.log(`  "${article}" → "${utils.toCamelCase(article)}"`);
  });

  // Content analysis
  console.log("\n3. Content Analysis:");
  const blogPost = `
    Artificial Intelligence is transforming the world. It's changing how we work, live, and interact.
    The impact of AI can be seen across various industries. From healthcare to finance, AI is everywhere.
    However, we must consider the ethical implications. What does this mean for humanity?
    `;

  console.log(`Blog post analysis:`);
  console.log(`  Word count: ${utils.countWords(blogPost)}`);
  console.log(`  Sentence count: ${utils.countSentences(blogPost)}`);
  console.log(
    `  Readability score: ${utils.getReadabilityScore(blogPost).toFixed(1)}`
  );
  console.log(
    `  Most frequent char:`,
    utils.getMostFrequentChar(blogPost.replace(/\s/g, ""))
  );

  // Password strength checking
  console.log("\n4. Password Strength Analysis:");
  const passwords = ["password123", "P@ssw0rd!", "abc", "MySecureP@ssw0rd2024"];

  passwords.forEach((password) => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const minLength = password.length >= 8;
    const hasUnique = utils.hasAllUniqueChars(password);

    const score = [hasLower, hasUpper, hasNumber, hasSpecial, minLength].filter(
      Boolean
    ).length;
    const strength = score < 3 ? "Weak" : score < 5 ? "Medium" : "Strong";

    console.log(
      `  "${password}": ${strength} (${score}/5 criteria, unique chars: ${hasUnique})`
    );
  });

  // Data cleaning
  console.log("\n5. Data Cleaning:");
  const messyData = [
    "  JOHN DOE  ",
    "jane_smith@EXAMPLE.COM",
    "<script>alert('xss')</script>",
    "Product-Name-123"
  ];

  console.log("Cleaning messy data:");
  messyData.forEach((data) => {
    const cleaned = data.trim().toLowerCase();
    const escaped = utils.escapeHTML(cleaned);
    const normalized = utils.toSnakeCase(cleaned);

    console.log(`  Original: "${data}"`);
    console.log(`  Cleaned:  "${cleaned}"`);
    console.log(`  Escaped:  "${escaped}"`);
    console.log(`  Snake:    "${normalized}"`);
    console.log();
  });

  // Search suggestions
  console.log("6. Search Suggestions (Fuzzy Matching):");
  const searchTerms = ["javascript", "programming", "algorithm", "database"];
  const userQuery = "progamming"; // Typo

  console.log(`User searched for: "${userQuery}"`);
  console.log("Suggestions based on edit distance:");

  const suggestions = searchTerms
    .map((term) => ({
      term,
      distance: utils.getLevenshteinDistance(userQuery, term)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  suggestions.forEach((suggestion, index) => {
    console.log(
      `  ${index + 1}. "${suggestion.term}" (distance: ${suggestion.distance})`
    );
  });
}

// Performance tests
function performanceTests() {
  console.log("\n=== Performance Tests ===\n");

  const utils = new StringUtils();

  // Large string operations
  const largeText = "The quick brown fox jumps over the lazy dog. ".repeat(
    1000
  );

  console.log("Testing performance on large text (24,000+ characters):");

  const operations = [
    {
      name: "Character frequency",
      operation: () => utils.getCharFrequency(largeText)
    },
    {
      name: "Word count",
      operation: () => utils.countWords(largeText)
    },
    {
      name: "Palindrome check",
      operation: () => utils.isPalindrome(largeText)
    },
    {
      name: "Case conversion",
      operation: () => utils.toCamelCase(largeText)
    },
    {
      name: "HTML escape",
      operation: () => utils.escapeHTML(largeText)
    }
  ];

  operations.forEach(({ name, operation }) => {
    const start = performance.now();
    operation();
    const end = performance.now();
    console.log(`  ${name}: ${(end - start).toFixed(2)}ms`);
  });

  // Edit distance performance
  console.log("\nEdit distance performance:");
  const str1 = "a".repeat(100);
  const str2 = "b".repeat(100);

  const start = performance.now();
  utils.getLevenshteinDistance(str1, str2);
  const end = performance.now();
  console.log(`  100x100 character comparison: ${(end - start).toFixed(2)}ms`);
}

// Run all tests and examples
if (require.main === module) {
  runTests();
  practicalExamples();
  performanceTests();
}

module.exports = StringUtils;
