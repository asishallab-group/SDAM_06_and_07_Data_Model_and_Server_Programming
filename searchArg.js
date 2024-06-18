// Test the translation of a search SQL argument to SQL
// NOTE: Always use test driven development!
function testTranslateToSQL() {
  var example_search_arg_1 = {
    descendants: [{
        field: "name",
        op: "like",
        val: "B%"
      },
      {
        field: "population",
        op: ">=",
        val: "750000"
      }
    ],
    op: "AND"
  };

  var example_search_arg_2 = {
    op: "AND",
    descendants: [{
        op: "OR",
        descendants: [{
            field: "name",
            op: "like",
            val: "B%"
          },
          {
            field: "population",
            op: ">=",
            val: "750000"
          }
        ]
      },
      {
        field: "is_capital",
        op: "==",
        val: true
      }
    ]
  };

  const expected_sql_example_1 =
   'SELECT * FROM cities WHERE  ( (name like "B%") AND (population >= 750000) )';
  const test_1 = translateToSQL(example_search_arg_1) === expected_sql_example_1;

  const expected_sql_example_2 =
    'SELECT * FROM cities WHERE  ( ( (name like "B%") OR (population >= 750000) ) AND (is_capital == true) )';
  const test_2 = translateToSQL(example_search_arg_2) === expected_sql_example_2;

  // quick and dirty unit test without a test framework:
  return test_1 && test_2;
}

// A lookup table (object) of City fields to their respective column scalar
// types:
const fieldTypes = {
  name: "text",
  population: "int",
  is_capital: "bool"
};

// Function returns true if and only if the City field argument is a text
// column:
function isTextField(field) {
  var fieldType = fieldTypes[field];
  return fieldType == "text";
};

// Function translates a logical search triplet to partial SQL:
function translateSearchTripletToSQL(triplet) {
  // To Do: validate fields and operators
  // Do we need to encapsulate the value of a text field in quotation marks?
  var encapsulateVal = isTextField(triplet.field) ? '"' : "";
  // Translate the logical search triplet into SQL and return it:
  return `(${triplet.field} ${triplet.op} ${encapsulateVal + triplet.val + encapsulateVal})`;
}

// Function translate the search argument to a SQL SELECT statement:
function translateToSQL(searchArg) {
  // All City Data Model search SQL queries start with this header:
  const header = "SELECT * FROM cities WHERE ";
  // Now build the rest of the SQL SELECT statement, i.e. the partial SQL to
  // follow the WHERE keyword:
  var searchSql = translateToSQLRecursive(searchArg);
  // Combine header and partial search logic:
  return `${header} ${searchSql}`;
}

// The recursive part of the translation of a search argument to SQL:
function translateToSQLRecursive(searchArg) {
  // Do we need a recursive approach?
  var hasDescendants = searchArg.descendants !== undefined;
  if (hasDescendants) {
    // Translate each descendant recursively:
    var descSqlArr = searchArg.descendants.map(translateToSQLRecursive);
    // Combine the recursively translated descendants with the specified
    // operator; use a functional programming implementation with 'reduce':
    var sql = descSqlArr.reduce((a, c) => `${a} ${searchArg.op} ${c}`);
    // Put round braces around the phrase to ensure correct order of execution
    // in SQL:
    return `( ${sql} )`;
  } else {
    // Non recursive translation of a search triplet to partial SQL:
    return translateSearchTripletToSQL(searchArg);
  }
}

module.exports = {translateToSQL, testTranslateToSQL};
