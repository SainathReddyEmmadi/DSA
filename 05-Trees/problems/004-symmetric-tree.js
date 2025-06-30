/**
 * 101. Symmetric Tree
 * https://leetcode.com/problems/symmetric-tree/
 *
 * Given the root of a binary tree, check whether it is a mirror of itself
 * (i.e., symmetric around its center).
 *
 * Example:
 * Input: root = [1,2,2,3,4,4,3]
 * Output: true
 *
 * Patterns: DFS, Tree Symmetry, Mirror Check
 * Time: O(n), Space: O(h)
 */

const {
  TreeNode,
  createTreeFromArray,
  printTree
} = require("./001-maximum-depth.js");

// Approach 1: Recursive Helper Function
// Time: O(n), Space: O(h) where h is height of tree
function isSymmetric(root) {
  // Helper function to check if two subtrees are mirrors
  function isMirror(left, right) {
    // Both null - symmetric
    if (!left && !right) {
      return true;
    }

    // One null, other not - not symmetric
    if (!left || !right) {
      return false;
    }

    // Values must match and subtrees must be mirrors
    return (
      left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
    );
  }

  // Empty tree is symmetric
  if (!root) {
    return true;
  }

  // Check if left and right subtrees are mirrors
  return isMirror(root.left, root.right);
}

// Approach 2: Iterative using Stack
// Time: O(n), Space: O(h)
function isSymmetricIterative(root) {
  if (!root) return true;

  const stack = [root.left, root.right];

  while (stack.length > 0) {
    const right = stack.pop();
    const left = stack.pop();

    // Both null - continue
    if (!left && !right) {
      continue;
    }

    // One null, other not - not symmetric
    if (!left || !right) {
      return false;
    }

    // Values don't match - not symmetric
    if (left.val !== right.val) {
      return false;
    }

    // Add mirror pairs to stack
    stack.push(left.left, right.right);
    stack.push(left.right, right.left);
  }

  return true;
}

// Approach 3: BFS using Queue
// Time: O(n), Space: O(w) where w is maximum width
function isSymmetricBFS(root) {
  if (!root) return true;

  const queue = [root.left, root.right];

  while (queue.length > 0) {
    const left = queue.shift();
    const right = queue.shift();

    // Both null - continue
    if (!left && !right) {
      continue;
    }

    // One null, other not - not symmetric
    if (!left || !right) {
      return false;
    }

    // Values don't match - not symmetric
    if (left.val !== right.val) {
      return false;
    }

    // Add mirror pairs to queue
    queue.push(left.left, right.right);
    queue.push(left.right, right.left);
  }

  return true;
}

// Approach 4: Level-by-level palindrome check
// Time: O(n), Space: O(w)
function isSymmetricLevelOrder(root) {
  if (!root) return true;

  let currentLevel = [root];

  while (currentLevel.length > 0) {
    const nextLevel = [];
    const values = [];

    // Collect values and build next level
    for (const node of currentLevel) {
      if (node) {
        values.push(node.val);
        nextLevel.push(node.left);
        nextLevel.push(node.right);
      } else {
        values.push(null);
      }
    }

    // Check if current level is palindromic
    if (!isPalindrome(values)) {
      return false;
    }

    // Check if we have any non-null nodes for next level
    const hasNodes = nextLevel.some((node) => node !== null);
    if (!hasNodes) {
      break;
    }

    currentLevel = nextLevel;
  }

  return true;
}

// Helper function to check if array is palindrome
function isPalindrome(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] !== arr[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Approach 5: Inorder traversal comparison (incorrect but educational)
// This approach is INCORRECT for symmetric tree but shows why traversal alone isn't enough
function isSymmetricInorderIncorrect(root) {
  function inorder(node, result) {
    if (!node) {
      result.push(null);
      return;
    }
    inorder(node.left, result);
    result.push(node.val);
    inorder(node.right, result);
  }

  function reverseInorder(node, result) {
    if (!node) {
      result.push(null);
      return;
    }
    reverseInorder(node.right, result);
    result.push(node.val);
    reverseInorder(node.left, result);
  }

  const leftInorder = [];
  const rightInorder = [];

  inorder(root, leftInorder);
  reverseInorder(root, rightInorder);

  return JSON.stringify(leftInorder) === JSON.stringify(rightInorder);
}

// Advanced: Check if tree can be made symmetric by removing nodes
function canBeMadeSymmetric(root) {
  if (!root) return true;

  function collectStructure(node, isLeft = true) {
    if (!node) return [];

    const result = [node.val];

    if (isLeft) {
      result.push(...collectStructure(node.left, true));
      result.push(...collectStructure(node.right, false));
    } else {
      result.push(...collectStructure(node.right, true));
      result.push(...collectStructure(node.left, false));
    }

    return result;
  }

  const leftStructure = collectStructure(root.left, true);
  const rightStructure = collectStructure(root.right, false);

  // Check if they can be made equal by removing elements
  return canMakeEqual(leftStructure, rightStructure);
}

function canMakeEqual(arr1, arr2) {
  // This is a simplified version - in practice, this is complex
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  // Check if intersection is non-empty
  for (const val of set1) {
    if (set2.has(val)) {
      return true;
    }
  }

  return false;
}

// Test cases
function testIsSymmetric() {
  console.log("Testing Symmetric Tree:");

  const testCases = [
    {
      input: [1, 2, 2, 3, 4, 4, 3],
      expected: true,
      description: "Perfect symmetric tree"
    },
    {
      input: [1, 2, 2, null, 3, null, 3],
      expected: false,
      description: "Asymmetric tree"
    },
    {
      input: [],
      expected: true,
      description: "Empty tree"
    },
    {
      input: [1],
      expected: true,
      description: "Single node"
    },
    {
      input: [1, 2, 2],
      expected: true,
      description: "Simple symmetric"
    },
    {
      input: [1, 2, 3],
      expected: false,
      description: "Simple asymmetric"
    },
    {
      input: [1, 2, 2, 2, null, 2],
      expected: false,
      description: "Uneven structure"
    },
    {
      input: [1, 2, 2, null, 3, 3, null],
      expected: true,
      description: "Symmetric with nulls"
    },
    {
      input: [5, 4, 1, null, 1, null, 4, 2, null, 2],
      expected: false,
      description: "Complex asymmetric"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);

    const root = createTreeFromArray(test.input);

    const result1 = isSymmetric(root);
    const result2 = isSymmetricIterative(root);
    const result3 = isSymmetricBFS(root);
    const result4 = isSymmetricLevelOrder(root);

    const allMatch =
      result1 === result2 && result2 === result3 && result3 === result4;
    const passed = result1 === test.expected;

    console.log(`Input: [${test.input}]`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Recursive: ${result1}`);
    console.log(`Iterative: ${result2}`);
    console.log(`BFS: ${result3}`);
    console.log(`Level-order: ${result4}`);
    console.log(`All approaches match: ${allMatch ? "YES" : "NO"}`);
    console.log(`Result: ${passed ? "PASS" : "FAIL"}`);

    // Show tree structure for visualization
    if (test.input.length > 0 && test.input.length <= 8) {
      console.log("Tree structure:");
      printTree(root);
    }
  });
}

// Demonstrate why inorder traversal alone is insufficient
function demonstrateInorderLimitation() {
  console.log("\n=== Why Inorder Traversal Alone Is Insufficient ===");

  // Create two trees with same inorder but different structures
  const tree1 = createTreeFromArray([1, 2, 2, 3, 3, 3, 3]);
  const tree2 = createTreeFromArray([1, 2, 2, null, 3, 3]);

  function getInorder(root) {
    const result = [];
    function inorder(node) {
      if (!node) return;
      inorder(node.left);
      result.push(node.val);
      inorder(node.right);
    }
    inorder(root);
    return result;
  }

  const inorder1 = getInorder(tree1);
  const inorder2 = getInorder(tree2);

  console.log(`Tree 1 inorder: [${inorder1}]`);
  console.log(`Tree 2 inorder: [${inorder2}]`);
  console.log(
    `Same inorder: ${JSON.stringify(inorder1) === JSON.stringify(inorder2)}`
  );
  console.log(`Tree 1 symmetric: ${isSymmetric(tree1)}`);
  console.log(`Tree 2 symmetric: ${isSymmetric(tree2)}`);
  console.log("Conclusion: Inorder traversal alone cannot determine symmetry");
}

// Related problems and variations
function demonstrateVariations() {
  console.log("\n=== Related Problems and Variations ===");

  // 1. Make tree symmetric by adding minimum nodes
  function minNodesToMakeSymmetric(root) {
    if (!root) return 0;

    function countMissingNodes(left, right) {
      if (!left && !right) return 0;
      if (!left || !right) return 1 + countNodes(left || right);
      if (left.val !== right.val) return Infinity; // Cannot be made symmetric

      return (
        countMissingNodes(left.left, right.right) +
        countMissingNodes(left.right, right.left)
      );
    }

    function countNodes(node) {
      if (!node) return 0;
      return 1 + countNodes(node.left) + countNodes(node.right);
    }

    return countMissingNodes(root.left, root.right);
  }

  const asymmetricTree = createTreeFromArray([1, 2, 3]);
  const minNodes = minNodesToMakeSymmetric(asymmetricTree);
  console.log(`Minimum nodes to add to [1,2,3] to make symmetric: ${minNodes}`);

  // 2. Find the axis of symmetry (if any)
  function findSymmetryAxis(root) {
    // For this example, we'll check vertical symmetry only
    if (isSymmetric(root)) {
      return "vertical";
    }
    return "none";
  }

  const symTree = createTreeFromArray([1, 2, 2, 3, 4, 4, 3]);
  console.log(`Symmetry axis of [1,2,2,3,4,4,3]: ${findSymmetryAxis(symTree)}`);

  // 3. Count symmetric subtrees
  function countSymmetricSubtrees(root) {
    let count = 0;

    function traverse(node) {
      if (!node) return;

      if (isSymmetric(node)) {
        count++;
      }

      traverse(node.left);
      traverse(node.right);
    }

    traverse(root);
    return count;
  }

  const testTree = createTreeFromArray([1, 2, 2, 3, 3, 3, 3]);
  console.log(
    `Number of symmetric subtrees in tree: ${countSymmetricSubtrees(testTree)}`
  );
}

// Performance analysis with different tree shapes
function performanceAnalysis() {
  console.log("\n=== Performance Analysis ===");

  // Test with different tree shapes
  function createBalancedTree(height) {
    if (height === 0) return null;
    const node = new TreeNode(1);
    node.left = createBalancedTree(height - 1);
    node.right = createBalancedTree(height - 1);
    return node;
  }

  function createSkewedTree(height) {
    if (height === 0) return null;
    const node = new TreeNode(1);
    node.left = createSkewedTree(height - 1);
    return node;
  }

  const balancedTree = createBalancedTree(10);
  const skewedTree = createSkewedTree(100);

  console.log("Testing with balanced tree (height 10):");
  console.time("Balanced tree - Recursive");
  isSymmetric(balancedTree);
  console.timeEnd("Balanced tree - Recursive");

  console.time("Balanced tree - Iterative");
  isSymmetricIterative(balancedTree);
  console.timeEnd("Balanced tree - Iterative");

  console.log("\nTesting with skewed tree (height 100):");
  console.time("Skewed tree - Recursive");
  isSymmetric(skewedTree);
  console.timeEnd("Skewed tree - Recursive");

  console.time("Skewed tree - Iterative");
  isSymmetricIterative(skewedTree);
  console.timeEnd("Skewed tree - Iterative");
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
   - Best for: Level-by-level processing

4. Level-order Palindrome:
   - Time: O(n) - visit each node + palindrome checks
   - Space: O(w) - store level values
   - Best for: Understanding symmetry at each level

Key Insights:
- Symmetry means left subtree mirrors right subtree
- Must check both structure AND values
- Early termination on first asymmetry
- Mirror relationship: left.left ↔ right.right, left.right ↔ right.left
- Empty tree is considered symmetric
- Single node is always symmetric
`);

// Run all tests and demonstrations
testIsSymmetric();
demonstrateInorderLimitation();
demonstrateVariations();
performanceAnalysis();

module.exports = {
  isSymmetric,
  isSymmetricIterative,
  isSymmetricBFS,
  isSymmetricLevelOrder,
  isPalindrome
};
