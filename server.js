const server = require('http')
const app = require('./app')
const port = 3300
// Start the server on the specified port
server.createServer(app)
server.listen(port)