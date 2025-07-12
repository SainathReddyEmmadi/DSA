/**
 * Copy List with Random Pointer (LeetCode 138)
 * Difficulty: Medium
 *
 * A linked list of length n is given such that each node contains an additional random pointer,
 * which could point to any node in the list, or null.
 * Construct a deep copy of the list.
 */

class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

/**
 * Approach 1: HashMap (Optimal)
 * Time: O(n), Space: O(n)
 */
function copyRandomList(head) {
  if (!head) return null;

  const nodeMap = new Map();

  // First pass: create all nodes
  let current = head;
  while (current) {
    nodeMap.set(current, new Node(current.val));
    current = current.next;
  }

  // Second pass: set next and random pointers
  current = head;
  while (current) {
    const copy = nodeMap.get(current);
    copy.next = current.next ? nodeMap.get(current.next) : null;
    copy.random = current.random ? nodeMap.get(current.random) : null;
    current = current.next;
  }

  return nodeMap.get(head);
}

/**
 * Approach 2: Interweaving (O(1) space)
 * Time: O(n), Space: O(1)
 */
function copyRandomListInterweave(head) {
  if (!head) return null;

  // Step 1: Create copy nodes and interweave them
  let current = head;
  while (current) {
    const copy = new Node(current.val);
    copy.next = current.next;
    current.next = copy;
    current = copy.next;
  }

  // Step 2: Set random pointers for copy nodes
  current = head;
  while (current) {
    if (current.random) {
      current.next.random = current.random.next;
    }
    current = current.next.next;
  }

  // Step 3: Separate the original and copy lists
  const dummy = new Node(0);
  let copyTail = dummy;
  current = head;

  while (current) {
    const copy = current.next;
    current.next = copy.next;
    copyTail.next = copy;
    copyTail = copy;
    current = current.next;
  }

  return dummy.next;
}

// Helper function to create test cases
function createRandomList(values, randomIndices) {
  if (values.length === 0) return null;

  const nodes = values.map((val) => new Node(val));

  // Set next pointers
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  // Set random pointers
  for (let i = 0; i < randomIndices.length; i++) {
    if (randomIndices[i] !== null) {
      nodes[i].random = nodes[randomIndices[i]];
    }
  }

  return nodes[0];
}

// Helper function to verify copy
function verifyCopy(original, copy) {
  const originalNodes = new Set();
  const copyNodes = new Set();

  let orig = original;
  let cp = copy;

  while (orig && cp) {
    if (orig.val !== cp.val) return false;
    if (originalNodes.has(orig) || copyNodes.has(cp)) return false;

    originalNodes.add(orig);
    copyNodes.add(cp);

    orig = orig.next;
    cp = cp.next;
  }

  return orig === null && cp === null;
}

// Test cases
function runTests() {
  console.log("Testing Copy List with Random Pointer:");

  const testCases = [
    {
      values: [7, 13, 11, 10, 1],
      randomIndices: [null, 0, 4, 2, 0],
      description: "Standard case with various random pointers"
    },
    {
      values: [1, 2],
      randomIndices: [1, 1],
      description: "Two nodes"
    },
    {
      values: [3, 3, 3],
      randomIndices: [null, 0, null],
      description: "Duplicate values"
    },
    {
      values: [],
      randomIndices: [],
      description: "Empty list"
    }
  ];

  testCases.forEach((test, index) => {
    const original1 = createRandomList(test.values, test.randomIndices);
    const original2 = createRandomList(test.values, test.randomIndices);

    const copy1 = copyRandomList(original1);
    const copy2 = copyRandomListInterweave(original2);

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`Values: [${test.values.join(", ")}]`);
    console.log(`Random indices: [${test.randomIndices.join(", ")}]`);

    const isValid1 = verifyCopy(
      createRandomList(test.values, test.randomIndices),
      copy1
    );
    const isValid2 = verifyCopy(
      createRandomList(test.values, test.randomIndices),
      copy2
    );

    console.log(`HashMap approach: ${isValid1 ? "✓" : "✗"}`);
    console.log(`Interweave approach: ${isValid2 ? "✓" : "✗"}`);
  });
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

module.exports = {
  copyRandomList,
  copyRandomListInterweave,
  Node,
  createRandomList
};
