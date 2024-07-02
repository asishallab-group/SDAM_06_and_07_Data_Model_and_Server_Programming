const searchArg = require('./searchArg.js')

/** 
 * The Data Model City defines the format in which we represent City data
 */
class City {

  // define the City attributes or fields:
  city_ID; // the Primary Key of this Data Model
  name;
  population;
  // Foreign Key to the Country Data Model:
  country_ID;

  /**
   * In object oriented programming the constructor is the function to create
   * new instances (records) of a data model:
   *
   * @constructor
   */
  constructor(keyValuePairs) {
    this.city_ID = keyValuePairs.city_ID;
    this.name = keyValuePairs.name;
    this.population = keyValuePairs.population;
    this.country_ID = keyValuePairs.country_ID;
  }

  /**
   * Static method that creates a new City record in the database.
   *
   * @param {HashMap} keyValuePairs - The attributes and their values
   * @param {object} db_connection - The connection to the SQLite database
   *
   * @return {object} - The newly created City instance.
   */
  static async createOne(keyValuePairs, db_connection) {
    // Prepare the SQL statement:
    const sql = "INSERT INTO cities " +
      "(city_ID, name, population, country_ID) VALUES " +
      "(?, ?, ?, ?)";
    // Execute the SQL statement with the argument values:
    const db_res = await db_connection.run(sql,
      keyValuePairs.city_ID, keyValuePairs.name,
      keyValuePairs.population, keyValuePairs.country_ID);
    // Read out the just inserted new city record and return it:
    const new_city = await db_connection.get(
      'SELECT * FROM cities WHERE city_ID = ?',
      keyValuePairs.city_ID
    );
    return new_city;
  }

  /**
   * Reads a City record from the database represented by argument `id`.
   *
   * @param {string} id - the unique City's identifier
   * @param {object} db_connection - The connection to the SQLite database
   *
   * @return {object} - The found City instance.
   */
  static async readById(id, db_connection) {
    const sql = "SELECT city_ID, name, population, country_ID FROM cities WHERE city_ID = ?";
    const db_res = await db_connection.get( sql, id );
    console.log(db_res);
    return new City(db_res);
  }

  /**
   * Reads city records from the database represented by argument
   * `db_connection`.
   *
   * @param {object} search_arg - The search arguments (see module
   * './searchArg.js') 
   * @param {object} order_arg - The order argument to sort the city records.
   * Currently ignored (To Do)
   * @param {object} pagination_arg - The pagination argument to select a
   * subset of the city records. Currently ignored (To Do).
   * @param {object} db_connection - The connection to the SQLite database
   *
   * @return {object} - The found City instance.
   */
  static async search(search_arg, order_arg, pagination_arg, db_connection) {
    const searchSql = (search_arg !== undefined && search_arg !== null) ? searchArg.translateToSQL(search_arg) : "SELECT city_ID, name, population FROM cities";
    console.log(`SQL generated to search City records:\n${JSON.stringify(searchSql)}`);
    // To Do translate order_arg and pagination_arg to SQL

    // Query the Database:
    const dbResult = await db_connection.all(searchSql);
    // Done:
    return dbResult;
  }

  /**
   * Instance-Method to update a City record with the new provided values.
   *
   * @param {HashMap} keyValuePairs - The attributes and their values
   * @param {object} db_connection - The connection to the SQLite database
   *
   * @return {object} - The newly updated City instance.
   */
  async update(keyValuePairs, db_connection) {
    // Prepare the SQL statement:
    let sql = "UPDATE cities SET " ;
    for (const [key, value] of Object.entries(keyValuePairs)) {
      sql += `${key} = ${value} `;
    }
    sql += "WHERE city_ID = ?";
    console.log(sql);
    
    // Execute the SQL statement with the argument values:
    const db_res = await db_connection.run(sql, this.city_ID);

    // Read out the just inserted new city record and return it:
    const updated_city = await db_connection.get(
      'SELECT * FROM cities WHERE city_ID = ?',
      this.city_ID
    );
    return updated_city;
  }
}

// To Do test the above new function:

// Make the City class available outside of this module:
module.exports = City;
