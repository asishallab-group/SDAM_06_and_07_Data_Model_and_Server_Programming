// Import (require) express framework THE standard server in Node.js:
const express = require('express')
// In order to be able to read out HTTP body content, we need this framework:
//var bodyParser = require('body-parser')
// Create a new "server" (app):
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

const ejs = require('ejs')

// Our own modules are required below:
const City = require('./city.js');

// on what port should it listen:
const port = 3000

// All routes are mapped to this function:
app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.get('/say_something', function(req, res) {
  res.send('something');
})



// Get RESTful route to search cities
// Note 'async' in order to be able to communicate with the database.
app.get('/cities', async (req, res) => {
  var db;
  try {
    // Connect to the Database:
    db = await sqlite.open({
      filename: './City_Country_River.db',
      driver: sqlite3.Database
    })

    // Obtain the search argument from the request body:
    // To Do: also obtain order_arg and pagination_arg!
    const search_arg = req.body.search_arg;

    // Query the Database:
    const cities = await City.search(search_arg, undefined, undefined, db);

    console.log(cities);

    // Return the result:
    if ( req.accepts("html") ) {
      ejs.renderFile('./cities.ejs', {cities}, {}, function(err, str) {
        if (err) {
          throw err;
        }
        res.send(str);
      });
    } else if ( req.accepts("json") ) {
      res.json(cities)
    } 
  } catch (e) {
    console.error(e);
    res.status(500);
  } finally {
    delete db
  }
})

/**
 * RESTful route to create a new City record
 */
app.post('/cities', async function(req, res) {
  var db;
  try {
    // Connect to the Database:
    db = await sqlite.open({
      filename: './City_Country_River.db',
      driver: sqlite3.Database
    })
    const new_city = await City.createOne(req.body, db);
    console.log(`Created a new City record:\n${new_city}`);
    res.json(new_city);
  } catch (err) {
    console.error(err);
    res.status(400).send("Internal server error");
  } finally {
    delete db;
  }
});

/**
 * RESTful route to update a City record
 */
app.put('/cities/:city_id', async function(req, res) {
  var db;
  try {
    // Connect to the Database:
    db = await sqlite.open({
      filename: './City_Country_River.db',
      driver: sqlite3.Database
    })
    const updateKeyValuePairs = req.body;
    let city = await City.readById(req.params.city_id, db);
    let result = await city.update(updateKeyValuePairs, db);
    console.log(`Updated a City record:\n${result}`);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).send("Internal server error");
  } finally {
    delete db;
  }
});

// Start server and listen until manual shutdown
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
