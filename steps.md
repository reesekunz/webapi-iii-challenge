<!-- Initial set up  -->

#1. terminal
git checkout -b reese-kunz

#2. terminal
npm i express (don't need to to npm init -y or npx gitignore node b/c already given to you for this project)

#3. terminal
npm i -D nodemon

#4. package.json
Check to make sure server has nodemon index.js script in package.json
"scripts": {
"server": "nodemon index.js"
},

#5. terminal
npm run server

<!-- Set up server.js and index.js -->

#1. index.js
const server = require("./server");

const port = 8000;
server.listen(port, () => console.log(`api on port ${port}`));

#2. server.js
const express = require("express");

const server = express();

server.get("/", (req, res) => {
res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;

- terminal should now say api on port 8000


