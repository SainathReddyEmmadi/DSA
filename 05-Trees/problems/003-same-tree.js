/**
 * 100. Same Tree
 * https://leetcode.com/problems/same-tree/
 *
 * Given the roots of two binary trees p and q, write a function to check if they are the same or not.
 * Two binary trees are considered the same if they are structurally identical,
 * and the nodes have the same value.
 *
 * Example:
 * Input: p = [1,2,3], q = [1,2,3]
 * Output: true
 *
 * Patterns: DFS, Tree Comparison, Recursion
 * Time: O(min(m,n)), Space: O(min(m,n))
 */

const {
  TreeNode,
  createTreeFromArray,
  printTree
} = require("./001-maximum-depth.js");

// Approach 1: Recursive DFS (Most intuitive)
// Time: O(min(m,n)), Space: O(min(m,n)) where m,n are sizes of trees
function isSameTree(p, q) {
  // Base case: both are null
  if (!p && !q) {
    return true;
  }

  // Base case: one is null, other is not
  if (!p || !q) {
    return false;
  }

  // Base case: values don't match
  if (p.val !== q.val) {
    return false;
  }

  // Recursive case: check both subtrees
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// Approach 2: Recursive DFS (One-liner)
// Time: O(min(m,n)), Space: O(min(m,n))
function isSameTreeOneLiner(p, q) {
  return (
    (!p && !q) ||
    (p &&
      q &&
      p.val === q.val &&
      isSameTreeOneLiner(p.left, q.left) &&
      isSameTreeOneLiner(p.right, q.right))
  );
}

// Approach 3: Iterative DFS using Stack
// Time: O(min(m,n)), Space: O(min(m,n))
function isSameTreeIterative(p, q) {
  const stack = [[p, q]];

  while (stack.length > 0) {
    const [node1, node2] = stack.pop();

    // Both null - continue
    if (!node1 && !node2) {
      continue;
    }

    // One null, other not - not same
    if (!node1 || !node2) {
      return false;
    }

    // Values don't match - not same
    if (node1.val !== node2.val) {
      return false;
    }

    // Add children to stack for comparison
    stack.push([node1.left, node2.left]);
    stack.push([node1.right, node2.right]);
  }

  return true;
}

// Approach 4: BFS using Queue
// Time: O(min(m,n)), Space: O(min(m,n))
function isSameTreeBFS(p, q) {
  const queue = [[p, q]];

  while (queue.length > 0) {
    const [node1, node2] = queue.shift();

    // Both null - continue
    if (!node1 && !node2) {
      continue;
    }

    // One null, other not - not same
    if (!node1 || !node2) {
      return false;
    }

    // Values don't match - not same
    if (node1.val !== node2.val) {
      return false;
    }

    // Add children to queue for comparison
    queue.push([node1.left, node2.left]);
    queue.push([node1.right, node2.right]);
  }

  return true;
}

// Approach 5: Serialize and Compare
// Time: O(m+n), Space: O(m+n)
function isSameTreeSerialization(p, q) {
  function serialize(node) {
    if (!node) return "null";
    return node.val + "," + serialize(node.left) + "," + serialize(node.right);
  }

  return serialize(p) === serialize(q);
}

// Approach 6: Preorder Traversal Comparison
// Time: O(m+n), Space: O(m+n)
function isSameTreePreorder(p, q) {
  function preorder(node, result) {
    if (!node) {
      result.push(null);
      return;
    }
    result.push(node.val);
    preorder(node.left, result);
    preorder(node.right, result);
  }

  const preorderP = [];
  const preorderQ = [];

  preorder(p, preorderP);
  preorder(q, preorderQ);

  return JSON.stringify(preorderP) === JSON.stringify(preorderQ);
}

// Helper function to create trees with different structures but same values
function createTestTrees() {
  return {
    same1: createTreeFromArray([1, 2, 3]),
    same2: createTreeFromArray([1, 2, 3]),
    different1: createTreeFromArray([1, 2]),
    different2: createTreeFromArray([1, null, 2]),
    empty1: createTreeFromArray([]),
    empty2: createTreeFromArray([]),
    single1: createTreeFromArray([1]),
    single2: createTreeFromArray([1]),
    singleDiff1: createTreeFromArray([1]),
    singleDiff2: createTreeFromArray([2])
  };
}

// Test cases
function testIsSameTree() {
  console.log("Testing Same Tree:");

  const testCases = [
    {
      p: [1, 2, 3],
      q: [1, 2, 3],
      expected: true,
      description: "Identical trees"
    },
    {
      p: [1, 2],
      q: [1, null, 2],
      expected: false,
      description: "Different structure"
    },
    {
      p: [1, 2, 1],
      q: [1, 1, 2],
      expected: false,
      description: "Different values"
    },
    {
      p: [],
      q: [],
      expected: true,
      description: "Both empty"
    },
    {
      p: [1],
      q: [1],
      expected: true,
      description: "Both single node"
    },
    {
      p: [1],
      q: [],
      expected: false,
      description: "One empty, one not"
    },
    {
      p: [1, 2, 3, 4, 5],
      q: [1, 2, 3, 4, 5],
      expected: true,
      description: "Larger identical trees"
    },
    {
      p: [1, 2, 3, 4, 5],
      q: [1, 2, 3, 4, 6],
      expected: false,
      description: "Larger trees with one difference"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);

    const treeP = createTreeFromArray(test.p);
    const treeQ = createTreeFromArray(test.q);

    const result1 = isSameTree(treeP, treeQ);
    const result2 = isSameTreeOneLiner(treeP, treeQ);
    const result3 = isSameTreeIterative(treeP, treeQ);
    const result4 = isSameTreeBFS(treeP, treeQ);
    const result5 = isSameTreeSerialization(treeP, treeQ);
    const result6 = isSameTreePreorder(treeP, treeQ);

    const allMatch =
      result1 === result2 &&
      result2 === result3 &&
      result3 === result4 &&
      result4 === result5 &&
      result5 === result6;

    const passed = result1 === test.expected;

    console.log(`Tree P: [${test.p}]`);
    console.log(`Tree Q: [${test.q}]`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Recursive: ${result1}`);
    console.log(`One-liner: ${result2}`);
    console.log(`Iterative: ${result3}`);
    console.log(`BFS: ${result4}`);
    console.log(`Serialization: ${result5}`);
    console.log(`Preorder: ${result6}`);
    console.log(`All approaches match: ${allMatch ? "YES" : "NO"}`);
    console.log(`Result: ${passed ? "PASS" : "FAIL"}`);

    // Show tree structures for small trees
    if (test.p.length > 0 && test.p.length <= 5) {
      console.log("Tree P:");
      printTree(treeP);
      console.log("Tree Q:");
      printTree(treeQ);
    }
  });
}

// Advanced variations and related problems
function demonstrateVariations() {
  console.log("\n=== Variations and Related Problems ===");

  // 1. Check if trees are structurally identical (ignore values)
  function isSameStructure(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return isSameStructure(p.left, q.left) && isSameStructure(p.right, q.right);
  }

  const struct1 = createTreeFromArray([1, 2, 3]);
  const struct2 = createTreeFromArray([4, 5, 6]);
  console.log(
    `Trees [1,2,3] and [4,5,6] have same structure: ${isSameStructure(
      struct1,
      struct2
    )}`
  );

  // 2. Check if one tree is subtree of another
  function isSubtree(root, subRoot) {
    if (!subRoot) return true;
    if (!root) return false;

    return (
      isSameTree(root, subRoot) ||
      isSubtree(root.left, subRoot) ||
      isSubtree(root.right, subRoot)
    );
  }

  const mainTree = createTreeFromArray([3, 4, 5, 1, 2]);
  const subTree = createTreeFromArray([4, 1, 2]);
  console.log(
    `Tree [4,1,2] is subtree of [3,4,5,1,2]: ${isSubtree(mainTree, subTree)}`
  );

  // 3. Find all nodes with same value in two trees
  function findCommonValues(p, q) {
    const valuesP = new Set();
    const valuesQ = new Set();

    function collectValues(node, set) {
      if (!node) return;
      set.add(node.val);
      collectValues(node.left, set);
      collectValues(node.right, set);
    }

    collectValues(p, valuesP);
    collectValues(q, valuesQ);

    return [...valuesP].filter((val) => valuesQ.has(val));
  }

  const tree1 = createTreeFromArray([1, 2, 3, 4]);
  const tree2 = createTreeFromArray([2, 1, 5, 4]);
  const common = findCommonValues(tree1, tree2);
  console.log(`Common values between [1,2,3,4] and [2,1,5,4]: [${common}]`);

  // 4. Check if trees are mirror images
  function isMirror(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;

    return (
      p.val === q.val && isMirror(p.left, q.right) && isMirror(p.right, q.left)
    );
  }

  const mirror1 = createTreeFromArray([1, 2, 3]);
  const mirror2 = createTreeFromArray([1, 3, 2]);
  console.log(
    `Trees [1,2,3] and [1,3,2] are mirrors: ${isMirror(mirror1, mirror2)}`
  );
}

// Performance comparison
function performanceComparison() {
  console.log("\n=== Performance Comparison ===");

  // Create larger trees for performance testing
  function createLargeTree(size) {
    const arr = Array.from({ length: size }, (_, i) => i + 1);
    return createTreeFromArray(arr);
  }

  const tree1 = createLargeTree(1000);
  const tree2 = createLargeTree(1000);

  console.time("Recursive approach");
  isSameTree(tree1, tree2);
  console.timeEnd("Recursive approach");

  console.time("Iterative approach");
  isSameTreeIterative(tree1, tree2);
  console.timeEnd("Iterative approach");

  console.time("Serialization approach");
  isSameTreeSerialization(tree1, tree2);
  console.timeEnd("Serialization approach");

  console.log("\nNote: Times may vary based on system performance");
}

// Edge cases demonstration
function demonstrateEdgeCases() {
  console.log("\n=== Edge Cases ===");

  // Edge case 1: Trees with negative values
  const negTree1 = createTreeFromArray([-1, -2, -3]);
  const negTree2 = createTreeFromArray([-1, -2, -3]);
  console.log(
    `Trees with negative values same: ${isSameTree(negTree1, negTree2)}`
  );

  // Edge case 2: Trees with zero values
  const zeroTree1 = createTreeFromArray([0, 0, 0]);
  const zeroTree2 = createTreeFromArray([0, 0, 0]);
  console.log(
    `Trees with zero values same: ${isSameTree(zeroTree1, zeroTree2)}`
  );

  // Edge case 3: Very deep trees (potential stack overflow)
  function createDeepTree(depth) {
    if (depth === 0) return null;
    const node = new TreeNode(depth);
    node.left = createDeepTree(depth - 1);
    return node;
  }

  const deep1 = createDeepTree(10);
  const deep2 = createDeepTree(10);
  console.log(`Deep trees (depth 10) same: ${isSameTree(deep1, deep2)}`);

  // Edge case 4: Trees with duplicate values but different structure
  const dup1 = createTreeFromArray([1, 1, 1]);
  const dup2 = createTreeFromArray([1, null, 1, null, 1]);
  console.log(
    `Duplicate value trees with different structure same: ${isSameTree(
      dup1,
      dup2
    )}`
  );
}

// Complexity Analysis
console.log(`
Complexity Analysis:
1. Recursive Approach:
   - Time: O(min(m,n)) - stops at first difference or when smaller tree is exhausted
   - Space: O(min(m,n)) - recursion stack depth
   - Best for: Clean, readable code

2. Iterative DFS:
   - Time: O(min(m,n)) - same as recursive
   - Space: O(min(m,n)) - explicit stack
   - Best for: Avoiding recursion stack overflow

3. BFS Approach:
   - Time: O(min(m,n)) - same as others
   - Space: O(min(m,n)) - queue size
   - Best for: Level-by-level comparison needs

4. Serialization:
   - Time: O(m+n) - must traverse both trees completely
   - Space: O(m+n) - store both serializations
   - Best for: When trees need to be compared multiple times

5. Preorder Comparison:
   - Time: O(m+n) - traverse both trees completely
   - Space: O(m+n) - store both traversals
   - Best for: Educational purposes

Key Insights:
- Early termination is crucial for efficiency
- Recursive solution is most intuitive
- Structure and values must both match
- Null handling is critical for correctness
- Can stop as soon as difference is found
`);

// Run all tests and demonstrations
testIsSameTree();
demonstrateVariations();
demonstrateEdgeCases();
performanceComparison();

module.exports = {
  isSameTree,
  isSameTreeOneLiner,
  isSameTreeIterative,
  isSameTreeBFS,
  isSameTreeSerialization,
  isSameTreePreorder
};
