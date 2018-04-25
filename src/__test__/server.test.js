'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('GET request with text string', () => {
  const cow = cowsay.say({ text: 'I am a test cow' });
  const html = `<!DOCTYPE html><html><head><title>cowsay</title></head><body><h1>cowsay</h1><pre>${cow}</pre></body></html>`;
  
  test('should return specified cow', () => {
    return superagent.get(':5000/cowsay')
      .query({ text: 'I am a test cow' })
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.text).toEqual(html);
      });
  });
});

