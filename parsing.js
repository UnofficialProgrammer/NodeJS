var http = require("http")
var url = require("url")

http.createServer((req, res) => {

    //var query = url.parse(req.url,true)
    //console.log(query.query.name);

//the above mentioned function 'parse' is deprecated. So use the method -> new URL()

    var baseURL = 'http://' + req.headers.host + '/';
    var query = new URL(req.url, baseURL);
    

    if (query.pathname == '/')
        res.write('Home Page')
    else if (query.pathname == '/about')
        res.write('About Us Page')
    else
        res.write('Page Not Found')

    if(query.searchParams.get('name'))
    res.write(query.searchParams.get('name'))

    res.end()

}).listen(7000, () => console.log('Server Up & Running'))