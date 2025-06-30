/**
 * LeetCode 543: Diameter of Binary Tree
 * Difficulty: Easy
 *
 * Problem:
 * Given the root of a binary tree, return the length of the diameter of the tree.
 *
 * The diameter of a binary tree is the length of the longest path between any two nodes
 * in a tree. This path may or may not pass through the root.
 *
 * The length of a path between two nodes is represented by the number of edges between them.
 *
 * Example 1:
 * Input: root = [1,2,3,4,5]
 * Output: 3
 * Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
 *
 * Example 2:
 * Input: root = [1,2]
 * Output: 1
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
 * Approach 1: DFS with Global Variable
 * Time: O(n), Space: O(h) where h is height
 *
 * Strategy:
 * - For each node, the diameter passing through it is left_height + right_height
 * - Use DFS to calculate height and update global diameter
 * - The height of a node is 1 + max(left_height, right_height)
 */
function diameterOfBinaryTree1(root) {
  let maxDiameter = 0;

  function getHeight(node) {
    if (!node) return 0;

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    // Diameter through current node
    const currentDiameter = leftHeight + rightHeight;
    maxDiameter = Math.max(maxDiameter, currentDiameter);

    // Return height of current node
    return 1 + Math.max(leftHeight, rightHeight);
  }

  getHeight(root);
  return maxDiameter;
}

/**
 * Approach 2: DFS Returning Both Height and Diameter
 * Time: O(n), Space: O(h)
 *
 * Strategy:
 * - Return both height and diameter from each recursive call
 * - Avoids global variable usage
 */
function diameterOfBinaryTree2(root) {
  function dfs(node) {
    if (!node) {
      return { height: 0, diameter: 0 };
    }

    const left = dfs(node.left);
    const right = dfs(node.right);

    const height = 1 + Math.max(left.height, right.height);
    const currentDiameter = left.height + right.height;
    const diameter = Math.max(currentDiameter, left.diameter, right.diameter);

    return { height, diameter };
  }

  return dfs(root).diameter;
}

/**
 * Approach 3: Iterative DFS with Stack
 * Time: O(n), Space: O(n)
 *
 * Strategy:
 * - Use stack to simulate DFS
 * - Calculate heights iteratively
 * - Track maximum diameter
 */
function diameterOfBinaryTree3(root) {
  if (!root) return 0;

  const heights = new Map();
  const stack = [];
  let maxDiameter = 0;

  // First pass: post-order traversal to calculate heights
  let current = root;
  let lastVisited = null;

  while (stack.length > 0 || current) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      const peekNode = stack[stack.length - 1];

      if (peekNode.right && lastVisited !== peekNode.right) {
        current = peekNode.right;
      } else {
        // Process current node
        const leftHeight = peekNode.left ? heights.get(peekNode.left) : 0;
        const rightHeight = peekNode.right ? heights.get(peekNode.right) : 0;

        heights.set(peekNode, 1 + Math.max(leftHeight, rightHeight));
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

        lastVisited = stack.pop();
      }
    }
  }

  return maxDiameter;
}

/**
 * Approach 4: DFS with Memoization
 * Time: O(n), Space: O(n)
 *
 * Strategy:
 * - Use memoization to cache heights
 * - Separate functions for height calculation and diameter
 */
function diameterOfBinaryTree4(root) {
  const heightCache = new Map();

  function getHeight(node) {
    if (!node) return 0;

    if (heightCache.has(node)) {
      return heightCache.get(node);
    }

    const height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    heightCache.set(node, height);
    return height;
  }

  function findDiameter(node) {
    if (!node) return 0;

    const leftHeight = node.left ? getHeight(node.left) : 0;
    const rightHeight = node.right ? getHeight(node.right) : 0;
    const currentDiameter = leftHeight + rightHeight;

    const leftDiameter = findDiameter(node.left);
    const rightDiameter = findDiameter(node.right);

    return Math.max(currentDiameter, leftDiameter, rightDiameter);
  }

  return findDiameter(root);
}

// Helper function to create tree from array
function createTree(arr) {
  if (!arr || arr.length === 0) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();

    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;

    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

// Helper function to visualize tree paths
function findLongestPath(root) {
  let longestPath = [];
  let maxLength = 0;

  function dfs(node, path) {
    if (!node) return 0;

    const currentPath = [...path, node.val];
    const leftHeight = dfs(node.left, currentPath);
    const rightHeight = dfs(node.right, currentPath);

    // Check if this node gives us the longest diameter
    const totalLength = leftHeight + rightHeight;
    if (totalLength > maxLength) {
      maxLength = totalLength;

      // Construct the actual path
      const leftPath = getPathToLeaf(node.left, leftHeight);
      const rightPath = getPathToLeaf(node.right, rightHeight);

      longestPath = [...leftPath.reverse(), node.val, ...rightPath];
    }

    return 1 + Math.max(leftHeight, rightHeight);
  }

  function getPathToLeaf(node, targetHeight) {
    if (!node || targetHeight === 0) return [];

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    if (leftHeight === targetHeight - 1) {
      return [node.val, ...getPathToLeaf(node.left, targetHeight - 1)];
    } else {
      return [node.val, ...getPathToLeaf(node.right, targetHeight - 1)];
    }
  }

  function getHeight(node) {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
  }

  dfs(root, []);
  return { path: longestPath, length: maxLength };
}

// Test cases
function runTests() {
  console.log("Testing Diameter of Binary Tree...\n");

  const testCases = [
    {
      name: "Example 1",
      tree: [1, 2, 3, 4, 5],
      expected: 3,
      description: "Path: [4,2,1,3] or [5,2,1,3]"
    },
    {
      name: "Example 2",
      tree: [1, 2],
      expected: 1,
      description: "Path: [2,1]"
    },
    {
      name: "Single node",
      tree: [1],
      expected: 0,
      description: "No edges in single node"
    },
    {
      name: "Left skewed tree",
      tree: [1, 2, null, 3, null, 4],
      expected: 3,
      description: "Path through all nodes"
    },
    {
      name: "Right skewed tree",
      tree: [1, null, 2, null, 3, null, 4],
      expected: 3,
      description: "Path through all nodes"
    },
    {
      name: "Complete binary tree",
      tree: [1, 2, 3, 4, 5, 6, 7],
      expected: 4,
      description: "Path through leaves"
    },
    {
      name: "Unbalanced tree",
      tree: [1, 2, 3, 4, null, null, 5, 6, null, null, 7],
      expected: 4,
      description: "Complex path"
    },
    {
      name: "Empty tree",
      tree: [],
      expected: 0,
      description: "No nodes"
    }
  ];

  const approaches = [
    { name: "DFS with Global Variable", func: diameterOfBinaryTree1 },
    { name: "DFS Return Both Values", func: diameterOfBinaryTree2 },
    { name: "Iterative DFS", func: diameterOfBinaryTree3 },
    { name: "DFS with Memoization", func: diameterOfBinaryTree4 }
  ];

  testCases.forEach(({ name, tree, expected, description }) => {
    console.log(`Test: ${name}`);
    console.log(`Tree: [${tree.join(", ")}]`);
    console.log(`Expected: ${expected} (${description})`);

    const root = createTree(tree);

    // Show the actual longest path for context
    if (root) {
      const { path, length } = findLongestPath(root);
      if (path.length > 0) {
        console.log(`Longest path: [${path.join(" -> ")}] (length: ${length})`);
      }
    }

    approaches.forEach(({ name: approachName, func }) => {
      try {
        const result = func(root);
        const status = result === expected ? "✅" : "❌";
        console.log(`${status} ${approachName}: ${result}`);
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

  function createBalancedTree(depth) {
    function build(level) {
      if (level > depth) return null;

      const node = new TreeNode(level);
      node.left = build(level + 1);
      node.right = build(level + 1);
      return node;
    }

    return build(1);
  }

  function createSkewedTree(size) {
    if (size === 0) return null;

    const root = new TreeNode(1);
    let current = root;

    for (let i = 2; i <= size; i++) {
      current.left = new TreeNode(i);
      current = current.left;
    }

    return root;
  }

  const testCases = [
    { name: "Balanced depth 10", tree: () => createBalancedTree(10) },
    { name: "Balanced depth 12", tree: () => createBalancedTree(12) },
    { name: "Skewed 1000 nodes", tree: () => createSkewedTree(1000) },
    { name: "Skewed 5000 nodes", tree: () => createSkewedTree(5000) }
  ];

  const approaches = [
    { name: "DFS with Global Variable", func: diameterOfBinaryTree1 },
    { name: "DFS Return Both Values", func: diameterOfBinaryTree2 },
    { name: "Iterative DFS", func: diameterOfBinaryTree3 },
    { name: "DFS with Memoization", func: diameterOfBinaryTree4 }
  ];

  testCases.forEach(({ name, tree }) => {
    console.log(`Testing ${name}:`);
    const testTree = tree();

    approaches.forEach(({ name: approachName, func }) => {
      const iterations = 100;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        func(testTree);
      }

      const end = performance.now();
      const avgTime = (end - start) / iterations;
      console.log(`${approachName}: ${avgTime.toFixed(3)}ms avg`);
    });
    console.log();
  });
}

// Export functions
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    TreeNode,
    diameterOfBinaryTree1,
    diameterOfBinaryTree2,
    diameterOfBinaryTree3,
    diameterOfBinaryTree4,
    createTree,
    findLongestPath,
    runTests,
    performanceTest
  };
}

// Run tests if called directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
}
