// uses the server and listens for connections

const server = require("./server");

const port = 8000;
server.listen(port, () => console.log(`api on port ${port}`));
