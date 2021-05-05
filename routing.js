var http = require("http")

http.createServer((req, res) => {

    if (req.url == '/')
        res.write('Home Page')
    else if (req.url == '/about')
        res.write('About Us Page')
    else
        res.write('Page Not Found')

    res.end()

}).listen(7000, () => console.log('Server Up & Running'))