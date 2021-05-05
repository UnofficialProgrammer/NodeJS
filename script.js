var http = require("http")

http.createServer((req, res) => {
    res.write('Hello World')
    res.end()
}).listen(7000, () => console.log('Server Up & Running'))