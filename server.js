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

// Our own modules are required below:
const searchArg = require('./searchArg.js')

// on what port should it listen:
const port = 3000

// All routes are mapped to this function:
app.get('/', function(req,res) {
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

    // Create the SQL:
    const searchParam = req.body;
    const searchSql = searchArg.translateToSQL(searchParam);

    // Query the Database:
    const dbResult = await db.get(searchSql);

    console.log(dbResult);

    // Return the res:
    res.json(dbResult)
  } catch (e) {
    console.error(e);
    res.status(500);
  } finally {
    delete db
  }
})

// Start server and listen until manual shutdown
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
