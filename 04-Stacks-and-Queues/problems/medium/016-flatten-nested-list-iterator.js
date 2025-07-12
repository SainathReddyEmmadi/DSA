/**
 * 341. Flatten Nested List Iterator
 * https://leetcode.com/problems/flatten-nested-list-iterator/
 *
 * Difficulty: Medium
 * Topics: Stack, Tree, Depth-First Search, Design, Queue, Iterator
 *
 * You are given a nested list of integers nestedList. Each element is either an integer
 * or a list whose elements may also be integers or other lists. Implement an iterator
 * to flatten it.
 *
 * Example:
 * Input: nestedList = [[1,1],2,[1,1]]
 * Output: [1,1,2,1,1]
 * Explanation: By calling next repeatedly until hasNext returns false,
 * the order of elements returned by next should be: [1,1,2,1,1].
 */

// Mock NestedInteger interface for testing
class NestedInteger {
  constructor(value) {
    if (Array.isArray(value)) {
      this.list = value.map((v) => new NestedInteger(v));
      this.value = null;
    } else {
      this.value = value;
      this.list = null;
    }
  }

  isInteger() {
    return this.value !== null;
  }

  getInteger() {
    return this.value;
  }

  getList() {
    return this.list || [];
  }
}

/**
 * APPROACH 1: Stack-based Iterator (Lazy Evaluation)
 *
 * Use stack to store NestedInteger objects.
 * Process elements only when needed (lazy evaluation).
 *
 * Time: O(1) amortized for next() and hasNext()
 * Space: O(depth) where depth is max nesting level
 */
class NestedIterator {
  constructor(nestedList) {
    this.stack = [];
    // Add all elements to stack in reverse order
    for (let i = nestedList.length - 1; i >= 0; i--) {
      this.stack.push(nestedList[i]);
    }
  }

  hasNext() {
    // Flatten nested lists until we find an integer or stack is empty
    while (this.stack.length > 0) {
      const top = this.stack[this.stack.length - 1];

      if (top.isInteger()) {
        return true;
      }

      // Pop the list and add its elements to stack
      this.stack.pop();
      const list = top.getList();
      for (let i = list.length - 1; i >= 0; i--) {
        this.stack.push(list[i]);
      }
    }

    return false;
  }

  next() {
    if (this.hasNext()) {
      return this.stack.pop().getInteger();
    }
    return null;
  }
}

/**
 * APPROACH 2: Precompute All Values (Eager Evaluation)
 *
 * Flatten entire structure during initialization.
 * Store all integers in array and use index to track position.
 *
 * Time: O(n) for initialization, O(1) for next() and hasNext()
 * Space: O(n) where n is total number of integers
 */
class NestedIteratorPrecompute {
  constructor(nestedList) {
    this.values = [];
    this.index = 0;
    this.flatten(nestedList);
  }

  flatten(nestedList) {
    for (const nested of nestedList) {
      if (nested.isInteger()) {
        this.values.push(nested.getInteger());
      } else {
        this.flatten(nested.getList());
      }
    }
  }

  hasNext() {
    return this.index < this.values.length;
  }

  next() {
    if (this.hasNext()) {
      return this.values[this.index++];
    }
    return null;
  }
}

/**
 * APPROACH 3: Queue-based Iterator
 *
 * Use queue to process elements level by level.
 * Similar to BFS traversal.
 *
 * Time: O(1) amortized
 * Space: O(width) where width is max elements at any level
 */
class NestedIteratorQueue {
  constructor(nestedList) {
    this.queue = [...nestedList];
  }

  hasNext() {
    while (this.queue.length > 0) {
      const front = this.queue[0];

      if (front.isInteger()) {
        return true;
      }

      // Remove the list and add its elements to front of queue
      this.queue.shift();
      const list = front.getList();
      this.queue.unshift(...list);
    }

    return false;
  }

  next() {
    if (this.hasNext()) {
      return this.queue.shift().getInteger();
    }
    return null;
  }
}

/**
 * APPROACH 4: Recursive Generator (ES6)
 *
 * Use JavaScript generator function for elegant recursion.
 *
 * Time: O(1) amortized
 * Space: O(depth) for call stack
 */
class NestedIteratorGenerator {
  constructor(nestedList) {
    this.generator = this.flatten(nestedList);
    this.nextValue = this.generator.next();
  }

  *flatten(nestedList) {
    for (const nested of nestedList) {
      if (nested.isInteger()) {
        yield nested.getInteger();
      } else {
        yield* this.flatten(nested.getList());
      }
    }
  }

  hasNext() {
    return !this.nextValue.done;
  }

  next() {
    if (this.hasNext()) {
      const value = this.nextValue.value;
      this.nextValue = this.generator.next();
      return value;
    }
    return null;
  }
}

// Test cases
function testNestedIterator() {
  console.log("=== Testing Nested List Iterator ===");

  const testCases = [
    {
      input: [[1, 1], 2, [1, 1]],
      expected: [1, 1, 2, 1, 1],
      description: "Mixed nested lists and integers"
    },
    {
      input: [1, [4, [6]]],
      expected: [1, 4, 6],
      description: "Deeply nested structure"
    },
    {
      input: [],
      expected: [],
      description: "Empty list"
    },
    {
      input: [[], [1, 2], [], [3], []],
      expected: [1, 2, 3],
      description: "Lists with empty sublists"
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3, 4, 5],
      description: "Flat list of integers"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: ${JSON.stringify(test.input)}`);

    // Convert input to NestedInteger objects
    const nestedList = test.input.map((item) => new NestedInteger(item));

    // Test all approaches
    const approaches = [
      { name: "Stack", Iterator: NestedIterator },
      { name: "Precompute", Iterator: NestedIteratorPrecompute },
      { name: "Queue", Iterator: NestedIteratorQueue },
      { name: "Generator", Iterator: NestedIteratorGenerator }
    ];

    approaches.forEach(({ name, Iterator }) => {
      const iterator = new Iterator(
        nestedList.map(
          (item) => new NestedInteger(test.input[nestedList.indexOf(item)])
        )
      );
      const result = [];

      while (iterator.hasNext()) {
        result.push(iterator.next());
      }

      console.log(`${name}: [${result.join(", ")}]`);

      const pass = JSON.stringify(result) === JSON.stringify(test.expected);
      if (!pass) {
        console.log(`  Expected: [${test.expected.join(", ")}]`);
      }
    });

    console.log(`Expected: [${test.expected.join(", ")}]`);
  });
}

// Uncomment to run tests
// testNestedIterator();

/**
 * KEY INSIGHTS:
 *
 * 1. Iterator Design Pattern:
 *    - Provide sequential access to elements without exposing structure
 *    - Support hasNext() and next() operations
 *    - Handle nested structures gracefully
 *
 * 2. Stack vs Queue Approach:
 *    - Stack: DFS-like traversal, processes deepest elements first
 *    - Queue: BFS-like traversal, processes elements level by level
 *    - Both achieve same final order for this problem
 *
 * 3. Lazy vs Eager Evaluation:
 *    - Lazy: Process only when needed, memory efficient for large structures
 *    - Eager: Precompute all values, faster subsequent access
 *    - Choose based on usage pattern
 *
 * 4. Generator Benefits:
 *    - Clean recursive code
 *    - Automatic state management
 *    - Memory efficient (yields values on demand)
 *
 * 5. Edge Cases:
 *    - Empty nested lists
 *    - Deeply nested structures
 *    - Mixed integer and list elements
 *    - All integers (flat structure)
 *
 * 6. Related Problems:
 *    - Flatten 2D Vector (251)
 *    - Zigzag Iterator (281)
 *    - Binary Tree Iterator (173)
 */

module.exports = {
  NestedIterator,
  NestedIteratorPrecompute,
  NestedIteratorQueue,
  NestedIteratorGenerator,
  NestedInteger
};
