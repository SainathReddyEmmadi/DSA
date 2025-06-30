/**
 * Binary Search Tree (BST) Implementation
 *
 * A Binary Search Tree where for every node:
 * - All values in left subtree are less than node's value
 * - All values in right subtree are greater than node's value
 * - Both subtrees are also BSTs
 *
 * Features:
 * - Efficient insert, delete, search operations
 * - In-order traversal gives sorted sequence
 * - Various BST-specific operations
 * - Self-balancing considerations
 *
 * Time Complexities:
 * - Search: O(log n) average, O(n) worst case
 * - Insert: O(log n) average, O(n) worst case
 * - Delete: O(log n) average, O(n) worst case
 * - Traversal: O(n)
 *
 * Space Complexity: O(n) for storage, O(h) for recursion
 */

const { TreeNode } = require("./tree-node");

class BST {
  /**
   * Create a new Binary Search Tree
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
   * @returns {number} Number of nodes
   */
  getSize() {
    return this.size;
  }

  /**
   * Get the height of the tree
   * @returns {number} Height of the tree
   */
  getHeight() {
    if (!this.root) return -1;
    return this.root.getHeight();
  }

  /**
   * Insert a value into the BST
   * @param {*} val - Value to insert
   * @returns {TreeNode} The inserted node
   */
  insert(val) {
    if (!this.root) {
      this.root = new TreeNode(val);
      this.size++;
      return this.root;
    }

    const insertedNode = this._insertNode(this.root, val);
    if (insertedNode) {
      this.size++;
    }
    return insertedNode;
  }

  /**
   * Helper method to insert a node recursively
   * @param {TreeNode} node - Current node
   * @param {*} val - Value to insert
   * @returns {TreeNode|null} Inserted node or null if duplicate
   */
  _insertNode(node, val) {
    if (val < node.val) {
      if (!node.left) {
        node.left = new TreeNode(val);
        return node.left;
      } else {
        return this._insertNode(node.left, val);
      }
    } else if (val > node.val) {
      if (!node.right) {
        node.right = new TreeNode(val);
        return node.right;
      } else {
        return this._insertNode(node.right, val);
      }
    }
    // Duplicate value - don't insert
    return null;
  }

  /**
   * Insert multiple values
   * @param {Array} values - Array of values to insert
   * @returns {Array} Array of inserted nodes
   */
  insertMany(values) {
    return values
      .map((val) => this.insert(val))
      .filter((node) => node !== null);
  }

  /**
   * Search for a value in the BST
   * @param {*} val - Value to search for
   * @returns {TreeNode|null} Found node or null
   */
  search(val) {
    return this._searchNode(this.root, val);
  }

  /**
   * Helper method to search recursively
   * @param {TreeNode} node - Current node
   * @param {*} val - Value to search for
   * @returns {TreeNode|null} Found node or null
   */
  _searchNode(node, val) {
    if (!node || node.val === val) {
      return node;
    }

    if (val < node.val) {
      return this._searchNode(node.left, val);
    } else {
      return this._searchNode(node.right, val);
    }
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
   * Delete a value from the BST
   * @param {*} val - Value to delete
   * @returns {boolean} True if deletion was successful
   */
  delete(val) {
    const initialSize = this.size;
    this.root = this._deleteNode(this.root, val);
    return this.size < initialSize;
  }

  /**
   * Helper method to delete a node recursively
   * @param {TreeNode} node - Current node
   * @param {*} val - Value to delete
   * @returns {TreeNode|null} Updated node
   */
  _deleteNode(node, val) {
    if (!node) return null;

    if (val < node.val) {
      node.left = this._deleteNode(node.left, val);
      return node;
    } else if (val > node.val) {
      node.right = this._deleteNode(node.right, val);
      return node;
    } else {
      // Found the node to delete
      this.size--;

      // Case 1: Node has no children (leaf)
      if (!node.left && !node.right) {
        return null;
      }

      // Case 2: Node has one child
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      // Case 3: Node has two children
      // Find inorder successor (smallest value in right subtree)
      const successor = this._findMin(node.right);
      node.val = successor.val;

      // Delete the successor (which has at most one child)
      this.size++; // Compensate for the decrement above
      node.right = this._deleteNode(node.right, successor.val);

      return node;
    }
  }

  /**
   * Find the minimum value in the tree
   * @returns {*} Minimum value or null if empty
   */
  findMin() {
    if (!this.root) return null;
    return this._findMin(this.root).val;
  }

  /**
   * Helper method to find minimum node
   * @param {TreeNode} node - Starting node
   * @returns {TreeNode} Node with minimum value
   */
  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  /**
   * Find the maximum value in the tree
   * @returns {*} Maximum value or null if empty
   */
  findMax() {
    if (!this.root) return null;
    return this._findMax(this.root).val;
  }

  /**
   * Helper method to find maximum node
   * @param {TreeNode} node - Starting node
   * @returns {TreeNode} Node with maximum value
   */
  _findMax(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }

  /**
   * Find the successor of a given value
   * @param {*} val - Value to find successor for
   * @returns {*} Successor value or null
   */
  findSuccessor(val) {
    const node = this.search(val);
    if (!node) return null;

    // Case 1: Node has right subtree
    if (node.right) {
      return this._findMin(node.right).val;
    }

    // Case 2: No right subtree, find ancestor
    let successor = null;
    let current = this.root;

    while (current) {
      if (val < current.val) {
        successor = current;
        current = current.left;
      } else if (val > current.val) {
        current = current.right;
      } else {
        break;
      }
    }

    return successor ? successor.val : null;
  }

  /**
   * Find the predecessor of a given value
   * @param {*} val - Value to find predecessor for
   * @returns {*} Predecessor value or null
   */
  findPredecessor(val) {
    const node = this.search(val);
    if (!node) return null;

    // Case 1: Node has left subtree
    if (node.left) {
      return this._findMax(node.left).val;
    }

    // Case 2: No left subtree, find ancestor
    let predecessor = null;
    let current = this.root;

    while (current) {
      if (val > current.val) {
        predecessor = current;
        current = current.right;
      } else if (val < current.val) {
        current = current.left;
      } else {
        break;
      }
    }

    return predecessor ? predecessor.val : null;
  }

  /**
   * Validate that this is a proper BST
   * @returns {boolean} True if valid BST
   */
  isValidBST() {
    return this._validateBST(this.root, -Infinity, Infinity);
  }

  /**
   * Helper method to validate BST property
   * @param {TreeNode} node - Current node
   * @param {*} min - Minimum allowed value
   * @param {*} max - Maximum allowed value
   * @returns {boolean} True if valid
   */
  _validateBST(node, min, max) {
    if (!node) return true;

    if (node.val <= min || node.val >= max) {
      return false;
    }

    return (
      this._validateBST(node.left, min, node.val) &&
      this._validateBST(node.right, node.val, max)
    );
  }

  /**
   * Inorder traversal (gives sorted sequence for BST)
   * @param {Function} callback - Optional callback function
   * @returns {Array} Array of values in sorted order
   */
  inorderTraversal(callback = null) {
    const result = [];

    function inorder(node) {
      if (!node) return;

      inorder(node.left);

      if (callback) callback(node.val);
      result.push(node.val);

      inorder(node.right);
    }

    inorder(this.root);
    return result;
  }

  /**
   * Preorder traversal
   * @param {Function} callback - Optional callback function
   * @returns {Array} Array of values in preorder
   */
  preorderTraversal(callback = null) {
    const result = [];

    function preorder(node) {
      if (!node) return;

      if (callback) callback(node.val);
      result.push(node.val);

      preorder(node.left);
      preorder(node.right);
    }

    preorder(this.root);
    return result;
  }

  /**
   * Postorder traversal
   * @param {Function} callback - Optional callback function
   * @returns {Array} Array of values in postorder
   */
  postorderTraversal(callback = null) {
    const result = [];

    function postorder(node) {
      if (!node) return;

      postorder(node.left);
      postorder(node.right);

      if (callback) callback(node.val);
      result.push(node.val);
    }

    postorder(this.root);
    return result;
  }

  /**
   * Level order traversal
   * @param {Function} callback - Optional callback function
   * @returns {Array} Array of values in level order
   */
  levelOrderTraversal(callback = null) {
    if (!this.root) return [];

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();

      if (callback) callback(node.val);
      result.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  /**
   * Find all values in a given range
   * @param {*} min - Minimum value (inclusive)
   * @param {*} max - Maximum value (inclusive)
   * @returns {Array} Array of values in range
   */
  findInRange(min, max) {
    const result = [];

    function findInRangeHelper(node) {
      if (!node) return;

      // If current node is in range, add it
      if (node.val >= min && node.val <= max) {
        result.push(node.val);
      }

      // Recursively search left if there might be values in range
      if (node.val > min) {
        findInRangeHelper(node.left);
      }

      // Recursively search right if there might be values in range
      if (node.val < max) {
        findInRangeHelper(node.right);
      }
    }

    findInRangeHelper(this.root);
    return result.sort((a, b) => a - b);
  }

  /**
   * Find the kth smallest element
   * @param {number} k - Position (1-indexed)
   * @returns {*} Kth smallest element or null
   */
  findKthSmallest(k) {
    if (k <= 0 || k > this.size) return null;

    let count = 0;
    let result = null;

    function inorder(node) {
      if (!node || result !== null) return;

      inorder(node.left);

      count++;
      if (count === k) {
        result = node.val;
        return;
      }

      inorder(node.right);
    }

    inorder(this.root);
    return result;
  }

  /**
   * Find the kth largest element
   * @param {number} k - Position (1-indexed)
   * @returns {*} Kth largest element or null
   */
  findKthLargest(k) {
    return this.findKthSmallest(this.size - k + 1);
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
   * Convert BST to sorted array
   * @returns {Array} Sorted array of all values
   */
  toSortedArray() {
    return this.inorderTraversal();
  }

  /**
   * Create BST from sorted array
   * @param {Array} arr - Sorted array
   * @returns {BST} New balanced BST
   */
  static fromSortedArray(arr) {
    const bst = new BST();

    function buildBalanced(start, end) {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new TreeNode(arr[mid]);

      node.left = buildBalanced(start, mid - 1);
      node.right = buildBalanced(mid + 1, end);

      return node;
    }

    bst.root = buildBalanced(0, arr.length - 1);
    bst.size = arr.length;
    return bst;
  }

  /**
   * Clear the tree
   */
  clear() {
    this.root = null;
    this.size = 0;
  }

  /**
   * Print tree structure
   * @returns {string} Tree visualization
   */
  print() {
    if (!this.root) return "Empty BST";
    return this.root.printTree();
  }

  /**
   * Get tree statistics
   * @returns {Object} Object containing tree statistics
   */
  getStatistics() {
    return {
      size: this.getSize(),
      height: this.getHeight(),
      isBalanced: this.isBalanced(),
      isValidBST: this.isValidBST(),
      min: this.findMin(),
      max: this.findMax()
    };
  }

  /**
   * String representation
   * @returns {string} String representation
   */
  toString() {
    if (!this.root) return "BST(empty)";
    return `BST(size: ${
      this.size
    }, height: ${this.getHeight()}, range: ${this.findMin()}-${this.findMax()})`;
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BST };
}

// Test the implementation
function runTests() {
  console.log("Testing Binary Search Tree Implementation...\n");

  // Test 1: Basic operations
  console.log("Test 1: Basic Operations");
  const bst = new BST();

  // Insert values
  const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];
  console.log(`Inserting values: [${values.join(", ")}]`);
  bst.insertMany(values);

  console.log("BST structure:");
  console.log(bst.print());
  console.log(`${bst.toString()}\n`);

  // Test 2: Search operations
  console.log("Test 2: Search Operations");
  console.log(`Contains 40: ${bst.contains(40)}`);
  console.log(`Contains 90: ${bst.contains(90)}`);
  console.log(`Min value: ${bst.findMin()}`);
  console.log(`Max value: ${bst.findMax()}`);
  console.log(`Successor of 30: ${bst.findSuccessor(30)}`);
  console.log(`Predecessor of 30: ${bst.findPredecessor(30)}`);
  console.log();

  // Test 3: Traversals
  console.log("Test 3: Traversals");
  console.log(`Inorder (sorted): [${bst.inorderTraversal().join(", ")}]`);
  console.log(`Preorder: [${bst.preorderTraversal().join(", ")}]`);
  console.log(`Postorder: [${bst.postorderTraversal().join(", ")}]`);
  console.log(`Level order: [${bst.levelOrderTraversal().join(", ")}]`);
  console.log();

  // Test 4: Range and kth element operations
  console.log("Test 4: Advanced Operations");
  console.log(
    `Values in range [25, 65]: [${bst.findInRange(25, 65).join(", ")}]`
  );
  console.log(`3rd smallest element: ${bst.findKthSmallest(3)}`);
  console.log(`3rd largest element: ${bst.findKthLargest(3)}`);
  console.log();

  // Test 5: Validation and properties
  console.log("Test 5: Validation and Properties");
  const stats = bst.getStatistics();
  console.log("BST statistics:");
  Object.entries(stats).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
  console.log();

  // Test 6: Deletion
  console.log("Test 6: Deletion");
  console.log("Before deletion:");
  console.log(`Inorder: [${bst.inorderTraversal().join(", ")}]`);

  console.log("\nDeleting leaf node (10):");
  bst.delete(10);
  console.log(`Inorder: [${bst.inorderTraversal().join(", ")}]`);

  console.log("\nDeleting node with one child (25):");
  bst.delete(25);
  console.log(`Inorder: [${bst.inorderTraversal().join(", ")}]`);

  console.log("\nDeleting node with two children (30):");
  bst.delete(30);
  console.log(`Inorder: [${bst.inorderTraversal().join(", ")}]`);

  console.log("\nFinal BST structure:");
  console.log(bst.print());
  console.log();

  // Test 7: Creating balanced BST from sorted array
  console.log("Test 7: Balanced BST from Sorted Array");
  const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const balancedBST = BST.fromSortedArray(sortedArray);

  console.log(`Created BST from sorted array: [${sortedArray.join(", ")}]`);
  console.log("Balanced BST structure:");
  console.log(balancedBST.print());

  const balancedStats = balancedBST.getStatistics();
  console.log(
    `Height: ${balancedStats.height} (should be around log2(${
      sortedArray.length
    }) ≈ ${Math.floor(Math.log2(sortedArray.length))})`
  );
  console.log(`Is balanced: ${balancedStats.isBalanced}`);
  console.log();
}

// Performance tests
function performanceTest() {
  console.log("Performance Testing BST...\n");

  const sizes = [1000, 5000, 10000];

  sizes.forEach((size) => {
    console.log(`Testing with ${size} elements:`);

    // Test with random insertions (worst case for BST)
    console.log("Random insertions:");
    const randomBST = new BST();
    const randomValues = Array.from({ length: size }, () =>
      Math.floor(Math.random() * size * 2)
    );

    let start = performance.now();
    randomValues.forEach((val) => randomBST.insert(val));
    let end = performance.now();
    console.log(`Insert time: ${(end - start).toFixed(2)}ms`);

    start = performance.now();
    randomValues.forEach((val) => randomBST.search(val));
    end = performance.now();
    console.log(`Search time: ${(end - start).toFixed(2)}ms`);

    // Test with balanced BST
    console.log("Balanced BST:");
    const sortedValues = Array.from({ length: size }, (_, i) => i);
    const balancedBST = BST.fromSortedArray(sortedValues);

    start = performance.now();
    sortedValues.forEach((val) => balancedBST.search(val));
    end = performance.now();
    console.log(`Search time: ${(end - start).toFixed(2)}ms`);

    console.log(`Random BST height: ${randomBST.getHeight()}`);
    console.log(`Balanced BST height: ${balancedBST.getHeight()}`);
    console.log();
  });
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
}
