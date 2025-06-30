/**
 * 150. Evaluate Reverse Polish Notation
 * https://leetcode.com/problems/evaluate-reverse-polish-notation/
 *
 * Difficulty: Medium
 * Topics: Array, Math, Stack
 *
 * You are given an array of strings tokens that represents an arithmetic expression
 * in Reverse Polish Notation.
 *
 * Evaluate the expression. Return an integer that represents the value of the expression.
 *
 * Note that:
 * - The valid operators are '+', '-', '*', and '/'.
 * - Each operand may be an integer or another expression.
 * - The division between two integers always truncates toward zero.
 * - There will not be any division by zero.
 * - The input represents a valid arithmetic expression in a reverse polish notation.
 * - The answer and all the intermediate calculations can be represented in a 32-bit integer.
 *
 * Example 1:
 * Input: tokens = ["2","1","+","3","*"]
 * Output: 9
 * Explanation: ((2 + 1) * 3) = 9
 *
 * Example 2:
 * Input: tokens = ["4","13","5","/","+"]
 * Output: 6
 * Explanation: (4 + (13 / 5)) = 6
 *
 * Example 3:
 * Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
 * Output: 22
 */

/**
 * APPROACH 1: Stack-based Evaluation
 * Time Complexity: O(n) - single pass through tokens
 * Space Complexity: O(n) - stack can hold up to n/2 + 1 elements
 *
 * Algorithm:
 * 1. Use stack to store operands
 * 2. For each token:
 *    - If number, push to stack
 *    - If operator, pop two operands, compute, push result
 * 3. Final result is the only element left in stack
 *
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPNStack(tokens) {
  const stack = [];
  const operators = new Set(["+", "-", "*", "/"]);

  for (const token of tokens) {
    if (operators.has(token)) {
      // Pop two operands (order matters for - and /)
      const b = stack.pop(); // Second operand
      const a = stack.pop(); // First operand

      let result;
      switch (token) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          // Truncate toward zero
          result = Math.trunc(a / b);
          break;
      }

      stack.push(result);
    } else {
      // Convert string to number and push
      stack.push(parseInt(token));
    }
  }

  return stack[0];
}

/**
 * APPROACH 2: Stack with Function Map
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Use function map for cleaner operator handling
 *
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPNFunctionMap(tokens) {
  const stack = [];

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b)
  };

  for (const token of tokens) {
    if (token in operations) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operations[token](a, b));
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack[0];
}

/**
 * APPROACH 3: Recursive Evaluation
 * Time Complexity: O(n)
 * Space Complexity: O(n) - recursion call stack
 *
 * Process tokens from right to left recursively
 *
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPNRecursive(tokens) {
  const operators = new Set(["+", "-", "*", "/"]);
  let index = tokens.length - 1;

  function evaluate() {
    const token = tokens[index--];

    if (operators.has(token)) {
      // For RPN, get operands in reverse order
      const b = evaluate();
      const a = evaluate();

      switch (token) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return Math.trunc(a / b);
      }
    } else {
      return parseInt(token);
    }
  }

  return evaluate();
}

/**
 * APPROACH 4: Two-Pass with Expression Tree
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * Build expression tree first, then evaluate
 *
 * @param {string[]} tokens
 * @return {number}
 */
class ExpressionTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function evalRPNExpressionTree(tokens) {
  const stack = [];
  const operators = new Set(["+", "-", "*", "/"]);

  // Build expression tree
  for (const token of tokens) {
    if (operators.has(token)) {
      const right = stack.pop();
      const left = stack.pop();
      const node = new ExpressionTreeNode(token, left, right);
      stack.push(node);
    } else {
      stack.push(new ExpressionTreeNode(parseInt(token)));
    }
  }

  // Evaluate expression tree
  function evaluateTree(node) {
    if (!node) return 0;

    if (typeof node.val === "number") {
      return node.val;
    }

    const left = evaluateTree(node.left);
    const right = evaluateTree(node.right);

    switch (node.val) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        return Math.trunc(left / right);
    }
  }

  return evaluateTree(stack[0]);
}

/**
 * APPROACH 5: In-place Array Manipulation
 * Time Complexity: O(n)
 * Space Complexity: O(1) extra space (modifies input)
 *
 * Use the input array as stack
 *
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPNInPlace(tokens) {
  const operators = new Set(["+", "-", "*", "/"]);
  let stackSize = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (operators.has(token)) {
      const b = tokens[stackSize - 1];
      const a = tokens[stackSize - 2];

      let result;
      switch (token) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          result = Math.trunc(a / b);
          break;
      }

      tokens[stackSize - 2] = result;
      stackSize--;
    } else {
      tokens[stackSize] = parseInt(token);
      stackSize++;
    }
  }

  return tokens[0];
}

// Main function (using stack-based approach as default)
const evalRPN = evalRPNStack;

// ============================================================================
// TESTING
// ============================================================================

function testEvalRPN() {
  console.log("Testing Evaluate Reverse Polish Notation...\n");

  const testCases = [
    {
      tokens: ["2", "1", "+", "3", "*"],
      expected: 9,
      description: "((2 + 1) * 3) = 9"
    },
    {
      tokens: ["4", "13", "5", "/", "+"],
      expected: 6,
      description: "(4 + (13 / 5)) = 6"
    },
    {
      tokens: [
        "10",
        "6",
        "9",
        "3",
        "+",
        "-11",
        "*",
        "/",
        "*",
        "17",
        "+",
        "5",
        "+"
      ],
      expected: 22,
      description: "Complex expression = 22"
    },
    {
      tokens: ["4"],
      expected: 4,
      description: "Single number"
    },
    {
      tokens: ["2", "3", "+"],
      expected: 5,
      description: "Simple addition"
    },
    {
      tokens: [
        "15",
        "7",
        "1",
        "1",
        "+",
        "/",
        "/",
        "3",
        "/",
        "2",
        "1",
        "1",
        "+",
        "+",
        "-"
      ],
      expected: 5,
      description: "Complex with multiple operations"
    },
    {
      tokens: ["3", "11", "+", "5", "-"],
      expected: 9,
      description: "(3 + 11) - 5 = 9"
    },
    {
      tokens: ["18"],
      expected: 18,
      description: "Single large number"
    }
  ];

  const approaches = [
    { name: "Stack", fn: evalRPNStack },
    { name: "Function Map", fn: evalRPNFunctionMap },
    { name: "Recursive", fn: evalRPNRecursive },
    { name: "Expression Tree", fn: evalRPNExpressionTree }
  ];

  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}: ${testCase.description}`);
    console.log(`Tokens: [${testCase.tokens.join(", ")}]`);
    console.log(`Expected: ${testCase.expected}`);

    approaches.forEach((approach) => {
      // Create copy of tokens for approaches that might modify input
      const tokensCopy = [...testCase.tokens];
      const result = approach.fn(tokensCopy);
      const passed = result === testCase.expected;
      console.log(`${approach.name}: ${result} - ${passed ? "PASS" : "FAIL"}`);
    });

    // Test in-place approach separately (modifies input)
    const tokensForInPlace = [...testCase.tokens];
    const inPlaceResult = evalRPNInPlace(tokensForInPlace);
    const inPlacePassed = inPlaceResult === testCase.expected;
    console.log(
      `In-place: ${inPlaceResult} - ${inPlacePassed ? "PASS" : "FAIL"}`
    );

    console.log();
  });
}

function testEdgeCases() {
  console.log("Testing Edge Cases...\n");

  const edgeCases = [
    {
      tokens: ["-1", "2", "+"],
      expected: 1,
      description: "Negative numbers"
    },
    {
      tokens: ["6", "-132", "/"],
      expected: 0,
      description: "Division truncation toward zero (positive result)"
    },
    {
      tokens: ["-6", "132", "/"],
      expected: 0,
      description: "Division truncation toward zero (negative result)"
    },
    {
      tokens: ["1", "0", "-"],
      expected: 1,
      description: "Subtraction resulting in positive"
    },
    {
      tokens: ["0", "1", "-"],
      expected: -1,
      description: "Subtraction resulting in negative"
    }
  ];

  edgeCases.forEach((testCase, index) => {
    console.log(`Edge Case ${index + 1}: ${testCase.description}`);
    const result = evalRPN(testCase.tokens);
    const passed = result === testCase.expected;
    console.log(`Tokens: [${testCase.tokens.join(", ")}]`);
    console.log(
      `Result: ${result} (expected: ${testCase.expected}) - ${
        passed ? "PASS" : "FAIL"
      }`
    );
    console.log();
  });
}

function testDivisionTruncation() {
  console.log("Testing Division Truncation...\n");

  const divisionCases = [
    { a: 5, b: 2, expected: 2, description: "5 / 2 = 2" },
    {
      a: -5,
      b: 2,
      expected: -2,
      description: "-5 / 2 = -2 (truncate toward 0)"
    },
    {
      a: 5,
      b: -2,
      expected: -2,
      description: "5 / -2 = -2 (truncate toward 0)"
    },
    { a: -5, b: -2, expected: 2, description: "-5 / -2 = 2" },
    { a: 1, b: 3, expected: 0, description: "1 / 3 = 0" },
    { a: -1, b: 3, expected: 0, description: "-1 / 3 = 0 (truncate toward 0)" }
  ];

  divisionCases.forEach((testCase, index) => {
    const tokens = [testCase.a.toString(), testCase.b.toString(), "/"];
    const result = evalRPN(tokens);
    const passed = result === testCase.expected;

    console.log(`Division Test ${index + 1}: ${testCase.description}`);
    console.log(`Tokens: [${tokens.join(", ")}]`);
    console.log(`Result: ${result} - ${passed ? "PASS" : "FAIL"}`);
    console.log(
      `Math.trunc(${testCase.a} / ${testCase.b}) = ${Math.trunc(
        testCase.a / testCase.b
      )}`
    );
    console.log();
  });
}

function testPerformance() {
  console.log("Performance Comparison...\n");

  // Generate large RPN expression
  const size = 10000;
  const tokens = [];

  // Create expression: 1 + 1 + 1 + ... (size times)
  tokens.push("0");
  for (let i = 0; i < size; i++) {
    tokens.push("1", "+");
  }

  const approaches = [
    { name: "Stack", fn: evalRPNStack },
    { name: "Function Map", fn: evalRPNFunctionMap }
  ];

  console.log(`Testing with expression of ${tokens.length} tokens`);
  console.log(`Expected result: ${size}`);

  approaches.forEach((approach) => {
    const start = performance.now();
    const result = approach.fn([...tokens]);
    const end = performance.now();

    console.log(`${approach.name}: ${result} (${(end - start).toFixed(2)}ms)`);
  });
}

function demonstrateRPNConversion() {
  console.log("RPN vs Infix Demonstration...\n");

  const examples = [
    {
      infix: "2 + 3 * 4",
      rpn: ["2", "3", "4", "*", "+"],
      description: "Operator precedence"
    },
    {
      infix: "(2 + 3) * 4",
      rpn: ["2", "3", "+", "4", "*"],
      description: "Parentheses grouping"
    },
    {
      infix: "a + b * c - d",
      rpn: ["2", "3", "4", "*", "+", "5", "-"],
      description: "Mixed operations (a=2, b=3, c=4, d=5)"
    }
  ];

  examples.forEach((example, index) => {
    console.log(`Example ${index + 1}: ${example.description}`);
    console.log(`Infix: ${example.infix}`);
    console.log(`RPN: ${example.rpn.join(" ")}`);
    console.log(`Result: ${evalRPN(example.rpn)}`);
    console.log();
  });
}

// Uncomment to run tests
// testEvalRPN();
// testEdgeCases();
// testDivisionTruncation();
// testPerformance();
// demonstrateRPNConversion();

module.exports = {
  evalRPN,
  evalRPNStack,
  evalRPNFunctionMap,
  evalRPNRecursive,
  evalRPNExpressionTree,
  evalRPNInPlace,
  ExpressionTreeNode
};
