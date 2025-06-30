# Strings

Strings are sequences of characters and are fundamental to many programming problems. Understanding string manipulation, pattern matching, and optimization techniques is crucial for coding interviews.

## Key Concepts

### Time Complexities

- **Access**: O(1) - accessing character by index
- **Search**: O(n) - finding substring or character
- **Concatenation**: O(n + m) - joining two strings
- **Substring**: O(k) - extracting substring of length k

### Common Patterns

1. **Two Pointers**: Use pointers from both ends or same direction
2. **Sliding Window**: Maintain a window and slide across the string
3. **Character Frequency**: Count character occurrences using hash maps
4. **Pattern Matching**: KMP, Rabin-Karp algorithms
5. **Palindrome Techniques**: Expand around center, Manacher's algorithm

## Essential LeetCode Problems

### Easy (Foundation Building)

- [ ] Valid Anagram (LC 242) - Character frequency counting
- [ ] Valid Palindrome (LC 125) - Two pointers + string processing
- [ ] Reverse String (LC 344) - Two pointers technique
- [ ] First Unique Character in String (LC 387) - Character frequency
- [ ] Valid Parentheses (LC 20) - Stack + string validation
- [ ] Implement strStr() (LC 28) - String matching
- [ ] Longest Common Prefix (LC 14) - String comparison
- [ ] Roman to Integer (LC 13) - String parsing

### Medium (Core Skills)

- [ ] Longest Substring Without Repeating Characters (LC 3) - Sliding window
- [ ] Longest Palindromic Substring (LC 5) - Expand around center
- [ ] Group Anagrams (LC 49) - Hash map + sorting
- [ ] Minimum Window Substring (LC 76) - Sliding window
- [ ] Valid Palindrome II (LC 680) - Two pointers + greedy
- [ ] String to Integer (atoi) (LC 8) - String parsing
- [ ] Generate Parentheses (LC 22) - Backtracking
- [ ] Letter Combinations of Phone Number (LC 17) - Backtracking
- [ ] Palindromic Substrings (LC 647) - Expand around center
- [ ] Longest Repeating Character Replacement (LC 424) - Sliding window

### Hard (Advanced Mastery)

- [ ] Edit Distance (LC 72) - Dynamic programming
- [ ] Regular Expression Matching (LC 10) - Dynamic programming
- [ ] Wildcard Matching (LC 44) - Dynamic programming
- [ ] Palindrome Pairs (LC 336) - Trie + string processing
- [ ] Minimum Window Subsequence (LC 727) - Two pointers
- [ ] Shortest Palindrome (LC 214) - KMP algorithm

## Templates and Patterns

### Two Pointers for Palindromes

```javascript
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
```

### Sliding Window for Substring Problems

```javascript
function longestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

### Character Frequency Counting

```javascript
function getCharFrequency(s) {
  const freq = new Map();
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  return freq;
}
```

### Expand Around Center for Palindromes

```javascript
function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}
```

## String Processing Techniques

### 1. **Character Classification**

```javascript
function isAlphanumeric(char) {
  return /[a-zA-Z0-9]/.test(char);
}

function isLetter(char) {
  return /[a-zA-Z]/.test(char);
}

function isDigit(char) {
  return /[0-9]/.test(char);
}
```

### 2. **Case Conversion**

```javascript
function toLowerCase(s) {
  return s.toLowerCase();
}

function toUpperCase(s) {
  return s.toUpperCase();
}
```

### 3. **String Building**

```javascript
// Efficient string building
function buildString(parts) {
  return parts.join("");
}

// Character array approach
function reverseString(s) {
  const arr = s.split("");
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr.join("");
}
```

## Advanced String Algorithms

### KMP (Knuth-Morris-Pratt) Pattern Matching

```javascript
function kmpSearch(text, pattern) {
  const lps = buildLPS(pattern);
  const matches = [];
  let i = 0,
    j = 0;

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      matches.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && text[i] !== pattern[j]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return matches;
}

function buildLPS(pattern) {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;

  while (i < pattern.length) {
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
```

## String Optimization Tips

### 1. **Avoid String Concatenation in Loops**

```javascript
// Bad - O(n²) complexity
let result = "";
for (const str of strings) {
  result += str; // Creates new string each time
}

// Good - O(n) complexity
const result = strings.join("");
```

### 2. **Use Character Arrays for Modifications**

```javascript
// When you need to modify characters frequently
const chars = s.split("");
// ... modify chars array ...
const result = chars.join("");
```

### 3. **Early Termination**

```javascript
// Stop as soon as condition is met
function firstNonRepeatingChar(s) {
  const freq = new Map();

  // Count frequencies
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  // Find first non-repeating
  for (const char of s) {
    if (freq.get(char) === 1) {
      return char; // Early return
    }
  }

  return null;
}
```

## Common Edge Cases

1. **Empty strings**: `""`
2. **Single character**: `"a"`
3. **All same characters**: `"aaaa"`
4. **Special characters**: `"!@#$"`
5. **Mixed case**: `"AbC"`
6. **Whitespace**: `" a b "`
7. **Unicode characters**: `"café"`

## Tips for Success

1. **Master character-level operations**: Understanding how to work with individual characters
2. **Practice string building**: Know when to use arrays vs direct concatenation
3. **Learn regex basics**: Useful for pattern matching and validation
4. **Understand encoding**: ASCII vs Unicode considerations
5. **Memory awareness**: Strings are immutable in JavaScript
6. **Pattern recognition**: Identify when to use sliding window vs two pointers
7. **Edge case handling**: Always consider empty strings and single characters
