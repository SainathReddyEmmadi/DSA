/**
 * 71. Simplify Path
 * https://leetcode.com/problems/simplify-path/
 *
 * Difficulty: Medium
 * Topics: String, Stack
 *
 * Given an absolute path for a Unix-style file system, return the simplified canonical path.
 *
 * Rules:
 * - Single period '.' refers to current directory
 * - Double period '..' refers to parent directory
 * - Multiple consecutive slashes should be treated as single slash
 * - Path should start with single slash and not end with slash (unless root)
 *
 * Example 1:
 * Input: path = "/home/"
 * Output: "/home"
 *
 * Example 2:
 * Input: path = "/home//foo/"
 * Output: "/home/foo"
 *
 * Example 3:
 * Input: path = "/home/user/Documents/../Pictures"
 * Output: "/home/user/Pictures"
 */

/**
 * APPROACH 1: Stack with Split
 *
 * Split path by '/' and process each component:
 * - Empty or '.' → skip
 * - '..' → pop from stack (go to parent)
 * - Normal directory → push to stack
 *
 * Time: O(n) where n is length of path
 * Space: O(n) for stack storage
 */
function simplifyPath(path) {
  const stack = [];
  const components = path.split("/");

  for (const component of components) {
    if (component === "" || component === ".") {
      // Skip empty components and current directory
      continue;
    } else if (component === "..") {
      // Go to parent directory (pop if possible)
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      // Regular directory name
      stack.push(component);
    }
  }

  // Build result path
  return "/" + stack.join("/");
}

/**
 * APPROACH 2: Manual Parsing with Stack
 *
 * Parse the string manually without using split
 *
 * Time: O(n)
 * Space: O(n)
 */
function simplifyPathManual(path) {
  const stack = [];
  let i = 0;

  while (i < path.length) {
    if (path[i] === "/") {
      i++; // Skip slash
      continue;
    }

    // Extract component between slashes
    let component = "";
    while (i < path.length && path[i] !== "/") {
      component += path[i];
      i++;
    }

    if (component === ".") {
      // Current directory - do nothing
      continue;
    } else if (component === "..") {
      // Parent directory - pop if possible
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      // Regular directory
      stack.push(component);
    }
  }

  return "/" + stack.join("/");
}

/**
 * APPROACH 3: Using Array as Stack (Alternative)
 *
 * Same logic but more explicit about stack operations
 *
 * Time: O(n)
 * Space: O(n)
 */
function simplifyPathExplicit(path) {
  const directories = [];
  const parts = path.split("/");

  for (const part of parts) {
    if (part && part !== ".") {
      if (part === "..") {
        if (directories.length > 0) {
          directories.pop();
        }
      } else {
        directories.push(part);
      }
    }
  }

  return "/" + directories.join("/");
}

// Test cases
function testSimplifyPath() {
  console.log("=== Testing Simplify Path ===");

  const testCases = [
    {
      input: "/home/",
      expected: "/home",
      description: "Remove trailing slash"
    },
    {
      input: "/home//foo/",
      expected: "/home/foo",
      description: "Multiple slashes and trailing slash"
    },
    {
      input: "/home/user/Documents/../Pictures",
      expected: "/home/user/Pictures",
      description: "Parent directory navigation"
    },
    {
      input: "/../",
      expected: "/",
      description: "Parent of root is root"
    },
    {
      input: "/.../a/../b/c/../d/./",
      expected: "/.../b/d",
      description: "Complex path with dots"
    },
    {
      input: "/a/./b/../../c/",
      expected: "/c",
      description: "Current and parent directories"
    },
    {
      input: "/a/../../b/../c//.//",
      expected: "/c",
      description: "Complex navigation"
    },
    {
      input: "/a//b////c/d//././/..",
      expected: "/a/b/c",
      description: "Multiple consecutive slashes"
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`\nTest ${index + 1}: ${test.description}`);
    console.log(`Input: "${test.input}"`);

    const result1 = simplifyPath(test.input);
    const result2 = simplifyPathManual(test.input);
    const result3 = simplifyPathExplicit(test.input);

    console.log(`Split Method: "${result1}"`);
    console.log(`Manual Parse: "${result2}"`);
    console.log(`Explicit Stack: "${result3}"`);
    console.log(`Expected: "${test.expected}"`);
    console.log(
      `✓ Pass: ${
        result1 === test.expected &&
        result2 === test.expected &&
        result3 === test.expected
      }`
    );
  });
}

// Uncomment to run tests
// testSimplifyPath();

/**
 * KEY INSIGHTS:
 *
 * 1. Stack Usage:
 *    - Perfect for handling nested directory structure
 *    - '..' pops (goes to parent)
 *    - Regular names push (enter directory)
 *
 * 2. Edge Cases:
 *    - Root directory has no parent
 *    - Multiple consecutive slashes
 *    - Trailing slashes should be removed
 *    - Current directory (.) should be ignored
 *
 * 3. String Processing:
 *    - split('/') is convenient but creates empty strings
 *    - Filter out empty strings and current directory markers
 *
 * 4. Result Construction:
 *    - Always start with '/'
 *    - Join directories with '/'
 *    - Root case: empty stack results in "/"
 *
 * 5. Similar Problems:
 *    - Build Binary Expression Tree (1597)
 *    - Remove Invalid Parentheses (301)
 *    - Basic Calculator series
 */

module.exports = {
  simplifyPath,
  simplifyPathManual,
  simplifyPathExplicit
};
