/**
 * LeetCode 238: Product of Array Except Self
 *
 * Problem: Given an integer array nums, return an array answer such that answer[i]
 * is equal to the product of all the elements of nums except nums[i].
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * You must write an algorithm that runs in O(n) time and without using the division operation.
 *
 * Pattern: Prefix/Suffix Product
 * Time Complexity: O(n)
 * Space Complexity: O(1) excluding output array
 */

// Approach 1: Two Pass with Output Array (Optimal)
function productExceptSelfOptimal(nums) {
  const result = new Array(nums.length);

  // First pass: left products
  result[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }

  // Second pass: multiply by right products
  let rightProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] = result[i] * rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

// Approach 2: Left and Right Arrays (More intuitive)
function productExceptSelfTwoArrays(nums) {
  const n = nums.length;
  const leftProducts = new Array(n);
  const rightProducts = new Array(n);
  const result = new Array(n);

  // Build left products array
  leftProducts[0] = 1;
  for (let i = 1; i < n; i++) {
    leftProducts[i] = leftProducts[i - 1] * nums[i - 1];
  }

  // Build right products array
  rightProducts[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    rightProducts[i] = rightProducts[i + 1] * nums[i + 1];
  }

  // Combine results
  for (let i = 0; i < n; i++) {
    result[i] = leftProducts[i] * rightProducts[i];
  }

  return result;
}

// Approach 3: Using Division (If allowed)
function productExceptSelfDivision(nums) {
  const totalProduct = nums.reduce((product, num) => product * num, 1);
  return nums.map((num) => totalProduct / num);
}

// Approach 4: Division with Zero Handling
function productExceptSelfDivisionSafe(nums) {
  let zeroCount = 0;
  let productWithoutZeros = 1;

  // Count zeros and calculate product of non-zeros
  for (const num of nums) {
    if (num === 0) {
      zeroCount++;
    } else {
      productWithoutZeros *= num;
    }
  }

  return nums.map((num) => {
    if (zeroCount > 1) return 0;
    if (zeroCount === 1) return num === 0 ? productWithoutZeros : 0;
    return productWithoutZeros / num;
  });
}

// Approach 5: Recursive approach (Educational)
function productExceptSelfRecursive(nums) {
  const result = new Array(nums.length);

  function calculateProduct(index, leftProduct, rightProducts) {
    if (index === nums.length) return rightProducts;

    const newRightProducts = calculateProduct(
      index + 1,
      leftProduct * nums[index],
      rightProducts
    );
    result[index] = leftProduct * newRightProducts[index];

    return [
      nums[index] * newRightProducts[0],
      ...newRightProducts.slice(0, -1)
    ];
  }

  const rightProducts = new Array(nums.length).fill(1);
  for (let i = nums.length - 2; i >= 0; i--) {
    rightProducts[i] = rightProducts[i + 1] * nums[i + 1];
  }

  calculateProduct(0, 1, rightProducts);
  return result;
}

// Test cases
function testProductExceptSelf() {
  console.log("Testing Product of Array Except Self...\n");

  const testCases = [
    {
      input: [1, 2, 3, 4],
      expected: [24, 12, 8, 6]
    },
    {
      input: [-1, 1, 0, -3, 3],
      expected: [0, 0, 9, 0, 0]
    },
    {
      input: [2, 3],
      expected: [3, 2]
    },
    {
      input: [1, 0],
      expected: [0, 1]
    },
    {
      input: [0, 0],
      expected: [0, 0]
    },
    {
      input: [5],
      expected: [1]
    },
    {
      input: [2, 3, 4, 5],
      expected: [60, 40, 30, 24]
    },
    {
      input: [-2, -3, -4],
      expected: [12, 8, 6]
    }
  ];

  const approaches = [
    { name: "Optimal (Two Pass)", func: productExceptSelfOptimal },
    { name: "Two Arrays", func: productExceptSelfTwoArrays },
    { name: "Division Safe", func: productExceptSelfDivisionSafe }
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

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [1000, 5000, 10000];
  const approaches = [
    { name: "Optimal", func: productExceptSelfOptimal },
    { name: "Two Arrays", func: productExceptSelfTwoArrays }
  ];

  sizes.forEach((size) => {
    console.log(`\nArray size: ${size}`);

    approaches.forEach((approach) => {
      const nums = [];
      for (let i = 0; i < size; i++) {
        nums.push(Math.floor(Math.random() * 20) - 10); // Random numbers -10 to 9
      }

      const start = performance.now();
      approach.func([...nums]);
      const end = performance.now();

      console.log(`${approach.name}: ${(end - start).toFixed(4)}ms`);
    });
  });
}

// Visual demonstration
function visualDemo() {
  console.log("\n--- Visual Demonstration ---");
  console.log("Example: [1, 2, 3, 4]");

  const nums = [1, 2, 3, 4];
  const n = nums.length;

  console.log("\nStep 1: Calculate left products");
  const leftProducts = [1];
  console.log(`leftProducts[0] = 1 (no elements to the left of index 0)`);

  for (let i = 1; i < n; i++) {
    leftProducts[i] = leftProducts[i - 1] * nums[i - 1];
    console.log(
      `leftProducts[${i}] = leftProducts[${i - 1}] × nums[${i - 1}] = ${
        leftProducts[i - 1]
      } × ${nums[i - 1]} = ${leftProducts[i]}`
    );
  }

  console.log(`\nLeft products: [${leftProducts}]`);

  console.log("\nStep 2: Calculate right products and combine");
  const result = [...leftProducts];
  let rightProduct = 1;

  for (let i = n - 1; i >= 0; i--) {
    console.log(
      `result[${i}] = leftProducts[${i}] × rightProduct = ${
        leftProducts[i]
      } × ${rightProduct} = ${leftProducts[i] * rightProduct}`
    );
    result[i] = leftProducts[i] * rightProduct;
    rightProduct *= nums[i];
    console.log(
      `rightProduct = rightProduct × nums[${i}] = ${rightProduct / nums[i]} × ${
        nums[i]
      } = ${rightProduct}`
    );
  }

  console.log(`\nFinal result: [${result}]`);
}

// Mathematical explanation
function explainMath() {
  console.log("\n--- Mathematical Explanation ---");
  console.log("For array [a, b, c, d], we want:");
  console.log("result[0] = b × c × d");
  console.log("result[1] = a × c × d");
  console.log("result[2] = a × b × d");
  console.log("result[3] = a × b × c");
  console.log("");
  console.log("We can break this down as:");
  console.log(
    "result[i] = (product of elements left of i) × (product of elements right of i)"
  );
  console.log("");
  console.log("Left products:  [1, a, a×b, a×b×c]");
  console.log("Right products: [b×c×d, c×d, d, 1]");
  console.log("Result:         [1×(b×c×d), a×(c×d), (a×b)×d, (a×b×c)×1]");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: Prefix/Suffix Products ---");
  console.log("Key insight: Break problem into left and right subproblems");
  console.log("- Left products: product of all elements to the left");
  console.log("- Right products: product of all elements to the right");
  console.log("- Combine: leftProduct[i] × rightProduct[i]");
  console.log("");
  console.log(
    "Optimization: Use output array for left products, variable for right"
  );
  console.log("- First pass: fill output with left products");
  console.log("- Second pass: multiply by right products on the fly");
  console.log("- Space complexity: O(1) excluding output");
  console.log("");
  console.log("Similar problems:");
  console.log("- Sum of array except self");
  console.log("- Maximum product subarray");
  console.log("- Trapping rain water");
}

// Handle edge cases
function explainEdgeCases() {
  console.log("\n--- Edge Cases Handling ---");

  console.log("1. Single element [5]:");
  console.log("   - No other elements, so result is [1]");

  console.log("\n2. Contains zero [1, 0, 3]:");
  console.log("   - Product of all except zero: 1 × 3 = 3");
  console.log("   - Other positions get 0 (since array contains zero)");
  console.log("   - Result: [0, 3, 0]");

  console.log("\n3. Multiple zeros [1, 0, 0, 4]:");
  console.log("   - Product always contains at least one zero");
  console.log("   - Result: [0, 0, 0, 0]");

  console.log("\n4. Negative numbers [-1, 2, -3]:");
  console.log("   - Handle normally, signs will work out correctly");
  console.log("   - Result: [2×(-3), (-1)×(-3), (-1)×2] = [-6, 3, -2]");
}

// Alternative approaches analysis
function analyzeApproaches() {
  console.log("\n--- Approach Analysis ---");

  console.log("1. Optimal (Two Pass):");
  console.log("   - Time: O(n), Space: O(1)");
  console.log("   - Two passes through array");
  console.log("   - No division operation");

  console.log("\n2. Two Arrays:");
  console.log("   - Time: O(n), Space: O(n)");
  console.log("   - More intuitive and readable");
  console.log("   - Easier to debug and understand");

  console.log("\n3. Division approach:");
  console.log("   - Time: O(n), Space: O(1)");
  console.log("   - Simple but fails with zeros");
  console.log("   - Violates problem constraint (no division)");

  console.log("\n4. Division with zero handling:");
  console.log("   - Time: O(n), Space: O(1)");
  console.log("   - Handles zeros correctly");
  console.log("   - Still violates constraint");
}

// Run tests
if (require.main === module) {
  testProductExceptSelf();
  performanceTest();
  visualDemo();
  explainMath();
  explainPattern();
  explainEdgeCases();
  analyzeApproaches();
}

module.exports = {
  productExceptSelfOptimal,
  productExceptSelfTwoArrays,
  productExceptSelfDivision,
  productExceptSelfDivisionSafe,
  productExceptSelfRecursive
};
