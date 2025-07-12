/**
 * LeetCode 66: Plus One
 *
 * Problem: You are given a large integer represented as an integer array digits,
 * where each digits[i] is the ith digit of the integer. The digits are ordered
 * from most significant to least significant in left-to-right order.
 * The large integer does not contain any leading zeros.
 * Increment the large integer by one and return the resulting array of digits.
 *
 * Pattern: Array manipulation with carry
 * Time Complexity: O(n)
 * Space Complexity: O(1) or O(n) if new array needed
 */

// Approach 1: Optimal - Handle carry from right to left
function plusOneOptimal(digits) {
  // Start from the rightmost digit
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      // No carry needed, just increment and return
      digits[i]++;
      return digits;
    }
    // Set to 0 and continue (carry will be handled in next iteration)
    digits[i] = 0;
  }

  // If we reach here, all digits were 9 (e.g., [9,9,9] -> [1,0,0,0])
  return [1, ...digits];
}

// Approach 2: String conversion (less efficient but clear)
function plusOneString(digits) {
  // Convert to string, then to BigInt, add 1, convert back
  const num = BigInt(digits.join(""));
  const result = (num + 1n).toString();
  return result.split("").map(Number);
}

// Approach 3: Manual carry propagation
function plusOneManual(digits) {
  const result = [...digits];
  let carry = 1;

  for (let i = result.length - 1; i >= 0 && carry; i--) {
    const sum = result[i] + carry;
    result[i] = sum % 10;
    carry = Math.floor(sum / 10);
  }

  // If there's still a carry, we need to add it to the front
  if (carry) {
    result.unshift(carry);
  }

  return result;
}

// Approach 4: Recursive solution
function plusOneRecursive(digits, index = digits.length - 1) {
  // Base case: if we've processed all digits
  if (index < 0) {
    return [1, ...digits];
  }

  if (digits[index] < 9) {
    digits[index]++;
    return digits;
  }

  digits[index] = 0;
  return plusOneRecursive(digits, index - 1);
}

// Approach 5: Using reduce (functional approach)
function plusOneFunctional(digits) {
  const result = [];
  let carry = 1;

  // Process digits from right to left
  digits.reduceRight((acc, digit) => {
    const sum = digit + carry;
    result.unshift(sum % 10);
    carry = Math.floor(sum / 10);
    return carry;
  }, 0);

  if (carry) {
    result.unshift(carry);
  }

  return result;
}

// Test cases
function testPlusOne() {
  console.log("Testing Plus One...\n");

  const testCases = [
    {
      input: [1, 2, 3],
      expected: [1, 2, 4]
    },
    {
      input: [4, 3, 2, 1],
      expected: [4, 3, 2, 2]
    },
    {
      input: [9],
      expected: [1, 0]
    },
    {
      input: [9, 9, 9],
      expected: [1, 0, 0, 0]
    },
    {
      input: [1, 9, 9],
      expected: [2, 0, 0]
    },
    {
      input: [0],
      expected: [1]
    },
    {
      input: [9, 8, 9],
      expected: [9, 9, 0]
    },
    {
      input: [1, 0, 0, 0],
      expected: [1, 0, 0, 1]
    }
  ];

  const approaches = [
    { name: "Optimal", func: plusOneOptimal },
    { name: "String Conversion", func: plusOneString },
    { name: "Manual Carry", func: plusOneManual },
    { name: "Recursive", func: plusOneRecursive },
    { name: "Functional", func: plusOneFunctional }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func([...test.input]);
      const passed = JSON.stringify(result) === JSON.stringify(test.expected);
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log(`  Input:    [${test.input}]`);
        console.log(`  Expected: [${test.expected}]`);
        console.log(`  Got:      [${result}]`);
      }
    });
  });
}

// Edge cases testing
function testEdgeCases() {
  console.log("\n--- Edge Cases ---");

  const edgeCases = [
    {
      name: "Single digit (not 9)",
      input: [5],
      expected: [6]
    },
    {
      name: "Single digit 9",
      input: [9],
      expected: [1, 0]
    },
    {
      name: "All 9s (small)",
      input: [9, 9],
      expected: [1, 0, 0]
    },
    {
      name: "All 9s (large)",
      input: [9, 9, 9, 9, 9],
      expected: [1, 0, 0, 0, 0, 0]
    },
    {
      name: "No carry needed",
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3, 4, 6]
    },
    {
      name: "Carry in middle",
      input: [1, 2, 9, 9],
      expected: [1, 3, 0, 0]
    }
  ];

  edgeCases.forEach((testCase) => {
    const result = plusOneOptimal([...testCase.input]);
    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
    console.log(`${testCase.name}: ${passed ? "PASS" : "FAIL"}`);
    if (!passed) {
      console.log(`  Expected: [${testCase.expected}]`);
      console.log(`  Got:      [${result}]`);
    }
  });
}

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [100, 1000, 5000];
  const approaches = [
    { name: "Optimal", func: plusOneOptimal },
    { name: "Manual Carry", func: plusOneManual }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      // Create array of 9s (worst case)
      const digits = new Array(size).fill(9);

      const start = performance.now();
      approach.func([...digits]);
      const end = performance.now();

      console.log(`${approach.name}: ${(end - start).toFixed(4)}ms`);
    });
  });
}

// Visual demonstration
function visualDemo() {
  console.log("\n--- Visual Demonstration ---");

  const examples = [
    { input: [1, 2, 3], desc: "Simple case (no carry)" },
    { input: [1, 9, 9], desc: "Carry propagation" },
    { input: [9, 9, 9], desc: "All 9s (new digit needed)" }
  ];

  examples.forEach((example) => {
    console.log(`\n${example.desc}:`);
    console.log(`Input: [${example.input}]`);

    const digits = [...example.input];
    console.log("Process:");

    for (let i = digits.length - 1; i >= 0; i--) {
      console.log(`  Check position ${i}: digit = ${digits[i]}`);
      if (digits[i] < 9) {
        digits[i]++;
        console.log(`    Less than 9, increment to ${digits[i]}`);
        console.log(`    Result: [${digits}]`);
        break;
      } else {
        digits[i] = 0;
        console.log(`    Equal to 9, set to 0`);
        if (i === 0) {
          console.log(`    Reached start, need new digit`);
          console.log(`    Result: [1, ${digits}]`);
        }
      }
    }
  });
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Array Manipulation with Carry ---");
  console.log("Key insight: Process digits from right to left, handle carry");
  console.log("- Start from rightmost digit (least significant)");
  console.log("- If digit < 9: increment and return (no more carry)");
  console.log("- If digit = 9: set to 0 and continue (carry to next position)");
  console.log("- If all digits were 9: need to add new digit at front");
  console.log(
    "- Time: O(n), Space: O(1) in most cases, O(n) if new array needed"
  );
  console.log("\nSimilar problems:");
  console.log("- Add two numbers represented as arrays");
  console.log("- Multiply strings");
  console.log("- Subtract two numbers");
}

// Run tests
if (require.main === module) {
  testPlusOne();
  testEdgeCases();
  performanceTest();
  visualDemo();
  explainPattern();
}

module.exports = {
  plusOneOptimal,
  plusOneString,
  plusOneManual,
  plusOneRecursive,
  plusOneFunctional
};
