/**
 * StringBuilder Implementation
 *
 * A mutable sequence of characters that provides efficient string concatenation
 * without the O(n²) penalty of repeated string concatenation in JavaScript.
 *
 * Features:
 * - Efficient append operations
 * - Support for various data types
 * - Memory management with dynamic resizing
 * - Method chaining
 * - Insert, delete, and replace operations
 */

class StringBuilder {
  constructor(initialCapacity = 16) {
    this.buffer = new Array(initialCapacity);
    this.length = 0;
    this.capacity = initialCapacity;
  }

  /**
   * Appends a value to the end of the string
   * @param {*} value - Value to append (will be converted to string)
   * @returns {StringBuilder} - This instance for chaining
   */
  append(value) {
    const str = String(value);
    this._ensureCapacity(this.length + str.length);

    for (let i = 0; i < str.length; i++) {
      this.buffer[this.length + i] = str[i];
    }

    this.length += str.length;
    return this;
  }

  /**
   * Appends a line with optional line separator
   * @param {*} value - Value to append
   * @param {string} separator - Line separator (default: '\n')
   * @returns {StringBuilder} - This instance for chaining
   */
  appendLine(value = "", separator = "\n") {
    return this.append(value).append(separator);
  }

  /**
   * Inserts a value at the specified index
   * @param {number} index - Index to insert at
   * @param {*} value - Value to insert
   * @returns {StringBuilder} - This instance for chaining
   */
  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error(`Index out of bounds: ${index}`);
    }

    const str = String(value);
    this._ensureCapacity(this.length + str.length);

    // Shift existing characters to the right
    for (let i = this.length - 1; i >= index; i--) {
      this.buffer[i + str.length] = this.buffer[i];
    }

    // Insert new characters
    for (let i = 0; i < str.length; i++) {
      this.buffer[index + i] = str[i];
    }

    this.length += str.length;
    return this;
  }

  /**
   * Deletes characters from start index to end index (exclusive)
   * @param {number} start - Start index (inclusive)
   * @param {number} end - End index (exclusive)
   * @returns {StringBuilder} - This instance for chaining
   */
  delete(start, end = start + 1) {
    if (start < 0 || start >= this.length || end < start || end > this.length) {
      throw new Error(`Invalid range: start=${start}, end=${end}`);
    }

    const deleteCount = end - start;

    // Shift characters to the left
    for (let i = end; i < this.length; i++) {
      this.buffer[i - deleteCount] = this.buffer[i];
    }

    this.length -= deleteCount;
    return this;
  }

  /**
   * Replaces characters from start to end with the given value
   * @param {number} start - Start index (inclusive)
   * @param {number} end - End index (exclusive)
   * @param {*} value - Replacement value
   * @returns {StringBuilder} - This instance for chaining
   */
  replace(start, end, value) {
    this.delete(start, end);
    this.insert(start, value);
    return this;
  }

  /**
   * Returns the character at the specified index
   * @param {number} index - Index of the character
   * @returns {string} - Character at index
   */
  charAt(index) {
    if (index < 0 || index >= this.length) {
      throw new Error(`Index out of bounds: ${index}`);
    }
    return this.buffer[index];
  }

  /**
   * Sets the character at the specified index
   * @param {number} index - Index to set
   * @param {string} char - Character to set
   * @returns {StringBuilder} - This instance for chaining
   */
  setCharAt(index, char) {
    if (index < 0 || index >= this.length) {
      throw new Error(`Index out of bounds: ${index}`);
    }
    this.buffer[index] = String(char)[0];
    return this;
  }

  /**
   * Returns a substring from start to end
   * @param {number} start - Start index (inclusive)
   * @param {number} end - End index (exclusive, default: length)
   * @returns {string} - Substring
   */
  substring(start, end = this.length) {
    if (start < 0 || start > this.length || end < start || end > this.length) {
      throw new Error(`Invalid range: start=${start}, end=${end}`);
    }

    let result = "";
    for (let i = start; i < end; i++) {
      result += this.buffer[i];
    }
    return result;
  }

  /**
   * Finds the first occurrence of the specified string
   * @param {string} str - String to search for
   * @param {number} fromIndex - Starting index for search
   * @returns {number} - Index of first occurrence, or -1 if not found
   */
  indexOf(str, fromIndex = 0) {
    const searchStr = String(str);
    if (searchStr.length === 0) return fromIndex;

    for (let i = fromIndex; i <= this.length - searchStr.length; i++) {
      let match = true;
      for (let j = 0; j < searchStr.length; j++) {
        if (this.buffer[i + j] !== searchStr[j]) {
          match = false;
          break;
        }
      }
      if (match) return i;
    }
    return -1;
  }

  /**
   * Finds the last occurrence of the specified string
   * @param {string} str - String to search for
   * @param {number} fromIndex - Starting index for reverse search
   * @returns {number} - Index of last occurrence, or -1 if not found
   */
  lastIndexOf(str, fromIndex = this.length) {
    const searchStr = String(str);
    if (searchStr.length === 0) return Math.min(fromIndex, this.length);

    const startPos = Math.min(fromIndex, this.length - searchStr.length);

    for (let i = startPos; i >= 0; i--) {
      let match = true;
      for (let j = 0; j < searchStr.length; j++) {
        if (this.buffer[i + j] !== searchStr[j]) {
          match = false;
          break;
        }
      }
      if (match) return i;
    }
    return -1;
  }

  /**
   * Reverses the string builder content
   * @returns {StringBuilder} - This instance for chaining
   */
  reverse() {
    for (let i = 0; i < Math.floor(this.length / 2); i++) {
      const temp = this.buffer[i];
      this.buffer[i] = this.buffer[this.length - 1 - i];
      this.buffer[this.length - 1 - i] = temp;
    }
    return this;
  }

  /**
   * Clears the string builder
   * @returns {StringBuilder} - This instance for chaining
   */
  clear() {
    this.length = 0;
    return this;
  }

  /**
   * Trims whitespace from both ends
   * @returns {StringBuilder} - This instance for chaining
   */
  trim() {
    // Trim from start
    let start = 0;
    while (start < this.length && /\s/.test(this.buffer[start])) {
      start++;
    }

    // Trim from end
    let end = this.length - 1;
    while (end >= start && /\s/.test(this.buffer[end])) {
      end--;
    }

    // Shift content if needed
    if (start > 0) {
      for (let i = start; i <= end; i++) {
        this.buffer[i - start] = this.buffer[i];
      }
    }

    this.length = Math.max(0, end - start + 1);
    return this;
  }

  /**
   * Sets the length of the string builder
   * @param {number} newLength - New length
   * @returns {StringBuilder} - This instance for chaining
   */
  setLength(newLength) {
    if (newLength < 0) {
      throw new Error("Length cannot be negative");
    }

    if (newLength > this.length) {
      this._ensureCapacity(newLength);
      // Fill with null characters
      for (let i = this.length; i < newLength; i++) {
        this.buffer[i] = "\0";
      }
    }

    this.length = newLength;
    return this;
  }

  /**
   * Returns the current capacity
   * @returns {number} - Current capacity
   */
  getCapacity() {
    return this.capacity;
  }

  /**
   * Ensures minimum capacity
   * @param {number} minimumCapacity - Minimum required capacity
   * @returns {StringBuilder} - This instance for chaining
   */
  ensureCapacity(minimumCapacity) {
    this._ensureCapacity(minimumCapacity);
    return this;
  }

  /**
   * Converts to string
   * @returns {string} - String representation
   */
  toString() {
    return this.buffer.slice(0, this.length).join("");
  }

  /**
   * Returns the current length
   * @returns {number} - Current length
   */
  size() {
    return this.length;
  }

  /**
   * Checks if the string builder is empty
   * @returns {boolean} - True if empty
   */
  isEmpty() {
    return this.length === 0;
  }

  /**
   * Creates a copy of this string builder
   * @returns {StringBuilder} - New StringBuilder instance
   */
  clone() {
    const copy = new StringBuilder(this.capacity);
    copy.append(this.toString());
    return copy;
  }

  // Private methods

  /**
   * Ensures the buffer has at least the specified capacity
   * @private
   * @param {number} minimumCapacity - Minimum required capacity
   */
  _ensureCapacity(minimumCapacity) {
    if (minimumCapacity > this.capacity) {
      this._expandCapacity(minimumCapacity);
    }
  }

  /**
   * Expands the buffer capacity
   * @private
   * @param {number} minimumCapacity - Minimum required capacity
   */
  _expandCapacity(minimumCapacity) {
    let newCapacity = (this.capacity + 1) * 2;
    if (newCapacity < minimumCapacity) {
      newCapacity = minimumCapacity;
    }

    const newBuffer = new Array(newCapacity);
    for (let i = 0; i < this.length; i++) {
      newBuffer[i] = this.buffer[i];
    }

    this.buffer = newBuffer;
    this.capacity = newCapacity;
  }
}

// Test cases and examples
function runTests() {
  console.log("=== StringBuilder Tests ===\n");

  // Basic functionality
  console.log("1. Basic Append and ToString:");
  const sb1 = new StringBuilder();
  sb1.append("Hello").append(" ").append("World").append("!");
  console.log(`Result: "${sb1.toString()}"`); // "Hello World!"
  console.log(`Length: ${sb1.size()}\n`);

  // Method chaining
  console.log("2. Method Chaining:");
  const sb2 = new StringBuilder();
  const result = sb2
    .append("JavaScript")
    .appendLine(" is")
    .append("awesome!")
    .toString();
  console.log(`Result: "${result}"`);
  console.log(`Length: ${sb2.size()}\n`);

  // Insert and delete operations
  console.log("3. Insert and Delete:");
  const sb3 = new StringBuilder();
  sb3.append("Hello World");
  console.log(`Before insert: "${sb3.toString()}"`);

  sb3.insert(5, " Beautiful");
  console.log(`After insert: "${sb3.toString()}"`);

  sb3.delete(5, 15); // Remove " Beautiful"
  console.log(`After delete: "${sb3.toString()}"`);

  sb3.replace(6, 11, "JavaScript");
  console.log(`After replace: "${sb3.toString()}"\n`);

  // Character operations
  console.log("4. Character Operations:");
  const sb4 = new StringBuilder();
  sb4.append("abcdef");
  console.log(`Original: "${sb4.toString()}"`);
  console.log(`charAt(2): "${sb4.charAt(2)}"`);

  sb4.setCharAt(2, "X");
  console.log(`After setCharAt(2, 'X'): "${sb4.toString()}"`);

  sb4.reverse();
  console.log(`After reverse: "${sb4.toString()}"\n`);

  // Search operations
  console.log("5. Search Operations:");
  const sb5 = new StringBuilder();
  sb5.append("Hello World Hello");
  console.log(`String: "${sb5.toString()}"`);
  console.log(`indexOf("Hello"): ${sb5.indexOf("Hello")}`);
  console.log(`lastIndexOf("Hello"): ${sb5.lastIndexOf("Hello")}`);
  console.log(`indexOf("World"): ${sb5.indexOf("World")}`);
  console.log(`indexOf("xyz"): ${sb5.indexOf("xyz")}\n`);

  // Substring and trim
  console.log("6. Substring and Trim:");
  const sb6 = new StringBuilder();
  sb6.append("  Hello World  ");
  console.log(`Original: "${sb6.toString()}"`);
  console.log(`Substring(2, 7): "${sb6.substring(2, 7)}"`);

  sb6.trim();
  console.log(`After trim: "${sb6.toString()}"\n`);

  // Capacity management
  console.log("7. Capacity Management:");
  const sb7 = new StringBuilder(5);
  console.log(`Initial capacity: ${sb7.getCapacity()}`);

  sb7.append("This is a long string that will exceed initial capacity");
  console.log(
    `After long append - Capacity: ${sb7.getCapacity()}, Length: ${sb7.size()}`
  );
  console.log(`Content: "${sb7.toString()}"\n`);

  // Edge cases
  console.log("8. Edge Cases:");
  const sb8 = new StringBuilder();
  console.log(`Empty string: "${sb8.toString()}"`);
  console.log(`Is empty: ${sb8.isEmpty()}`);

  sb8.append("");
  console.log(`After appending empty string: "${sb8.toString()}"`);

  sb8.append("test");
  sb8.clear();
  console.log(`After clear: "${sb8.toString()}", Is empty: ${sb8.isEmpty()}\n`);
}

// Performance comparison
function performanceTest() {
  console.log("=== Performance Comparison ===\n");

  const iterations = 10000;
  const testString = "Hello World ";

  // StringBuilder approach
  console.log("StringBuilder approach:");
  const start1 = performance.now();
  const sb = new StringBuilder();
  for (let i = 0; i < iterations; i++) {
    sb.append(testString);
  }
  const result1 = sb.toString();
  const end1 = performance.now();
  console.log(`Time: ${(end1 - start1).toFixed(2)}ms`);
  console.log(`Final length: ${result1.length}\n`);

  // String concatenation approach
  console.log("String concatenation approach:");
  const start2 = performance.now();
  let result2 = "";
  for (let i = 0; i < iterations; i++) {
    result2 += testString;
  }
  const end2 = performance.now();
  console.log(`Time: ${(end2 - start2).toFixed(2)}ms`);
  console.log(`Final length: ${result2.length}\n`);

  // Array join approach
  console.log("Array join approach:");
  const start3 = performance.now();
  const arr = [];
  for (let i = 0; i < iterations; i++) {
    arr.push(testString);
  }
  const result3 = arr.join("");
  const end3 = performance.now();
  console.log(`Time: ${(end3 - start3).toFixed(2)}ms`);
  console.log(`Final length: ${result3.length}\n`);

  console.log(
    `StringBuilder vs String concat: ${(
      (end2 - start2) /
      (end1 - start1)
    ).toFixed(2)}x faster`
  );
  console.log(
    `StringBuilder vs Array join: ${((end3 - start3) / (end1 - start1)).toFixed(
      2
    )}x difference`
  );
}

// Practical examples
function practicalExamples() {
  console.log("=== Practical Examples ===\n");

  // HTML generation
  console.log("1. HTML Generation:");
  function generateTable(data) {
    const sb = new StringBuilder();

    sb.appendLine("<table>").appendLine("  <thead>").appendLine("    <tr>");

    // Headers
    Object.keys(data[0]).forEach((key) => {
      sb.append("      <th>").append(key).appendLine("</th>");
    });

    sb.appendLine("    </tr>").appendLine("  </thead>").appendLine("  <tbody>");

    // Rows
    data.forEach((row) => {
      sb.appendLine("    <tr>");
      Object.values(row).forEach((value) => {
        sb.append("      <td>").append(value).appendLine("</td>");
      });
      sb.appendLine("    </tr>");
    });

    sb.appendLine("  </tbody>").appendLine("</table>");

    return sb.toString();
  }

  const tableData = [
    { name: "Alice", age: 25, city: "New York" },
    { name: "Bob", age: 30, city: "London" },
    { name: "Charlie", age: 35, city: "Tokyo" }
  ];

  console.log(generateTable(tableData));
  console.log();

  // Log formatting
  console.log("2. Log Formatting:");
  function formatLog(level, message, timestamp = new Date()) {
    const sb = new StringBuilder();
    return sb
      .append("[")
      .append(timestamp.toISOString())
      .append("] ")
      .append(level.toUpperCase())
      .append(": ")
      .append(message)
      .toString();
  }

  console.log(formatLog("info", "Application started"));
  console.log(formatLog("error", "Database connection failed"));
  console.log(formatLog("debug", "Processing user request"));
  console.log();

  // SQL query building
  console.log("3. SQL Query Building:");
  class QueryBuilder {
    constructor() {
      this.sb = new StringBuilder();
    }

    select(columns) {
      this.sb.append("SELECT ").append(columns);
      return this;
    }

    from(table) {
      this.sb.append(" FROM ").append(table);
      return this;
    }

    where(condition) {
      this.sb.append(" WHERE ").append(condition);
      return this;
    }

    orderBy(column, direction = "ASC") {
      this.sb.append(" ORDER BY ").append(column).append(" ").append(direction);
      return this;
    }

    limit(count) {
      this.sb.append(" LIMIT ").append(count);
      return this;
    }

    build() {
      return this.sb.toString();
    }
  }

  const query = new QueryBuilder()
    .select("name, email, created_at")
    .from("users")
    .where("status = 'active'")
    .orderBy("created_at", "DESC")
    .limit(10)
    .build();

  console.log(`Generated Query: ${query}\n`);
}

// Run all tests and examples
if (require.main === module) {
  runTests();
  performanceTest();
  practicalExamples();
}

module.exports = StringBuilder;
