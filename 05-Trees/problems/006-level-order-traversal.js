/**
 * 102. Binary Tree Level Order Traversal
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 *
 * Given the root of a binary tree, return the level order traversal of its nodes' values.
 * (i.e., from left to right, level by level).
 *
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
 *
 * Patterns: BFS, Level Order, Queue
 * Time: O(n), Space: O(w) where w is maximum width
 */

const {
  TreeNode,
  createTreeFromArray,
  printTree
} = require("./001-maximum-depth.js");

// Approach 1: BFS with Queue (Standard approach)
// Time: O(n), Space: O(w) where w is maximum width of tree
function levelOrder(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    // Process all nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      // Add children for next level
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    result.push(currentLevel);
  }

  return result;
}

// Approach 2: DFS with Level Tracking
// Time: O(n), Space: O(h) where h is height of tree
function levelOrderDFS(root) {
  const result = [];

  function dfs(node, level) {
    if (!node) {
      return;
    }

    // Create new level array if needed
    if (level >= result.length) {
      result.push([]);
    }

    // Add current node to its level
    result[level].push(node.val);

    // Traverse children at next level
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }

  dfs(root, 0);
  return result;
}

// Approach 3: BFS with Two Queues (Alternative)
// Time: O(n), Space: O(w)
function levelOrderTwoQueues(root) {
  if (!root) return [];

  const result = [];
  let currentLevel = [root];

  while (currentLevel.length > 0) {
    const nextLevel = [];
    const values = [];

    for (const node of currentLevel) {
      values.push(node.val);

      if (node.left) {
        nextLevel.push(node.left);
      }
      if (node.right) {
        nextLevel.push(node.right);
      }
    }

    result.push(values);
    currentLevel = nextLevel;
  }

  return result;
}

// Approach 4: Level Order with Node Information
// Time: O(n), Space: O(w)
function levelOrderWithInfo(root) {
  if (!root) return [];

  const result = [];
  const queue = [[root, 0]]; // [node, level]

  while (queue.length > 0) {
    const [node, level] = queue.shift();

    // Create new level array if needed
    if (level >= result.length) {
      result.push([]);
    }

    result[level].push(node.val);

    // Add children with incremented level
    if (node.left) {
      queue.push([node.left, level + 1]);
    }
    if (node.right) {
      queue.push([node.right, level + 1]);
    }
  }

  return result;
}

// Related Problem: Level Order Traversal II (Bottom-up)
function levelOrderBottom(root) {
  const levels = levelOrder(root);
  return levels.reverse();
}

// Related Problem: Zigzag Level Order Traversal
function zigzagLevelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // Add to level based on direction
      if (leftToRight) {
        currentLevel.push(node.val);
      } else {
        currentLevel.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
    leftToRight = !leftToRight;
  }

  return result;
}

// Related Problem: Right Side View
function rightSideView(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // Add rightmost node of each level
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

// Related Problem: Left Side View
function leftSideView(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // Add leftmost node of each level
      if (i === 0) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

// Related Problem: Average of Levels
function averageOfLevels(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    let levelSum = 0;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelSum += node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(levelSum / levelSize);
  }

  return result;
}

// Related Problem: Largest Values in Each Row
function largestValues(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    let maxVal = -Infinity;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      maxVal = Math.max(maxVal, node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(maxVal);
  }

  return result;
}

// Helper function to get level count
function getLevelCount(root) {
  if (!root) return 0;

  let maxLevel = 0;
  const queue = [[root, 0]];

  while (queue.length > 0) {
    const [node, level] = queue.shift();
    maxLevel = Math.max(maxLevel, level);

    if (node.left) queue.push([node.left, level + 1]);
    if (node.right) queue.push([node.right, level + 1]);
  }

  return maxLevel + 1;
}

// Helper function to get level width
function getLevelWidths(root) {
  if (!root) return [];

  const widths = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    widths.push(levelSize);

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return widths;
}

// Test cases
function testLevelOrder() {
  console.log("Testing Binary Tree Level Order Traversal:");

  const testCases = [
    {
      input: [3, 9, 20, null, null, 15, 7],
      expected: [[3], [9, 20], [15, 7]],
      description: "Standard example"
    },
    {
      input: [1],
      expected: [[1]],
      description: "Single node"
    },
    {
      input: [],
      expected: [],
      description: "Empty tree"
    },
    {
      input: [1, 2, 3, 4, 5, null, 6],
      expected: [[1], [2, 3], [4, 5, 6]],
      description: "Unbalanced tree"
    },
    {
      input: [1, 2, null, 3, null, 4, null, 5],
      expected: [[1], [2], [3], [4], [5]],
      description: "Left-skewed tree"
    },
    {
      input: [1, null, 2, null, 3, null, 4, null, 5],
      expected: [[1], [2], [3], [4], [5]],
      description: "Right-skewed tree"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);

    const root = createTreeFromArray(test.input);

    const result1 = levelOrder(root);
    const result2 = levelOrderDFS(root);
    const result3 = levelOrderTwoQueues(root);
    const result4 = levelOrderWithInfo(root);

    const allMatch =
      JSON.stringify(result1) === JSON.stringify(result2) &&
      JSON.stringify(result2) === JSON.stringify(result3) &&
      JSON.stringify(result3) === JSON.stringify(result4);

    const passed = JSON.stringify(result1) === JSON.stringify(test.expected);

    console.log(`Input: [${test.input}]`);
    console.log(`Expected: ${JSON.stringify(test.expected)}`);
    console.log(`BFS Queue: ${JSON.stringify(result1)}`);
    console.log(`DFS: ${JSON.stringify(result2)}`);
    console.log(`Two Queues: ${JSON.stringify(result3)}`);
    console.log(`With Info: ${JSON.stringify(result4)}`);
    console.log(`All approaches match: ${allMatch ? "YES" : "NO"}`);
    console.log(`Result: ${passed ? "PASS" : "FAIL"}`);

    // Show tree structure for small trees
    if (test.input.length > 0 && test.input.length <= 7) {
      console.log("Tree structure:");
      printTree(root);
    }
  });
}

// Test related problems
function testRelatedProblems() {
  console.log("\n=== Testing Related Problems ===");

  const tree = createTreeFromArray([3, 9, 20, null, null, 15, 7]);

  console.log("Tree: [3,9,20,null,null,15,7]");
  console.log("Tree structure:");
  printTree(tree);

  console.log(
    `\n1. Level Order (Top-down): ${JSON.stringify(levelOrder(tree))}`
  );
  console.log(
    `2. Level Order (Bottom-up): ${JSON.stringify(levelOrderBottom(tree))}`
  );
  console.log(
    `3. Zigzag Level Order: ${JSON.stringify(zigzagLevelOrder(tree))}`
  );
  console.log(`4. Right Side View: [${rightSideView(tree)}]`);
  console.log(`5. Left Side View: [${leftSideView(tree)}]`);
  console.log(
    `6. Average of Levels: [${averageOfLevels(tree).map((x) => x.toFixed(1))}]`
  );
  console.log(`7. Largest Values: [${largestValues(tree)}]`);
  console.log(`8. Level Count: ${getLevelCount(tree)}`);
  console.log(`9. Level Widths: [${getLevelWidths(tree)}]`);

  // Test with a more complex tree
  console.log("\n--- Complex Tree Example ---");
  const complexTree = createTreeFromArray([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  ]);
  console.log("Tree: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]");
  console.log(`Level Order: ${JSON.stringify(levelOrder(complexTree))}`);
  console.log(`Zigzag: ${JSON.stringify(zigzagLevelOrder(complexTree))}`);
  console.log(`Right Side: [${rightSideView(complexTree)}]`);
  console.log(`Level Widths: [${getLevelWidths(complexTree)}]`);
}

// Demonstrate level order applications
function demonstrateApplications() {
  console.log("\n=== Level Order Applications ===");

  // 1. Tree serialization (level order)
  function serialize(root) {
    if (!root) return "[]";

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

    return JSON.stringify(result);
  }

  const tree = createTreeFromArray([1, 2, 3, null, 4, 5, 6]);
  console.log(`1. Tree Serialization: ${serialize(tree)}`);

  // 2. Find nodes at distance K
  function nodesAtDistanceK(root, k) {
    if (!root || k < 0) return [];

    const result = [];
    const queue = [[root, 0]];

    while (queue.length > 0) {
      const [node, distance] = queue.shift();

      if (distance === k) {
        result.push(node.val);
      } else if (distance < k) {
        if (node.left) queue.push([node.left, distance + 1]);
        if (node.right) queue.push([node.right, distance + 1]);
      }
    }

    return result;
  }

  console.log(`2. Nodes at distance 2: [${nodesAtDistanceK(tree, 2)}]`);

  // 3. Level with maximum sum
  function maxLevelSum(root) {
    if (!root) return 0;

    let maxSum = -Infinity;
    let maxLevel = 1;
    let currentLevel = 1;
    const queue = [root];

    while (queue.length > 0) {
      const levelSize = queue.length;
      let levelSum = 0;

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        levelSum += node.val;

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      if (levelSum > maxSum) {
        maxSum = levelSum;
        maxLevel = currentLevel;
      }

      currentLevel++;
    }

    return maxLevel;
  }

  console.log(
    `3. Level with maximum sum: Level ${maxLevelSum(tree)} (sum: ${Math.max(
      ...averageOfLevels(tree).map((avg, i) => avg * getLevelWidths(tree)[i])
    )})`
  );

  // 4. Check if tree is complete
  function isCompleteTree(root) {
    if (!root) return true;

    const queue = [root];
    let nullSeen = false;

    while (queue.length > 0) {
      const node = queue.shift();

      if (!node) {
        nullSeen = true;
      } else {
        if (nullSeen) return false;
        queue.push(node.left);
        queue.push(node.right);
      }
    }

    return true;
  }

  console.log(`4. Is complete tree: ${isCompleteTree(tree)}`);
}

// Performance analysis
function performanceAnalysis() {
  console.log("\n=== Performance Analysis ===");

  // Create trees with different characteristics
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
  const skewedTree = createSkewedTree(1000);

  console.log("Testing with balanced tree (height 10):");
  console.time("Balanced - BFS");
  levelOrder(balancedTree);
  console.timeEnd("Balanced - BFS");

  console.time("Balanced - DFS");
  levelOrderDFS(balancedTree);
  console.timeEnd("Balanced - DFS");

  console.log("\nTesting with skewed tree (height 1000):");
  console.time("Skewed - BFS");
  levelOrder(skewedTree);
  console.timeEnd("Skewed - BFS");

  console.time("Skewed - DFS");
  levelOrderDFS(skewedTree);
  console.timeEnd("Skewed - DFS");

  console.log("\nSpace complexity characteristics:");
  console.log("- BFS: O(w) where w is maximum width");
  console.log("- DFS: O(h) where h is height");
  console.log("- For balanced trees: BFS uses more space");
  console.log("- For skewed trees: DFS uses more space");
}

// Complexity Analysis
console.log(`
Complexity Analysis:
1. BFS with Queue:
   - Time: O(n) - visit each node exactly once
   - Space: O(w) - maximum width of tree in queue
   - Best for: Natural level-by-level processing

2. DFS with Level Tracking:
   - Time: O(n) - visit each node exactly once
   - Space: O(h) - recursion call stack (h = height)
   - Best for: When memory is constrained for wide trees

3. Two Queues Approach:
   - Time: O(n) - visit each node exactly once
   - Space: O(w) - two queues storing at most one level each
   - Best for: Clear separation of current and next level

4. BFS with Node Info:
   - Time: O(n) - visit each node exactly once
   - Space: O(w) - queue with level information
   - Best for: When level information is needed per node

Key Insights:
- BFS naturally processes level by level
- Queue size equals maximum width at any level
- DFS can achieve same result with level parameter
- Many tree problems are variations of level order traversal
- Level order is foundation for tree serialization
- Useful for shortest path in unweighted trees
`);

// Run all tests and demonstrations
testLevelOrder();
testRelatedProblems();
demonstrateApplications();
performanceAnalysis();

module.exports = {
  levelOrder,
  levelOrderDFS,
  levelOrderTwoQueues,
  levelOrderWithInfo,
  levelOrderBottom,
  zigzagLevelOrder,
  rightSideView,
  leftSideView,
  averageOfLevels,
  largestValues,
  getLevelCount,
  getLevelWidths
};
