const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);

function print(content) {
  console.log(content);
}

print(`[Server] : Connected on port ${port}...`);
