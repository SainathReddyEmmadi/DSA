/**
 * 112. Path Sum
 * https://leetcode.com/problems/path-sum/
 *
 * Given the root of a binary tree and an integer targetSum, return true if the tree
 * has a root-to-leaf path such that adding up all the values along the path equals targetSum.
 * A leaf is a node with no children.
 *
 * Example:
 * Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
 * Output: true (path: 5->4->11->2)
 *
 * Patterns: DFS, Tree Path, Backtracking
 * Time: O(n), Space: O(h)
 */

const {
  TreeNode,
  createTreeFromArray,
  printTree
} = require("./001-maximum-depth.js");

// Approach 1: Recursive DFS (Most intuitive)
// Time: O(n), Space: O(h) where h is height of tree
function hasPathSum(root, targetSum) {
  // Base case: empty tree
  if (!root) {
    return false;
  }

  // Base case: leaf node
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }

  // Recursive case: check subtrees with reduced target
  const remainingSum = targetSum - root.val;
  return (
    hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum)
  );
}

// Approach 2: Iterative DFS using Stack
// Time: O(n), Space: O(h)
function hasPathSumIterative(root, targetSum) {
  if (!root) return false;

  const stack = [[root, targetSum]];

  while (stack.length > 0) {
    const [node, sum] = stack.pop();

    // Check if leaf node with target sum
    if (!node.left && !node.right && node.val === sum) {
      return true;
    }

    // Add children with updated sum
    if (node.left) {
      stack.push([node.left, sum - node.val]);
    }
    if (node.right) {
      stack.push([node.right, sum - node.val]);
    }
  }

  return false;
}

// Approach 3: BFS using Queue
// Time: O(n), Space: O(w) where w is maximum width
function hasPathSumBFS(root, targetSum) {
  if (!root) return false;

  const queue = [[root, targetSum]];

  while (queue.length > 0) {
    const [node, sum] = queue.shift();

    // Check if leaf node with target sum
    if (!node.left && !node.right && node.val === sum) {
      return true;
    }

    // Add children with updated sum
    if (node.left) {
      queue.push([node.left, sum - node.val]);
    }
    if (node.right) {
      queue.push([node.right, sum - node.val]);
    }
  }

  return false;
}

// Approach 4: Path tracking (for debugging/visualization)
// Time: O(n), Space: O(h)
function hasPathSumWithPath(root, targetSum) {
  const validPaths = [];

  function dfs(node, currentSum, path) {
    if (!node) return false;

    const newPath = [...path, node.val];
    const newSum = currentSum + node.val;

    // Check if leaf with target sum
    if (!node.left && !node.right) {
      if (newSum === targetSum) {
        validPaths.push(newPath);
        return true;
      }
      return false;
    }

    // Continue with children
    const leftResult = dfs(node.left, newSum, newPath);
    const rightResult = dfs(node.right, newSum, newPath);

    return leftResult || rightResult;
  }

  const result = dfs(root, 0, []);
  return { hasPath: result, paths: validPaths };
}

// Related Problem: Path Sum II - Return all root-to-leaf paths with target sum
function pathSum(root, targetSum) {
  const result = [];

  function dfs(node, currentSum, path) {
    if (!node) return;

    const newPath = [...path, node.val];
    const newSum = currentSum + node.val;

    // Check if leaf with target sum
    if (!node.left && !node.right && newSum === targetSum) {
      result.push(newPath);
      return;
    }

    // Continue with children
    dfs(node.left, newSum, newPath);
    dfs(node.right, newSum, newPath);
  }

  dfs(root, 0, []);
  return result;
}

// Related Problem: Path Sum III - Count paths with target sum (not necessarily root-to-leaf)
function pathSumIII(root, targetSum) {
  let count = 0;

  function dfs(node, currentSum) {
    if (!node) return;

    const newSum = currentSum + node.val;

    // Check if current path sum equals target
    if (newSum === targetSum) {
      count++;
    }

    // Continue with children
    dfs(node.left, newSum);
    dfs(node.right, newSum);
  }

  function traverse(node) {
    if (!node) return;

    // Start new path from current node
    dfs(node, 0);

    // Continue traversal
    traverse(node.left);
    traverse(node.right);
  }

  traverse(root);
  return count;
}

// Optimized Path Sum III using prefix sum
function pathSumIIIOptimized(root, targetSum) {
  const prefixSumCount = new Map();
  prefixSumCount.set(0, 1); // Base case: empty path

  function dfs(node, currentSum) {
    if (!node) return 0;

    currentSum += node.val;

    // Check if there's a prefix sum that makes current sum = target
    const complement = currentSum - targetSum;
    let count = prefixSumCount.get(complement) || 0;

    // Add current sum to map
    prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);

    // Recurse on children
    count += dfs(node.left, currentSum);
    count += dfs(node.right, currentSum);

    // Backtrack: remove current sum from map
    prefixSumCount.set(currentSum, prefixSumCount.get(currentSum) - 1);

    return count;
  }

  return dfs(root, 0);
}

// Helper function to find maximum path sum (any path)
function maxPathSum(root) {
  let maxSum = -Infinity;

  function maxGain(node) {
    if (!node) return 0;

    // Maximum gain from left and right subtrees
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);

    // Current path sum through this node
    const currentMax = node.val + leftGain + rightGain;

    // Update global maximum
    maxSum = Math.max(maxSum, currentMax);

    // Return maximum gain if we continue path through this node
    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}

// Test cases
function testPathSum() {
  console.log("Testing Path Sum:");

  const testCases = [
    {
      tree: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1],
      targetSum: 22,
      expected: true,
      description: "Standard example with valid path"
    },
    {
      tree: [1, 2, 3],
      targetSum: 5,
      expected: false,
      description: "No valid path"
    },
    {
      tree: [],
      targetSum: 0,
      expected: false,
      description: "Empty tree"
    },
    {
      tree: [1],
      targetSum: 1,
      expected: true,
      description: "Single node matching"
    },
    {
      tree: [1],
      targetSum: 2,
      expected: false,
      description: "Single node not matching"
    },
    {
      tree: [1, 2],
      targetSum: 1,
      expected: false,
      description: "Path to non-leaf"
    },
    {
      tree: [-3, 9, 20, null, null, 15, 7],
      targetSum: 12,
      expected: false,
      description: "Tree with negative values"
    },
    {
      tree: [1, -2, -3, 1, 3, -2, null, -1],
      targetSum: -1,
      expected: true,
      description: "Complex tree with negatives"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);

    const root = createTreeFromArray(test.tree);

    const result1 = hasPathSum(root, test.targetSum);
    const result2 = hasPathSumIterative(root, test.targetSum);
    const result3 = hasPathSumBFS(root, test.targetSum);
    const pathResult = hasPathSumWithPath(root, test.targetSum);

    const allMatch =
      result1 === result2 &&
      result2 === result3 &&
      result3 === pathResult.hasPath;
    const passed = result1 === test.expected;

    console.log(`Tree: [${test.tree}]`);
    console.log(`Target Sum: ${test.targetSum}`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Recursive: ${result1}`);
    console.log(`Iterative: ${result2}`);
    console.log(`BFS: ${result3}`);
    console.log(`With Path: ${pathResult.hasPath}`);
    if (pathResult.paths.length > 0) {
      console.log(
        `Valid paths: ${pathResult.paths
          .map((p) => `[${p.join("->")}]`)
          .join(", ")}`
      );
    }
    console.log(`All approaches match: ${allMatch ? "YES" : "NO"}`);
    console.log(`Result: ${passed ? "PASS" : "FAIL"}`);

    // Show tree structure for small trees
    if (test.tree.length > 0 && test.tree.length <= 8) {
      console.log("Tree structure:");
      printTree(root);
    }
  });
}

// Test related problems
function testRelatedProblems() {
  console.log("\n=== Testing Related Problems ===");

  const tree = createTreeFromArray([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);
  const targetSum = 8;

  console.log("Tree: [10,5,-3,3,2,null,11,3,-2,null,1]");
  console.log(`Target Sum: ${targetSum}`);

  // Path Sum I
  console.log(`\n1. Path Sum I (root-to-leaf): ${hasPathSum(tree, targetSum)}`);

  // Path Sum II
  const allPaths = pathSum(tree, targetSum);
  console.log(`2. Path Sum II (all root-to-leaf paths):`);
  allPaths.forEach((path, i) => {
    console.log(
      `   Path ${i + 1}: [${path.join("->")}] = ${path.reduce(
        (a, b) => a + b,
        0
      )}`
    );
  });

  // Path Sum III
  const pathCount = pathSumIII(tree, targetSum);
  const pathCountOptimized = pathSumIIIOptimized(tree, targetSum);
  console.log(`3. Path Sum III (any path): ${pathCount} paths`);
  console.log(`   Optimized version: ${pathCountOptimized} paths`);

  // Maximum Path Sum
  const maxSum = maxPathSum(tree);
  console.log(`4. Maximum Path Sum (any path): ${maxSum}`);
}

// Demonstrate edge cases and special scenarios
function demonstrateEdgeCases() {
  console.log("\n=== Edge Cases and Special Scenarios ===");

  // Edge case 1: All negative values
  console.log("1. Tree with all negative values:");
  const negativeTree = createTreeFromArray([-1, -2, -3]);
  console.log(`   Has path sum -6: ${hasPathSum(negativeTree, -6)}`);
  console.log(`   Has path sum -3: ${hasPathSum(negativeTree, -3)}`);

  // Edge case 2: Zero values
  console.log("\n2. Tree with zero values:");
  const zeroTree = createTreeFromArray([0, 1, 0, 1, 0, 0, 1]);
  console.log(`   Has path sum 1: ${hasPathSum(zeroTree, 1)}`);
  console.log(`   Has path sum 0: ${hasPathSum(zeroTree, 0)}`);

  // Edge case 3: Large target sum
  console.log("\n3. Large target sum:");
  const smallTree = createTreeFromArray([1, 2, 3]);
  console.log(`   Has path sum 1000: ${hasPathSum(smallTree, 1000)}`);

  // Edge case 4: Single path tree
  console.log("\n4. Single path tree:");
  const singlePath = createTreeFromArray([1, 2, null, 3, null, 4]);
  console.log(`   Tree: [1,2,null,3,null,4]`);
  console.log(`   Has path sum 10: ${hasPathSum(singlePath, 10)}`);
  console.log(`   All paths with sum 10:`, pathSum(singlePath, 10));
}

// Performance comparison
function performanceComparison() {
  console.log("\n=== Performance Comparison ===");

  // Create larger tree for performance testing
  function createLargeTree(depth) {
    if (depth === 0) return null;
    const node = new TreeNode(Math.floor(Math.random() * 10));
    node.left = createLargeTree(depth - 1);
    node.right = createLargeTree(depth - 1);
    return node;
  }

  const largeTree = createLargeTree(12);
  const targetSum = 50;

  console.log("Testing with large tree (depth 12):");

  console.time("Recursive approach");
  hasPathSum(largeTree, targetSum);
  console.timeEnd("Recursive approach");

  console.time("Iterative approach");
  hasPathSumIterative(largeTree, targetSum);
  console.timeEnd("Iterative approach");

  console.time("BFS approach");
  hasPathSumBFS(largeTree, targetSum);
  console.timeEnd("BFS approach");

  console.log(
    "\nNote: Times may vary based on system performance and tree structure"
  );
}

// Complexity Analysis
console.log(`
Complexity Analysis:
1. Recursive Approach:
   - Time: O(n) - visit each node at most once
   - Space: O(h) - recursion call stack (h = height)
   - Best for: Clean, readable code

2. Iterative DFS:
   - Time: O(n) - visit each node at most once
   - Space: O(h) - explicit stack storage
   - Best for: Avoiding recursion stack overflow

3. BFS Approach:
   - Time: O(n) - visit each node at most once
   - Space: O(w) - queue size = maximum width of tree
   - Best for: Level-by-level processing needs

4. Path Sum II (all paths):
   - Time: O(n * h) - for each leaf, copy path of length h
   - Space: O(n * h) - store all paths

5. Path Sum III (optimized):
   - Time: O(n) - single traversal with prefix sum map
   - Space: O(n) - prefix sum map and recursion stack

Key Insights:
- Path sum problems use DFS naturally
- Subtract current node value and check children
- Leaf nodes are the only valid endpoints
- Early termination when target is found
- Backtracking is useful for path collection
- Prefix sum technique optimizes multiple path problems
`);

// Run all tests and demonstrations
testPathSum();
testRelatedProblems();
demonstrateEdgeCases();
performanceComparison();

module.exports = {
  hasPathSum,
  hasPathSumIterative,
  hasPathSumBFS,
  hasPathSumWithPath,
  pathSum,
  pathSumIII,
  pathSumIIIOptimized,
  maxPathSum
};
