const server = require('http')
const app = require('./app')
const port = 3000
// Start the server on the specified port
server.createServer(app).listen(port)