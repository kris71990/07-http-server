'use strict';

const http = require('http');
const cowsay = require('cowsay');
// const logger = require('./logger');
const bodyParser = require('./body-parser');
const faker = require('faker');


const server = module.exports = {};

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then((parsedRequest) => {
      // logger.log(logger.INFO, parsedRequest.url.body);
      // console.log('pathname', parsedRequest.url.pathname);

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>cowsay</title>
          </head>
          <body>
            <header> 
              <nav>
                <ul>
                  <li><a href="/cowsay">cowsay</a></li>
                </ul>
              </nav>
            </header>
            <main>
              <p>Lab 7 - Vanilla HTTP server with cowsay</p>
            </main>
          </body>
        </html>
        `);
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/cowsay') {
        // logger.log(logger.INFO, `querystring: ${parsedRequest.url.query}`);
        const random = faker.random.words();
        let text;

        if (parsedRequest.url.query.text) {
          text = cowsay.say({ text: parsedRequest.url.query.text });
        } else {
          text = cowsay.say({ text: random });
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<!DOCTYPE html><html><head><title>cowsay</title></head><body><h1>cowsay</h1><pre>${text}</pre></body></html>`);
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/cowsay') {
        const random = faker.random.words();
        let message;

        if (parsedRequest.url.query.text) {
          message = parsedRequest.url.query.text;
        } else {
          message = random;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ text: message }));
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'POST' && parsedRequest.url.pathname === '/api/cowsay') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(parsedRequest.body));
        res.end();
        return undefined;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Error - Page not found');
      res.end();
      return undefined;
    })
    .catch((err) => {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request', err);
      res.end();
      return undefined;
    });
});

server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
