/**
 * 104. Maximum Depth of Binary Tree
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 *
 * Given the root of a binary tree, return its maximum depth.
 * A binary tree's maximum depth is the number of nodes along the longest path
 * from the root node down to the farthest leaf node.
 *
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: 3
 *
 * Patterns: DFS, Recursion, Tree Traversal
 * Time: O(n), Space: O(h) where h is height
 */

// Definition for a binary tree node
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Approach 1: Recursive DFS (Most intuitive)
// Time: O(n), Space: O(h) where h is height of tree
function maxDepth(root) {
  // Base case: empty tree has depth 0
  if (!root) {
    return 0;
  }

  // Recursive case: 1 + max depth of subtrees
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
}

// Approach 2: Iterative DFS using Stack
// Time: O(n), Space: O(h)
function maxDepthIterative(root) {
  if (!root) return 0;

  const stack = [[root, 1]]; // [node, depth]
  let maxDepth = 0;

  while (stack.length > 0) {
    const [node, depth] = stack.pop();

    if (node) {
      maxDepth = Math.max(maxDepth, depth);

      // Add children to stack with increased depth
      if (node.left) {
        stack.push([node.left, depth + 1]);
      }
      if (node.right) {
        stack.push([node.right, depth + 1]);
      }
    }
  }

  return maxDepth;
}

// Approach 3: BFS using Queue (Level by level)
// Time: O(n), Space: O(w) where w is maximum width
function maxDepthBFS(root) {
  if (!root) return 0;

  const queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    depth++;

    // Process all nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return depth;
}

// Approach 4: One-liner using Math.max and recursion
// Time: O(n), Space: O(h)
function maxDepthOneLiner(root) {
  return !root
    ? 0
    : 1 + Math.max(maxDepthOneLiner(root.left), maxDepthOneLiner(root.right));
}

// Helper function to create tree from array representation
function createTreeFromArray(arr) {
  if (!arr || arr.length === 0) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();

    // Add left child
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;

    // Add right child
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

// Helper function to visualize tree structure
function printTree(root, level = 0, prefix = "Root: ") {
  if (!root) return;

  console.log(" ".repeat(level * 4) + prefix + root.val);

  if (root.left || root.right) {
    if (root.left) {
      printTree(root.left, level + 1, "L--- ");
    } else {
      console.log(" ".repeat((level + 1) * 4) + "L--- null");
    }

    if (root.right) {
      printTree(root.right, level + 1, "R--- ");
    } else {
      console.log(" ".repeat((level + 1) * 4) + "R--- null");
    }
  }
}

// Test cases
function testMaxDepth() {
  console.log("Testing Maximum Depth of Binary Tree:");

  const testCases = [
    {
      input: [3, 9, 20, null, null, 15, 7],
      expected: 3,
      description: "Balanced tree"
    },
    {
      input: [1, null, 2],
      expected: 2,
      description: "Right skewed tree"
    },
    {
      input: [],
      expected: 0,
      description: "Empty tree"
    },
    {
      input: [0],
      expected: 1,
      description: "Single node"
    },
    {
      input: [1, 2, 3, 4, 5, null, 6, null, null, 7, 8],
      expected: 4,
      description: "Complex tree"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);
    const root = createTreeFromArray(test.input);

    const result1 = maxDepth(root);
    const result2 = maxDepthIterative(root);
    const result3 = maxDepthBFS(root);
    const result4 = maxDepthOneLiner(root);

    const passed =
      result1 === test.expected &&
      result2 === test.expected &&
      result3 === test.expected &&
      result4 === test.expected;

    console.log(`Input: [${test.input}]`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Recursive: ${result1}`);
    console.log(`Iterative DFS: ${result2}`);
    console.log(`BFS: ${result3}`);
    console.log(`One-liner: ${result4}`);
    console.log(`Result: ${passed ? "PASS" : "FAIL"}`);

    if (root && test.input.length <= 10) {
      console.log("Tree structure:");
      printTree(root);
    }
  });
}

// Variation: Minimum Depth of Binary Tree
function minDepth(root) {
  if (!root) return 0;

  // If only one subtree exists, return depth of that subtree
  if (!root.left) return 1 + minDepth(root.right);
  if (!root.right) return 1 + minDepth(root.left);

  // Both subtrees exist, return minimum
  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}

// Variation: Check if tree is balanced (height difference <= 1)
function isBalanced(root) {
  function getHeight(node) {
    if (!node) return 0;

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    // If any subtree is unbalanced, propagate -1
    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    ) {
      return -1;
    }

    return 1 + Math.max(leftHeight, rightHeight);
  }

  return getHeight(root) !== -1;
}

// Complexity Analysis
console.log(`
Complexity Analysis:
1. Recursive DFS:
   - Time: O(n) - visit each node once
   - Space: O(h) - recursion stack depth
   - Best for: Clean, readable code

2. Iterative DFS:
   - Time: O(n) - visit each node once
   - Space: O(h) - explicit stack
   - Best for: Avoiding recursion stack overflow

3. BFS:
   - Time: O(n) - visit each node once
   - Space: O(w) - queue size = max width of tree
   - Best for: Level-by-level processing

4. One-liner:
   - Time: O(n) - visit each node once
   - Space: O(h) - recursion stack
   - Best for: Concise code in interviews

Key Insights:
- Height/depth problems naturally use recursion
- Base case: null node has depth 0
- Recursive case: 1 + max of subtree depths
- Can be solved iteratively to avoid stack overflow
- BFS naturally processes level by level
`);

// Run tests
testMaxDepth();

// Test variations
console.log("\n=== Testing Variations ===");
const tree = createTreeFromArray([3, 9, 20, null, null, 15, 7]);
console.log(`Max depth: ${maxDepth(tree)}`);
console.log(`Min depth: ${minDepth(tree)}`);
console.log(`Is balanced: ${isBalanced(tree)}`);

module.exports = {
  TreeNode,
  maxDepth,
  maxDepthIterative,
  maxDepthBFS,
  maxDepthOneLiner,
  minDepth,
  isBalanced,
  createTreeFromArray,
  printTree
};
