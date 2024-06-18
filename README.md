# A simple server example

This code matches today's lecture in SDAM. We have a look at HTTP Requests and
Responses and how to build very basic servers in order to understand how data
and HTML is sent through the WWW.

## Lecture six

### GitHub repository

Basic usage of `git` to manage versions of a codebase is explained in the
[Getting Stared section of the Git
Book](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control).

Find this code on GitHub [here](https://github.com/asishallab-group/SDAM_06_and_07_Data_Model_and_Server_Programming).

#### Basic usage of git

Initialize version control with `git init .`

Add a remote (GitHub) repository with `git remote add origin https://github.com/asishallab-group/SDAM_06_and_07_Data_Model_and_Server_Programming`

Synchronize with the remote repository with `git fetch --all` and `git merge origin/main`

Prepare for team usage with `git add . --all` and `git commit -m "Initial commit"`.

Checkout this repository on your computer with:
`git clone https://github.com/asishallab-group/SDAM_06_and_07_Data_Model_and_Server_Programming.git`

##### Git work cycle 

Details in the Git Book's Getting Started Section.

- git status
- git fetch --all
- if necessary: git merge
- git add
- git commit
- git push

### Multipart form data

See the file `./example_form.html` for the HTML to build a form and send it to
a server running on `localhost` under port `8000`.

Open the HTML file in your browser and provide data and sent the data.

Before you sent it, start a simple server with:
```sh
nc -l localhost 8000
```

### A simple server in Node.js

Dieses Archiv enthält Beispielcode und Lernunterlagen, um einfache Server mit
Datenbankanbindung zu implementieren. 

Bitte machen Sie sich _unbedingt_ klar, dass hier noch die Model-Schicht nicht
implementiert ist. Separation of concern ist also hier noch verletzt.

#### Setup

Installieren Sie die Abhängigkeiten mit:
```sh
npm install sqlite --save
npm install sqlite3 --save
npm install express --save
```

Alle Abhängigkeiten finden Sie in der Datei `./package.json`.

#### Start and stop server

Starten Sie den server mit
```sh
node server.js
```
Stoppen Sie Ihren Server mit `Ctrl-C` in dem Terminal in dem Sie ihn gestartet
haben.

#### Send Queries to server

Schicken Sie Anfragen an Ihren Server mittels `curl` aus Ihrem Shell-Script mit:
```sh
bash calls.sh
```

#### Inspect the database

Schauen Sie sich die Datenbank an mit:
```sh
sqlite3 ./City_Country_River.db
```

Kommandos für die SQLite interaktive Shell haben Sie in den vergangenen Übungen
kennen gelernt.

#### Learn

Lesen Sie die Dateien:
- `searchArg.js`
- `server.js`
- `calls.sh`

## Lecture seven

Let's implement our data models correctly. 

### Standard Data Model API

We remember that each data model should expose the following functions, i.e.
implement the following Application Programming Interface (API). Remember the
Create, Read, Update, and Delete (CRUD) functions.

- readOne(id) -> instance of data model e.g. the found City record
- createOne(keyValuePairs) -> instance of the newly created record, e.g. the new City
- updateOne(keyValuePairs) -> instance of the updated City record
- deleteOne(id) -> the deleted instance or boolean indicating success
- search(searchArg, orderArg, paginationArg) -> A JSON Array of matching records (instances), e.g. cities

Note, that the above search is the most complex of functions. See lecture on these basic functions.

### City Model

See file `./city.js`.

We start with the `createOne` function.

#### Static versus instance methods (functions)

Both the constructor and `createOne` functions are "static", meaning that they
belong to the City class (Data Model or format) and _not_ to an instance
(record) of type City.

```js
const City = require('./city.js')

const c1 = new City(
    { city_ID: "Ber",
    name: "Berlin",
    population: 3400000,
    country_ID: "De" }
)
```

The function `updateOne` is an instance method and belongs to a record of the
City data model.

