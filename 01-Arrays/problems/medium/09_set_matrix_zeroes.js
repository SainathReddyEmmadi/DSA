/**
 * LeetCode 73: Set Matrix Zeroes
 *
 * Problem: Given an m x n integer matrix, if an element is 0, set its entire row and column to 0s.
 * You must do it in place.
 *
 * Pattern: In-place marking
 * Time Complexity: O(m * n)
 * Space Complexity: O(1) for optimal solution
 */

// Approach 1: In-place marking using first row and column (Optimal)
function setZeroesOptimal(matrix) {
  if (!matrix || matrix.length === 0) return;

  const m = matrix.length;
  const n = matrix[0].length;

  let firstRowZero = false;
  let firstColZero = false;

  // Check if first row has zero
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowZero = true;
      break;
    }
  }

  // Check if first column has zero
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColZero = true;
      break;
    }
  }

  // Use first row and column as markers
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0; // Mark row
        matrix[0][j] = 0; // Mark column
      }
    }
  }

  // Set zeros based on markers
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // Handle first row
  if (firstRowZero) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }

  // Handle first column
  if (firstColZero) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }

  return matrix;
}

// Approach 2: Using extra space for rows and columns
function setZeroesExtraSpace(matrix) {
  if (!matrix || matrix.length === 0) return;

  const m = matrix.length;
  const n = matrix[0].length;

  const zeroRows = new Set();
  const zeroCols = new Set();

  // Find all zero positions
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        zeroRows.add(i);
        zeroCols.add(j);
      }
    }
  }

  // Set rows to zero
  for (const row of zeroRows) {
    for (let j = 0; j < n; j++) {
      matrix[row][j] = 0;
    }
  }

  // Set columns to zero
  for (const col of zeroCols) {
    for (let i = 0; i < m; i++) {
      matrix[i][col] = 0;
    }
  }

  return matrix;
}

// Approach 3: Using boolean arrays
function setZeroesBooleanArrays(matrix) {
  if (!matrix || matrix.length === 0) return;

  const m = matrix.length;
  const n = matrix[0].length;

  const rowZero = new Array(m).fill(false);
  const colZero = new Array(n).fill(false);

  // Mark rows and columns to be zeroed
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        rowZero[i] = true;
        colZero[j] = true;
      }
    }
  }

  // Set zeros
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rowZero[i] || colZero[j]) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
}

// Approach 4: Brute force with replacement value
function setZeroesBruteForce(matrix) {
  if (!matrix || matrix.length === 0) return;

  const m = matrix.length;
  const n = matrix[0].length;
  const MARKER = 1000001; // Assuming this value doesn't exist in matrix

  // Replace zeros with marker and mark cells to be zeroed
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        // Mark entire row
        for (let k = 0; k < n; k++) {
          if (matrix[i][k] !== 0) {
            matrix[i][k] = MARKER;
          }
        }
        // Mark entire column
        for (let k = 0; k < m; k++) {
          if (matrix[k][j] !== 0) {
            matrix[k][j] = MARKER;
          }
        }
      }
    }
  }

  // Replace markers with zeros
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === MARKER) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
}

// Helper function to create matrix copy for testing
function copyMatrix(matrix) {
  return matrix.map((row) => [...row]);
}

// Helper function to print matrix
function printMatrix(matrix, label = "") {
  if (label) console.log(label);
  matrix.forEach((row) => {
    console.log(
      "[" + row.map((val) => val.toString().padStart(3)).join(", ") + "]"
    );
  });
  console.log();
}

// Test cases
function testSetZeroes() {
  console.log("Testing Set Matrix Zeroes...\n");

  const testCases = [
    {
      input: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
      expected: [
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 1]
      ]
    },
    {
      input: [
        [0, 1, 2, 0],
        [3, 4, 5, 2],
        [1, 3, 1, 5]
      ],
      expected: [
        [0, 0, 0, 0],
        [0, 4, 5, 0],
        [0, 3, 1, 0]
      ]
    },
    {
      input: [[1, 2, 3, 4]],
      expected: [[1, 2, 3, 4]]
    },
    {
      input: [[0]],
      expected: [[0]]
    },
    {
      input: [[1], [0], [3]],
      expected: [[0], [0], [0]]
    },
    {
      input: [
        [1, 2],
        [3, 0]
      ],
      expected: [
        [1, 0],
        [0, 0]
      ]
    }
  ];

  const approaches = [
    { name: "In-place Optimal", func: setZeroesOptimal },
    { name: "Extra Space", func: setZeroesExtraSpace },
    { name: "Boolean Arrays", func: setZeroesBooleanArrays },
    { name: "Brute Force", func: setZeroesBruteForce }
  ];

  approaches.forEach((approach) => {
    console.log(`\n--- ${approach.name} ---`);
    testCases.forEach((test, index) => {
      const result = approach.func(copyMatrix(test.input));
      const passed = JSON.stringify(result) === JSON.stringify(test.expected);
      console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
      if (!passed) {
        console.log("Input:");
        printMatrix(test.input);
        console.log("Expected:");
        printMatrix(test.expected);
        console.log("Got:");
        printMatrix(result);
      }
    });
  });
}

// Performance testing
function performanceTest() {
  console.log("\n--- Performance Test ---");

  const sizes = [
    [50, 50],
    [100, 100],
    [200, 200]
  ];
  const approaches = [
    { name: "In-place Optimal", func: setZeroesOptimal },
    { name: "Extra Space", func: setZeroesExtraSpace },
    { name: "Boolean Arrays", func: setZeroesBooleanArrays }
  ];

  sizes.forEach(([rows, cols]) => {
    console.log(`\nMatrix size: ${rows}x${cols}`);

    approaches.forEach((approach) => {
      // Create random matrix with some zeros
      const matrix = [];
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          row.push(
            Math.random() < 0.1 ? 0 : Math.floor(Math.random() * 10) + 1
          );
        }
        matrix.push(row);
      }

      const start = performance.now();
      approach.func(copyMatrix(matrix));
      const end = performance.now();

      console.log(`${approach.name}: ${(end - start).toFixed(4)}ms`);
    });
  });
}

// Visual demonstration
function visualDemo() {
  console.log("\n--- Visual Demonstration ---");
  console.log("Example matrix:");

  const matrix = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ];

  printMatrix(matrix, "Original:");

  console.log("Process:");
  console.log("1. Found zero at position (1, 1)");
  console.log("2. Mark row 1 and column 1 to be zeroed");
  console.log("3. Set entire row 1 to zeros: [0, 0, 0]");
  console.log("4. Set entire column 1 to zeros");

  const result = setZeroesOptimal(copyMatrix(matrix));
  printMatrix(result, "Result:");

  console.log("In-place algorithm steps:");
  console.log("1. Check if first row/column originally had zeros");
  console.log("2. Use first row/column as markers for other zeros");
  console.log("3. Process matrix based on markers");
  console.log("4. Handle first row/column separately");
}

// Algorithm explanation
function explainAlgorithm() {
  console.log("\n--- In-place Algorithm Explanation ---");
  console.log("Challenge: Modify matrix without extra space");
  console.log("");
  console.log("Key insight: Use first row and column as markers");
  console.log("");
  console.log("Steps:");
  console.log("1. Record if first row/column originally had zeros");
  console.log("2. Scan matrix, mark zeros in first row/column");
  console.log("3. Use markers to set zeros in rest of matrix");
  console.log("4. Finally handle first row/column based on step 1");
  console.log("");
  console.log("Why this works:");
  console.log('- First row/column act as "flags" for other rows/columns');
  console.log("- We process them last to avoid interference");
  console.log("- No additional space needed except a few variables");
}

// Pattern explanation
function explainPattern() {
  console.log("\n--- Pattern: In-place Matrix Modification ---");
  console.log("When to use:");
  console.log("- Need to modify 2D structure without extra space");
  console.log("- Can use existing elements as markers/flags");
  console.log("- Order of operations matters");
  console.log("");
  console.log("Common techniques:");
  console.log("- Use first row/column as metadata storage");
  console.log("- Use special marker values (if value range known)");
  console.log("- Process in specific order to avoid overwrites");
  console.log("");
  console.log("Similar problems:");
  console.log("- Rotate image/matrix");
  console.log("- Spiral matrix generation");
  console.log("- Game of Life (cellular automaton)");
}

// Edge cases explanation
function explainEdgeCases() {
  console.log("\n--- Edge Cases ---");

  console.log("1. Empty matrix: []");
  console.log("   - Handle gracefully, return immediately");

  console.log("\n2. Single element matrix: [[0]] or [[5]]");
  console.log("   - If zero, stays zero; if non-zero, stays same");

  console.log("\n3. Single row: [[1, 0, 3]]");
  console.log("   - Entire row becomes zeros");

  console.log("\n4. Single column: [[1], [0], [3]]");
  console.log("   - Entire column becomes zeros");

  console.log("\n5. All zeros: [[0, 0], [0, 0]]");
  console.log("   - Matrix stays all zeros");

  console.log("\n6. No zeros: [[1, 2], [3, 4]]");
  console.log("   - Matrix unchanged");

  console.log("\n7. First row/column have zeros:");
  console.log(
    "   - Need special handling to distinguish original vs marker zeros"
  );
}

// Space complexity analysis
function analyzeSpaceComplexity() {
  console.log("\n--- Space Complexity Analysis ---");

  console.log("Approach 1 - In-place (O(1)):");
  console.log("- Uses only constant extra variables");
  console.log("- Reuses first row/column as storage");
  console.log("- Most space-efficient solution");

  console.log("\nApproach 2 - Sets (O(m + n)):");
  console.log("- Stores row and column indices");
  console.log("- Worst case: all elements are zero");
  console.log("- More intuitive but uses extra space");

  console.log("\nApproach 3 - Boolean arrays (O(m + n)):");
  console.log("- Fixed size arrays for all rows/columns");
  console.log("- Always uses m + n space regardless of zeros");
  console.log("- Predictable memory usage");

  console.log("\nApproach 4 - Brute force (O(1)):");
  console.log("- Uses marker value, no extra arrays");
  console.log("- But assumes certain values don't exist");
  console.log("- May not work for all input ranges");
}

// Real-world applications
function explainApplications() {
  console.log("\n--- Real-world Applications ---");
  console.log("1. Image processing:");
  console.log("   - Remove noise by zeroing corrupted pixel rows/columns");
  console.log("   - Create special effects with selective clearing");

  console.log("\n2. Spreadsheet software:");
  console.log("   - Clear entire rows/columns based on conditions");
  console.log("   - Data cleaning and formatting");

  console.log("\n3. Game development:");
  console.log("   - Clear game board sections");
  console.log("   - Implement explosion effects");

  console.log("\n4. Database operations:");
  console.log("   - Bulk update operations");
  console.log("   - Data anonymization (selective clearing)");

  console.log("\n5. Scientific computing:");
  console.log("   - Zero out invalid measurements");
  console.log("   - Matrix preprocessing for numerical algorithms");
}

// Alternative implementations
function explainAlternatives() {
  console.log("\n--- Alternative Implementations ---");

  console.log("1. Two-pass with coordinate storage:");
  console.log("   - First pass: collect all zero coordinates");
  console.log("   - Second pass: zero out affected rows/columns");

  console.log("\n2. Bit manipulation approach:");
  console.log("   - Use bits to mark rows/columns");
  console.log("   - Useful when matrix dimensions fit in integer");

  console.log("\n3. Recursive approach:");
  console.log("   - Find zeros recursively");
  console.log("   - Less efficient but educational");

  console.log("\n4. Functional approach:");
  console.log("   - Create new matrix instead of modifying in-place");
  console.log("   - Easier to reason about but uses O(mn) space");
}

// Run tests
if (require.main === module) {
  testSetZeroes();
  performanceTest();
  visualDemo();
  explainAlgorithm();
  explainPattern();
  explainEdgeCases();
  analyzeSpaceComplexity();
  explainApplications();
  explainAlternatives();
}

module.exports = {
  setZeroesOptimal,
  setZeroesExtraSpace,
  setZeroesBooleanArrays,
  setZeroesBruteForce,
  copyMatrix,
  printMatrix
};
