const http = require('http');

const server = http.createServer((req, res) => {

  res.end('hi');
})

server.listen(3000, () => {
  console.log('Server has been started');
})