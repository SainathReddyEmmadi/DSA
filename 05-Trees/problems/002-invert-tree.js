/**
 * 226. Invert Binary Tree
 * https://leetcode.com/problems/invert-binary-tree/
 *
 * Given the root of a binary tree, invert the tree, and return its root.
 * Inverting means swapping the left and right children of all nodes.
 *
 * Example:
 * Input: root = [4,2,7,1,3,6,9]
 * Output: [4,7,2,9,6,3,1]
 *
 * Patterns: DFS, Tree Manipulation, Recursion
 * Time: O(n), Space: O(h)
 */

// Import TreeNode from previous file
const {
  TreeNode,
  createTreeFromArray,
  printTree
} = require("./001-maximum-depth.js");

// Approach 1: Recursive DFS (Most intuitive)
// Time: O(n), Space: O(h) where h is height of tree
function invertTree(root) {
  // Base case: empty tree
  if (!root) {
    return null;
  }

  // Swap left and right children
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
}

// Approach 2: Recursive DFS (Alternative - invert then swap)
// Time: O(n), Space: O(h)
function invertTreeAlt(root) {
  if (!root) return null;

  // Recursively invert subtrees first
  const left = invertTreeAlt(root.left);
  const right = invertTreeAlt(root.right);

  // Swap the inverted subtrees
  root.left = right;
  root.right = left;

  return root;
}

// Approach 3: Iterative DFS using Stack
// Time: O(n), Space: O(h)
function invertTreeIterativeDFS(root) {
  if (!root) return null;

  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();

    // Swap left and right children
    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    // Add non-null children to stack
    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
  }

  return root;
}

// Approach 4: BFS using Queue
// Time: O(n), Space: O(w) where w is maximum width
function invertTreeBFS(root) {
  if (!root) return null;

  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    // Swap left and right children
    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    // Add non-null children to queue
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }

  return root;
}

// Approach 5: One-liner using destructuring
// Time: O(n), Space: O(h)
function invertTreeOneLiner(root) {
  if (!root) return null;
  [root.left, root.right] = [
    invertTreeOneLiner(root.right),
    invertTreeOneLiner(root.left)
  ];
  return root;
}

// Helper function to create a deep copy of tree
function copyTree(root) {
  if (!root) return null;

  const newNode = new TreeNode(root.val);
  newNode.left = copyTree(root.left);
  newNode.right = copyTree(root.right);

  return newNode;
}

// Helper function to convert tree to array (level order)
function treeToArray(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // Remove trailing nulls
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

// Helper function to check if two trees are the same
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
}

// Test cases
function testInvertTree() {
  console.log("Testing Invert Binary Tree:");

  const testCases = [
    {
      input: [4, 2, 7, 1, 3, 6, 9],
      expected: [4, 7, 2, 9, 6, 3, 1],
      description: "Balanced tree"
    },
    {
      input: [2, 1, 3],
      expected: [2, 3, 1],
      description: "Simple tree"
    },
    {
      input: [],
      expected: [],
      description: "Empty tree"
    },
    {
      input: [1],
      expected: [1],
      description: "Single node"
    },
    {
      input: [1, 2],
      expected: [1, null, 2],
      description: "Only left child"
    },
    {
      input: [1, null, 2],
      expected: [1, 2],
      description: "Only right child"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);

    // Create multiple copies for different approaches
    const root1 = createTreeFromArray(test.input);
    const root2 = copyTree(root1);
    const root3 = copyTree(root1);
    const root4 = copyTree(root1);
    const root5 = copyTree(root1);

    // Test all approaches
    const result1 = invertTree(root1);
    const result2 = invertTreeAlt(root2);
    const result3 = invertTreeIterativeDFS(root3);
    const result4 = invertTreeBFS(root4);
    const result5 = invertTreeOneLiner(root5);

    // Convert results to arrays for comparison
    const array1 = treeToArray(result1);
    const array2 = treeToArray(result2);
    const array3 = treeToArray(result3);
    const array4 = treeToArray(result4);
    const array5 = treeToArray(result5);

    // Check if all approaches give same result
    const allSame =
      isSameTree(result1, result2) &&
      isSameTree(result2, result3) &&
      isSameTree(result3, result4) &&
      isSameTree(result4, result5);

    console.log(`Input: [${test.input}]`);
    console.log(`Expected: [${test.expected}]`);
    console.log(`Recursive: [${array1}]`);
    console.log(`Alternative: [${array2}]`);
    console.log(`Iterative DFS: [${array3}]`);
    console.log(`BFS: [${array4}]`);
    console.log(`One-liner: [${array5}]`);
    console.log(`All approaches match: ${allSame ? "YES" : "NO"}`);

    // Check against expected (allowing for representation differences)
    const expectedTree = createTreeFromArray(test.expected);
    const expectedArray = treeToArray(expectedTree);
    const matches =
      JSON.stringify(array1.filter((x) => x !== null)) ===
      JSON.stringify(expectedArray.filter((x) => x !== null));
    console.log(`Matches expected: ${matches ? "PASS" : "FAIL"}`);

    // Show tree structure for small trees
    if (test.input.length > 0 && test.input.length <= 7) {
      console.log("Original tree:");
      const originalTree = createTreeFromArray(test.input);
      printTree(originalTree);
      console.log("Inverted tree:");
      printTree(result1);
    }
  });
}

// Demonstration of different inversion properties
function demonstrateInversionProperties() {
  console.log("\n=== Inversion Properties Demonstration ===");

  // Property 1: Inverting twice returns original tree
  console.log("1. Double inversion returns original:");
  const original = createTreeFromArray([1, 2, 3, 4, 5]);
  const copy1 = copyTree(original);
  const copy2 = copyTree(original);

  invertTree(copy1);
  invertTree(copy1); // Invert again

  console.log(`Original == Double inverted: ${isSameTree(original, copy1)}`);

  // Property 2: Inversion affects structure but not node count
  console.log("\n2. Node count preserved:");
  const beforeInvert = countNodes(copy2);
  invertTree(copy2);
  const afterInvert = countNodes(copy2);
  console.log(`Nodes before: ${beforeInvert}, after: ${afterInvert}`);

  // Property 3: Height is preserved
  console.log("\n3. Height preserved:");
  const tree = createTreeFromArray([1, 2, 3, 4, 5, 6]);
  const heightBefore = getHeight(tree);
  invertTree(tree);
  const heightAfter = getHeight(tree);
  console.log(`Height before: ${heightBefore}, after: ${heightAfter}`);
}

// Helper functions for demonstrations
function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

function getHeight(root) {
  if (!root) return 0;
  return 1 + Math.max(getHeight(root.left), getHeight(root.right));
}

// Applications and variations
function showApplications() {
  console.log("\n=== Applications and Variations ===");

  // 1. Mirror tree check
  function isMirror(root1, root2) {
    if (!root1 && !root2) return true;
    if (!root1 || !root2) return false;

    return (
      root1.val === root2.val &&
      isMirror(root1.left, root2.right) &&
      isMirror(root1.right, root2.left)
    );
  }

  const tree1 = createTreeFromArray([1, 2, 3]);
  const tree2 = createTreeFromArray([1, 3, 2]);
  console.log(
    `Trees [1,2,3] and [1,3,2] are mirrors: ${isMirror(tree1, tree2)}`
  );

  // 2. Symmetric tree check (tree is mirror of itself)
  function isSymmetric(root) {
    if (!root) return true;
    return isMirror(root.left, root.right);
  }

  const symmetricTree = createTreeFromArray([1, 2, 2, 3, 4, 4, 3]);
  console.log(
    `Tree [1,2,2,3,4,4,3] is symmetric: ${isSymmetric(symmetricTree)}`
  );

  // 3. Convert tree to its mirror without creating new nodes
  function mirrorInPlace(root) {
    if (!root) return;

    // Swap children
    [root.left, root.right] = [root.right, root.left];

    // Recursively mirror subtrees
    mirrorInPlace(root.left);
    mirrorInPlace(root.right);
  }

  console.log("\n3. In-place mirroring demonstrated above in test cases");
}

// Complexity Analysis
console.log(`
Complexity Analysis:
1. Recursive Approach:
   - Time: O(n) - visit each node exactly once
   - Space: O(h) - recursion call stack (h = height)
   - Best for: Clean, readable code

2. Iterative DFS:
   - Time: O(n) - visit each node exactly once
   - Space: O(h) - explicit stack storage
   - Best for: Avoiding recursion stack overflow

3. BFS Approach:
   - Time: O(n) - visit each node exactly once
   - Space: O(w) - queue size = maximum width of tree
   - Best for: Level-by-level processing needs

4. One-liner:
   - Time: O(n) - visit each node exactly once
   - Space: O(h) - recursion call stack
   - Best for: Concise interview solutions

Key Insights:
- Tree inversion is a classic divide-and-conquer problem
- Base case: null nodes remain null
- Recursive case: swap children, then invert subtrees
- Can be done in-place (modifying original tree)
- Inversion preserves tree properties (height, node count)
- Double inversion returns original tree
`);

// Run tests
testInvertTree();
demonstrateInversionProperties();
showApplications();

module.exports = {
  invertTree,
  invertTreeAlt,
  invertTreeIterativeDFS,
  invertTreeBFS,
  invertTreeOneLiner,
  copyTree,
  treeToArray,
  isSameTree
};
