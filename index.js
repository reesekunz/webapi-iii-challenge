// uses the server and listens for connections

// Adding for heroku deployment - needs to be at the top
require("dotenv").config();

const server = require("./server");

// making port dynamic (defining in .env file)
console.log("heroku defined environment", process.env.NODE_ENV);
const port = process.env.PORT || 7000;

server.listen(port, () => console.log(`server running on port ${port}`));
