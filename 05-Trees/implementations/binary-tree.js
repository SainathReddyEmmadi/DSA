/**
 * Binary Tree Implementation
 *
 * A complete binary tree implementation with common operations.
 * Built on top of the TreeNode class for robustness.
 *
 * Features:
 * - Insert, delete, search operations
 * - Multiple traversal methods
 * - Tree statistics and properties
 * - Tree manipulation methods
 * - Validation and utility functions
 *
 * Time Complexities:
 * - Search: O(n) - needs to check all nodes
 * - Insert: O(log n) for balanced, O(n) for skewed
 * - Delete: O(n) - needs to find and restructure
 * - Traversals: O(n)
 *
 * Space Complexity: O(n) for storage, O(h) for recursion stack
 */

const { TreeNode } = require("./tree-node");

class BinaryTree {
  /**
   * Create a new Binary Tree
   * @param {*} rootValue - Optional initial root value
   */
  constructor(rootValue = null) {
    this.root = rootValue !== null ? new TreeNode(rootValue) : null;
    this.size = rootValue !== null ? 1 : 0;
  }

  /**
   * Check if tree is empty
   * @returns {boolean} True if empty
   */
  isEmpty() {
    return this.root === null;
  }

  /**
   * Get the size of the tree
   * @returns {number} Number of nodes in tree
   */
  getSize() {
    return this.size;
  }

  /**
   * Get the height of the tree
   * @returns {number} Height of the tree (-1 for empty tree)
   */
  getHeight() {
    if (!this.root) return -1;
    return this.root.getHeight();
  }

  /**
   * Insert a value into the tree (level-order insertion for complete tree)
   * @param {*} val - Value to insert
   * @returns {TreeNode} The inserted node
   */
  insert(val) {
    const newNode = new TreeNode(val);

    if (!this.root) {
      this.root = newNode;
      this.size++;
      return newNode;
    }

    // Level-order insertion to maintain complete tree property
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();

      if (!current.left) {
        current.left = newNode;
        this.size++;
        return newNode;
      } else if (!current.right) {
        current.right = newNode;
        this.size++;
        return newNode;
      } else {
        queue.push(current.left);
        queue.push(current.right);
      }
    }

    return newNode;
  }

  /**
   * Insert multiple values
   * @param {Array} values - Array of values to insert
   * @returns {Array} Array of inserted nodes
   */
  insertMany(values) {
    return values.map((val) => this.insert(val));
  }

  /**
   * Search for a value in the tree
   * @param {*} val - Value to search for
   * @returns {TreeNode|null} Found node or null
   */
  search(val) {
    if (!this.root) return null;
    return this.root.findNode(val);
  }

  /**
   * Check if tree contains a value
   * @param {*} val - Value to check
   * @returns {boolean} True if value exists
   */
  contains(val) {
    return this.search(val) !== null;
  }

  /**
   * Delete a node with the given value
   * @param {*} val - Value to delete
   * @returns {boolean} True if deletion was successful
   */
  delete(val) {
    if (!this.root) return false;

    // Find the node to delete and its parent
    let nodeToDelete = null;
    let parent = null;
    let isLeftChild = false;

    // Special case: root node
    if (this.root.val === val) {
      nodeToDelete = this.root;
    } else {
      // Find the node using level-order traversal
      const queue = [this.root];

      while (queue.length > 0) {
        const current = queue.shift();

        if (current.left && current.left.val === val) {
          nodeToDelete = current.left;
          parent = current;
          isLeftChild = true;
          break;
        } else if (current.right && current.right.val === val) {
          nodeToDelete = current.right;
          parent = current;
          isLeftChild = false;
          break;
        }

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }

    if (!nodeToDelete) return false;

    // Case 1: Node is a leaf
    if (nodeToDelete.isLeaf()) {
      if (nodeToDelete === this.root) {
        this.root = null;
      } else {
        if (isLeftChild) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      }
    }
    // Case 2: Node has one child
    else if (nodeToDelete.hasOneChild()) {
      const child = nodeToDelete.left || nodeToDelete.right;

      if (nodeToDelete === this.root) {
        this.root = child;
      } else {
        if (isLeftChild) {
          parent.left = child;
        } else {
          parent.right = child;
        }
      }
    }
    // Case 3: Node has two children
    else {
      // Find the rightmost node in the last level (for complete tree property)
      const deepestRightmost = this.findDeepestRightmost();

      // Replace the value of nodeToDelete with deepestRightmost
      nodeToDelete.val = deepestRightmost.val;

      // Delete the deepestRightmost node
      this.deleteDeepestRightmost();
      this.size++; // Compensate for the decrement in deleteDeepestRightmost
    }

    this.size--;
    return true;
  }

  /**
   * Find the deepest rightmost node
   * @returns {TreeNode|null} The deepest rightmost node
   */
  findDeepestRightmost() {
    if (!this.root) return null;

    const queue = [this.root];
    let lastNode = null;

    while (queue.length > 0) {
      lastNode = queue.shift();

      if (lastNode.left) queue.push(lastNode.left);
      if (lastNode.right) queue.push(lastNode.right);
    }

    return lastNode;
  }

  /**
   * Delete the deepest rightmost node
   * @returns {boolean} True if deletion was successful
   */
  deleteDeepestRightmost() {
    if (!this.root) return false;

    if (this.root.isLeaf()) {
      this.root = null;
      this.size--;
      return true;
    }

    const queue = [this.root];
    let parent = null;

    while (queue.length > 0) {
      const current = queue.shift();

      if (current.left) {
        if (current.left.isLeaf() && !current.right) {
          current.left = null;
          this.size--;
          return true;
        }
        queue.push(current.left);
        parent = current;
      }

      if (current.right) {
        if (current.right.isLeaf()) {
          current.right = null;
          this.size--;
          return true;
        }
        queue.push(current.right);
        parent = current;
      }
    }

    return false;
  }

  /**
   * Inorder traversal (Left, Root, Right)
   * @param {Function} callback - Optional callback function
   * @returns {Array} Array of values in inorder
   */
  inorderTraversal(callback = null) {
    const result = [];

    function inorder(node) {
      if (!node) return;

      inorder(node.left);

      if (callback) {
        callback(node.val);
      }
      result.push(node.val);

      inorder(node.right);
    }

    inorder(this.root);
    return result;
  }

  /**
   * Preorder traversal (Root, Left, Right)
   * @param {Function} callback - Optional callback function
   * @returns {Array} Array of values in preorder
   */
  preorderTraversal(callback = null) {
    const result = [];

    function preorder(node) {
      if (!node) return;

      if (callback) {
        callback(node.val);
      }
      result.push(node.val);

      preorder(node.left);
      preorder(node.right);
    }

    preorder(this.root);
    return result;
  }

  /**
   * Postorder traversal (Left, Right, Root)
   * @param {Function} callback - Optional callback function
   * @returns {Array} Array of values in postorder
   */
  postorderTraversal(callback = null) {
    const result = [];

    function postorder(node) {
      if (!node) return;

      postorder(node.left);
      postorder(node.right);

      if (callback) {
        callback(node.val);
      }
      result.push(node.val);
    }

    postorder(this.root);
    return result;
  }

  /**
   * Level order traversal (Breadth-First)
   * @param {Function} callback - Optional callback function
   * @returns {Array} Array of values in level order
   */
  levelOrderTraversal(callback = null) {
    if (!this.root) return [];

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();

      if (callback) {
        callback(node.val);
      }
      result.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  /**
   * Level order traversal with level information
   * @returns {Array} Array of arrays, each representing a level
   */
  levelOrderByLevels() {
    if (!this.root) return [];

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevel = [];

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        currentLevel.push(node.val);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      result.push(currentLevel);
    }

    return result;
  }

  /**
   * Get all leaf nodes
   * @returns {Array} Array of leaf node values
   */
  getLeaves() {
    const leaves = [];

    function findLeaves(node) {
      if (!node) return;

      if (node.isLeaf()) {
        leaves.push(node.val);
      } else {
        findLeaves(node.left);
        findLeaves(node.right);
      }
    }

    findLeaves(this.root);
    return leaves;
  }

  /**
   * Calculate the diameter of the tree
   * @returns {number} Diameter (longest path between any two nodes)
   */
  getDiameter() {
    let maxDiameter = 0;

    function getHeight(node) {
      if (!node) return 0;

      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);

      const currentDiameter = leftHeight + rightHeight;
      maxDiameter = Math.max(maxDiameter, currentDiameter);

      return 1 + Math.max(leftHeight, rightHeight);
    }

    getHeight(this.root);
    return maxDiameter;
  }

  /**
   * Check if the tree is balanced
   * @returns {boolean} True if balanced
   */
  isBalanced() {
    function checkBalance(node) {
      if (!node) return { balanced: true, height: 0 };

      const left = checkBalance(node.left);
      const right = checkBalance(node.right);

      const balanced =
        left.balanced &&
        right.balanced &&
        Math.abs(left.height - right.height) <= 1;

      return {
        balanced,
        height: 1 + Math.max(left.height, right.height)
      };
    }

    return checkBalance(this.root).balanced;
  }

  /**
   * Check if the tree is complete
   * @returns {boolean} True if complete
   */
  isComplete() {
    if (!this.root) return true;

    const queue = [this.root];
    let foundNull = false;

    while (queue.length > 0) {
      const node = queue.shift();

      if (node.left) {
        if (foundNull) return false;
        queue.push(node.left);
      } else {
        foundNull = true;
      }

      if (node.right) {
        if (foundNull) return false;
        queue.push(node.right);
      } else {
        foundNull = true;
      }
    }

    return true;
  }

  /**
   * Mirror the tree (swap left and right subtrees)
   * @returns {BinaryTree} This tree (for chaining)
   */
  mirror() {
    function mirrorHelper(node) {
      if (!node) return;

      // Swap children
      const temp = node.left;
      node.left = node.right;
      node.right = temp;

      // Recursively mirror subtrees
      mirrorHelper(node.left);
      mirrorHelper(node.right);
    }

    mirrorHelper(this.root);
    return this;
  }

  /**
   * Create a copy of this tree
   * @returns {BinaryTree} New tree that's a copy of this one
   */
  clone() {
    const newTree = new BinaryTree();
    if (this.root) {
      newTree.root = this.root.clone();
      newTree.size = this.size;
    }
    return newTree;
  }

  /**
   * Clear the tree
   */
  clear() {
    this.root = null;
    this.size = 0;
  }

  /**
   * Convert tree to array representation
   * @returns {Array} Array representation of tree
   */
  toArray() {
    if (!this.root) return [];

    const result = [];
    const queue = [this.root];

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
   * Create tree from array
   * @param {Array} arr - Array representation
   * @returns {BinaryTree} New tree created from array
   */
  static fromArray(arr) {
    const tree = new BinaryTree();
    if (!arr || arr.length === 0) return tree;

    tree.root = new TreeNode(arr[0]);
    tree.size = 1;

    const queue = [tree.root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
      const node = queue.shift();

      if (i < arr.length && arr[i] !== null) {
        node.left = new TreeNode(arr[i]);
        queue.push(node.left);
        tree.size++;
      }
      i++;

      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]);
        queue.push(node.right);
        tree.size++;
      }
      i++;
    }

    return tree;
  }

  /**
   * Print tree structure
   * @returns {string} Tree visualization
   */
  print() {
    if (!this.root) return "Empty tree";
    return this.root.printTree();
  }

  /**
   * Get tree statistics
   * @returns {Object} Object containing various tree statistics
   */
  getStatistics() {
    return {
      size: this.getSize(),
      height: this.getHeight(),
      isBalanced: this.isBalanced(),
      isComplete: this.isComplete(),
      diameter: this.getDiameter(),
      leafCount: this.getLeaves().length,
      levels: this.levelOrderByLevels().length
    };
  }

  /**
   * String representation
   * @returns {string} String representation of tree
   */
  toString() {
    if (!this.root) return "BinaryTree(empty)";
    return `BinaryTree(size: ${this.size}, height: ${this.getHeight()})`;
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BinaryTree };
}

// Test the implementation
function runTests() {
  console.log("Testing Binary Tree Implementation...\n");

  // Test 1: Basic operations
  console.log("Test 1: Basic Operations");
  const tree = new BinaryTree(1);
  console.log(`Initial tree: ${tree.toString()}`);

  tree.insert(2);
  tree.insert(3);
  tree.insert(4);
  tree.insert(5);

  console.log("After insertions:");
  console.log(tree.print());
  console.log(`Size: ${tree.getSize()}`);
  console.log(`Height: ${tree.getHeight()}`);
  console.log();

  // Test 2: Traversals
  console.log("Test 2: Traversals");
  console.log(`Inorder: [${tree.inorderTraversal().join(", ")}]`);
  console.log(`Preorder: [${tree.preorderTraversal().join(", ")}]`);
  console.log(`Postorder: [${tree.postorderTraversal().join(", ")}]`);
  console.log(`Level order: [${tree.levelOrderTraversal().join(", ")}]`);

  const levels = tree.levelOrderByLevels();
  console.log("By levels:");
  levels.forEach((level, i) => {
    console.log(`Level ${i}: [${level.join(", ")}]`);
  });
  console.log();

  // Test 3: Search and contains
  console.log("Test 3: Search Operations");
  console.log(`Contains 3: ${tree.contains(3)}`);
  console.log(`Contains 10: ${tree.contains(10)}`);

  const foundNode = tree.search(4);
  console.log(
    `Found node with value 4: ${foundNode ? foundNode.toString() : "null"}`
  );
  console.log();

  // Test 4: Tree properties
  console.log("Test 4: Tree Properties");
  const stats = tree.getStatistics();
  console.log("Tree statistics:");
  Object.entries(stats).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });

  console.log(`Leaves: [${tree.getLeaves().join(", ")}]`);
  console.log();

  // Test 5: Deletion
  console.log("Test 5: Deletion");
  console.log("Before deletion:");
  console.log(tree.print());

  tree.delete(2);
  console.log("After deleting 2:");
  console.log(tree.print());
  console.log(`Size: ${tree.getSize()}`);
  console.log();

  // Test 6: Array conversion
  console.log("Test 6: Array Conversion");
  const arr = tree.toArray();
  console.log(`Tree as array: [${arr.join(", ")}]`);

  const newTree = BinaryTree.fromArray([1, 2, 3, 4, 5, 6, 7]);
  console.log("New tree from array [1, 2, 3, 4, 5, 6, 7]:");
  console.log(newTree.print());
  console.log();

  // Test 7: Tree operations
  console.log("Test 7: Tree Operations");
  const originalTree = BinaryTree.fromArray([1, 2, 3, 4, 5]);
  console.log("Original tree:");
  console.log(originalTree.print());

  const clonedTree = originalTree.clone();
  console.log("Cloned tree:");
  console.log(clonedTree.print());

  originalTree.mirror();
  console.log("Original tree after mirroring:");
  console.log(originalTree.print());

  console.log("Cloned tree (unchanged):");
  console.log(clonedTree.print());
  console.log();
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
