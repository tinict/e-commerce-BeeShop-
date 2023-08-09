const http = require('http');
const hostname = '127.0.0.1';
const port = 8080;
const route = require('../api/routes/index.js');

const server = http.createServer(route());

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

