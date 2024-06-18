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
   * Creates a new City record in the database.
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
}

// To Do test the above new function:

// Make the City class available outside of this module:
module.exports = City;
