/**
 * Basic TreeNode Class
 *
 * A fundamental building block for binary trees.
 * This class represents a single node in a binary tree structure.
 *
 * Features:
 * - Value storage
 * - Left and right child pointers
 * - Helper methods for common operations
 * - Validation methods
 *
 * Time Complexities:
 * - Creation: O(1)
 * - Access: O(1)
 * - Insertion: O(1) for direct child assignment
 *
 * Space Complexity: O(1)
 */

class TreeNode {
  /**
   * Create a new TreeNode
   * @param {*} val - The value to store in the node
   * @param {TreeNode|null} left - Left child node
   * @param {TreeNode|null} right - Right child node
   */
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  /**
   * Check if this node is a leaf (has no children)
   * @returns {boolean} True if leaf node
   */
  isLeaf() {
    return this.left === null && this.right === null;
  }

  /**
   * Check if this node has only one child
   * @returns {boolean} True if has exactly one child
   */
  hasOneChild() {
    return (this.left === null) !== (this.right === null);
  }

  /**
   * Check if this node has both children
   * @returns {boolean} True if has both children
   */
  hasBothChildren() {
    return this.left !== null && this.right !== null;
  }

  /**
   * Get the number of children
   * @returns {number} Number of children (0, 1, or 2)
   */
  getChildCount() {
    let count = 0;
    if (this.left) count++;
    if (this.right) count++;
    return count;
  }

  /**
   * Get all children as an array
   * @returns {TreeNode[]} Array of child nodes (non-null only)
   */
  getChildren() {
    const children = [];
    if (this.left) children.push(this.left);
    if (this.right) children.push(this.right);
    return children;
  }

  /**
   * Create a deep copy of this node and its subtree
   * @returns {TreeNode} Deep copy of the node
   */
  clone() {
    const newNode = new TreeNode(this.val);
    newNode.left = this.left ? this.left.clone() : null;
    newNode.right = this.right ? this.right.clone() : null;
    return newNode;
  }

  /**
   * Calculate the height of the subtree rooted at this node
   * @returns {number} Height of the subtree
   */
  getHeight() {
    if (this.isLeaf()) return 0;

    const leftHeight = this.left ? this.left.getHeight() : -1;
    const rightHeight = this.right ? this.right.getHeight() : -1;

    return 1 + Math.max(leftHeight, rightHeight);
  }

  /**
   * Count the total number of nodes in the subtree
   * @returns {number} Total number of nodes
   */
  getSize() {
    let size = 1; // Count this node

    if (this.left) size += this.left.getSize();
    if (this.right) size += this.right.getSize();

    return size;
  }

  /**
   * Check if a value exists in the subtree
   * @param {*} val - Value to search for
   * @returns {boolean} True if value is found
   */
  contains(val) {
    if (this.val === val) return true;

    const leftContains = this.left ? this.left.contains(val) : false;
    const rightContains = this.right ? this.right.contains(val) : false;

    return leftContains || rightContains;
  }

  /**
   * Find a node with the given value
   * @param {*} val - Value to search for
   * @returns {TreeNode|null} The node if found, null otherwise
   */
  findNode(val) {
    if (this.val === val) return this;

    if (this.left) {
      const leftResult = this.left.findNode(val);
      if (leftResult) return leftResult;
    }

    if (this.right) {
      const rightResult = this.right.findNode(val);
      if (rightResult) return rightResult;
    }

    return null;
  }

  /**
   * Get inorder traversal starting from this node
   * @returns {Array} Array of values in inorder
   */
  inorderTraversal() {
    const result = [];

    if (this.left) {
      result.push(...this.left.inorderTraversal());
    }

    result.push(this.val);

    if (this.right) {
      result.push(...this.right.inorderTraversal());
    }

    return result;
  }

  /**
   * Get preorder traversal starting from this node
   * @returns {Array} Array of values in preorder
   */
  preorderTraversal() {
    const result = [this.val];

    if (this.left) {
      result.push(...this.left.preorderTraversal());
    }

    if (this.right) {
      result.push(...this.right.preorderTraversal());
    }

    return result;
  }

  /**
   * Get postorder traversal starting from this node
   * @returns {Array} Array of values in postorder
   */
  postorderTraversal() {
    const result = [];

    if (this.left) {
      result.push(...this.left.postorderTraversal());
    }

    if (this.right) {
      result.push(...this.right.postorderTraversal());
    }

    result.push(this.val);
    return result;
  }

  /**
   * Get level order traversal starting from this node
   * @returns {Array} Array of values in level order
   */
  levelOrderTraversal() {
    const result = [];
    const queue = [this];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  /**
   * Get string representation of the node
   * @returns {string} String representation
   */
  toString() {
    return `TreeNode(${this.val})`;
  }

  /**
   * Get detailed string representation including children
   * @returns {string} Detailed string representation
   */
  toDetailedString() {
    const leftVal = this.left ? this.left.val : "null";
    const rightVal = this.right ? this.right.val : "null";
    return `TreeNode(val: ${this.val}, left: ${leftVal}, right: ${rightVal})`;
  }

  /**
   * Print the tree structure (simple visualization)
   * @param {string} prefix - Prefix for formatting
   * @param {boolean} isLast - Whether this is the last child
   * @returns {string} Tree visualization
   */
  printTree(prefix = "", isLast = true) {
    let result = prefix + (isLast ? "└── " : "├── ") + this.val + "\n";

    const children = [];
    if (this.left) children.push({ node: this.left, isLeft: true });
    if (this.right) children.push({ node: this.right, isLeft: false });

    for (let i = 0; i < children.length; i++) {
      const { node } = children[i];
      const isLastChild = i === children.length - 1;
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      result += node.printTree(newPrefix, isLastChild);
    }

    return result;
  }

  /**
   * Validate tree structure (check for cycles)
   * @param {Set} visited - Set of visited nodes
   * @returns {boolean} True if structure is valid
   */
  validateStructure(visited = new Set()) {
    if (visited.has(this)) {
      return false; // Cycle detected
    }

    visited.add(this);

    if (this.left && !this.left.validateStructure(visited)) {
      return false;
    }

    if (this.right && !this.right.validateStructure(visited)) {
      return false;
    }

    visited.delete(this);
    return true;
  }
}

// Helper functions for TreeNode operations

/**
 * Create a tree from an array representation (level-order)
 * @param {Array} arr - Array representation of tree
 * @returns {TreeNode|null} Root of the created tree
 */
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

/**
 * Convert a tree to array representation (level-order)
 * @param {TreeNode} root - Root of the tree
 * @returns {Array} Array representation of tree
 */
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

/**
 * Check if two trees are equal
 * @param {TreeNode|null} root1 - First tree root
 * @param {TreeNode|null} root2 - Second tree root
 * @returns {boolean} True if trees are equal
 */
function areTreesEqual(root1, root2) {
  if (!root1 && !root2) return true;
  if (!root1 || !root2) return false;

  return (
    root1.val === root2.val &&
    areTreesEqual(root1.left, root2.left) &&
    areTreesEqual(root1.right, root2.right)
  );
}

// Test cases and examples
function runTests() {
  console.log("Testing TreeNode Implementation...\n");

  // Test 1: Basic node creation
  console.log("Test 1: Basic Node Creation");
  const node1 = new TreeNode(5);
  console.log(`Created node: ${node1.toString()}`);
  console.log(`Is leaf: ${node1.isLeaf()}`);
  console.log(`Height: ${node1.getHeight()}`);
  console.log(`Size: ${node1.getSize()}`);
  console.log();

  // Test 2: Tree with children
  console.log("Test 2: Tree with Children");
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);

  console.log("Tree structure:");
  console.log(root.printTree());
  console.log(`Tree height: ${root.getHeight()}`);
  console.log(`Tree size: ${root.getSize()}`);
  console.log(`Contains 3: ${root.contains(3)}`);
  console.log(`Contains 7: ${root.contains(7)}`);
  console.log();

  // Test 3: Traversals
  console.log("Test 3: Tree Traversals");
  console.log(`Inorder: [${root.inorderTraversal().join(", ")}]`);
  console.log(`Preorder: [${root.preorderTraversal().join(", ")}]`);
  console.log(`Postorder: [${root.postorderTraversal().join(", ")}]`);
  console.log(`Level order: [${root.levelOrderTraversal().join(", ")}]`);
  console.log();

  // Test 4: Array conversion
  console.log("Test 4: Array Conversion");
  const arr = [1, 2, 3, 4, 5, null, 6];
  console.log(`Original array: [${arr.join(", ")}]`);

  const treeFromArray = createTreeFromArray(arr);
  console.log("Tree from array:");
  console.log(treeFromArray.printTree());

  const arrayFromTree = treeToArray(treeFromArray);
  console.log(`Back to array: [${arrayFromTree.join(", ")}]`);
  console.log();

  // Test 5: Tree cloning
  console.log("Test 5: Tree Cloning");
  const original = createTreeFromArray([1, 2, 3, 4, 5]);
  const cloned = original.clone();

  console.log(`Original and clone equal: ${areTreesEqual(original, cloned)}`);

  // Modify original
  original.val = 100;
  console.log(`After modifying original:`);
  console.log(`Original root value: ${original.val}`);
  console.log(`Cloned root value: ${cloned.val}`);
  console.log(`Still equal: ${areTreesEqual(original, cloned)}`);
  console.log();

  // Test 6: Node properties
  console.log("Test 6: Node Properties");
  const testNode = createTreeFromArray([1, 2, 3, 4, null, null, 7]);
  console.log("Test tree:");
  console.log(testNode.printTree());

  const node2 = testNode.left; // Node with value 2
  console.log(`Node 2 details: ${node2.toDetailedString()}`);
  console.log(`Is leaf: ${node2.isLeaf()}`);
  console.log(`Has one child: ${node2.hasOneChild()}`);
  console.log(`Has both children: ${node2.hasBothChildren()}`);
  console.log(`Child count: ${node2.getChildCount()}`);
  console.log(
    `Children: [${node2
      .getChildren()
      .map((c) => c.val)
      .join(", ")}]`
  );
  console.log();

  // Test 7: Finding nodes
  console.log("Test 7: Finding Nodes");
  const foundNode = testNode.findNode(7);
  console.log(
    `Found node with value 7: ${foundNode ? foundNode.toString() : "null"}`
  );

  const notFoundNode = testNode.findNode(10);
  console.log(
    `Found node with value 10: ${
      notFoundNode ? notFoundNode.toString() : "null"
    }`
  );
  console.log();
}

// Performance tests
function performanceTest() {
  console.log("Performance Testing TreeNode...\n");

  const sizes = [1000, 5000, 10000];

  sizes.forEach((size) => {
    console.log(`Testing with ${size} nodes:`);

    // Create a large tree
    const arr = Array.from({ length: size }, (_, i) => i + 1);

    // Test tree creation
    let start = performance.now();
    const tree = createTreeFromArray(arr);
    let end = performance.now();
    console.log(`Tree creation: ${(end - start).toFixed(2)}ms`);

    // Test traversals
    start = performance.now();
    tree.inorderTraversal();
    end = performance.now();
    console.log(`Inorder traversal: ${(end - start).toFixed(2)}ms`);

    start = performance.now();
    tree.levelOrderTraversal();
    end = performance.now();
    console.log(`Level order traversal: ${(end - start).toFixed(2)}ms`);

    // Test search
    start = performance.now();
    tree.contains(size);
    end = performance.now();
    console.log(`Search operation: ${(end - start).toFixed(2)}ms`);

    // Test size calculation
    start = performance.now();
    tree.getSize();
    end = performance.now();
    console.log(`Size calculation: ${(end - start).toFixed(2)}ms`);

    console.log();
  });
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    TreeNode,
    createTreeFromArray,
    treeToArray,
    areTreesEqual,
    runTests,
    performanceTest
  };
}

// Run tests if called directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
}
