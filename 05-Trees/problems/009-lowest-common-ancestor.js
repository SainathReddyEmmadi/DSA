/**
 * LeetCode 236: Lowest Common Ancestor of a Binary Tree
 * Difficulty: Medium
 *
 * Problem:
 * Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
 *
 * According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined
 * between two nodes p and q as the lowest node in T that has both p and q as descendants
 * (where we allow a node to be a descendant of itself)."
 *
 * Example 1:
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * Output: 3
 * Explanation: The LCA of nodes 5 and 1 is 3.
 *
 * Example 2:
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * Output: 5
 * Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.
 */

// TreeNode definition
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Approach 1: Recursive DFS
 * Time: O(n), Space: O(h) where h is height
 *
 * Strategy:
 * - If current node is null, return null
 * - If current node is p or q, return current node
 * - Recursively search in left and right subtrees
 * - If both subtrees return non-null, current node is LCA
 * - Otherwise, return the non-null result
 */
function lowestCommonAncestor1(root, p, q) {
  // Base case
  if (!root || root === p || root === q) {
    return root;
  }

  // Search in left and right subtrees
  const left = lowestCommonAncestor1(root.left, p, q);
  const right = lowestCommonAncestor1(root.right, p, q);

  // If both left and right are non-null, current node is LCA
  if (left && right) {
    return root;
  }

  // Return non-null result (either left or right)
  return left || right;
}

/**
 * Approach 2: Parent Pointers
 * Time: O(n), Space: O(n)
 *
 * Strategy:
 * - First pass: build parent pointers for all nodes
 * - Second pass: find path from p to root
 * - Third pass: traverse from q to root and find first common ancestor
 */
function lowestCommonAncestor2(root, p, q) {
  const parentMap = new Map();

  // Build parent pointers
  function buildParentMap(node, parent = null) {
    if (!node) return;

    parentMap.set(node, parent);
    buildParentMap(node.left, node);
    buildParentMap(node.right, node);
  }

  buildParentMap(root);

  // Get all ancestors of p
  const ancestors = new Set();
  let current = p;
  while (current) {
    ancestors.add(current);
    current = parentMap.get(current);
  }

  // Find first common ancestor starting from q
  current = q;
  while (current) {
    if (ancestors.has(current)) {
      return current;
    }
    current = parentMap.get(current);
  }

  return null;
}

/**
 * Approach 3: Iterative with Stack
 * Time: O(n), Space: O(n)
 *
 * Strategy:
 * - Use iterative DFS to find paths to both nodes
 * - Compare paths to find the last common node
 */
function lowestCommonAncestor3(root, p, q) {
  function findPath(target) {
    const stack = [{ node: root, path: [root] }];

    while (stack.length > 0) {
      const { node, path } = stack.pop();

      if (node === target) {
        return path;
      }

      if (node.right) {
        stack.push({ node: node.right, path: [...path, node.right] });
      }

      if (node.left) {
        stack.push({ node: node.left, path: [...path, node.left] });
      }
    }

    return [];
  }

  const pathToP = findPath(p);
  const pathToQ = findPath(q);

  let lca = null;
  const minLength = Math.min(pathToP.length, pathToQ.length);

  for (let i = 0; i < minLength; i++) {
    if (pathToP[i] === pathToQ[i]) {
      lca = pathToP[i];
    } else {
      break;
    }
  }

  return lca;
}

/**
 * Approach 4: One Pass with Early Return
 * Time: O(n), Space: O(h)
 *
 * Strategy:
 * - Similar to approach 1 but with more explicit handling
 * - Use boolean flags to track if we found both nodes
 */
function lowestCommonAncestor4(root, p, q) {
  let result = null;

  function dfs(node) {
    if (!node) return false;

    // Check if current node is one of the targets
    const current = node === p || node === q ? 1 : 0;

    // Check left and right subtrees
    const left = dfs(node.left) ? 1 : 0;
    const right = dfs(node.right) ? 1 : 0;

    // If we found both nodes in different subtrees or current node is one target
    // and we found the other in a subtree
    if (current + left + right >= 2) {
      result = node;
    }

    // Return true if we found at least one target
    return current + left + right > 0;
  }

  dfs(root);
  return result;
}

// Helper function to create tree from array
function createTree(arr) {
  if (!arr || arr.length === 0) return null;

  const nodes = arr.map((val) => (val !== null ? new TreeNode(val) : null));
  const root = nodes[0];

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i]) {
      const leftIndex = 2 * i + 1;
      const rightIndex = 2 * i + 2;

      if (leftIndex < nodes.length) {
        nodes[i].left = nodes[leftIndex];
      }
      if (rightIndex < nodes.length) {
        nodes[i].right = nodes[rightIndex];
      }
    }
  }

  return root;
}

// Helper function to find node by value
function findNode(root, val) {
  if (!root) return null;
  if (root.val === val) return root;

  const left = findNode(root.left, val);
  if (left) return left;

  return findNode(root.right, val);
}

// Helper function to get path to node
function getPathToNode(root, target) {
  function findPath(node, path) {
    if (!node) return false;

    path.push(node.val);

    if (node === target) return true;

    if (findPath(node.left, path) || findPath(node.right, path)) {
      return true;
    }

    path.pop();
    return false;
  }

  const path = [];
  findPath(root, path);
  return path;
}

// Test cases
function runTests() {
  console.log("Testing Lowest Common Ancestor...\n");

  const testCases = [
    {
      name: "Example 1 - LCA in different subtrees",
      tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4],
      p: 5,
      q: 1,
      expected: 3
    },
    {
      name: "Example 2 - One node is ancestor of other",
      tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4],
      p: 5,
      q: 4,
      expected: 5
    },
    {
      name: "Simple tree - root is LCA",
      tree: [1, 2, 3],
      p: 2,
      q: 3,
      expected: 1
    },
    {
      name: "Both nodes are the same",
      tree: [1, 2, 3],
      p: 2,
      q: 2,
      expected: 2
    },
    {
      name: "Left subtree LCA",
      tree: [1, 2, 3, 4, 5],
      p: 4,
      q: 5,
      expected: 2
    },
    {
      name: "Two node tree",
      tree: [1, 2],
      p: 1,
      q: 2,
      expected: 1
    }
  ];

  const approaches = [
    { name: "Recursive DFS", func: lowestCommonAncestor1 },
    { name: "Parent Pointers", func: lowestCommonAncestor2 },
    { name: "Iterative Paths", func: lowestCommonAncestor3 },
    { name: "One Pass Early Return", func: lowestCommonAncestor4 }
  ];

  testCases.forEach(({ name, tree, p, q, expected }) => {
    console.log(`Test: ${name}`);
    console.log(`Tree: [${tree.join(", ")}]`);
    console.log(`p: ${p}, q: ${q}`);
    console.log(`Expected: ${expected}`);

    const root = createTree(tree);
    const pNode = findNode(root, p);
    const qNode = findNode(root, q);

    if (!pNode || !qNode) {
      console.log("❌ Could not find p or q nodes in tree");
      console.log();
      return;
    }

    // Show paths for context
    const pathToP = getPathToNode(root, pNode);
    const pathToQ = getPathToNode(root, qNode);
    console.log(`Path to ${p}: [${pathToP.join(" -> ")}]`);
    console.log(`Path to ${q}: [${pathToQ.join(" -> ")}]`);

    approaches.forEach(({ name: approachName, func }) => {
      try {
        const result = func(root, pNode, qNode);
        const resultVal = result ? result.val : null;
        const status = resultVal === expected ? "✅" : "❌";
        console.log(`${status} ${approachName}: ${resultVal}`);
      } catch (error) {
        console.log(`❌ ${approachName}: Error - ${error.message}`);
      }
    });

    console.log();
  });
}

// Performance comparison
function performanceTest() {
  console.log("Performance Comparison:");
  console.log("Creating test trees for performance testing...\n");

  function createLargeTree(depth) {
    function buildTree(val, currentDepth) {
      if (currentDepth > depth) return null;

      const node = new TreeNode(val);
      node.left = buildTree(val * 2, currentDepth + 1);
      node.right = buildTree(val * 2 + 1, currentDepth + 1);
      return node;
    }

    return buildTree(1, 1);
  }

  const depths = [10, 12, 14];
  const approaches = [
    { name: "Recursive DFS", func: lowestCommonAncestor1 },
    { name: "Parent Pointers", func: lowestCommonAncestor2 },
    { name: "Iterative Paths", func: lowestCommonAncestor3 },
    { name: "One Pass Early Return", func: lowestCommonAncestor4 }
  ];

  depths.forEach((depth) => {
    const nodeCount = Math.pow(2, depth) - 1;
    console.log(`Testing with depth ${depth} (~${nodeCount} nodes):`);

    const tree = createLargeTree(depth);
    const p = findNode(tree, 8); // Left subtree
    const q = findNode(tree, 12); // Right subtree

    if (!p || !q) {
      console.log("Could not find test nodes");
      return;
    }

    approaches.forEach(({ name, func }) => {
      const iterations = 100;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        func(tree, p, q);
      }

      const end = performance.now();
      const avgTime = (end - start) / iterations;
      console.log(`${name}: ${avgTime.toFixed(3)}ms avg`);
    });
    console.log();
  });
}

// Export functions
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    TreeNode,
    lowestCommonAncestor1,
    lowestCommonAncestor2,
    lowestCommonAncestor3,
    lowestCommonAncestor4,
    createTree,
    findNode,
    getPathToNode,
    runTests,
    performanceTest
  };
}

// Run tests if called directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
}
