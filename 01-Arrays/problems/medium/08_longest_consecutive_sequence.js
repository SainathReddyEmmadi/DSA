/**
 * LeetCode 128: Longest Consecutive Sequence
 *
 * Problem: Given an unsorted array of integers nums, return the length of the longest
 * consecutive elements sequence. You must write an algorithm that runs in O(n) time.
 *
 * Pattern: Hash Set
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

// Approach 1: Hash Set (Optimal)
function longestConsecutive(nums) {
  if (nums.length === 0) return 0;

  const numSet = new Set(nums);
  let maxLength = 0;

  for (const num of numSet) {
    // Only start counting from the beginning of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      // Count consecutive numbers
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}

// Approach 2: Sorting (Not optimal but intuitive)
function longestConsecutiveSorting(nums) {
  if (nums.length === 0) return 0;

  nums.sort((a, b) => a - b);

  let maxLength = 1;
  let currentLength = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      // Skip duplicates
      continue;
    } else if (nums[i] === nums[i - 1] + 1) {
      // Consecutive number
      currentLength++;
    } else {
      // Break in sequence
      maxLength = Math.max(maxLength, currentLength);
      currentLength = 1;
    }
  }

  return Math.max(maxLength, currentLength);
}

// Approach 3: Hash Map with Memoization
function longestConsecutiveMemo(nums) {
  if (nums.length === 0) return 0;

  const numSet = new Set(nums);
  const memo = new Map();
  let maxLength = 0;

  function getSequenceLength(num) {
    if (memo.has(num)) {
      return memo.get(num);
    }

    if (!numSet.has(num)) {
      return 0;
    }

    const length = 1 + getSequenceLength(num + 1);
    memo.set(num, length);
    return length;
  }

  for (const num of numSet) {
    maxLength = Math.max(maxLength, getSequenceLength(num));
  }

  return maxLength;
}

// Approach 4: Union Find (Advanced)
function longestConsecutiveUnionFind(nums) {
  if (nums.length === 0) return 0;

  class UnionFind {
    constructor() {
      this.parent = new Map();
      this.size = new Map();
    }

    makeSet(x) {
      if (!this.parent.has(x)) {
        this.parent.set(x, x);
        this.size.set(x, 1);
      }
    }

    find(x) {
      if (this.parent.get(x) !== x) {
        this.parent.set(x, this.find(this.parent.get(x)));
      }
      return this.parent.get(x);
    }

    union(x, y) {
      const rootX = this.find(x);
      const rootY = this.find(y);

      if (rootX !== rootY) {
        if (this.size.get(rootX) < this.size.get(rootY)) {
          [rootX, rootY] = [rootY, rootX];
        }
        this.parent.set(rootY, rootX);
        this.size.set(rootX, this.size.get(rootX) + this.size.get(rootY));
      }
    }

    getMaxSize() {
      return Math.max(...this.size.values());
    }
  }

  const uf = new UnionFind();
  const numSet = new Set(nums);

  // Create sets for all numbers
  for (const num of numSet) {
    uf.makeSet(num);
  }

  // Union consecutive numbers
  for (const num of numSet) {
    if (numSet.has(num + 1)) {
      uf.union(num, num + 1);
    }
  }

  return uf.getMaxSize();
}

// Approach 5: Brute Force (For comparison)
function longestConsecutiveBruteForce(nums) {
  if (nums.length === 0) return 0;

  let maxLength = 1;

  for (const num of nums) {
    let currentNum = num;
    let currentLength = 1;

    // Check forward direction
    while (nums.includes(currentNum + 1)) {
      currentNum++;
      currentLength++;
    }

    maxLength = Math.max(maxLength, currentLength);
  }

  return maxLength;
}

// Test cases
function testLongestConsecutive() {
  console.log("Testing Longest Consecutive Sequence...\n");

  const testCases = [
    {
      input: [100, 4, 200, 1, 3, 2],
      expected: 4
    },
    {
      input: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
      expected: 9
    },
    {
      input: [1, 2, 0, 1],
      expected: 3
    },
    {
      input: [],
      expected: 0
    },
    {
      input: [1],
      expected: 1
    },
    {
      input: [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6],
      expected: 7
    },
    {
      input: [1, 0, -1],
      expected: 3
    },
    {
      input: [2, 1, 3, 4, 5],
      expected: 5
    }
  ];

  const approaches = [
    { name: "Hash Set Optimal", func: longestConsecutive },
    { name: "Sorting", func: longestConsecutiveSorting },
    { name: "Memoization", func: longestConsecutiveMemo },
    { name: "Union Find", func: longestConsecutiveUnionFind },
    { name: "Brute Force", func: longestConsecutiveBruteForce }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.input]);
      const passed = result === test.expected;
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  Input:    [${test.input}]`);
        console.log(`  Expected: ${test.expected}`);
        console.log(`  Got:      ${result}`);
      }
    });
  });
}

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [1000, 5000, 10000];
  const approaches = [
    { name: "Hash Set", func: longestConsecutive },
    { name: "Sorting", func: longestConsecutiveSorting },
    { name: "Union Find", func: longestConsecutiveUnionFind }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      const nums = [];
      for (let i = 0; i < size; i++) {
        nums.push(Math.floor(Math.random() * size * 2));
      }

      const start = performance.now();
      approach.func([...nums]);
      const end = performance.now();

      console.log(`${approach.name}: ${(end - start).toFixed(4)}ms`);
    });
  });
}

// Visual demonstration
function visualDemo() {
  console.log("\n--- Visual Demonstration ---");
  console.log("Example: [100, 4, 200, 1, 3, 2]");
  console.log("Looking for: longest consecutive sequence");

  const nums = [100, 4, 200, 1, 3, 2];
  const numSet = new Set(nums);

  console.log(
    "\nNumbers in set:",
    Array.from(numSet).sort((a, b) => a - b)
  );
  console.log("Possible sequences:");
  console.log("- Starting from 1: 1, 2, 3, 4 (length 4) ✓");
  console.log("- Starting from 100: 100 (length 1)");
  console.log("- Starting from 200: 200 (length 1)");

  console.log("\nAlgorithm process:");
  let maxLength = 0;

  for (const num of numSet) {
    console.log(`\nChecking ${num}:`);

    if (!numSet.has(num - 1)) {
      console.log(`  ${num} is start of sequence (${num - 1} not present)`);
      let currentNum = num;
      let currentLength = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
        console.log(`    Found ${currentNum}, length now ${currentLength}`);
      }

      console.log(`  Sequence from ${num}: length ${currentLength}`);
      maxLength = Math.max(maxLength, currentLength);
    } else {
      console.log(`  ${num} is not start (${num - 1} exists), skip`);
    }
  }

  console.log(`\nLongest consecutive sequence: ${maxLength}`);
}

// Algorithm explanation
function explainAlgorithm() {
  console.log("\n--- Algorithm Explanation ---");
  console.log("Key insight: Only count sequences from their starting number");
  console.log("");
  console.log("Why this works:");
  console.log("1. Put all numbers in a hash set for O(1) lookup");
  console.log("2. For each number, check if it's the start of a sequence");
  console.log("3. A number is the start if (number - 1) is not in the set");
  console.log("4. From each start, count consecutive numbers forward");
  console.log("5. Track the maximum length found");
  console.log("");
  console.log("Time complexity: O(n)");
  console.log("- Each number is visited at most twice");
  console.log("- Once when checking if it's a start");
  console.log("- Once when extending a sequence");
  console.log("");
  console.log("Space complexity: O(n) for the hash set");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Hash Set for Sequence Detection ---");
  console.log("When to use:");
  console.log("- Finding consecutive/adjacent elements");
  console.log("- Need O(1) lookup for existence check");
  console.log("- Order doesn't matter in input");
  console.log("");
  console.log("Core technique:");
  console.log("- Use hash set for fast membership testing");
  console.log("- Identify sequence boundaries efficiently");
  console.log("- Avoid redundant work by smart starting points");
  console.log("");
  console.log("Similar problems:");
  console.log("- Longest consecutive subsequence in binary tree");
  console.log("- Number of islands (2D consecutive)");
  console.log("- Consecutive characters in string");
}

// Edge cases explanation
function explainEdgeCases() {
  console.log("\n--- Edge Cases ---");

  console.log("1. Empty array: []");
  console.log("   - Return 0 (no elements)");

  console.log("\n2. Single element: [5]");
  console.log("   - Return 1 (sequence of length 1)");

  console.log("\n3. Duplicates: [1, 2, 2, 3]");
  console.log("   - Hash set handles duplicates automatically");
  console.log("   - Sequence: 1, 2, 3 (length 3)");

  console.log("\n4. Negative numbers: [-2, -1, 0, 1]");
  console.log("   - Algorithm works with any integers");
  console.log("   - Sequence: -2, -1, 0, 1 (length 4)");

  console.log("\n5. Large gaps: [1, 1000000]");
  console.log("   - Two sequences of length 1 each");
  console.log("   - Return 1");

  console.log("\n6. All same numbers: [5, 5, 5, 5]");
  console.log("   - Single sequence of length 1");
  console.log("   - Return 1");
}

// Alternative approaches comparison
function compareApproaches() {
  console.log("\n--- Approach Comparison ---");

  console.log("1. Hash Set (Optimal):");
  console.log("   - Time: O(n), Space: O(n)");
  console.log("   - Best overall performance");
  console.log("   - Meets problem requirements");

  console.log("\n2. Sorting:");
  console.log("   - Time: O(n log n), Space: O(1)");
  console.log("   - Doesn't meet O(n) requirement");
  console.log("   - But uses constant extra space");

  console.log("\n3. Memoization:");
  console.log("   - Time: O(n), Space: O(n)");
  console.log("   - Same complexity but more overhead");
  console.log("   - Good for understanding recursion");

  console.log("\n4. Union Find:");
  console.log("   - Time: O(n α(n)), Space: O(n)");
  console.log("   - Advanced technique, slight overhead");
  console.log("   - Useful for related problems");

  console.log("\n5. Brute Force:");
  console.log("   - Time: O(n³), Space: O(1)");
  console.log("   - Too slow for large inputs");
  console.log("   - Good for understanding problem");
}

// Real-world applications
function explainApplications() {
  console.log("\n--- Real-world Applications ---");
  console.log("1. Database optimization:");
  console.log("   - Find gaps in sequential IDs");
  console.log("   - Optimize range queries");

  console.log("\n2. Network analysis:");
  console.log("   - Find consecutive IP addresses");
  console.log("   - Identify network segments");

  console.log("\n3. Genomics:");
  console.log("   - Find consecutive gene sequences");
  console.log("   - Identify continuous DNA regions");

  console.log("\n4. Time series analysis:");
  console.log("   - Find continuous time periods");
  console.log("   - Detect data gaps");

  console.log("\n5. Game development:");
  console.log("   - Achievement chains");
  console.log("   - Level progression systems");
}

// Run tests
if (require.main === module) {
  testLongestConsecutive();
  performanceTest();
  visualDemo();
  explainAlgorithm();
  explainPattern();
  explainEdgeCases();
  compareApproaches();
  explainApplications();
}

module.exports = {
  longestConsecutive,
  longestConsecutiveSorting,
  longestConsecutiveMemo,
  longestConsecutiveUnionFind,
  longestConsecutiveBruteForce
};
