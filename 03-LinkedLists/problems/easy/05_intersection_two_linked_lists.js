/**
 * Intersection of Two Linked Lists (LeetCode 160)
 * Difficulty: Easy
 *
 * Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect.
 * If the two linked lists have no intersection at all, return null.
 *
 * Pattern: Two Pointers / Length Difference
 *
 * Examples:
 * Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
 * Output: Intersected at '8'
 *
 * Input: intersectVal = 0, listA = [2,6,4], listB = [1,5]
 * Output: No intersection
 */

const { ListNode, arrayToList } = require("./01_reverse_linked_list.js");

/**
 * Approach 1: Two Pointers with Path Switching (Optimal)
 * Time: O(m + n), Space: O(1)
 *
 * When pointer reaches end, switch to the other list's head.
 * If intersection exists, they'll meet at the intersection.
 */
function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;

  let pointerA = headA;
  let pointerB = headB;

  // When one pointer reaches the end, redirect it to the other list's head
  // If there's intersection, they'll meet after at most m + n steps
  while (pointerA !== pointerB) {
    pointerA = pointerA ? pointerA.next : headB;
    pointerB = pointerB ? pointerB.next : headA;
  }

  return pointerA; // Either intersection node or null
}

/**
 * Approach 2: Length Difference Calculation
 * Time: O(m + n), Space: O(1)
 *
 * Calculate lengths, align the longer list, then traverse together.
 */
function getIntersectionNodeLength(headA, headB) {
  if (!headA || !headB) return null;

  // Calculate lengths
  const lengthA = getLength(headA);
  const lengthB = getLength(headB);

  // Align the starting points
  let currentA = headA;
  let currentB = headB;

  const diff = Math.abs(lengthA - lengthB);

  // Move the longer list's pointer ahead
  if (lengthA > lengthB) {
    for (let i = 0; i < diff; i++) {
      currentA = currentA.next;
    }
  } else {
    for (let i = 0; i < diff; i++) {
      currentB = currentB.next;
    }
  }

  // Traverse together until intersection or end
  while (currentA && currentB) {
    if (currentA === currentB) {
      return currentA;
    }
    currentA = currentA.next;
    currentB = currentB.next;
  }

  return null; // No intersection
}

/**
 * Approach 3: Using HashSet
 * Time: O(m + n), Space: O(m) or O(n)
 *
 * Store all nodes from one list, then check the other list.
 */
function getIntersectionNodeSet(headA, headB) {
  if (!headA || !headB) return null;

  const nodesSet = new Set();

  // Add all nodes from list A to set
  let current = headA;
  while (current) {
    nodesSet.add(current);
    current = current.next;
  }

  // Check if any node from list B is in the set
  current = headB;
  while (current) {
    if (nodesSet.has(current)) {
      return current;
    }
    current = current.next;
  }

  return null; // No intersection
}

/**
 * Approach 4: Stack-based (Less Efficient)
 * Time: O(m + n), Space: O(m + n)
 *
 * Push both lists to stacks, pop until they differ.
 */
function getIntersectionNodeStack(headA, headB) {
  if (!headA || !headB) return null;

  const stackA = [];
  const stackB = [];

  // Push all nodes to stacks
  let current = headA;
  while (current) {
    stackA.push(current);
    current = current.next;
  }

  current = headB;
  while (current) {
    stackB.push(current);
    current = current.next;
  }

  // Pop from both stacks until they differ
  let intersection = null;
  while (stackA.length > 0 && stackB.length > 0) {
    const nodeA = stackA.pop();
    const nodeB = stackB.pop();

    if (nodeA === nodeB) {
      intersection = nodeA;
    } else {
      break;
    }
  }

  return intersection;
}

// Helper functions
function getLength(head) {
  let length = 0;
  let current = head;
  while (current) {
    length++;
    current = current.next;
  }
  return length;
}

/**
 * Helper: Create intersection between two lists
 * Creates two lists that intersect at a given node value
 */
function createIntersection(listA, listB, intersectVal, skipA, skipB) {
  if (intersectVal === 0) {
    // No intersection
    return {
      headA: arrayToList(listA),
      headB: arrayToList(listB)
    };
  }

  const headA = arrayToList(listA);
  const headB = arrayToList(listB);

  // Find the intersection node in listA
  let nodeA = headA;
  for (let i = 0; i < skipA; i++) {
    nodeA = nodeA.next;
  }

  // Connect listB to the intersection point
  let nodeB = headB;
  for (let i = 0; i < skipB - 1; i++) {
    nodeB = nodeB.next;
  }
  nodeB.next = nodeA;

  return { headA, headB };
}

/**
 * Helper: Check if two nodes are the same (for testing)
 */
function isSameNode(nodeA, nodeB) {
  return nodeA === nodeB;
}

/**
 * Advanced: Get intersection and all common nodes after it
 */
function getIntersectionData(headA, headB) {
  const intersection = getIntersectionNode(headA, headB);
  if (!intersection) {
    return { intersection: null, commonNodes: [] };
  }

  const commonNodes = [];
  let current = intersection;
  while (current) {
    commonNodes.push(current.val);
    current = current.next;
  }

  return { intersection, commonNodes };
}

// Test cases
function runTests() {
  console.log("Testing Intersection of Two Linked Lists:");

  const testCases = [
    {
      listA: [4, 1, 8, 4, 5],
      listB: [5, 6, 1, 8, 4, 5],
      intersectVal: 8,
      skipA: 2,
      skipB: 3,
      description: "Lists intersect at node with value 8"
    },
    {
      listA: [1, 9, 1, 2, 4],
      listB: [3, 2, 4],
      intersectVal: 2,
      skipA: 3,
      skipB: 1,
      description: "Lists intersect at node with value 2"
    },
    {
      listA: [2, 6, 4],
      listB: [1, 5],
      intersectVal: 0,
      skipA: 3,
      skipB: 2,
      description: "No intersection"
    },
    {
      listA: [1],
      listB: [1],
      intersectVal: 0,
      skipA: 1,
      skipB: 1,
      description: "Single nodes, no intersection"
    }
  ];

  testCases.forEach((test, index) => {
    const { headA: headA1, headB: headB1 } = createIntersection(
      test.listA,
      test.listB,
      test.intersectVal,
      test.skipA,
      test.skipB
    );
    const { headA: headA2, headB: headB2 } = createIntersection(
      test.listA,
      test.listB,
      test.intersectVal,
      test.skipA,
      test.skipB
    );
    const { headA: headA3, headB: headB3 } = createIntersection(
      test.listA,
      test.listB,
      test.intersectVal,
      test.skipA,
      test.skipB
    );
    const { headA: headA4, headB: headB4 } = createIntersection(
      test.listA,
      test.listB,
      test.intersectVal,
      test.skipA,
      test.skipB
    );

    const result1 = getIntersectionNode(headA1, headB1);
    const result2 = getIntersectionNodeLength(headA2, headB2);
    const result3 = getIntersectionNodeSet(headA3, headB3);
    const result4 = getIntersectionNodeStack(headA4, headB4);

    const expectedVal = test.intersectVal === 0 ? null : test.intersectVal;
    const actualVal1 = result1 ? result1.val : null;
    const actualVal2 = result2 ? result2.val : null;
    const actualVal3 = result3 ? result3.val : null;
    const actualVal4 = result4 ? result4.val : null;

    console.log(`\\nTest ${index + 1}: ${test.description}`);
    console.log(`ListA: [${test.listA.join(", ")}]`);
    console.log(`ListB: [${test.listB.join(", ")}]`);
    console.log(`Expected intersection value: ${expectedVal}`);
    console.log(
      `Two Pointers: ${actualVal1} ${actualVal1 === expectedVal ? "✓" : "✗"}`
    );
    console.log(
      `Length Diff: ${actualVal2} ${actualVal2 === expectedVal ? "✓" : "✗"}`
    );
    console.log(`Set: ${actualVal3} ${actualVal3 === expectedVal ? "✓" : "✗"}`);
    console.log(
      `Stack: ${actualVal4} ${actualVal4 === expectedVal ? "✓" : "✗"}`
    );
  });
}

// Performance test
function performanceTest() {
  console.log("\\n\\nPerformance Test:");

  const sizes = [1000, 5000, 10000];

  sizes.forEach((size) => {
    // Create two lists with intersection at the middle
    const commonTail = Array.from({ length: size / 4 }, (_, i) => i + 1000);
    const listA = Array.from({ length: size / 2 }, (_, i) => i).concat(
      commonTail
    );
    const listB = Array.from({ length: size / 3 }, (_, i) => i + 500).concat(
      commonTail
    );

    const skipA = size / 2;
    const skipB = size / 3;

    console.log(`\\nList sizes: A=${listA.length}, B=${listB.length}`);

    // Test Two Pointers
    let { headA, headB } = createIntersection(listA, listB, 1000, skipA, skipB);
    let start = performance.now();
    getIntersectionNode(headA, headB);
    let end = performance.now();
    console.log(`Two Pointers: ${(end - start).toFixed(2)}ms`);

    // Test Length Difference
    ({ headA, headB } = createIntersection(listA, listB, 1000, skipA, skipB));
    start = performance.now();
    getIntersectionNodeLength(headA, headB);
    end = performance.now();
    console.log(`Length Diff: ${(end - start).toFixed(2)}ms`);

    // Test Set (for smaller sizes)
    if (size <= 5000) {
      ({ headA, headB } = createIntersection(listA, listB, 1000, skipA, skipB));
      start = performance.now();
      getIntersectionNodeSet(headA, headB);
      end = performance.now();
      console.log(`Set: ${(end - start).toFixed(2)}ms`);
    }

    // Test Stack (for smaller sizes)
    if (size <= 5000) {
      ({ headA, headB } = createIntersection(listA, listB, 1000, skipA, skipB));
      start = performance.now();
      getIntersectionNodeStack(headA, headB);
      end = performance.now();
      console.log(`Stack: ${(end - start).toFixed(2)}ms`);
    }
  });
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
Intersection of Two Linked Lists - Algorithm Explanation:

The goal is to find the node where two linked lists intersect (if they do).

Two Pointers with Path Switching (Optimal):
1. Use two pointers, one for each list
2. When a pointer reaches the end, redirect it to the other list's head
3. If intersection exists, pointers will meet at the intersection node
4. If no intersection, both will become null simultaneously

Why it works:
- Let lengths be m and n, intersection point at distance c from end
- Pointer A travels: m + (n - c) = m + n - c steps to reach intersection
- Pointer B travels: n + (m - c) = m + n - c steps to reach intersection
- They meet exactly at the intersection point!

Length Difference Approach:
1. Calculate lengths of both lists
2. Move the longer list's pointer ahead by the difference
3. Then traverse both lists together until they meet

Visual Example:
ListA: a1 → a2 → c1 → c2 → c3
ListB: b1 → b2 → b3 → c1 → c2 → c3

Path switching:
- PointerA: a1→a2→c1→c2→c3→null→b1→b2→b3→c1 (meets here)
- PointerB: b1→b2→b3→c1→c2→c3→null→a1→a2→c1 (meets here)

Key Insights:
- Intersection means the SAME node object, not just same value
- After intersection, both lists share the same tail
- If no intersection, both pointers will eventually become null

Time Complexity: O(m + n) for all optimal approaches
Space Complexity: O(1) for pointer approaches, O(min(m,n)) for set approach

Applications:
- Detect shared resources in systems
- Find common subsequences
- Merge point detection in state machines
- Social network connection analysis
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  getIntersectionNode,
  getIntersectionNodeLength,
  getIntersectionNodeSet,
  getIntersectionNodeStack,
  createIntersection,
  getIntersectionData,
  getLength
};
