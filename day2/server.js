const fs = require('fs');
const http = require('http');
const _ = require('lodash');

// Create the server & listen
const server = http.createServer((req, res) => {
    // Fire this function when request come in

    // lodash - get random number
    const num = _.random(0, 20);
    console.log(num);
    
    // Let browser know what is the response content type
    res.setHeader('Content-Type', 'text/html');

    // Routing
    // Normally we use Express to manage routing
    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // Send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }

        res.write(data);
        res.end();
    })

});

server.listen(3000, 'localhost', () => {
    // Listening on the server
    console.log("Listening for requests on port 3000");
});