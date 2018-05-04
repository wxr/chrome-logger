const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/log') {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let milliseconds = (new Date).getTime();
            let row = `${milliseconds},${body}\n`;
            fs.appendFileSync('chrome-logger.csv', row);

            response.statusCode = 200;
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.end();
        });
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8888);

