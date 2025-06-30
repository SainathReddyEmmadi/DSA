/**
 * LeetCode 105: Construct Binary Tree from Preorder and Inorder Traversal
 * Difficulty: Medium
 *
 * Problem:
 * Given two integer arrays preorder and inorder where preorder is the preorder traversal
 * of a binary tree and inorder is the inorder traversal of the same tree, construct and
 * return the binary tree.
 *
 * Example 1:
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * Output: [3,9,20,null,null,15,7]
 *
 * Example 2:
 * Input: preorder = [-1], inorder = [-1]
 * Output: [-1]
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
 * Approach 1: Recursive with HashMap
 * Time: O(n), Space: O(n)
 *
 * Strategy:
 * - First element in preorder is always the root
 * - Find root position in inorder to determine left/right subtrees
 * - Use HashMap for O(1) lookup of indices in inorder
 * - Recursively build left and right subtrees
 */
function buildTree1(preorder, inorder) {
  if (!preorder || !inorder || preorder.length !== inorder.length) {
    return null;
  }

  // Create map for O(1) inorder index lookup
  const inorderMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  let preorderIndex = 0;

  function buildHelper(inorderStart, inorderEnd) {
    if (inorderStart > inorderEnd) {
      return null;
    }

    // Root is the current element in preorder
    const rootVal = preorder[preorderIndex++];
    const root = new TreeNode(rootVal);

    // Find root position in inorder
    const rootIndex = inorderMap.get(rootVal);

    // Build left subtree first (preorder: root -> left -> right)
    root.left = buildHelper(inorderStart, rootIndex - 1);
    root.right = buildHelper(rootIndex + 1, inorderEnd);

    return root;
  }

  return buildHelper(0, inorder.length - 1);
}

/**
 * Approach 2: Recursive without Global Index
 * Time: O(n), Space: O(n)
 *
 * Strategy:
 * - Pass preorder indices as parameters instead of using global variable
 * - More functional approach
 */
function buildTree2(preorder, inorder) {
  if (!preorder || !inorder || preorder.length !== inorder.length) {
    return null;
  }

  const inorderMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  function buildHelper(preStart, preEnd, inStart, inEnd) {
    if (preStart > preEnd || inStart > inEnd) {
      return null;
    }

    const rootVal = preorder[preStart];
    const root = new TreeNode(rootVal);
    const rootIndex = inorderMap.get(rootVal);

    // Calculate sizes of left subtree
    const leftSize = rootIndex - inStart;

    root.left = buildHelper(
      preStart + 1,
      preStart + leftSize,
      inStart,
      rootIndex - 1
    );

    root.right = buildHelper(
      preStart + leftSize + 1,
      preEnd,
      rootIndex + 1,
      inEnd
    );

    return root;
  }

  return buildHelper(0, preorder.length - 1, 0, inorder.length - 1);
}

/**
 * Approach 3: Iterative with Stack
 * Time: O(n), Space: O(n)
 *
 * Strategy:
 * - Use stack to keep track of nodes
 * - Follow the pattern of preorder traversal
 */
function buildTree3(preorder, inorder) {
  if (!preorder || !inorder || preorder.length === 0) {
    return null;
  }

  const root = new TreeNode(preorder[0]);
  const stack = [root];
  let inorderIndex = 0;

  for (let i = 1; i < preorder.length; i++) {
    const node = new TreeNode(preorder[i]);
    let parent = null;

    // Find the correct parent for current node
    while (
      stack.length > 0 &&
      stack[stack.length - 1].val === inorder[inorderIndex]
    ) {
      parent = stack.pop();
      inorderIndex++;
    }

    if (parent) {
      parent.right = node;
    } else {
      stack[stack.length - 1].left = node;
    }

    stack.push(node);
  }

  return root;
}

/**
 * Approach 4: Optimized Recursive
 * Time: O(n), Space: O(n)
 *
 * Strategy:
 * - Similar to approach 1 but with cleaner implementation
 * - Uses closure to maintain state
 */
function buildTree4(preorder, inorder) {
  if (!preorder || !inorder || preorder.length === 0) {
    return null;
  }

  const inorderMap = new Map();
  inorder.forEach((val, index) => {
    inorderMap.set(val, index);
  });

  let preorderIndex = 0;

  const build = (left, right) => {
    if (left > right) return null;

    const rootVal = preorder[preorderIndex++];
    const root = new TreeNode(rootVal);
    const mid = inorderMap.get(rootVal);

    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);

    return root;
  };

  return build(0, inorder.length - 1);
}

// Helper function to convert tree to array (level-order)
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

// Helper function to create tree from array (for testing)
function arrayToTree(arr) {
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

// Helper function to get inorder traversal
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

// Helper function to get preorder traversal
function getPreorder(root) {
  const result = [];

  function preorder(node) {
    if (!node) return;
    result.push(node.val);
    preorder(node.left);
    preorder(node.right);
  }

  preorder(root);
  return result;
}

// Test cases
function runTests() {
  console.log("Testing Build Tree from Preorder and Inorder...\n");

  const testCases = [
    {
      name: "Example 1",
      preorder: [3, 9, 20, 15, 7],
      inorder: [9, 3, 15, 20, 7],
      expected: [3, 9, 20, null, null, 15, 7]
    },
    {
      name: "Example 2 - Single node",
      preorder: [-1],
      inorder: [-1],
      expected: [-1]
    },
    {
      name: "Left skewed tree",
      preorder: [1, 2, 3],
      inorder: [3, 2, 1],
      expected: [1, 2, null, 3]
    },
    {
      name: "Right skewed tree",
      preorder: [1, 2, 3],
      inorder: [1, 2, 3],
      expected: [1, null, 2, null, 3]
    },
    {
      name: "Complete binary tree",
      preorder: [1, 2, 4, 5, 3, 6, 7],
      inorder: [4, 2, 5, 1, 6, 3, 7],
      expected: [1, 2, 3, 4, 5, 6, 7]
    },
    {
      name: "Empty tree",
      preorder: [],
      inorder: [],
      expected: []
    }
  ];

  const approaches = [
    { name: "Recursive with HashMap", func: buildTree1 },
    { name: "Recursive without Global", func: buildTree2 },
    { name: "Iterative with Stack", func: buildTree3 },
    { name: "Optimized Recursive", func: buildTree4 }
  ];

  testCases.forEach(({ name, preorder, inorder, expected }) => {
    console.log(`Test: ${name}`);
    console.log(`Preorder: [${preorder.join(", ")}]`);
    console.log(`Inorder: [${inorder.join(", ")}]`);
    console.log(`Expected: [${expected.join(", ")}]`);

    approaches.forEach(({ name: approachName, func }) => {
      try {
        const result = func([...preorder], [...inorder]);
        const resultArray = treeToArray(result);
        const match = JSON.stringify(resultArray) === JSON.stringify(expected);
        const status = match ? "✅" : "❌";
        console.log(`${status} ${approachName}: [${resultArray.join(", ")}]`);

        // Verify by checking traversals
        if (result && preorder.length > 0) {
          const builtPreorder = getPreorder(result);
          const builtInorder = getInorder(result);
          const traversalMatch =
            JSON.stringify(builtPreorder) === JSON.stringify(preorder) &&
            JSON.stringify(builtInorder) === JSON.stringify(inorder);

          if (!traversalMatch) {
            console.log(`   ⚠️ Traversal mismatch!`);
            console.log(`   Built Preorder: [${builtPreorder.join(", ")}]`);
            console.log(`   Built Inorder: [${builtInorder.join(", ")}]`);
          }
        }
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
  console.log("Creating test cases for performance testing...\n");

  function generateTraversals(size) {
    // Generate a balanced tree's traversals
    const preorder = [];
    const inorder = [];

    function buildTraversals(start, end, rootVal) {
      if (start > end) return;

      preorder.push(rootVal);

      const mid = Math.floor((start + end) / 2);

      if (start <= mid - 1) {
        buildTraversals(start, mid - 1, rootVal * 2);
      }

      inorder.push(rootVal);

      if (mid + 1 <= end) {
        buildTraversals(mid + 1, end, rootVal * 2 + 1);
      }
    }

    // Generate simple sequential traversals for testing
    for (let i = 1; i <= size; i++) {
      preorder.push(i);
      inorder.push(i);
    }

    return { preorder, inorder };
  }

  const sizes = [100, 500, 1000];
  const approaches = [
    { name: "Recursive with HashMap", func: buildTree1 },
    { name: "Recursive without Global", func: buildTree2 },
    { name: "Iterative with Stack", func: buildTree3 },
    { name: "Optimized Recursive", func: buildTree4 }
  ];

  sizes.forEach((size) => {
    console.log(`Testing with ${size} nodes:`);
    const { preorder, inorder } = generateTraversals(size);

    approaches.forEach(({ name, func }) => {
      const start = performance.now();
      const result = func([...preorder], [...inorder]);
      const end = performance.now();
      console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    });
    console.log();
  });
}

// Export functions
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    TreeNode,
    buildTree1,
    buildTree2,
    buildTree3,
    buildTree4,
    treeToArray,
    arrayToTree,
    getInorder,
    getPreorder,
    runTests,
    performanceTest
  };
}

// Run tests if called directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
}
