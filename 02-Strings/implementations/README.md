# String Implementations

This directory contains implementations of core string data structures and utilities commonly used in string algorithms and competitive programming.

## 📚 Available Implementations

### Core Data Structures

- **StringBuilder** (`string-builder.js`) - Efficient string concatenation
- **Trie** (`trie.js`) - Prefix tree for string operations
- **String Matcher** (`string-matcher.js`) - Various string matching algorithms
- **String Utils** (`string-utils.js`) - Common string manipulation utilities

### Key Features

#### StringBuilder

- Efficient string concatenation without O(n²) penalty
- Support for various data types
- Memory-efficient buffer management
- Chain operations support

#### Trie (Prefix Tree)

- Insert, search, and delete operations
- Prefix matching and autocompletion
- Word count and frequency tracking
- DFS/BFS traversal methods

#### String Matcher

- KMP (Knuth-Morris-Pratt) algorithm
- Boyer-Moore algorithm
- Rabin-Karp rolling hash
- Z-algorithm for pattern matching

#### String Utils

- Character frequency analysis
- Palindrome operations
- String transformations
- Pattern generation and validation

## 🚀 Usage Example

```javascript
// Using StringBuilder
const sb = new StringBuilder();
sb.append("Hello").append(" ").append("World");
console.log(sb.toString()); // "Hello World"

// Using Trie
const trie = new Trie();
trie.insert("algorithm");
trie.insert("algorithms");
console.log(trie.search("algorithm")); // true
console.log(trie.startsWith("algo")); // true

// Using String Matcher
const matcher = new StringMatcher();
const indices = matcher.kmpSearch("ababcababa", "ababa");
console.log(indices); // [0, 5]

// Using String Utils
const utils = new StringUtils();
console.log(utils.isPalindrome("racecar")); // true
console.log(utils.getCharFrequency("hello")); // {h:1, e:1, l:2, o:1}
```

## 🔧 Testing

Each implementation includes comprehensive test cases covering:

- Basic functionality
- Edge cases
- Performance benchmarks
- Real-world usage scenarios

## 📈 Time Complexities

| Operation     | StringBuilder  | Trie                     | String Matcher | String Utils |
| ------------- | -------------- | ------------------------ | -------------- | ------------ |
| Insert/Append | O(1) amortized | O(m)                     | -              | Varies       |
| Search        | -              | O(m)                     | O(n+m)         | Varies       |
| Delete        | -              | O(m)                     | -              | Varies       |
| Space         | O(n)           | O(ALPHABET_SIZE _ N _ M) | O(m)           | Varies       |

Where:

- n = total string length
- m = pattern/word length
- N = number of words in trie
- M = average word length

## 🎯 Applications

- **StringBuilder**: Template engines, log generation, dynamic HTML
- **Trie**: Autocomplete, spell checkers, IP routing tables
- **String Matcher**: Text search, DNA analysis, plagiarism detection
- **String Utils**: Data validation, text processing, algorithm building blocks
