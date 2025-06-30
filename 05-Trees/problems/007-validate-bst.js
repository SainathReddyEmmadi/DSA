/**
 * LeetCode 98: Validate Binary Search Tree
 * Difficulty: Medium
 *
 * Problem:
 * Given the root of a binary tree, determine if it is a valid binary search tree (BST).
 *
 * A valid BST is defined as follows:
 * - The left subtree of a node contains only nodes with keys less than the node's key.
 * - The right subtree of a node contains only nodes with keys greater than the node's key.
 * - Both the left and right subtrees must also be binary search trees.
 *
 * Example 1:
 * Input: root = [2,1,3]
 * Output: true
 *
 * Example 2:
 * Input: root = [5,1,4,null,null,3,6]
 * Output: false
 * Explanation: The root node's value is 5 but its right child's value is 4.
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
 * Approach 1: In-Order Traversal
 * Time: O(n), Space: O(n)
 *
 * Strategy:
 * - Perform in-order traversal of the tree
 * - In a valid BST, in-order traversal should give sorted sequence
 * - Check if the sequence is strictly increasing
 */
function isValidBST1(root) {
  const inorderValues = [];

  function inorder(node) {
    if (!node) return;

    inorder(node.left);
    inorderValues.push(node.val);
    inorder(node.right);
  }

  inorder(root);

  // Check if strictly increasing
  for (let i = 1; i < inorderValues.length; i++) {
    if (inorderValues[i] <= inorderValues[i - 1]) {
      return false;
    }
  }

  return true;
}

/**
 * Approach 2: In-Order Traversal (Optimized)
 * Time: O(n), Space: O(h) where h is height
 *
 * Strategy:
 * - Perform in-order traversal while keeping track of previous value
 * - Return false immediately if we find a violation
 */
function isValidBST2(root) {
  let prev = null;

  function inorder(node) {
    if (!node) return true;

    // Check left subtree
    if (!inorder(node.left)) return false;

    // Check current node
    if (prev !== null && node.val <= prev) {
      return false;
    }
    prev = node.val;

    // Check right subtree
    return inorder(node.right);
  }

  return inorder(root);
}

/**
 * Approach 3: Recursive with Bounds
 * Time: O(n), Space: O(h)
 *
 * Strategy:
 * - Recursively validate each node with min and max bounds
 * - Each node must be within its valid range
 * - Update bounds as we go down the tree
 */
function isValidBST3(root) {
  function validate(node, min, max) {
    if (!node) return true;

    // Check if current node violates BST property
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // Recursively validate left and right subtrees
    return (
      validate(node.left, min, node.val) && validate(node.right, node.val, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}

/**
 * Approach 4: Iterative with Stack
 * Time: O(n), Space: O(h)
 *
 * Strategy:
 * - Use stack to simulate in-order traversal
 * - Check if values are in strictly increasing order
 */
function isValidBST4(root) {
  const stack = [];
  let prev = null;
  let current = root;

  while (stack.length > 0 || current) {
    // Go to leftmost node
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // Process current node
    current = stack.pop();

    if (prev !== null && current.val <= prev) {
      return false;
    }
    prev = current.val;

    // Move to right subtree
    current = current.right;
  }

  return true;
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

// Test cases
function runTests() {
  console.log("Testing Validate BST...\n");

  const testCases = [
    {
      name: "Valid BST - Example 1",
      tree: [2, 1, 3],
      expected: true
    },
    {
      name: "Invalid BST - Example 2",
      tree: [5, 1, 4, null, null, 3, 6],
      expected: false
    },
    {
      name: "Single node",
      tree: [1],
      expected: true
    },
    {
      name: "Two nodes - valid",
      tree: [1, 2],
      expected: false // left child should be less than parent
    },
    {
      name: "Two nodes - valid",
      tree: [2, 1],
      expected: true
    },
    {
      name: "Complex valid BST",
      tree: [10, 5, 15, 2, 7, 12, 20],
      expected: true
    },
    {
      name: "Invalid - duplicate values",
      tree: [1, 1],
      expected: false
    },
    {
      name: "Empty tree",
      tree: [],
      expected: true
    }
  ];

  const approaches = [
    { name: "In-Order Array", func: isValidBST1 },
    { name: "In-Order Optimized", func: isValidBST2 },
    { name: "Recursive Bounds", func: isValidBST3 },
    { name: "Iterative Stack", func: isValidBST4 }
  ];

  testCases.forEach(({ name, tree, expected }) => {
    console.log(`Test: ${name}`);
    console.log(`Input: [${tree.join(", ")}]`);
    console.log(`Expected: ${expected}`);

    const root = createTree(tree);

    approaches.forEach(({ name: approachName, func }) => {
      const result = func(root);
      const status = result === expected ? "✅" : "❌";
      console.log(`${status} ${approachName}: ${result}`);
    });

    console.log();
  });
}

// Performance comparison
function performanceTest() {
  console.log("Performance Comparison:");
  console.log("Creating large BST for testing...\n");

  // Create a large valid BST
  function createLargeBST(size) {
    const arr = [];
    for (let i = 1; i <= size; i++) {
      arr.push(i);
    }
    return createTree(arr);
  }

  const sizes = [1000, 5000, 10000];
  const approaches = [
    { name: "In-Order Array", func: isValidBST1 },
    { name: "In-Order Optimized", func: isValidBST2 },
    { name: "Recursive Bounds", func: isValidBST3 },
    { name: "Iterative Stack", func: isValidBST4 }
  ];

  sizes.forEach((size) => {
    console.log(`Testing with ${size} nodes:`);
    const tree = createLargeBST(size);

    approaches.forEach(({ name, func }) => {
      const start = performance.now();
      const result = func(tree);
      const end = performance.now();
      console.log(`${name}: ${(end - start).toFixed(2)}ms (Result: ${result})`);
    });
    console.log();
  });
}

// Export functions
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    TreeNode,
    isValidBST1,
    isValidBST2,
    isValidBST3,
    isValidBST4,
    createTree,
    runTests,
    performanceTest
  };
}

// Run tests if called directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
}
